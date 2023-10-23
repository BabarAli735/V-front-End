import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTFAMILY, SIZES, STYLES } from "../../constants/them";
import CustomHeader from "../../componanats/CustomHeader";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../../common/responsivefunction";
import { useNavigation } from "@react-navigation/native";
import Icon, { Icons } from "../../componanats/Icons";
import NotificationHandler from "./NotificationHandler";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native";
import CirclImage from "../../componanats/CirclImage";
import {Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
export default function Notification(props) {
  const { notificationData, getTimeAgo, onMarkasRead, onDeleteNotification } =
    NotificationHandler(props);

  const renderHiddenItem = ({ item }) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        disabled={Boolean(item?.isOpened)}
        style={[
          styles.backRightBtn,
          styles.backRightBtnLeft,
          {
            backgroundColor: !Boolean(item?.isOpened)
              ? COLORS.secondary
              : COLORS.greyish,
          },
        ]}
        onPress={() => {
          onMarkasRead(item);
        }}
      >
        <Icon
          type={Icons.Ionicons}
          name={item?.isOpened ? "checkmark-done" : "checkmark"}
          color={COLORS.white}
        />
        <Text style={styles.editText}>{"Read"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          onDeleteNotification(item);
        }}
      >
        <Icon
          type={Icons.Ionicons}
          name={"trash-bin-outline"}
          color={COLORS.white}
        />
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => {
    return (
      <View
        activeOpacity={0.9}
        style={[
          styles.renderItemContainer,
          {
            borderBottomColor: item.isOpened
              ? COLORS.transparent
              : COLORS.primary,
          },
        ]}
      >
        <CirclImage uri={item?.senderId.avatar} style={styles.img} />
        <View style={styles.contentContainer}>
          <Text style={styles.txt}>{item.title} </Text>

          <Text style={styles.txt1} numberOfLines={1}>
            {getTimeAgo(item.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Notification"
        showBackButton
        showRightBtn
        rightBtn={() => {
          return (
            <Menu
              style={{
                
              }}
            >
              <MenuTrigger>
                <View style={styles.iconContainer}>
                  <Icon
                    type={Icons.Entypo}
                    name={"dots-three-vertical"}
                    style={styles.icon}
                  />
                </View>
              </MenuTrigger>

              <MenuOptions
                style={{
                  backgroundColor: COLORS.modal,
                  paddingHorizontal: wp("3%"),
                  paddingVertical: SIZES.ten,
                }}
              >
                <MenuOption onSelect={onDeleteNotification}>
                  <Text style={[styles.txt, { color: COLORS.fire }]}>
                    {"Delete All"}
                  </Text>
                </MenuOption>
                <MenuOption onSelect={onMarkasRead}>
                  <Text
                    style={[
                      styles.txt,
                      { color: COLORS.secondary, marginVertical: SIZES.ten },
                    ]}
                  >
                    {"Mark as Read All"}
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          );
        }}
       
      />
      <SwipeListView
        data={notificationData}
        useFlatList={true}
        disableRightSwipe={true}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={0}
        previewOpenDelay={3000}
        renderItem={renderItem}
        ItemSeparatorComponent={() => {
          return <View style={{ marginVertical: hp(0.5) }} />;
        }}
      />
    </View>
  );
}

const PaymentData = ({ name, description, bold }) => {
  return (
    <View style={[STYLES.row, { marginTop: hp(1) }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          type={Icons.Ionicons}
          name={"time-outline"}
          style={{
            color: COLORS.white,
            fontSize: rf(2),
          }}
        />
        <Text
          style={[
            styles.txt,
            {
              width: wp(34),
              fontFamily: bold ? FONTFAMILY.Bold : FONTFAMILY.Light,
            },
          ]}
        >
          02:00 pm
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          type={Icons.Feather}
          name={"calendar"}
          style={{
            color: COLORS.white,
            fontSize: rf(2),
          }}
        />
        <Text
          style={[
            styles.txt,
            {
              width: wp(34),
              fontFamily: bold ? FONTFAMILY.Bold : FONTFAMILY.Light,
            },
          ]}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(3),
  },
  itemContainer: {
    borderRadius: wp(1),
    borderWidth: 1,
    borderColor: COLORS.white,
    marginTop: hp(2),
    padding: wp(3),
    backgroundColor: COLORS.brownGrey,
  },
  txt: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    width: wp(70),
  },
  image: {
    height: hp(30),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  txt1: {
    fontSize: rf(1.3),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    width: wp(40),
    marginTop: hp(0.5),
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: COLORS.BLACK,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtnLeft: {
    backgroundColor: COLORS.white,
    right: 75,
    backgroundColor: "#ff9500",
  },
  backRightBtnRight: {
    backgroundColor: COLORS.primary,
    right: 0,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  renderItemContainer: {
    height: hp(12),
    backgroundColor: COLORS.brownGrey,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    overflow: "hidden",
  },
  contentContainer: { marginLeft: 15, width: "75%" },
  deleteText: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.white,
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 55,
  },
  img: { height: 50, width: 50, borderRadius: 5 },
  editText: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.white,
  },
  iconContainer: {
    backgroundColor: COLORS.blackWithOpacity,
    right: wp(2),
    top: hp(1),
    paddingVertical: hp(1),
    borderRadius: wp(0.5),
  },
  icon: {
    color: COLORS.white,
    fontSize: rf(2.5),
  },
});
