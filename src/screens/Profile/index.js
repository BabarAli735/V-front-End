import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, SCREENS, STYLES } from "../../constants/them";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import CirclImage from "../../componanats/CirclImage";
import Icon, { Icons } from "../../componanats/Icons";
import BackArrow from "../../componanats/BackArrow";
import InputText from "../../componanats/InputText";
import ProfileHandler from "./ProfileHandler";
export default function Profile(props) {
  const { ProfileData} = ProfileHandler(props);
  return (
    <View style={styles.container}>
      <BackArrow style={{}} />
      <View style={styles.imageContainer}>
        <CirclImage
          style={{
            height: wp(23),
            width: wp(23),
            borderRadius: wp(23),
            borderRadius: wp(23),
            borderWidth: 2,
            borderColor: COLORS.BLACK,
          }}
          uri={ProfileData?.avatar}
        />

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center",
            width: wp(7),
            height: wp(7),
            borderRadius: wp(7),
            bottom: wp(10),
            left: 30,
          }}
          onPress={() => {
            props.navigation.navigate(SCREENS.EditProfile);
          }}
        >
          <Icon
            type={Icons.AntDesign}
            name={"edit"}
            style={{
              color: COLORS.white,
              fontSize: rf(2),
            }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.card}>
          <InputText
            placeholder={ProfileData?.firstName}
            iconName="user"
            iconType={Icons.AntDesign}
            hasIcon
            hideLabel={"First name *"}
            disableInput
          />
          <InputText
            placeholder={ProfileData?.lastName}
            iconName="user"
            iconType={Icons.AntDesign}
            hasIcon
            hideLabel={"Last name *"}
            disableInput
          />
          <InputText
          placeholder={ProfileData?.email}
            iconName="email"
            iconType={Icons.MaterialIcons}
            hasIcon
            hideLabel={"Email Address*"}
            disableInput
          />
          <InputText
          placeholder={ProfileData?.phoneNumber}
            iconName="phone"
            iconType={Icons.AntDesign}
            hasIcon
            hideLabel={"Phone Number*"}
            disableInput
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(2),
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: hp(20),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
  image1: {
    height: hp(10),
    width: wp(22),
    marginRight: wp(2),
    marginTop: hp(1),
    borderRadius: wp(2),
  },
  txt: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginTop: hp(1.5),
  },
  txt1: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    marginStart: wp(2),
  },
});
