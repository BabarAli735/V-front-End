import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SkeletonPlaceholder from "./react-native-skeleton-placeholder/lib/skeleton-placeholder";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../common/responsivefunction";
import { COLORS } from "../../constants/them";
export default function VideosListSkeleton() {
  return (
    <ScrollView style={{}}>
      <SkeletonPlaceholder
        backgroundColor={COLORS.brown}
        highlightColor={COLORS.apple}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: hp(2),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SkeletonPlaceholder.Item
              width={wp(8)}
              height={wp(8)}
              borderRadius={wp(1)}
            />
            <View style={{ marginStart: wp(2) }}>
              <SkeletonPlaceholder.Item
                width={wp(15)}
                height={wp(2)}
                borderRadius={wp(1)}
              />
              <SkeletonPlaceholder.Item
                width={wp(15)}
                height={wp(2)}
                borderRadius={wp(1)}
                marginTop={hp(0.5)}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SkeletonPlaceholder.Item
              width={wp(8)}
              height={wp(5)}
              borderRadius={wp(1)}
              marginRight={wp(2)}
            />
            <SkeletonPlaceholder.Item
              width={wp(8)}
              height={wp(5)}
              borderRadius={wp(1)}
              marginRight={wp(2)}
            />
            <SkeletonPlaceholder.Item
              width={wp(10)}
              height={wp(10)}
              borderRadius={wp(10)}
            />
          </View>
        </View>

        <SkeletonPlaceholder.Item
          justifyContent="flex-start"
          width={wp(95)}
          flexDirection="row"
          alignItems="center"
        >
          <SkeletonPlaceholder.Item
            width={wp(21.5)}
            height={wp(5)}
            borderRadius={wp(1)}
            marginRight={wp(3)}
            marginTop={hp(2)}
          />
          <SkeletonPlaceholder.Item
            width={wp(21.5)}
            height={wp(5)}
            borderRadius={wp(1)}
            marginRight={wp(3)}
            marginTop={hp(2)}
          />
          <SkeletonPlaceholder.Item
            width={wp(21.5)}
            height={wp(5)}
            borderRadius={wp(1)}
            marginRight={wp(3)}
            marginTop={hp(2)}
          />
          <SkeletonPlaceholder.Item
            width={wp(21.5)}
            height={wp(5)}
            borderRadius={wp(1)}
            marginRight={wp(3)}
            marginTop={hp(2)}
          />
        </SkeletonPlaceholder.Item>

        {[1, 2, 3, 4].map((item, index) => {
          return (
            <SkeletonPlaceholder
              backgroundColor={COLORS.brown}
              highlightColor={COLORS.apple}
              key={index.toString()}
            >
              <SkeletonPlaceholder.Item
                width={wp(95)}
                height={wp(30)}
                borderRadius={wp(1)}
                marginTop={hp(2)}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: wp(95),
                  alignItems: "center",
                }}
              >
                <SkeletonPlaceholder.Item
                  height={wp(18)}
                  width={wp(18)}
                  borderRadius={wp(18)}
                  marginTop={hp(1)}
                />
                <View style={{ marginStart: wp(2) }}>
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
            </SkeletonPlaceholder>
          );
        })}
      </SkeletonPlaceholder>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

export function VideoSkeleton() {
  return (
    <SkeletonPlaceholder
      backgroundColor={COLORS.brown}
      highlightColor={COLORS.apple}
    >
      <SkeletonPlaceholder.Item
        width={wp(95)}
        height={wp(30)}
        borderRadius={wp(1)}
        marginTop={hp(2)}
      />
      <View
        style={{
          flexDirection: "row",
          width: wp(95),
          alignItems: "center",
        }}
      >
        <SkeletonPlaceholder.Item
          height={wp(18)}
          width={wp(18)}
          borderRadius={wp(18)}
          marginTop={hp(1)}
        />
        <View style={{ marginStart: wp(2) }}>
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
    </SkeletonPlaceholder>
  );
}
