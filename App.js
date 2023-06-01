import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  Animated,
  Text,
  View,
  PanResponder,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import CustomImage from "./components/Image";
import AnimatedImage from "./components/AnimatedImage";

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
  const gurli = useRef(null);
  // console.log("panResponder", pan.x, pan.y);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gesture) => {
      // Reset the position of the foreground image using Animated.spring
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/tiger-with-books.png")}
        style={styles.backgroundImage}
      />
      <Animated.View
        ref={gurli}
        style={[
          styles.foregroundImageContainer,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        ]}
        {...panResponder.panHandlers}
      >
        <Image
          source={require("./assets/GurliGris.png")}
          style={styles.foregroundImage}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF295",
  },
  backgroundImage: {
    width: 200,
    height: 200,
    position: "absolute",
    alignSelf: "center",
    top: 300,
  },
  foregroundImageContainer: {
    position: "absolute",
    width: 100,
    height: 100,
    alignSelf: "center",
    top: 200,
  },
  foregroundImage: {
    width: 100,
    height: 100,
  },
});
