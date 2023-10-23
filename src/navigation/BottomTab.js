import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, FONTFAMILY, SCREENS, SIZES, STYLES } from "../constants/them";
import Icon, { Icons } from "../componanats/Icons";

import Home from "../screens/Home";
import Post from "../screens/Home";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import Chat from "../screens/Chat";
import Subscription from "../screens/Subscription";
import About from "../screens/About";
import BottomModal from "../componanats/BottomModal";
import NavigationHandler from "./NavigationHandler";
import Profile from "../screens/Profile";
const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  const {
    isVisible,
    isuploadModal,
    ProfileData,
    isUploading,
    setIsUploadModal,
    setvisible,
  } = NavigationHandler();


  const getRouteIcon = ({ route: { name } }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName;
      let iconType;
      switch (name) {
        case "Home":
          iconName = "home-outline";
          iconType = Icons.Ionicons;

          break;
        case "Chat":
          iconName = "hipchat";
          iconType = Icons.Fontisto;
          break;
        case "Post":
          iconName = "pluscircleo";
          iconType = Icons.AntDesign;
          break;
        case "Subscription":
          iconName = "clipboard-play-multiple-outline";
          iconType = Icons.MaterialCommunityIcons;
          break;
        case "Profile":
          iconName = "user";
          iconType = Icons.AntDesign;
          break;
        default:
          break;
      }
      return (
        <>
          {name === "Post" ? (
            <Icon
              name={iconName}
              type={iconType}
              size={rf(6)}
              color={focused ? COLORS.primary : COLORS.white}
            />
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon
                name={iconName}
                type={iconType}
                size={rf(2.5)}
                color={focused ? COLORS.primary : COLORS.white}
              />
              <Text
                style={{
                  fontSize: rf(1.3),
                  color: focused ? COLORS.primary : COLORS.white,
                  fontFamily: FONTFAMILY.Medium,
                  marginTop: hp(0.5),
                }}
              >
                {name}
              </Text>
            </View>
          )}
        </>
      );
    },
    headerShown: false,
    tabBarStyle: { backgroundColor: COLORS.BLACK, height: hp(10) },
    title: "",
    headerBackTitleVisible: false,
  });

  return (
    <>
      <Tab.Navigator screenOptions={getRouteIcon}>
        <Tab.Screen name={SCREENS.Home} component={Home} />
        <Tab.Screen name={SCREENS.Chat} component={Chat} />
        <Tab.Screen
          name={SCREENS.Post}
          component={Post}
          listeners={{
            tabPress: () => {
              if (ProfileData?.channel !== null) {
                if(isUploading){
                  navigation.navigate(SCREENS.UploadImagesVideo, {
                    from: "Video",
                  });
                }else{
                  setIsUploadModal(true);
                }
              } else {
                  setvisible(true);
              }
            },
          }}
        />
        <Tab.Screen name={SCREENS.Subscription} component={Subscription} />
        <Tab.Screen name={SCREENS.Profile} component={Profile} />
      </Tab.Navigator>
      <BottomModal
        visible={isVisible}
        setvisible={setvisible}
        iconType={Icons.AntDesign}
        iconName={"questioncircleo"}
        icoColor={COLORS.primary}
        yesno
        onSuccess={() => {
          navigation.navigate(SCREENS.UploadProfile);
        }}
        text={
          "You need to create channel to upload content \n Do you want to proceed ?"
        }
        textStyle={{ textAlign: "center" }}
      />
      <BottomModal
        visible={isuploadModal}
        setvisible={setIsUploadModal}
        upload
      />
    </>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    width: wp(70),
    marginVertical: hp(2),
    lineHeight: hp(3),
    textAlign: "center",
  },
  txt2: {
    fontSize: rf(1.5),
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
  },
  iconContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: wp("5%"),
    maxHeight: hp("50%"),
  },
  closeIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    marginTop: hp("3%"),
  },
});
