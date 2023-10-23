import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { IMAGES } from "../constants/them";
import { widthPercentageToDP as wp } from "../common/responsivefunction";

export default function BackgroundComponant(props) {
  return (
    <ImageBackground
      source={IMAGES.Background}
      style={[{ flex: 1,paddingHorizontal:wp(2) }, props.style]}
      resizeMode="stretch"
      blurRadius={props.withoutblur?0:5}
    >
      {props.children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
