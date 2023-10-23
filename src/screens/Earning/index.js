import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTFAMILY, STYLES } from "../../constants/them";
import CustomHeader from "../../componanats/CustomHeader";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../../common/responsivefunction";
import Icon, { Icons } from "../../componanats/Icons";
import EarningFilterModal from "../../componanats/EarningFilterModal";
import HandleEarning from "./HandleEarning";
import moment from "moment";
export default function Earning(props) {
  const { showFilterModal,ref,ProfileData, setShowFilterModal } = HandleEarning(props);
  const renderItem = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        index={index}
        onunSub={() => {
          setIsVisible(true);
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Earnings" showBackButton />
      <View style={{ alignItems: "center" }}>
        <View style={[STYLES.row, { marginTop: hp(0.5) }]}>
          <Text style={[styles.txt]}>Total Earnings</Text>
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
            0.00
          </Text>
        </View>
        <View style={[STYLES.row, { marginTop: hp(0.5) }]}>
          <Text style={[styles.txt]}>Member Since</Text>
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
            {moment(ProfileData?.createdAt).format("MMMM Do YYYY")}
          </Text>
        </View>
      </View>
      <View
        style={[
          STYLES.row,
          { marginTop: hp(1.5), justifyContent: "space-between" },
        ]}
      >
        <Text
          style={[
            {
              fontSize: rf(1.9),
              fontFamily: FONTFAMILY.Bold,
              color: COLORS.white,
            },
          ]}
        >
          Due Payments
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setShowFilterModal(true);
          }}
        >
          <Icon
            type={Icons.Ionicons}
            name={"options-outline"}
            style={{
              color: COLORS.white,
              fontSize: rf(4),
            }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={[]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      />
      <EarningFilterModal
        visible={showFilterModal}
        setvisible={setShowFilterModal}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        title="Report User"
        props={props}
        onSuccess={() => {
          //   props.navigation.goBack();
        }}
      />
    </View>
  );
}
const RenderItem = ({ item, index, onunSub }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.itemContainer]}>
      <PaymentData name={"Month"} description={"No.of new Subcribers"} bold />
      <PaymentData name={"August"} description={"10,000"} />
      <PaymentData
        name={"Total Amount in USD"}
        description={"Amount Payable"}
        bold
      />
      <PaymentData name={"$20,000"} description={"$800"} />
    </View>
  );
};
const PaymentData = ({ name, description, bold }) => {
  return (
    <View style={[STYLES.row, { marginTop: hp(0.5) }]}>
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
      <Text
        style={[
          styles.txt1,
          {
            fontSize: rf(1.8),
            fontFamily: bold ? FONTFAMILY.Bold : FONTFAMILY.Light,
            width: wp(50),
          },
        ]}
      >
        {description}
      </Text>
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
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginStart: wp(2),
    width: wp(30),
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
    marginStart: wp(2),
    width: wp(40),
  },
});
