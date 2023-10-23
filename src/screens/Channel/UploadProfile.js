import { StyleSheet, Image, View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTFAMILY, IMAGES, SCREENS } from "../../constants/them";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import utils from "../../utils";
import UploadImageModal from "../../componanats/UploadImageModal";
import CustomHeader from "../../componanats/CustomHeader";
import CustomButton from "../../componanats/CustomButton";
import Icon, { Icons } from "../../componanats/Icons";
import channelHandler from "./channelHandler";

export default function UploadProfile(props) {
  const {
    isUploadProfile,
    profileImage,
    channelData,
    userData,
    ProfileData,
    setProfileImage,
    setIsUploadProfile,
  } = channelHandler(props);

  useEffect(() => {
    if (ProfileData?.channel !== null) {
      setProfileImage(channelData?.channelLogo);
    }
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader title="Upload your Channel Profile" showBackButton />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          style={{}}
          activeOpacity={0.8}
          onPress={() => {
            setIsUploadProfile(true);
          }}
        >
          {profileImage === "" ? (
            <View style={styles.iconContainer}>
              <Icon
                name={"camera"}
                type={Icons.Ionicons}
                color={COLORS.white}
                size={rf(5)}
              />
            </View>
          ) : (
            <Image
              source={{ uri: profileImage }}
              style={styles.cameraContainer}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.5, justifyContent: "center" }}>
        <Text style={styles.txt}>
          Take a photo for your channel profile or choose from the camera roll
        </Text>
        <Text style={styles.txt}>You can retake by tapping camera Icon</Text>
      </View>
      <View style={{ flex: 0.5, justifyContent: "center" }}>
        <CustomButton
          title="Next"
          onPress={() => {
            if (profileImage === "") {
              utils.warningAlert("Please Select Profile Image");
              return;
            }
            if (props?.route?.params?.from==='signUp') {
              props.navigation.navigate(SCREENS.UploadCover, {
                image: profileImage,
                accessToken: props?.route?.params?.accessToken,
                from:'signUp'
              });
            } else {
              props.navigation.navigate(SCREENS.UploadCover, {
                image: profileImage,
                from:'owner'
              });
            }
          }}
        />
      </View>
      <UploadImageModal
        visible={isUploadProfile}
        setVisible={setIsUploadProfile}
        handleImageData={(res, title) => {
          if (res.assets !== null) {
            setProfileImage(res.assets[0].uri);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(2),
    backgroundColor: COLORS.BLACK,
  },

  txt: {
    fontSize: rf(2),
    color: COLORS.white,
    alignSelf: "center",
    fontFamily: FONTFAMILY.Medium,
    width: wp(70),
    textAlign: "center",
    marginTop: hp("3%"),
  },
  cameraContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: hp(35),
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
    backgroundColor: COLORS.primary,
    borderRadius: wp(2),
    overflow: "hidden",
  },
});
