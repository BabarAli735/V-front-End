import { COLORS, IMAGES, width } from "../../constants/them";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import SkeletonPlaceholder from "../../componanats/skeleton/react-native-skeleton-placeholder";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../common/responsivefunction";
import RecentImagesSkeleton from "./RecentImagesSkeleton";
import VideosListSkeleton from "./VideosListSkeleton";
function ChannelSkeleton() {
  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.black, alignItems: "center" }}
    >
      <View style={{ marginTop: hp(1) }} />
      <SkeletonPlaceholder backgroundColor={COLORS.brown}>
        <SkeletonPlaceholder.Item
          width={wp(98)}
          height={hp(20)}
          borderRadius={wp(1)}
          borderBottomLeftRadius={wp(3)}
          borderBottomRightRadius={wp(3)}
        />
        <SkeletonPlaceholder.Item
          height={wp(23)}
          width={wp(23)}
          borderRadius={wp(23)}
          alignSelf="center"
          bottom={hp(4)}
          borderWidth={2}
          borderColor={COLORS.blackWithOpacity}
        />
      </SkeletonPlaceholder>

      <SkeletonPlaceholder
        backgroundColor={COLORS.brown}
        highlightColor={COLORS.apple}
      >
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <SkeletonPlaceholder.Item
            width={wp(15)}
            height={wp(10)}
            borderRadius={wp(1)}
            marginRight={wp(10)}
          />
          <SkeletonPlaceholder.Item
            width={wp(15)}
            height={wp(10)}
            borderRadius={wp(1)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <View style={{ marginTop: hp(1) }} />

      <SkeletonPlaceholder
        backgroundColor={COLORS.brown}
        highlightColor={COLORS.apple}
      >
        <SkeletonPlaceholder.Item justifyContent="flex-start" width={wp(95)}>
          <SkeletonPlaceholder.Item
            width={wp(30)}
            height={wp(2)}
            borderRadius={wp(1)}
            marginRight={wp(10)}
            marginTop={hp(2)}
          />

          <SkeletonPlaceholder.Item
            width={wp(30)}
            height={wp(2)}
            borderRadius={wp(1)}
            marginTop={hp(2)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <RecentImagesSkeleton />
      <VideosListSkeleton />
    </View>
  );
}

export default ChannelSkeleton;

const styles = StyleSheet.create({
  image: {
    height: hp(20),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
});
