import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Animated,
  View,
  PanResponder,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import TitlesRow from "./components/TitlesRow";

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
  const gurli = useRef(null);
  const backgroundImageRef = useRef(null);

  const [isForegroundVisible, setForegroundVisible] = useState(true);
  const [showTitles, setShowTitles] = useState(false);

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
        setShowTitles(true);
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

  const onButtonClick = () => {
    setShowTitles(false);
    setForegroundVisible(true);
  };

  return (
    <View style={styles.container}>
      {showTitles && <TitlesRow />}
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
      <Image
        source={require("./assets/Elephant.png")}
        style={[styles.elephantImage, { display: showTitles ? "none" : "" }]}
      />
      <Image
        source={require("./assets/Cirkeline.png")}
        style={[styles.cirkelineImage, { display: showTitles ? "none" : "" }]}
      />
      <Image
        source={require("./assets/monkey.png")}
        style={[styles.monkeyImage, { display: showTitles ? "none" : "" }]}
      />
      <Image
        source={require("./assets/RasmusKlump.png")}
        style={[styles.rasmusImage, { display: showTitles ? "none" : "" }]}
      />
      <Image
        source={require("./assets/Mumi.png")}
        style={[styles.mumiImage, { display: showTitles ? "none" : "" }]}
      />
      <View style={styles.buttonContainer}>
        <Button title="RESET" onPress={onButtonClick} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF295",
  },
  elephantImage: {
    width: 100,
    height: 100,
    position: "absolute",
    left: "30%",
    top: "34%",
  },
  cirkelineImage: {
    width: 100,
    height: 100,
    position: "absolute",
    left: "30%",
    top: "55%",
  },
  monkeyImage: {
    width: 100,
    height: 100,
    position: "absolute",
    left: "45%",
    top: "70%",
  },
  mumiImage: {
    width: 100,
    height: 100,
    position: "absolute",
    left: "60%",
    top: "54%",
  },
  rasmusImage: {
    width: 100,
    height: 100,
    position: "absolute",
    left: "60%",
    top: "33%",
  },
  backgroundImage: {
    width: 200,
    height: 200,
    position: "absolute",
    alignSelf: "center",
    top: 300,
    zIndex: 5,
  },
  foregroundImageContainer: {
    position: "absolute",
    width: 100,
    height: 100,
    alignSelf: "center",
    top: 150,
    zIndex: 6,
  },
  button: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "red",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  foregroundImage: {
    width: 100,
    height: 100,
  },
});
