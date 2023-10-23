import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import React, { useEffect, useState } from "react";
import { COLORS, SCREENS } from "../../constants/them";
import CustomHeader from "../../componanats/CustomHeader";
import InputText from "../../componanats/InputText";
import {
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
  heightPercentageToDP as hp,
} from "../../common/responsivefunction";
import CirclImage from "../../componanats/CirclImage";
import Icon, { Icons } from "../../componanats/Icons";
import UploadImageModal from "../../componanats/UploadImageModal";
import CustomButton from "../../componanats/CustomButton";
import ProfileHandler from "./ProfileHandler";
import BottomModal from "../../componanats/BottomModal";
import { saveAccessToken, saveUserData } from "../../redux/slices";
import { CommonActions } from "@react-navigation/native";
import { BackHandler } from "react-native";

export default function EditProfile(props) {
  const {
    ProfileData,
    email,
    name,
    phone,
    image,
    lname,
    uploadModal,
    showCreateChannelModal,
    dispatch,
    setShowCreateChannelModal,
    updateProfile,
    setLname,
    setimage,
    setUploadImageModal,
    setphone,
    setname,
    setemail,
  } = ProfileHandler(props);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", async () => {
      if (props?.route?.params?.from === "signUp") {
        await dispatch(saveAccessToken(props?.route?.params.accessToken));
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: SCREENS.DrawerNavigator,
              },
            ],
          })
        );
      } else {
        props.navigation.goBack();
      }
    });
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", async () => {
        if (props?.route?.params?.from === "signUp") {
          await dispatch(saveAccessToken(props?.route?.params.accessToken));
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: SCREENS.DrawerNavigator,
                },
              ],
            })
          );
        } else {
          props.navigation.goBack();
        }
      });
    };
  }, []);
  return (
    // <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':'height'}>
    <KeyboardAwareScrollView style={styles.container} 
    contentContainerStyle={{paddingBottom:hp(5)}}
    >
      <StatusBar translucent={false} backgroundColor={COLORS.BLACK} />
      <CustomHeader
        title="Edit Profile"
        showBackButton
        onBackPress={async () => {
          if (props?.route?.params?.from === "signUp") {
            await dispatch(saveAccessToken(props?.route?.params.accessToken));
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: SCREENS.DrawerNavigator,
                  },
                ],
              })
            );
          } else {
            props.navigation.goBack();
          }
        }}
      />
      <CirclImage style={styles.CirclImage} uri={image?.uri} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.editbtn}
        onPress={() => {
          setUploadImageModal(true);
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
      <View style={{ marginTop: hp(2) }}>
        <InputText
          placeholder={"Enter First Name"}
          value={name}
          onChangeText={setname}
          iconName="user"
          iconType={Icons.AntDesign}
          hasIcon
          hideLabel={"First name *"}
        />
        <InputText
          placeholder={"Enter Last Name"}
          value={lname}
          onChangeText={setLname}
          iconName="user"
          iconType={Icons.AntDesign}
          hasIcon
          hideLabel={"Last name *"}
        />
        <InputText
          placeholder="Enter Email"
          value={email}
          onChangeText={setemail}
          iconName="email"
          iconType={Icons.MaterialIcons}
          hasIcon
          hideLabel={"Email Address*"}
          disableInput
        />
        <InputText
          placeholder="Enter Phone Number"
          value={phone}
          onChangeText={setphone}
          iconName="phone"
          iconType={Icons.AntDesign}
          hasIcon
          hideLabel={"Phone Number*"}
        />
        <CustomButton
          title="Save Changes"
          btnStyle={{ marginHorizontal: wp(8), marginTop: hp(4) }}
          onPress={updateProfile}
        />
      </View>
      <UploadImageModal
        visible={uploadModal}
        setVisible={setUploadImageModal}
        options={{ type: "slide", from: "bottom" }}
        handleImageData={(res, title) => {
          if (res.assets !== null) {
            setimage(res.assets[0]);
          }
        }}
      />
      <BottomModal
        visible={showCreateChannelModal}
        setvisible={setShowCreateChannelModal}
        iconType={Icons.AntDesign}
        iconName={"questioncircleo"}
        icoColor={COLORS.primary}
        yesno
        onSuccess={() => {
          
          props.navigation.navigate(SCREENS.UploadProfile, {
            accessToken: props?.route?.params.accessToken,
            from: "signUp",
          });
        }}
        onFailure={async () => {
          await dispatch(saveAccessToken(props?.route?.params.accessToken));
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: SCREENS.DrawerNavigator,
                },
              ],
            })
          );
        }}
        text={
          "You need to create channel to upload content \n Do you want to proceed ?"
        }
        textStyle={{ textAlign: "center" }}
      />
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(3),
  },
  editbtn: {
    color: COLORS.primary,
    fontSize: rf(3),
    position: "absolute",
    alignSelf: "center",
    right: wp(40),
    top: hp(14),
    backgroundColor: COLORS.primary,
    padding: wp(0.5),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  CirclImage: {
    height: wp(23),
    width: wp(23),
    borderRadius: wp(23),
    borderRadius: wp(23),
    borderWidth: 2,
    borderColor: COLORS.BLACK,
    alignSelf: "center",
  },
});
