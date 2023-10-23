import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { COLORS, FONTFAMILY } from "../constants/them";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import Icon, { Icons } from "./Icons";
export default function RecentCategory() {
  const [selected, setSelected] = useState("Music");

  const renderItem = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        index={index}
        setSelected={setSelected}
        selected={selected}
      />
    );
  };
  return (
    <View style={{ }}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{  }}
      />
    </View>
  );
}

const RenderItem = ({ item, index, setSelected, selected }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        
        setSelected(item.title);
      }}
      style={[styles.itemContainer, {}]}
    >
      <Text
        style={[
          styles.txt,
          {
            color: selected === item.title ? COLORS.primary : COLORS.white,
            textDecorationLine:
              selected === item.title ? 'underline' :'none',
          },
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: hp(0.8),
    marginRight: wp(8),
    borderRadius: wp(1),
  },
  txt: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
  },
});

const data = [
  {
    id: 0,
    title: "Music",
  },
  {
    id: 1,
    title: "Cooking",
  },
  {
    id: 2,
    title: "Fashion",
  },
  {
    id: 1,
    title: "MakeUp",
  },
];
