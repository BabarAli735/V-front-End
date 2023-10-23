import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    heightPercentageToDP as hp,
    responsiveFontSize as rf,
    widthPercentageToDP as wp,
  } from "../common/responsivefunction";
import { COLORS, FONTFAMILY } from "../constants/them";
export default function ListEmptyComponent() {
  return (
    <View
      style={{
       flex:1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.txt}>No Record Found!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontSize: rf(2.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    textAlign: "center",
  },
});
