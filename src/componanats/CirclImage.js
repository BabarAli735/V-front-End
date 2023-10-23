import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import { widthPercentageToDP as wp } from "../common/responsivefunction";
import { COLORS } from "../constants/them";
export default function CirclImage({ style, uri }) {
  const url =
    uri?.includes("https") || uri?.includes("file")
      ? uri
      : "https://img.freepik.com/free-icon/avatar_318-178064.jpg";

  return (
    <FastImage
      style={[styles.image, style]}
      source={{
        uri: url,
      }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: wp(12),
    width: wp(12),
    borderRadius: wp(12),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
