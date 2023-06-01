import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Replace FontAwesome with the desired icon library

export default function CustomIcon({ name, size, color }) {
  return (
    <View>
      <Icon name="star" size={30} color="blue" />
    </View>
  );
}
