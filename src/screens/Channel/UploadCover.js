import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import { COLORS, FONTFAMILY, SCREENS } from "../../constants/them";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import utils from "../../utils";
import UploadImageModal from "../../componanats/UploadImageModal";
import BackArrow from "../../componanats/BackArrow";
import Icon, { Icons } from "../../componanats/Icons";
import CustomButton from "../../componanats/CustomButton";
import channelHandler from "./channelHandler";
export default function UploadCover(props) {
  const {
    isUploadCover,
    coverImage,
    channelData,
    ProfileData,
    setIsuploadCover,
    setCoverImage,
  } = channelHandler(props);
  useEffect(() => {
    if (ProfileData?.channel !== null) {
      setCoverImage(channelData.banner);
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
        <View style={{ padding: wp(1.5) }}>
          <BackArrow />
        </View>
        <TouchableOpacity
          style={{}}
          activeOpacity={0.8}
          onPress={() => {
            setIsuploadCover(true);
          }}
        >
          <Image
            source={{ uri: coverImage }}
            style={styles.cameraContainer}
            resizeMode="cover"
          />
          <View style={styles.iconContainer}>
            <Icon
              name={"camera"}
              type={Icons.Ionicons}
              color={COLORS.white}
              size={rf(5)}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[styles.txt, { fontSize: rf(3) }]}>
          Upload Cover Image
        </Text>
        <Text style={styles.txt}>
          Customized your profile by uploading cover image
        </Text>
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          paddingHorizontal: wp(2),
        }}
      >
        <CustomButton
          title="Next"
          onPress={() => {
            if (coverImage === "") {
              utils.warningAlert("Please Select Cover Image");
              return;
            }

            if (props?.route?.params?.from==='signUp') {
              props.navigation.navigate(SCREENS.UpdateCreatChannel, {
                image: props.route.params.image,
                cover: coverImage,
                accessToken: props?.route?.params?.accessToken,
                from: "signUp",
              });
            } else {
              props.navigation.navigate(SCREENS.UpdateCreatChannel, {
                image: props.route.params.image,
                cover: coverImage,
                from: "owner",
              });
            }
          }}
        />
      </View>
      <UploadImageModal
        visible={isUploadCover}
        setVisible={setIsuploadCover}
        handleImageData={(res, title) => {
          if (res.assets !== null) {
            setCoverImage(res.assets[0].uri);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  cameraContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: hp(30),
    width: wp(70),
    alignSelf: "center",
    borderRadius: wp(2),
    overflow: "hidden",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: hp(10),
    width: wp(20),
    alignSelf: "center",
    backgroundColor: COLORS.transparent,
    borderRadius: wp(2),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.white,
    marginTop: hp(10),
    position: "absolute",
  },
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    alignSelf: "center",
    fontFamily: FONTFAMILY.Medium,
    width: wp(70),
    textAlign: "center",
    marginTop: hp("3%"),
  },
});
