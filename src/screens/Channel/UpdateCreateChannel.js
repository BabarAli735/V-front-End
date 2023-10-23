import React, { useState } from 'react'
import { View, Text ,StyleSheet,KeyboardAvoidingView,ScrollView,TouchableOpacity,Image} from 'react-native'
import {
    COLORS,
    FONTFAMILY,
    SCREENS,
    SIZES,
    STYLES,
    width,
  } from "../../constants/them";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

  import CirclImage from "../../componanats/CirclImage";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    responsiveFontSize as rf,
  } from "../../common/responsivefunction";
import UploadImageModal from "../../componanats/UploadImageModal";
import Icon, { Icons } from "../../componanats/Icons";
import InputText from "../../componanats/InputText";
import BackArrow from "../../componanats/BackArrow";
import CustomButton from "../../componanats/CustomButton";
import channelHandler from "./channelHandler";
const UpdateCreatChannel =(props)=> {
        const {
          channelData,
          channelInfo,
          coverImage,
          profileImage,
          isUpdateChannel,
          isUploadCover,
          isUploadProfile,
          ProfileData,
          showIndicator,
          setProfileImage,
          setCoverImage,
          setIsUpdateChannel,
          setIsUploadProfile,
          setIsuploadCover,
          createChannel,
          handleChange,
        } = channelHandler(props);

    return (
        <KeyboardAwareScrollView
        style={{ flex: 1,backgroundColor:COLORS.BLACK }}
      >
          <CreateChannelInfo
            userData={ProfileData}
            setIsUploadProfile={setIsUploadProfile}
            profileImage={profileImage}
            coverImage={coverImage}
            setIsuploadCover={setIsuploadCover}
            channelInfo={channelInfo}
            handleChange={handleChange}
            createChannel={createChannel}
            props={props}
            isUpdateChannel={isUpdateChannel}
            setIsUpdateChannel={setIsUpdateChannel}
            channelData={channelData}
            showIndicator={showIndicator}
          />
             <UploadImageModal
        visible={isUploadCover}
        setVisible={setIsuploadCover}
        handleImageData={(res, title) => {
          if (res.assets !== null) {
            setCoverImage(res.assets[0].uri);
          }
        }}
      />
      <UploadImageModal
        visible={isUploadProfile}
        setVisible={setIsUploadProfile}
        handleImageData={(res, title) => {
          if (res.assets !== null) {
            setProfileImage(res.assets[0].uri);
          }
        }}
      />
     
      </KeyboardAwareScrollView>
    )
}
const CreateChannelInfo = ({
    setIsuploadCover,
    handleChange,
    createChannel,
    isUpdateChannel,
    coverImage,
    profileImage,
    setIsUploadProfile,
    channelInfo,
    showIndicator,
    props
  }) => {
    return (
      <View style={{ backgroundColor: COLORS.BLACK }}>
        <Image
          style={styles.image}
          source={{
            uri: coverImage,
          }}
        />
        {props?.route.params.Updatedata && (
          <TouchableOpacity
            activeOpacity={props?.route.params.Updatedata ? 0.85 : 1}
            style={styles.cover}
            onPress={() => {
              if (props?.route.params.Updatedata) {
                setIsuploadCover(true);
              }
            }}
          >
            <Icon
              type={Icons.Ionicons}
              name={"camera-outline"}
              style={{
                color: COLORS.blackWithOpacity,
                fontSize: rf(8),
              }}
            />
          </TouchableOpacity>
        )}
        <BackArrow style={styles.backArrow} />
        <View>
          <CirclImage style={styles.CirclImage1} uri={profileImage} />
          {props?.route.params.Updatedata && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.editbtn}
              onPress={() => {
                setIsUploadProfile(true);
              }}
            >
              <Icon
                type={Icons.Ionicons}
                name={"camera-outline"}
                style={{
                  color: COLORS.white,
                  fontSize: rf(2.6),
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputContainer}>
          <InputText
            placeholder="Enter Channel Name"
            value={channelInfo?.channelName}
            onChangeText={(value) => {
              handleChange({ channelName: value });
            }}
          />
          
            <InputText
              placeholder="Enter subscription fee "
              value={channelInfo?.subcriptionFee}
              onChangeText={(value) => {
                handleChange({ subcriptionFee: value });
              }}
            />
          
          <InputText
            placeholder="Enter Channel Description"
            style={{ height: hp(15), justifyContent: "flex-start" }}
            value={channelInfo?.channelDescription}
            multiline
            onChangeText={(value) => {
              handleChange({ channelDescription: value });
            }}
          />
          <CustomButton
            title={props?.route.params.Updatedata ? "Update Channel" : "Create Channel"}
            onPress={createChannel}
            showIndicator={showIndicator}
          />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: wp(2),
      marginTop: hp(1.2),
    },
    txt: {
      fontSize: rf(2),
      color: COLORS.white,
      fontFamily: FONTFAMILY.Bold,
      textAlign: "center",
    },

    image: {
        height: hp(20),
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderBottomLeftRadius: wp(3),
        borderBottomRightRadius: wp(3),
        alignSelf: "center",
      },
      cover: {
        height: hp(20),
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        borderBottomLeftRadius: wp(3),
        borderBottomRightRadius: wp(3),
        backgroundColor: COLORS.whiteOpacity,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      },
      CirclImage1: {
        height: wp(23),
        width: wp(23),
        borderRadius: wp(23),
        borderWidth: 2,
        borderColor: COLORS.BLACK,
        alignSelf: "center",
        bottom: hp(5),
      },
    
    uploadContainer: {
      width: wp(99),
      backgroundColor: COLORS.primary,
      height: hp(20),
      alignItems: "center",
    },
    backArrow: { position: "absolute" },
    editbtn: {
      color: COLORS.primary,
      fontSize: rf(3),
      position: "absolute",
      alignSelf: "center",
      right: wp(40),
      backgroundColor: COLORS.primary,
      padding: wp(0.5),
      borderRadius: wp(5),
      borderWidth: 1,
      borderColor: COLORS.white,
      top: 20,
    },
    inputContainer: {
      paddingHorizontal: wp(2),
    },
 
    
    conversation: { color: "white", fontSize: 16, fontWeight: "bold" },
 
    contactIcon: {
      height: 60,
      width: 60,
      borderRadius: 999,
    },
    contactName: {
      marginLeft: 15,
      fontSize: 16,
      color: "white",
    },
 
   
    txt2: {
      fontSize: rf(2.5),
      color: COLORS.white,
      fontFamily: FONTFAMILY.Bold,
    },
  });
export default UpdateCreatChannel