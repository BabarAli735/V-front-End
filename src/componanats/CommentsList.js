import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { COLORS, FONTFAMILY, SCREENS, STYLES } from "../constants/them";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import Icon, { Icons } from "./Icons";

import { useNavigation } from "@react-navigation/native";
import CirclImage from "./CirclImage";
import HomeListFooter from "./HomeListFooter";
export default function CommentsList(props) {
  const renderItem = ({ item, index }) => {
    return <RenderItem item={item} index={index} />;
  };
  return (
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp(3),
          paddingVertical: hp(2),
          paddingBottom: hp(5),
        }}
      />
  );
}

const RenderItem = ({ item, index }) => {
  const navigation = useNavigation();
  return (
    <>
      {index === 0 && (
        <View style={[STYLES.row, { marginBottom: hp(2) }]}>
          <CirclImage />
          <Text
            style={{
              color: COLORS.white,
              fontFamily: FONTFAMILY.Light,
              fontSize: rf(1.5),
              width: wp(80),
              marginStart: wp(2),
              lineHeight: hp(2),
            }}
          >
            Contrary to popular belief, Lorem Ipsum is not simply random text.
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={() => {}} style={[styles.itemContainer]}>
        <ImageBackground
          style={styles.image}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvm-RGMEN4mZnQA0F7eiOlXS1lJgKUE75IFw&usqp=CAU",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.modal,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: wp(0.5),
              width: wp(13),
              marginBottom: hp(2),
              marginRight: wp(1.5),
              height: hp(3),
            }}
          >
            <Text style={{ color: COLORS.white }}>3:30</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <HomeListFooter style={{ marginBottom: hp(1.5) }} />
    </>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: COLORS.modal,
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    overflow: "hidden",
  },
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
  },
  image: {
    height: hp(25),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

const data = [
  {
    id: 0,
    title: "Current",
  },
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Sad Music",
  },
  {
    id: 1,
    title: "K-Drama",
  },
  {
    id: 1,
    title: "Movie",
  },
];
