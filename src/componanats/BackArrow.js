import React from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, width } from "../constants/them";
import { useNavigation } from "@react-navigation/native";
import Icon, { Icons } from "./Icons";
import { responsiveFontSize as rf } from "../common/responsivefunction";

export default function BackArrow(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={props.onPress?props.onPress:() => {
        navigation.goBack();
      }}
      style={props.style}
    >
      <Icon
        type={Icons.Ionicons}
        name={"ios-chevron-back-sharp"}
        
        style={{
          color: COLORS.white,
          fontSize: rf(3.5),
        }}
      />
    </TouchableOpacity>
  );
}
