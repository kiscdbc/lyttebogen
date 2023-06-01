import React from "react";
import { View, Image, Text } from "react-native";

export default function CustomImage({ source, style, onPress }) {
  console.log("onPress", onPress);
  return (
    <View>
      <Image source={source} style={style} onPress={onPress} />
    </View>
  );
}
