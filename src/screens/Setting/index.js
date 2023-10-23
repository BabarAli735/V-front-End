import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  SCREENS,
  STYLES,
} from "../../constants/them";
import { Switch } from "react-native";
import Icon, { Icons } from "../../componanats/Icons";
import CustomHeader from "../../componanats/CustomHeader";
import BottomModal from "../../componanats/BottomModal";
import SettingHandler from "./SettingHandler";
export default function Settings(props) {
  const {
    isVisible,
    successModal,
    isEnabled,
    deleteAccount,
    togglePusNotification,
    setIsEnabled,
    setSuccesModal,
    setIsVisible,
  } = SettingHandler(props);

  return (
    <View style={styles.container}>
      <CustomHeader showBackButton title="Settings" />
      <View style={styles.settingContainer}>
        <Text style={[styles.txt1]}>Account Settings</Text>
        <View style={styles.optionContainer}>
          <AccountItem
            title={"Delete Account"}
            onPress={() => {
              setIsVisible(true);
            }}
          />
          <AccountItem
            title={"Privacy Policies"}
            onPress={() => {
              props.navigation.navigate(SCREENS.WebView, {
                url: `${CONSTANTS.API_URLS.BASE_URL}static/privacy-policy.html`,
              });
            }}
          />
          <AccountItem
            title={"About us"}
            onPress={() => {
              props.navigation.navigate(SCREENS.WebView, {
                url: `${CONSTANTS.API_URLS.BASE_URL}static/about-us.html`,
              });
            }}
          />
          <AccountItem
            title={"ChangePassword"}
            onPress={() => {
              props.navigation.navigate(SCREENS.ChangePassword);
            }}
          />
        </View>
        <Text style={[styles.txt1, { marginTop: hp("3%") }]}>
          Notifications
        </Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={[STYLES.row, { justifyContent: "space-between" }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.txt]}>Push Notification</Text>
            <Switch
              trackColor={{ false: "#767577", true: COLORS.brown }}
              thumbColor={isEnabled ? COLORS.primary : COLORS.brown}
              ios_backgroundColor="#3e3e3e"
              style={{ height: hp("3%") }}
              onValueChange={togglePusNotification}
              value={isEnabled}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomModal
        visible={isVisible}
        setvisible={setIsVisible}
        iconType={Icons.AntDesign}
        iconName={"questioncircleo"}
        text={"Are you sure you want to Delete Account ?"}
        yesno
        onSuccess={() => {
          deleteAccount();
        }}
      />
      <BottomModal
        visible={successModal}
        setvisible={setSuccesModal}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        text={"Account has been Deleted Sucessfuly"}
        btnText="Continue"
        onSuccess={() => {
          props.navigation.navigate(SCREENS.Login);
        }}
      />
    </View>
  );
}

const AccountItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        STYLES.row,
        {
          justifyContent: "space-between",
          marginTop: title === "Delete Account" ? hp(0) : hp("3%"),
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.txt]}>{title}</Text>
      <Icon
        name={"right"}
        type={Icons.AntDesign}
        color={COLORS.brown}
        size={15}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  settingContainer: {
    flex: 1,
    paddingHorizontal: wp("3%"),
    marginTop: hp("3%"),
  },
  optionContainer: {
    backgroundColor: COLORS.greyish,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp(2),
    borderWidth: 1.5,
    borderColor: COLORS.brown,
    borderRadius: wp("1%"),
    marginTop: hp("2%"),
  },
  txt1: {
    color: COLORS.white,
    fontSize: rf(2.5),
    fontFamily: FONTFAMILY.Medium,
    paddingLeft: wp("2%"),
  },
  txt: {
    color: COLORS.white,
    fontSize: rf(1.8),
    fontFamily: FONTFAMILY.Medium,
  },
  buttonContainer: {
    flex: 0.3,
    paddingHorizontal: wp("12%"),
  },
});
