import React from "react";
import { View, StyleSheet } from "react-native";
import CustomImage from "./Image";

const TitlesRow = ({ source, style, onPress }) => {
  const images = [
    { url: "../assets/gurli_cover_mudpuddle.png", audio: "" },
    { url: "../assets/gurli_cover_vinter.jpeg", audio: "" },
    { url: "../assets/gurli_cover-on-sejletur.jpeg", audio: "" },
  ];

  //TOOD use image.url instead of hardcoded value
  return (
    <View style={styles.container}>
      <CustomImage
        source={require("../assets/gurli_cover_mudpuddle.png")}
        style={styles.image}
      />
      <CustomImage
        source={require("../assets/gurli_cover_vinter.jpeg")}
        style={styles.image}
      />
      {/* <CustomImage
        source={require("../assets/gurli_cover-on-sejletur.jpeg")}
        style={styles.image}
      /> */}
    </View>
  );
};

export default TitlesRow;

const styles = StyleSheet.create({
  container: {
    top: "8%",
    margin: 10,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 30,
  },
});
