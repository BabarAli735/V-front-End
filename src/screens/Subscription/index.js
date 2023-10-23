import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTFAMILY, SCREENS, STYLES } from "../../constants/them";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../../common/responsivefunction";
import Icon, { Icons } from "../../componanats/Icons";
import SearchBar from "../../componanats/SearchBar";
import CustomHeader from "../../componanats/CustomHeader";
import CirclImage from "../../componanats/CirclImage";
import CustomButton from "../../componanats/CustomButton";
import BottomModal from "../../componanats/BottomModal";
import SubscriptionHandler from "./SubscriptionHandler";
import moment from "moment";
export default function Subscription(props) {
  const {
    AllSubscriptions,
    isVisible,
    successModal,
    searchData,
    unSubId,
    setUnSubId,
    searchFilterFunction,
    onSubcribeChannel,
    setSuccesModal,
    setIsVisible,
  } = SubscriptionHandler(props);
  const renderItem = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        index={index}
        onunSub={(id) => {
          setUnSubId(id);
          setIsVisible(true);
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="My Subscriptions" showBackButton />
      <SearchBar onChangeText={searchFilterFunction} placeHolder={'Search Channel'}/>
      <FlatList
        data={searchData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      />
      <BottomModal
        visible={isVisible}
        setvisible={setIsVisible}
        iconType={Icons.AntDesign}
        iconName={"questioncircleo"}
        text={"Are you sure you want to unsubcribe ?"}
        yesno
        onSuccess={() => {
          onSubcribeChannel(unSubId);
        }}
      />
      <BottomModal
        visible={successModal}
        setvisible={setSuccesModal}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        text={"Now you can't share content with your subcribers"}
        btnText="Continue"
        onSuccess={() => {
          props.navigation.goBack();
        }}
      />
    </View>
  );
}

const RenderItem = ({ item, index, onunSub }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.itemContainer]}>
      <View style={STYLES.row}>
        <CirclImage uri={item?.channelLogo} />
        <Text style={styles.txt}>{item?.name}</Text>
      </View>
      <View style={[STYLES.row, { marginTop: hp(0.5) }]}>
        <Text style={[styles.txt2]}>Subscribers</Text>
        <Text
          style={[
            styles.txt1,
            {
              fontSize: rf(1.8),
              fontFamily: FONTFAMILY.Light,
              width: wp(30),
            },
          ]}
        >
          {item?.subscriberCount}
        </Text>
      </View>
      <View style={[STYLES.row, { marginTop: hp(0.5) }]}>
        <Text style={[styles.txt2]}>Subscribe On :</Text>
        <Text
          style={[
            styles.txt1,
            {
              fontSize: rf(1.8),
              fontFamily: FONTFAMILY.Light,
              width: wp(30),
            },
          ]}
        >
          {moment(item.createdAt).format("MMMM Do YYYY")}
        </Text>
      </View>
      <View
        style={[
          STYLES.row,
          { marginTop: hp(0.5), justifyContent: "space-evenly" },
        ]}
      >
        <CustomButton
          title={"View Channel"}
          btnStyle={{
            backgroundColor: COLORS.transparent,
            height: hp(5),
            borderWidth: 1,
            borderColor: COLORS.primary,
            width: wp(40),
          }}
          titleStyle={{ fontFamily: FONTFAMILY.Medium, fontSize: rf(1.5) }}
          onPress={() => {
            navigation.navigate(SCREENS.Channel, {
              from: "user",
              userId: item?._id,
            });
          }}
        />
        <CustomButton
          title={"UnSubscribe"}
          btnStyle={{
            backgroundColor: COLORS.primary,
            height: hp(5),
            borderWidth: 1,
            borderColor: COLORS.primary,
            width: wp(40),
          }}
          titleStyle={{ fontFamily: FONTFAMILY.Medium, fontSize: rf(1.5) }}
          onPress={() => {
            onunSub(item?._id);
          }}
        />
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
    borderColor: COLORS.brownGrey,
    marginTop: hp(2),
    padding: wp(3),
  },
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginStart: wp(2),
    width: wp(80),
  },
  txt2: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginStart: wp(2),
  },
  image: {
    height: hp(30),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  txt1: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    marginStart: wp(2),
    width: wp(40),
  },
});

const data = [
  {
    id: 0,
    title: "Current",
  },
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Sad Music",
  },
  {
    id: 1,
    title: "K-Drama",
  },
  {
    id: 1,
    title: "Movie",
  },
];
