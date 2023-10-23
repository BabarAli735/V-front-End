import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import React from "react";
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
import BackArrow from "../../componanats/BackArrow";
import authHandler from "./AuthHandler";

export default function ForgetPassword(props) {
  const {
    email,
    setemail,
    forgetPasswaordHnadler
  } = authHandler(props);
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

            <Text style={styles.title}>Password Recovery</Text>
            <Text style={styles.txt}>
              Enter your email address to receive a verification code
            </Text>
            <InputText
              placeholder="Enter Email Address"
              iconName="email"
              iconType={Icons.MaterialIcons}
              hasIcon
              hideLabel={"Email Address*"}
              value={email}
              onChangeText={setemail}
            />

            <CustomButton
              title="Continue"
              onPress={forgetPasswaordHnadler}
            />
            <View style={styles.bacKTologin}>
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
    fontFamily: FONTFAMILY.Medium,
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
  bacKTologin: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp(2),
  },
});
