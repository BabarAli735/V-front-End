import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "../../componanats/CustomHeader";
import VideoHandler from "./VideoHandler";
import HomeList from "../../componanats/HomeList";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import { COLORS } from "../../constants/them";
import VideosListSkeleton from "../../componanats/skeleton/VideosListSkeleton";
export default function RecentVideos(props) {
  const { recentVideos, isVisible, VideosDurations } = VideoHandler(props);

  if (isVisible) {
    return (
      <View
        style={{ flex: 1, backgroundColor: COLORS.BLACK, alignItems: "center" }}
      >
        <VideosListSkeleton />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CustomHeader title="Recent Videos" showBackButton />

      <View style={{ paddingHorizontal: wp(2) }}>
      </View>

      <HomeList
        data={recentVideos}
        isEnd={true}
        videosDuration={VideosDurations}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(2),
  },
});
