import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTFAMILY, SCREENS, STYLES } from "../constants/them";
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../common/responsivefunction";
import CirclImage from "./CirclImage";
import Icon, { Icons } from "./Icons";
import moment from "moment";

const ChatListComponanat = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.itemContainer, { color: COLORS.black }]}
      onPress={() => {
        navigation.navigate(SCREENS.ChatScreen, {
          item: item,
          chatId: item?.id,
        });
      }}
    >
      <CirclImage style={styles.image} uri={item?.participant.avatar} />

      <View style={styles.detail}>
        <Text style={styles.txt}>{item?.participant?.firstName}</Text>
        {/* <Text style={[styles.txt, { marginVertical: hp(0.7) }]}>
          Look at the Sent icon
        </Text> */}
        <View style={[STYLES.row, { marginTop: hp(0.2) }]}>
          <View style={STYLES.row}>
            <Icon
              type={Icons.AntDesign}
              name={"clockcircleo"}
              style={styles.icon}
            />
            <Text style={styles.txt2}>
              {moment(item.createdAt).format("LT")}
            </Text>
          </View>
          <View style={[STYLES.row, { marginStart: wp(1.5) }]}>
            <Icon
              type={Icons.AntDesign}
              name={"calendar"}
              style={styles.icon}
            />
            <Text style={styles.txt2}>
              {moment(item.createdAt).format("MMMM Do YYYY")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.BLACK,
    padding: wp("3%"),
    borderRadius: wp("2%"),
  },
  detail: {
    marginStart: wp("2%"),
  },
  txt: {
    color: COLORS.white,
    fontSize: rf(1.5),
    fontFamily: FONTFAMILY.Medium,
  },
  txt1: {
    color: COLORS.brown,
    fontSize: rf(1.3),
    fontFamily: FONTFAMILY.Light,
  },
  txt2: {
    color: COLORS.brown,
    fontSize: rf(1.3),
    fontFamily: FONTFAMILY.Light,
    marginStart: wp(1),
  },
  image: {
    height: wp(14),
    width: wp(14),
    borderRadius: wp(14),
  },
  icon: {
    color: COLORS.brown,
    fontSize: rf(1.5),
  },
});

export default memo(ChatListComponanat);
