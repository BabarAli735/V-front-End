import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/them";
import {
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
  heightPercentageToDP as hp,
} from "../common/responsivefunction";
import Icon, { Icons } from "./Icons";

export default function SearchBar({ onPress, placeHolder,onChangeText }) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      <TextInput
        style={{ color: COLORS.white, flex: 1 }}
        placeholder={placeHolder ? placeHolder : "Search Message"}
        placeholderTextColor={COLORS.white}
        editable={onPress ? false : true}
        onChangeText={onChangeText}
      />
      <Icon
        type={Icons.AntDesign}
        name={onPress ? "down" : "search1"}
        style={{
          color: COLORS.brownGrey,
          fontSize: rf(3),
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
    paddingHorizontal: wp(1.8),
    flexDirection: "row",
    alignItems: "center",
    height: hp(6),
    borderRadius: wp(2),
  },
});
