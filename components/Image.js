import React from "react";
import { View, Image, Button, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

export default function CustomImage({ source, style }) {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../clips/Gurli.m4a")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <TouchableOpacity onPress={playSound}>
        <Image source={source} style={style} />
      </TouchableOpacity>
    </View>
  );
}
