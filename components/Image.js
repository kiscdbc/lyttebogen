import React from "react";
import { View, Image, Text } from "react-native";

export default function CustomImage({ source, style }) {
  return (
    <View>
      <Image source={source} style={style} />
    </View>
  );
}
