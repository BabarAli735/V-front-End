import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Linking } from "react-native";
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  SCREENS,
  SIZES,
  STYLES,
} from "../constants/them";
import Icon, { Icons } from "../componanats/Icons";
import CirclImage from "../componanats/CirclImage";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../common/responsivefunction";
import CustomButton from "../componanats/CustomButton";
import AletModal from "../componanats/AlertModal";
import { removeAccessToken } from "../redux/slices";
import NavigationHandler from "./NavigationHandler";

export default function DrawerScreen(props) {
  const {
    ProfileData,
    isLogoutModalVisible,
    setIsLogoutModalVisible,
    dispatch,
  } = NavigationHandler(props);
  const ScreenTitle = ({ title, onPress, iconname, type }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{
          alignItems: "center",
          flexDirection: "row",
          paddingVertical: SIZES.fifteen,
          marginTop: hp(1),
        }}
      >
        <Icon
          name={iconname}
          type={type}
          style={[STYLES.drawerIcon, { color: COLORS.white }]}
        />
        <Text
          style={[
            {
              fontSize: rf(1.8),
              fontFamily: FONTFAMILY.Medium,
              color: COLORS.white,
              marginStart: wp(1.5),
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        paddingTop: SIZES.twentyFive,
      }}
    >
      <View
        activeOpacity={1}
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate(SCREENS.Profile)}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: rf(2.5),
            color: COLORS.white,
          }}
        >
          Menue
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.navigation.navigate(SCREENS.Profile, {
              from: "owner",
            });
          }}
        >
          <CirclImage
            style={{
              height: wp(20),
              width: wp(20),
              borderRadius: wp(20),
              marginTop: SIZES.fifteen,
            }}
            uri={ProfileData?.avatar}
          />
        </TouchableOpacity>
      </View>
      <CustomButton
        title={ProfileData?.channel !== null ? "My Channel" : "Create Channel"}
        btnStyle={{ marginHorizontal: wp(10), height: hp(5.3) }}
        onPress={() => {
          if (ProfileData?.channel !== null) {
            props.navigation.navigate(SCREENS.Channel, {
              from: "owner",
              userId: ProfileData?.channel._id,
            });
          } else {
            props.navigation.navigate(SCREENS.UploadProfile);
          }
        }}
        hasIcon
      />
      <View style={{ flex: 1, paddingHorizontal: SIZES.twentyFive }}>
        <ScreenTitle
          title={"My Subcription"}
          iconname={"notifications-outline"}
          type={Icons.Ionicons}
          onPress={() => {
            props.navigation.navigate(SCREENS.Subscription);
          }}
        />
        <ScreenTitle
          title={"Report History"}
          iconname={"timer-outline"}
          type={Icons.Ionicons}
          onPress={() => {
            props.navigation.navigate(SCREENS.ReportHistory);
          }}
        />
        <ScreenTitle
          title={"Recent Videos"}
          iconname={"motion-play-outline"}
          type={Icons.MaterialCommunityIcons}
          onPress={() => {
            props.navigation.navigate(SCREENS.RecentVideos);
          }}
        />

        <ScreenTitle
          title={"Earning"}
          iconname={"currency-usd"}
          type={Icons.MaterialCommunityIcons}
          onPress={() => {
            props.navigation.navigate(SCREENS.Earning);
          }}
        />
        <ScreenTitle
          title={"Buy Add"}
          iconname={"bullhorn-outline"}
          type={Icons.MaterialCommunityIcons}
          onPress={() => {
            props.navigation.navigate(SCREENS.BuyAds);
          }}
        />
        <ScreenTitle
          title={"My Ads"}
          iconname={"bullhorn-outline"}
          type={Icons.MaterialCommunityIcons}
          onPress={() => {
            props.navigation.navigate(SCREENS.MyAds);
          }}
        />

        <ScreenTitle
          title={"Contact Us"}
          iconname={"chatbox-ellipses-outline"}
          type={Icons.Ionicons}
          onPress={() => {
            props.navigation.navigate(SCREENS.WebView, {
              url: `${CONSTANTS.API_URLS.BASE_URL}static/contact-us.html`,
            });
          }}
        />
        <ScreenTitle
          title={"Settings"}
          iconname={"ios-settings-outline"}
          type={Icons.Ionicons}
          onPress={() => {
            props.navigation.navigate(SCREENS.Settings);
          }}
        />
        <ScreenTitle
          title={"Logout"}
          iconname={"logout"}
          type={Icons.AntDesign}
          onPress={() => {
            setIsLogoutModalVisible(true);
          }}
        />
      </View>
      <AletModal
        isModalVisible={isLogoutModalVisible}
        desc="Are you sure ?"
        title={"Logout"}
        onAccepte={() => {
          setIsLogoutModalVisible(false);
          setTimeout(() => {
            dispatch(removeAccessToken());
          }, 1000);
        }}
        onCancelled={() => {
          setIsLogoutModalVisible(false);
        }}
      />
    </View>
  );
}
