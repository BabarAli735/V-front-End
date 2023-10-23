import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import HeaderComponant from "../../componanats/HeaderComponant";
import { COLORS } from "../../constants/them";
import CategoryList from "../../componanats/CategoryList";
import HomeList from "../../componanats/HomeList";
import HomeHandler from "./HomeHandler";
import { widthPercentageToDP as wp } from "../../common/responsivefunction";
import VideosListSkeleton from "../../componanats/skeleton/VideosListSkeleton";

export default function Home(props) {
  const {
    AllVideos,
    isVisible,
    selected,
    AllCategory,
    isEnd,
    ProfileData,
    isRefresing,
    VideosDurations,
    NotificationData,
    onRefresh,
    loadeMore,
    setSelected,
  } = HomeHandler(props);
  const videoIndex = useRef(0);

  return (
    <View style={styles.container}>
      {isVisible ? (
        <View style={{ alignItems: "center" }}>
          <VideosListSkeleton />
        </View>
      ) : (
        <View style={styles.homeListCntaner}>
          <HeaderComponant
            ProfileData={ProfileData}
            NotificationData={NotificationData}
          />
          <CategoryList
            selected={selected}
            onSelect={(item) => {
              setSelected(item);
            
            }}
            data={AllCategory}
          />
   
          <HomeList
            data={AllVideos}
            loadeMore={loadeMore}
            isEnd={isEnd}
            onRefresh={onRefresh}
            isLoading={isRefresing}
            videosDuration={VideosDurations}
            videoIndex={videoIndex}
          />
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
 
  homeListCntaner: {
    flex: 1,
    paddingHorizontal: wp(2),
  },
});
