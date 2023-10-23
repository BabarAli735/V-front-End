import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon, { Icons, IconType } from "./Icons";
import BackArrow from "./BackArrow";
import {
  COLORS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from "../constants/them";

export default function CustomHeader(props) {
  const {
    darkTheme,
    title,
    titleStyle,
    showLogo,
    showBackButton,
    showMoreIcon,
    showProfilePic,
    showEditIcon,
    editIconColor,
    onEditIconPress,
    showGraphIcon,
    showRightBtn,
    rightBtnTitle,
    onRightBtnPress,
    rightBtnTheme = "normal",
    textShadow,
    rightBtn,
    onBackPress,
  } = props;
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 0.4 }}>
        {showBackButton ? (
          <BackArrow onPress={onBackPress} />
        ) : showMoreIcon ? (
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.moreIconView]}
            onPress={() => navigation.toggleDrawer()}
          >
            <Icon
              name={"dots-three-horizontal"}
              type={Icons.Entypo}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        {title ? (
          <Text
            style={[
              FONTS.mediumFont16,
              { color: darkTheme ? COLORS.white : COLORS.white },
              titleStyle,
              textShadow && STYLES.textShadow,
            ]}
          >
            {title}
          </Text>
        ) : showLogo ? (
          <Image
            resizeMode="contain"
            source={IMAGES.notNewHeaderLogo}
            style={styles.logoStyle}
          />
        ) : null}
      </View>

      <View style={{ flex: 0.4, alignItems: "flex-end" }}>
        {showProfilePic ? (
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.Profile)}
          >
            <Image source={IMAGES.profilePic} style={styles.profilePicStyle} />
          </TouchableOpacity>
        ) : showEditIcon ? (
          <TouchableOpacity activeOpacity={0.85} onPress={onEditIconPress}>
            <Icon
              type={Icons.Feather}
              name={"edit"}
              style={{
                color: editIconColor || COLORS.black,
                fontSize: SIZES.twentyFive,
              }}
            />
          </TouchableOpacity>
        ) : showGraphIcon ? (
          <TouchableOpacity activeOpacity={0.85} onPress={() => {}}>
            <Icon
              type={IconType.SimpleLineIcons}
              name={"graph"}
              style={{
                color: COLORS.white,
                fontSize: SIZES.twentyFive * 1.1,
              }}
            />
          </TouchableOpacity>
        ) : showRightBtn ? (
          rightBtn ? (
            rightBtn()
          ) : rightBtnTheme === "dark" ? (
            <TouchableOpacity activeOpacity={0.85} onPress={onRightBtnPress}>
              <View style={styles.rightBtnStyle}>
                <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
                  {rightBtnTitle}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.rightBtnStyle}
              onPress={onRightBtnPress}
            >
              {/* <Text style={[FONTS.mediumFont14, { color: COLORS.primary }]}>
                {rightBtnTitle}
              </Text> */}
              <Icon
                name={"dots-three-horizontal"}
                type={Icons.Entypo}
                color={COLORS.white}
              />
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.fifteen,
  },
  logoStyle: {
    width: SIZES.fifty * 3.5,
    height: SIZES.twentyFive * 1.6,
  },
  moreIconStyle: {
    width: SIZES.twenty,
    height: SIZES.twenty,
  },
  profilePicStyle: {
    width: SIZES.twentyFive * 2,
    height: SIZES.twentyFive * 2,
    borderRadius: SIZES.fifty * 2,
  },
  moreIconView: {
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.twentyFive * 2,
    height: SIZES.twentyFive * 2,
    borderRadius: SIZES.fifty * 2,
    backgroundColor: COLORS.white,
  },
  rightBtnStyle: {
    alignSelf: "flex-end",
    // borderRadius: SIZES.ten,
    // paddingVertical: SIZES.ten,
    // backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.fifteen,
  },
});
