import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { Animated, View, PanResponder, StyleSheet, Image } from "react-native";

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
  const gurli = useRef(null);
  const backgroundImageRef = useRef(null);

  const [isForegroundVisible, setForegroundVisible] = useState(true);

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
    onPanResponderRelease: async (e, gesture) => {
      // Check if the foreground image is on top of the background image
      const foregroundImagePosition = await calculateImagePosition(gurli);
      const backgroundImagePosition = await calculateImagePosition(
        backgroundImageRef
      );

      if (
        foregroundImagePosition.left >= backgroundImagePosition.left &&
        foregroundImagePosition.top >= backgroundImagePosition.top &&
        foregroundImagePosition.right <= backgroundImagePosition.right &&
        foregroundImagePosition.bottom <= backgroundImagePosition.bottom
      ) {
        // Foreground image is on top of the background image, hide it
        setForegroundVisible(false);
      } else {
        // Foreground image is not on top of the background image, reset its position
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const calculateImagePosition = (imageRef) => {
    if (!imageRef || !imageRef.current) {
      return { left: 0, top: 0, right: 0, bottom: 0 };
    }

    const { current: image } = imageRef;

    return new Promise((resolve) => {
      image.measure((x, y, width, height, left, top) => {
        resolve({
          left,
          top,
          right: left + width,
          bottom: top + height,
        });
      });
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/tiger-with-books.png")}
        style={styles.backgroundImage}
        ref={backgroundImageRef}
      />
      {isForegroundVisible && (
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
      )}
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
