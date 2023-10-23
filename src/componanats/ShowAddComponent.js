import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import useReduxStore from "../hook/UseReduxStore";
import { ResizeMode, Video } from "expo-av";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../common/responsivefunction";
export default function ShowAddComponent({
  randomObject,
  setShowAdd,
  videoRef,
  onLoadVideo,
}) {
  const { dispatch, getState } = useReduxStore();
  const { AllAds } = getState("ads");
  console.log("randomObject====", randomObject.current?._id);

  return (
    <>
      {randomObject.current?.type === "image" ? (
        <Image
          style={styles.image1}
          source={{ uri: randomObject.current?.media }}
        />
      ) : (
        <Video
          style={styles.image1}
          shouldPlay={true}
          source={{
            uri: randomObject.current?.media,
          }}
          resizeMode={ResizeMode.COVER}
          onLoad={onLoadVideo}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image1: {
    height: hp(32),
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
    position: "absolute",
  },
});
