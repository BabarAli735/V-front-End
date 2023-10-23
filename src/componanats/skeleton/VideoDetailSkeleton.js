import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SkeletonPlaceholder from "../../componanats/skeleton/react-native-skeleton-placeholder";
import { COLORS } from "../../constants/them";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../common/responsivefunction";
import VideosListSkeleton from "./VideosListSkeleton";

export default function VideoDetailSkeleton() {
  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.black, alignItems: "center" }}
    >
      <SkeletonPlaceholder backgroundColor={COLORS.brown}>
        <SkeletonPlaceholder.Item
          height={hp(32)}
          width={wp(100)}
          borderBottomLeftRadius={wp(3)}
          borderBottomRightRadius={wp(3)}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: wp(2),
          }}
        >
          <View>
            <SkeletonPlaceholder.Item
              width={wp(15)}
              height={wp(2)}
              borderRadius={wp(1)}
              marginTop={hp(1)}
            />
            <SkeletonPlaceholder.Item
              width={wp(15)}
              height={wp(2)}
              borderRadius={wp(1)}
              marginTop={hp(1)}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SkeletonPlaceholder.Item
              width={wp(10)}
              height={wp(5)}
              borderRadius={wp(1)}
              marginTop={hp(1)}
              marginRight={wp(3)}
            />
            <SkeletonPlaceholder.Item
              width={wp(10)}
              height={wp(5)}
              borderRadius={wp(1)}
              marginTop={hp(1)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: wp(2),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SkeletonPlaceholder.Item
              width={wp(10)}
              height={wp(10)}
              borderRadius={wp(10)}
              marginTop={hp(1)}
            />
            <View style={{marginStart:wp(2)}}>
              <SkeletonPlaceholder.Item
                width={wp(30)}
                height={wp(2)}
                borderRadius={wp(20)}
                marginTop={hp(1)}
              />
              <SkeletonPlaceholder.Item
                width={wp(30)}
                height={wp(2)}
                borderRadius={wp(10)}
                marginTop={hp(1)}
              />
            </View>
          </View>
          <SkeletonPlaceholder.Item
            width={wp(20)}
            height={wp(8)}
            borderRadius={wp(1)}
            marginTop={hp(1)}
          />
        </View>
      </SkeletonPlaceholder>
        <VideosListSkeleton/>
    </View>
  );
}

const styles = StyleSheet.create({});
