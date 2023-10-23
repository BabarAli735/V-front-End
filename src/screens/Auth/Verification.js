import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import React, { useEffect } from "react";
import BackgroundComponant from "../../componanats/BackgroundComponant";
import InputText from "../../componanats/InputText";
import Icon, { Icons } from "../../componanats/Icons";
import {
  COLORS,
  FONTFAMILY,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  height,
} from "../../constants/them";
import CustomButton from "../../componanats/CustomButton";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../../common/responsivefunction";
import BackArrow from "../../componanats/BackArrow";
import { KeyboardAvoidingView } from "react-native";
import authHandler from "./AuthHandler";
import { saveAccessToken, saveUserData } from "../../redux/slices";

export default function Verification(props) {
  const { code, setCode, otpverify, resendOtpVarification } = authHandler(props);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
 
  return (
    <TouchableWithoutFeedback style={{}} onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BackgroundComponant>
          <BackArrow />
          <ScrollView style={styles.card}>
            <Image style={styles.image} source={IMAGES.logo} />

            <Text style={styles.title}>Verification Code</Text>
            <Text style={styles.txt}>
              An email has been sent to you with verification code Please Enter
              it here
            </Text>
            <InputText
              placeholder="Enter Verification Code"
              iconName="email"
              value={code}
              onChangeText={(txt)=>setCode(txt.replace(/[^0-9]/g, ''))}
              keyboardType='number-pad'
              maxLength={6}
              iconType={Icons.MaterialIcons}
              hasIcon
              hideLabel={"Verification Code*"}
            />
            <Text
              style={[
                {
                  color: COLORS.primary,
                  textDecorationLine: "underline",
                  alignSelf: "flex-end",
                  marginTop: hp(2),
                  fontFamily: FONTFAMILY.Medium,
                },
              ]}
              onPress={resendOtpVarification}
            >
              ResendCode
            </Text>
            <CustomButton title="Continue" onPress={otpverify} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                marginTop: hp(2),
              }}
            >
              <Text
                style={[
                  { color: COLORS.white, textDecorationLine: "underline" },
                ]}
                onPress={() => {
                  props.navigation.navigate(SCREENS.Login);
                }}
              >
                Back To Login
              </Text>
            </View>
          </ScrollView>
        </BackgroundComponant>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    // flex: 0.9,
    height: height * 0.8,
    paddingHorizontal: SIZES.fifteen,
    paddingVertical: SIZES.twenty,
  },
  title: {
    fontSize: rf(3),
    color: COLORS.white,
    alignSelf: "center",
    fontFamily: FONTFAMILY.Bold,
    marginTop: SIZES.twentyFive * 2,
  },
  txt: {
    fontFamily: FONTFAMILY.Light,
    color: COLORS.grey,
    fontSize: rf(1.8),
    textAlign: "center",
    marginVertical: hp(2),
  },
  image: {
    height: hp(20),
    width: wp(70),
    alignSelf: "center",
    marginTop: hp(1.5),
  },
});
