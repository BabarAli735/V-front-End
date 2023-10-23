import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "../common/responsivefunction";
import { COLORS } from "../constants/them";

export default function ItemSeparatorComponent() {
  return (
    <View
      style={{
        height: hp(0.03),
        width: "100%",
        backgroundColor: COLORS.whiteOpacity,
      }}
    />
  );
}

const styles = StyleSheet.create({});
