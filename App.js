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
} from "react-native";
import CustomImage from "./components/Image";
import AnimatedImage from "./components/AnimatedImage";

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;
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
      // Perform your desired action here
      // Animated.spring(
      //   //Step 1
      //   pan, //Step 2
      //   {
      //     toValue: { x: 0, y: 0 },
      //     //useNativeDriver: true, // <-- Add this
      //   } //Step 3
      // ).start();
      Alert.alert("Action", "Image released!", e, gesture);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.draggableContainer}>
        <CustomImage
          source={require("./assets/tiger-with-books.png")}
          style={styles.centerImage}
          onPress={() => Alert.alert("Image pressed 2!")}
        />
        <Animated.View
          {...panResponder.panHandlers} //Step 1
          style={[pan.getLayout(), styles.circle]}
        >
          <CustomImage source={require("./assets/GurliGris.png")} />
        </Animated.View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    //justifyContent: "center",
    backgroundColor: "#FDF295",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginHorizontal: 20,
    paddingHorizontal: 200,
    // Add other styles as needed
  },
  centerImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    //top: 300,
    position: "absolute",
  },
  foregroundImage: {
    width: 150,
    height: 150,
    top: 80,
    alignSelf: "center",
    position: "absolute",
  },
  draggableContainer: {
    backgroundColor: "red",
    position: "absolute",
    top: Window.height / 2 - CIRCLE_RADIUS,
    left: Window.width / 2 - CIRCLE_RADIUS,
  },
  circle: {
    position: "absolute",
    backgroundColor: "#1abc9c",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderColor: "green",
  },
});
