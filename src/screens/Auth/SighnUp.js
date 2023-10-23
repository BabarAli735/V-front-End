import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useRef } from "react";
import BackgroundComponant from "../../componanats/BackgroundComponant";
import InputText from "../../componanats/InputText";
import Icon, { Icons } from "../../componanats/Icons";
import { COLORS, FONTFAMILY, SCREENS, SIZES } from "../../constants/them";
import CustomButton from "../../componanats/CustomButton";
import { heightPercentageToDP as hp } from "../../common/responsivefunction";
import BackArrow from "../../componanats/BackArrow";
import authHandler from "./AuthHandler";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SighnUp(props) {
  const {
    email,
    password,
    name,
    repassword,
    phone,
    lastname,
    countryCode,
    showcountryPicker,
    onSelect,
    setLastname,
    signUpHnadler,
    setphone,
    setrepassword,
    setname,
    setpassword,
    setemail,
  } = authHandler(props);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const ref=useRef()
  return (
    <TouchableWithoutFeedback style={{flex:1}} onPress={dismissKeyboard}>
      {/* <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
        <BackgroundComponant style={styles.container}>
          <BackArrow />

          <KeyboardAwareScrollView 
          bounces={false}
          viewIsInsideTabBar={false}
          >
            <View style={styles.card}>
              <Text style={styles.title}>Create Account</Text>
              <InputText
                placeholder="Enter First name "
                iconName="user"
                iconType={Icons.AntDesign}
                hasIcon
                hideLabel={"First name *"}
                value={name}
                onChangeText={setname}
              />
              <InputText
                placeholder="Enter Last name "
                iconName="user"
                iconType={Icons.AntDesign}
                hasIcon
                hideLabel={"Last name *"}
                value={lastname}
                onChangeText={setLastname}
              />
              <InputText
                placeholder="Enter Email Address"
                iconName="email"
                iconType={Icons.MaterialIcons}
                hasIcon
                hideLabel={"Email Address*"}
                value={email}
                onChangeText={setemail}
              />
              <InputText
                placeholder="Enter Phone Number"
                iconName="phone"
                iconType={Icons.AntDesign}
                hasIcon
                hideLabel={"Phone Number*"}
                value={phone}
                onChangeText={(txt)=>setphone(txt.replace(/[^0-9]/g, ''))}
                hasCountryPicker
                showcountryPicker={showcountryPicker}
                onSelect={onSelect}
                countryCode={countryCode}
                keyboardType='number-pad'
                
              />

              <InputText
                placeholder="Enter Password"
                password
                iconName="lock"
                iconType={Icons.FontAwesome}
                hasIcon
                hideLabel={"Password*"}
                value={password}
                onChangeText={setpassword}
              />
              <InputText
                placeholder="Enter Confirm Password"
                password
                iconName="lock"
                iconType={Icons.FontAwesome}
                hasIcon
                hideLabel={"Confirm Password*"}
                value={repassword}
                onChangeText={setrepassword}
              />

              <CustomButton title="Create Account" onPress={signUpHnadler} />
              <View style={styles.accountConatiner}>
                <Text style={[{ color: COLORS.white }]}>
                  Already Have an Account ?{" "}
                </Text>
                <Text
                  style={[{ color: COLORS.primary }]}
                  onPress={() => {
                    props.navigation.navigate(SCREENS.Login);
                  }}
                >
                  Login
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </BackgroundComponant>
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    // flex: 0.9,
    paddingHorizontal: SIZES.fifteen,
    justifyContent: "center",
    justifyContent: "space-between",
    // paddingVertical: SIZES.twenty,
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
  accountConatiner: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: hp("2%"),
  },
});
