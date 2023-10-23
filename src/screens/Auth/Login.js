import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import React, { useState } from "react";
import BackgroundComponant from "../../componanats/BackgroundComponant";
import InputText from "../../componanats/InputText";
import Icon, { Icons } from "../../componanats/Icons";
import {
  COLORS,
  FONTFAMILY,
  IMAGES,
  SCREENS,
  SIZES,
  height,
} from "../../constants/them";
import CustomButton from "../../componanats/CustomButton";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../../common/responsivefunction";
import AuthHandler from "./AuthHandler";
import ModalDropdown from "react-native-modal-dropdown";

export default function Login(props) {
  const {
    isRemember,
    email,
    password,
    setpassword,
    setemail,
    setisRemember,
    loginHandler,
  } = AuthHandler(props);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };


  return (
    <TouchableWithoutFeedback style={{flex:1}} onPress={dismissKeyboard}>
      <BackgroundComponant style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
      >
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.card}>
              <Image style={styles.image} source={IMAGES.logo} />
              <Text style={styles.title}>Login</Text>
              <InputText
                placeholder="Email"
                iconName="email"
                iconType={Icons.MaterialIcons}
                hasIcon
                hideLabel
                value={email}
                onChangeText={setemail}
              />
              <InputText
                placeholder="Password"
                password
                iconName="lock"
                iconType={Icons.FontAwesome}
                hasIcon
                hideLabel
                value={password}
                onChangeText={setpassword}
              />
              <View style={styles.rememberContainer}>
                <TouchableOpacity
                  style={styles.remember}
                  onPress={() => {
                    setisRemember(!isRemember);
                  }}
                >
                  <Icon
                    type={Icons.Ionicons}
                    name={isRemember ? "checkbox-outline" : "square-outline"}
                    style={{
                      color: isRemember ? COLORS.primary : COLORS.brownGrey,
                      fontSize: rf(3),
                    }}
                  />
                  <Text
                    onPress={() => {}}
                    style={{
                      color: COLORS.white,
                      marginStart: wp(2),
                    }}
                  >
                    Remember
                  </Text>
                </TouchableOpacity>

                <Text
                  onPress={() => {
                    props.navigation.navigate(SCREENS.ForgetPassword);
                  }}
                  style={{ alignSelf: "flex-end", color: COLORS.white }}
                >
                  {" "}
                  Forgot password
                </Text>
              </View>
              <CustomButton title="Login" onPress={loginHandler} />
              <View style={styles.txt1}>
                <Text style={[{ color: COLORS.white }]}>
                  don’t have an account?{" "}
                </Text>
                <Text
                  style={[{ color: COLORS.primary }]}
                  onPress={() => {
                    props.navigation.navigate(SCREENS.SignUp);
                  }}
                >
                  Sign Up
                </Text>
              </View>
            </View>
          </ScrollView>
      </KeyboardAwareScrollView>
        </BackgroundComponant>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  card: {
    // flex: 0.9,
    height: height * 0.8,
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.twenty,
  },
  title: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: "center",
    fontFamily: FONTFAMILY.Medium,
    marginTop: SIZES.twentyFive * 2,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.grey,
    width: SIZES.fifty,
  },
  txt: {
    fontFamily: FONTFAMILY.Medium,
    color: COLORS.grey,
    marginHorizontal: SIZES.ten,
  },
  txt1: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp(2),
  },
  image: {
    height: hp(15),
    width: wp(60),
    alignSelf: "center",
    marginTop: hp(1.5),
  },
  remember: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  rememberContainer: {
    marginTop: hp(2.5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropDownContainer: {
    height: hp("6%"),
    alignItems: "center",
    // paddingHorizontal: wp('2%'),
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginTop: hp("2%"),
    flexDirection: "row",
    borderRadius: wp("2%"),
  },
});

const data = {
  status: true,
  message: "Data Fetch Successfully",
  data: [
    {
      id: 1,
      title: "Brand",
      status: true,
      type: "dropdown",
      name: "brand",
      placeHolder: "Brand",
      required: null,
      values: [
        {
          id: 2,
          name: "Hyundai",
          status: true,
          createdAt: "2023-06-07T11:02:23.946531",
          createdBy: null,
          updatedAt: null,
          updatedBy: null,
          options: [],
        },
        {
          id: 1,
          name: "Maruti",
          status: true,
          createdAt: "2023-06-07T11:02:23.946531",
          createdBy: null,
          updatedAt: null,
          updatedBy: null,
          options: [
            {
              id: 7,
              name: "swift",
              status: true,
              createdAt: null,
              createdBy: null,
              updatedAt: null,
              updatedBy: null,
              options: [],
            },
            {
              id: 6,
              name: "alto",
              status: true,
              createdAt: null,
              createdBy: null,
              updatedAt: null,
              updatedBy: null,
              options: [],
            },
            {
              id: 5,
              name: "WagonR",
              status: true,
              createdAt: null,
              createdBy: null,
              updatedAt: null,
              updatedBy: null,
              options: [],
            },
            {
              id: 8,
              name: "800",
              status: true,
              createdAt: null,
              createdBy: null,
              updatedAt: null,
              updatedBy: null,
              options: [],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Model",
      status: true,
      type: "dropdown",
      name: "model",
      placeHolder: "Model",
      required: null,
      values: [],
    },
    {
      id: 3,
      title: "Year",
      status: true,
      type: "dropdown",
      name: "year",
      placeHolder: "Year",
      required: null,
      values: [
        {
          id: 27,
          name: "2012",
          status: true,
          createdAt: "2023-06-07T16:44:55.597578",
          createdBy: null,
          updatedAt: null,
          updatedBy: null,
          options: [],
        },
        {
          id: 28,
          name: "2013",
          status: true,
          createdAt: "2023-06-07T16:44:55.597578",
          createdBy: null,
          updatedAt: null,
          updatedBy: null,
          options: [],
        },
      ],
    },
    {
      id: 5,
      title: "Number of owner",
      status: true,
      type: "radiobutton",
      name: "noofowner",
      placeHolder: "Number of owner",
      required: null,
      values: [
        {
          id: 33,
          name: "3rd",
          status: true,
          createdAt: "2023-06-08T12:39:28.462588",
          createdBy: null,
          updatedAt: null,
          updatedBy: null,
          options: [],
        },
        {
          id: 31,
          name: "4th",
          status: true,
          createdAt: "2023-06-08T12:39:28.462588",
          createdBy: null,
          updatedAt: null,
          updatedBy: null,
          options: [],
        },
        {
          id: 34,
          name: "2nd",
          status: true,
          createdAt: "2023-06-08T12:39:28.462588",
          createdBy: null,
          updatedAt: null,
          updatedBy: null,
          options: [],
        },
        {
          id: 32,
          name: "1st",
          status: true,
          createdAt: "2023-06-08T12:39:28.462588",
          createdBy: null,
          updatedAt: null,
          updatedBy: null,
          options: [],
        },
      ],
    },
    {
      id: 6,
      title: "Km driven",
      status: true,
      type: "text",
      name: "kmdriven",
      placeHolder: "Km Driven",
      required: null,
      values: [],
    },
  ],
};
