import React, { useRef, useEffect } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";

const AnimatedImage = ({ source, style, onPress }) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      { iterations: 3 }
    );

    const pauseAnimation = Animated.delay(1000);

    const combinedAnimation = Animated.sequence([animation, pauseAnimation]);

    const repeatedAnimation = Animated.loop(combinedAnimation);

    repeatedAnimation.start();

    return () => {
      repeatedAnimation.stop();
    };
  }, []);

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <View>
      <Animated.Image source={source} style={[style, animatedStyle]} />
    </View>
  );
};

export default AnimatedImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
