import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Text,
  View,
  useRef,
  PanResponder,
  StyleSheet,
  Alert,
} from "react-native";
import CustomImage from "./components/Image";
import AnimatedImage from "./components/AnimatedImage";

export default function App() {
  // const pan = useRef(new Animated.ValueXY()).current;

  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => true,
  //   onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
  //   onPanResponderRelease: () => {
  //     // Perform your desired action here
  //     Alert.alert("Action", "Image released!");
  //   },
  // });

  return (
    <View style={styles.container}>
      <Text>LYTTE LYTTE LYTTE</Text>
      <View style={styles.row}>
        <AnimatedImage
          source={require("./assets/Mumi.png")}
          style={{ width: 100, height: 100 }}
          // style={[styles.foregroundImage, pan.getLayout()]}
          // {...panResponder.panHandlers}
        />
        <AnimatedImage
          source={require("./assets/Cirkeline.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <CustomImage
        source={require("./assets/tiger-with-books.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.row}>
        <AnimatedImage
          source={require("./assets/monkey.png")}
          style={{ width: 100, height: 100 }}
        />
        <AnimatedImage
          source={require("./assets/RasmusKlump.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  foregroundImage: {
    width: 200,
    height: 200,
    position: "absolute",
  },
});
