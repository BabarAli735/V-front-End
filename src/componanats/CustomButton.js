import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTFAMILY, SIZES, width } from "../constants/them";
import Icon from "./Icons";
import { useSelector } from "react-redux";

export default function CustomButton(props) {
  const isLoading = useSelector((state) => state.loader.isVisible);
  const {
    title,
    onPress,
    btnStyle,
    titleStyle,
    disabled,
    hasCard,
    hasIcon,
    icon,
    type,
    bgColors,
    iconColor,
    showIndicator
  } = props;
const tempLoading=showIndicator?showIndicator:isLoading
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.container, btnStyle]}
      onPress={onPress}
      disabled={disabled?disabled:isLoading?true:false}
    >
      {tempLoading && !hasIcon && (
        <ActivityIndicator color={COLORS.white} size={"small"} />
      )}

      {title && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:SIZES.five,
    paddingHorizontal: SIZES.twentyFive,
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 10,
    marginTop: SIZES.twenty,
  },
  titleStyle: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: SIZES.h20,
    fontFamily: FONTFAMILY.Bold,
  },
  logoContainer: {
    position: "absolute",
    left: SIZES.twenty,
    height: SIZES.ten * 5,
    width: SIZES.ten * 5,
    borderRadius: SIZES.ten * 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
