import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableWithoutFeedback,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
  } from "react-native";
  import React, { useState } from "react";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  import BottomModal from "../../componanats/BottomModal";
  import BackArrow from "../../componanats/BackArrow";
  import authHandler from "./AuthHandler";
  
  export default function ChangePassword(props) {
    const {
     password,
     newpassword,
     setpassword,
     setnewpassword,
     resetPasswordHnadler
    } = authHandler(props);
    const [isVisible, setvisible] = useState(false);
    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };
    return (
      <TouchableWithoutFeedback style={{}} onPress={dismissKeyboard}>
        <BackgroundComponant>
          <KeyboardAwareScrollView style={{ flex: 1 }}
          contentContainerStyle={{paddingBottom:hp(5)}}
          >
            <BackArrow />
            <View style={styles.card}>
              <Image style={styles.image} source={IMAGES.logo} />
  
              <Text style={styles.title}>Change Password</Text>
  
              <InputText
                placeholder="Enter old Password"
                password
                iconName="lock"
                iconType={Icons.FontAwesome}
                hasIcon
                hideLabel={"New Password*"}
                value={password}
                onChangeText={setpassword}
              />
              <InputText
                placeholder="Enter New Password"
                password
                iconName="lock"
                iconType={Icons.FontAwesome}
                hasIcon
                hideLabel={"New Password*"}
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
                value={newpassword}
                onChangeText={setnewpassword}
              />
            
              <CustomButton
                title="Submit"
                onPress={() => {
                    props.navigation.goBack()
                }}
              />
           
            </View>
            <BottomModal
              visible={isVisible}
              setvisible={setvisible}
              iconType={Icons.AntDesign}
              iconName={"checkcircleo"}
              icoColor={COLORS.green}
              text={"Your password has been reset. Please login to continue"}
              onSuccess={() => {
                props.navigation.navigate(SCREENS.Login);
              }}
            />
          </KeyboardAwareScrollView>
        </BackgroundComponant>
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
    txt2: {
      color: COLORS.primary,
      textDecorationLine: "underline",
      alignSelf: "flex-end",
      marginTop: hp(2),
      fontFamily: FONTFAMILY.Medium,
    },
    accontContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      marginTop: hp(2),
    },
  });
  