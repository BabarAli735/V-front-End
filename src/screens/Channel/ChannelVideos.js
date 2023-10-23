import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";

import { COLORS, FONTFAMILY, SIZES } from "../../constants/them";
import CustomHeader from "../../componanats/CustomHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import HomeList from "../../componanats/HomeList";
import channelHandler from "./channelHandler";
import Icon, { Icons } from "../../componanats/Icons";
import VideosListSkeleton, {
  VideoSkeleton,
} from "../../componanats/skeleton/VideosListSkeleton";
import useReduxStore from "../../hook/UseReduxStore";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";

export default function ChannelVideos(props) {
  const {
    isCurrentUser,
    selectedCategory,
    isVisible,
    isEnd,
    ChannelVideos,
    isLoading1,
    AllCategory,
    setIsLoading,
    deleteChannelVideo,
    setselectedCategory,
    loadeMore,
  } = channelHandler(props);
  const { dispatch, getState } = useReduxStore();
  const ref = React.useRef(null);

  if (isVisible) {
    return (
      <View
        style={{ flex: 1, backgroundColor: COLORS.BLACK, alignItems: "center" }}
      >
        <VideosListSkeleton />
      </View>
    );
  }

  function renderItem({ item:itemdata, index }) {
    let data = {
      item:itemdata,
      index,
    };
    return (
      <RenderItem
        item={itemdata}
        index={index}
        onSelect={() => {
          setselectedCategory(itemdata);
        }}
        selected={selectedCategory}
      />
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={COLORS.BLACK} />
      <CustomHeader title="User Videos" showBackButton />

      <View style={{ flex: 1, paddingHorizontal: wp(2) }}>
        <View style={{ marginTop: hp(1)}}>
          <FlatList
        ref={ref}
        horizontal
        data={AllCategory}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
      />
      </View>
        <HomeList
          owner={isCurrentUser}
          data={ChannelVideos}
          loadeMore={loadeMore}
          isEnd={isEnd}
          deleteChannelVideo={deleteChannelVideo}
          isLoading={isLoading1}
          onRefresh={() => {
            setIsLoading(false);
          }}
        />
      </View>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  itemContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.8),
    marginRight: wp(2),
    borderRadius: wp(1),
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.fifteen,
  },
  image: {
    height: hp(30),
    width: "100%",
    borderRadius: wp(2),
    marginTop: hp(2),
    alignItems: "flex-end",
  },
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  icon: {
    color: COLORS.white,
    fontSize: rf(2.5),
  },
  option: {
    backgroundColor: COLORS.modal,
    paddingHorizontal: wp("3%"),
    paddingVertical: SIZES.ten,
  },
  endContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
  },
  txt2: {
    fontSize: rf(2.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
});
