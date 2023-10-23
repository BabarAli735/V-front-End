import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { createThumbnail } from "react-native-create-thumbnail";

import { COLORS, FONTFAMILY, SCREENS, SIZES } from "../../constants/them";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../../common/responsivefunction";
import InputText from "../../componanats/InputText";
import Icon, { Icons } from "../../componanats/Icons";
import CustomButton from "../../componanats/CustomButton";
import CustomImagePicker from "../../componanats/UploadImageModal";
import CustomHeader from "../../componanats/CustomHeader";
import CustomBottomSheet from "../../componanats/CustomBottomSheet";
import AdsHandler from "./AdsHandler";
export default function UploadAdd(props) {
  const {
    packageData,
    openGenderSelection,
    selectedAd,
    addVideoData,
    uploadImageModal,
    setUploadImageModal,
    handleData,
    onPress,
    setAddVieoData,
    setSelectedAd,
    setOpenGenderSelection,
    updateAd,
  } = AdsHandler(props);

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "height" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: hp("3%"),
          }}
        >
          <CustomHeader showBackButton title="Buy Ads" />
          <View style={styles.inputContainer}>
            <InputText
              placeholder="Title"
              value={addVideoData.Title}
              onChangeText={(txt) => handleData({ Title: txt })}
              style={{}}
              hideLabel
            />
            <InputText
              placeholder="Description"
              value={addVideoData.description}
              onChangeText={(txt) => handleData({ description: txt })}
              style={{ height: hp(20), justifyContent: "flex-start" }}
              hideLabel
            />

            <InputText
              placeholder={addVideoData.selectedType}
              value=""
              style={{}}
              iconType={Icons.AntDesign}
              iconName="right"
              rightIcon
              onPress={() => {
                setOpenGenderSelection(true);
              }}
              hideLabel
            />

            <InputText
              placeholder="Url"
              value={addVideoData.url}
              onChangeText={(txt) => handleData({ url: txt })}
              style={{}}
              hideLabel
            />
            {addVideoData.selectedType !== "Select Ads Type" &&
              !props.route.params.item && (
                <>
                  <TouchableOpacity
                    style={[styles.uploadVideo]}
                    activeOpacity={1}
                    onPress={onPress}
                  >
                    {selectedAd !== null ? (
                      <>
                        {addVideoData.selectedType === "Video" ? (
                          <Video
                            // ref={video}
                            style={{ height: hp("30%"), width: "100%" }}
                            source={{
                              uri: selectedAd[0].uri
                                ? selectedAd[0].uri
                                : selectedAd,
                            }}
                            resizeMode={ResizeMode.COVER}
                            isLooping
                            useNativeControls
                            onPlaybackStatusUpdate={(status) => {}}
                          />
                        ) : (
                          <Image
                            style={{ height: hp("30%"), width: "100%" }}
                            source={{
                              uri: selectedAd[0].uri
                                ? selectedAd[0].uri
                                : selectedAd,
                            }}
                          />
                        )}
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={async () => {
                            setUploadImageModal(true);
                          }}
                          style={styles.crosButton}
                        >
                          <Icon
                            type={Icons.Entypo}
                            name={"cross"}
                            color={COLORS.white}
                            style={{}}
                          />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <Text style={[styles.txt1]}>
                        Tap here to upload the video
                      </Text>
                    )}
                  </TouchableOpacity>
                  <CustomButton
                    title={"Post"}
                    onPress={() => {
                      const body = {
                        title: addVideoData.Title,
                        description: addVideoData.description,
                        url: addVideoData.url,
                        type: selectedAd,
                      };
                      props.navigation.navigate(SCREENS.Payment, {
                        body,
                        id: props?.route?.params.id,
                        amount_range: props?.route.params?.amount_range,
                      });
                    }}
                    btnStyle={{ marginTop: hp("5%") }}
                  />
                </>
              )}
            {props.route.params.item && (
              <CustomButton
                title={"Update"}
                onPress={() => {
                  const data = {
                    id: props.route.params.item?._id,
                    body: {
                      title: addVideoData.Title,
                      description: addVideoData.description,
                      url: addVideoData.url,
                      type: selectedAd,
                    },
                  };
                  updateAd(data);
                }}
                btnStyle={{ marginTop: hp("5%") }}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomBottomSheet
        visible={openGenderSelection}
        setVisible={setOpenGenderSelection}
        options={{ type: "slide", from: "bottom" }}
        handleData={(res) => {
          handleData({ selectedType: res });
          setSelectedAd(null);
        }}
        title={"Select Film Relation"}
        Data={Genderdata}
      />
      <CustomImagePicker
        visible={uploadImageModal}
        setVisible={setUploadImageModal}
        options={{ type: "slide", from: "bottom" }}
        type={addVideoData.selectedType}
        handleImageData={(res) => {
          setSelectedAd(res.assets);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: SIZES.twenty,
  },
  txt: {
    fontSize: rf(2.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginTop: hp("2%"),
  },
  txt1: {
    fontSize: rf(1.6),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Regular,
    marginStart: wp("5%"),
  },
  uploadVideo: {
    marginTop: hp("3%"),
    height: hp("30%"),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.brown,
    borderRadius: wp("2%"),
    borderStyle: "dashed",
    overflow: "hidden",
  },
  inputContainer: {
    marginTop: hp("2%"),
  },
  crosButton: {
    position: "absolute",
    right: 10,
    top: 0,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: wp("1%"),
    borderRadius: wp("5%"),
  },
});

const Genderdata = [
  {
    id: 1,
    title: "Banner",
  },
  {
    id: 2,
    title: "Video",
  },
];
