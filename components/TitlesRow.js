import React from "react";
import { View, StyleSheet } from "react-native";
import CustomImage from "./Image";

const TitlesRow = ({ source, style, onPress }) => {
  console.log("hola");

  const images = [
    { url: "../assets/gurli_cover_mudpuddle.png", audio: "" },
    { url: "../assets/gurli_cover_vinter.jpeg", audio: "" },
    { url: "../assets/gurli_cover-on-sejletur.jpeg", audio: "" },
  ];

  //TOOD use image.url instead of hardcoded value
  return (
    <View style={styles.container}>
      {images.map((image) => {
        return (
          <CustomImage
            key={image.url}
            source={require("../assets/gurli_cover_mudpuddle.png")}
            style={styles.image}
            onPress={console.log("here")}
          />
        );
      })}
    </View>
  );
};

export default TitlesRow;

const styles = StyleSheet.create({
  container: {
    top: "10%",
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
