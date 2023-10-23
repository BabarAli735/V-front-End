import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import { FlatList } from "react-native";
import { COLORS, FONTFAMILY } from "../constants/them";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import useReduxStore from "../hook/UseReduxStore";
function CategoryList({ selected, onSelect, data }) {
  const categoryRef = React.useRef(null);
  const { dispatch, getState } = useReduxStore();
  const { AllCategory } = getState("videos");
  function renderItem({ item, index }) {
  
    return (
      <RenderItem
        item={item}
        index={index}
        onSelect={() => onSelect(item)}
        selected={selected}
      />
    );
  }
  return (
    <View style={{ marginTop: hp(1) }}>
      <FlatList
        ref={categoryRef}
        horizontal
        data={data ? data : AllCategory}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
      />
    </View>
  );
}

function RenderItem({ item, index, onSelect, selected }) {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(item);
      }}
      style={[
        styles.itemContainer,
        {
          backgroundColor:
            selected === item ? COLORS.primary : COLORS.blackWithOpacity,
        },
      ]}
    >
      <Text style={styles.txt}>{item}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: COLORS.modal,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.8),
    marginRight: wp(2),
    borderRadius: wp(1),
  },
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
  },
});

const data = [
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

export default memo(CategoryList);
