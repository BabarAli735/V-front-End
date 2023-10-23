import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import { COLORS, FONTFAMILY, SCREENS } from "../constants/them";
import Icon, { Icons } from "./Icons";
import CirclImage from "./CirclImage";
import { useNavigation } from "@react-navigation/native";

export default function HeaderComponant(props) {
  const navigation = useNavigation();
  const { ProfileData,NotificationData } = props;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={styles.menueContainer}
        >
          <Icon
            type={Icons.Ionicons}
            name={"menu-outline"}
            style={{
              color: COLORS.white,
              fontSize: rf(3),
            }}
          />
        </TouchableOpacity>
        <View >
          <Text style={styles.txt}>Welcome back</Text>
          <Text style={styles.txt1}>{ProfileData?.firstName}</Text>
        </View>
      </View>
      <View style={[styles.container, { width: wp(20) }]}>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate(SCREENS.Notification);
            }}
          >
            <Icon
              type={Icons.Ionicons}
              name={"notifications-outline"}
              style={{
                color: COLORS.white,
                fontSize: rf(3),
              }}
            />{NotificationData!==undefined&& NotificationData?.length>0&&
            
            <View style={styles.notificationCount}/>
            }
             
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate(SCREENS.SearchVideos);
          }}
        >
          <Icon
            type={Icons.AntDesign}
            name={"search1"}
            style={{
              color: COLORS.white,
              fontSize: rf(3),
            }}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate(SCREENS.Profile, {
              from: "owner",
            });
          }}
        >
          <CirclImage uri={ProfileData?.avatar}/>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  txt1: {
    fontSize: rf(2.7),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
  },
  notificationCount: {
    backgroundColor: COLORS.primary,
    position: "absolute",
    right:0,
    top: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(3),
    height: wp(2),
    width: wp(2),
  },
  menueContainer:{
    marginRight:wp(2),
    backgroundColor:COLORS.brownGrey,
    padding:wp(1),
    borderRadius:wp(1.5)
  },
  txtCount:{
    color: COLORS.white,
    fontSize: rf(1.4),
    fontFamily: FONTFAMILY.Bold,
  }
});
