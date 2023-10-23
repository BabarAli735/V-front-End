import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { COLORS, FONTFAMILY, SCREENS, SIZES, width } from "../constants/them";
import moment from "moment";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../common/responsivefunction";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useNavigation } from "@react-navigation/native";
import Icon, { Icons } from "./Icons";
import { createThumbnail } from "react-native-create-thumbnail";
const LIST_ITEM_HEIGHT = 200;
export default function MyAdsListItem({ item, onDismiss }) {
  const navigation = useNavigation();
  const [thumbnail, setThumbnail] = useState("");
  useEffect(() => {
    createThumbnail({
      url: item.media,
      timeStamp: 10000,
    })
      .then((response) => {
        //   console.log('response createThumbnail==',response);
        setThumbnail(response?.path);
      })
      .catch((err) => console.log({ err }));
  }, [onDismiss]);
  // console.log("====", item);
  return (
    <TouchableOpacity
      disabled={true}
      activeOpacity={0.85}
      // onPress={() => {
      //   navigation.navigate('UpLoadAds', {
      //     price: item?.price,
      //     ads_count: item.quantity,
      //   });
      // }}
      style={styles.card}
    >
      <View style={{ flex: 0.7 }}>
        <Image
          style={{
            flex: 1,

            borderRadius: SIZES.five,
          }}
          source={{ uri: item.type === "video" ? thumbnail : item?.media }}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={[styles.title, { color: COLORS.primary }]}>
            {item?.title}
          </Text>
          <Text style={styles.date}>
            {moment(item?.created_at).format("MM-DD-YYYY")}{" "}
          </Text>
        </View>

        <Text style={[styles.price, { color: COLORS.secondary }]}>
          Price:
          <Text style={styles.price}> ${item?.remainingImpressions}</Text>
        </Text>
      </View>
      <View
        style={{
          flex: 0.7,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Menu
          style={{
            //   position: "absolute",
            alignSelf: "flex-end",
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
            }}
          >
            <MenuOption onSelect={onDismiss}>
              <Text style={[styles.txt, { color: COLORS.fire }]}>
                {"Delete"}
              </Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                navigation.navigate(SCREENS.UploadAdds, {
                  item,
                });
              }}
            >
              <Text
                style={[
                  styles.txt,
                  { color: COLORS.secondary, marginVertical: SIZES.ten },
                ]}
              >
                {"Update"}
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        <View style={styles.status}>
          <Text style={styles.statusText}>{item?.status}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>Remening Ads </Text>
          <Text style={[styles.text, { color: COLORS.primary }]}>
            {" "}
            {item?.remainingImpressions}{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  task: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    backgroundColor: "white",
    shadowOpacity: 0.5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    borderRadius: 10,
  },
  taskContainer: {
    marginTop: SIZES.fifteen,
    // width: "100%",
    // alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    marginBottom: hp(1),
  },
  iconContainer1: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    backgroundColor: COLORS.secondary,
    position: "absolute",
    right: 75,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: wp("2%"),
    top: 10,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  card: {
    backgroundColor: COLORS.brown + 30,
    marginTop: SIZES.fifteen,
    flexDirection: "row",
    // alignItems: 'center',
    // justifyContent: 'space-between',
    padding: SIZES.ten,
    borderRadius: SIZES.fifteen,
    height: 90,
    overflow: "hidden",
    // flexDirection: "row",
    // // paddingVertical: SIZES.fifteen,
    // borderRadius: SIZES.ten,
    // // paddingHorizontal: SIZES.fifteen,
    // backgroundColor: COLORS.apple,
    // marginTop:SIZES.fifteen
  },
  image: {
    height: wp("35%"),
    width: wp("40%"),
    borderRadius: wp("2%"),
  },
  text: {
    fontSize: 11,
    color: COLORS.secondary,
    fontFamily: FONTFAMILY.Medium,
  },
  date: {
    fontSize: SIZES.body12,
    color: COLORS.secondary,
  },
  price: {
    fontSize: 15,
    color: COLORS.primary,
    fontFamily: FONTFAMILY.Medium,
  },
  status: {
    backgroundColor: COLORS.primary,
    width: width * 0.2,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.five,
  },
  statusText: {
    fontSize: 11,
    color: COLORS.white,
  },
  txt: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginStart: wp(2),
    width: wp(30),
  },
  icon: {
    color: COLORS.primary,
    fontSize: rf(2.5),
  },
});
