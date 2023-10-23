import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import SkeletonPlaceholder from "./react-native-skeleton-placeholder/lib/skeleton-placeholder";
import { COLORS } from "../../constants/them";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../common/responsivefunction";
export default function RecentImagesSkeleton() {
  return (
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
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item
        justifyContent="flex-start"
        width={wp(95)}
        flexDirection="row"
        alignItems="center"
      >
        <SkeletonPlaceholder.Item
          width={wp(21.5)}
          height={wp(20)}
          borderRadius={wp(1)}
          marginRight={wp(3)}
          marginTop={hp(2)}
        />
        <SkeletonPlaceholder.Item
          width={wp(21.5)}
          height={wp(20)}
          borderRadius={wp(1)}
          marginRight={wp(3)}
          marginTop={hp(2)}
        />
        <SkeletonPlaceholder.Item
          width={wp(21.5)}
          height={wp(20)}
          borderRadius={wp(1)}
          marginRight={wp(3)}
          marginTop={hp(2)}
        />
        <SkeletonPlaceholder.Item
          width={wp(21.5)}
          height={wp(20)}
          borderRadius={wp(1)}
          marginRight={wp(3)}
          marginTop={hp(2)}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({});
