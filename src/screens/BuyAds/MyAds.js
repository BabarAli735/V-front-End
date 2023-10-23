import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from "../../constants/them";
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../common/responsivefunction";
import CustomHeader from "../../componanats/CustomHeader";
import { FlatList } from "react-native";
import AdsHandler from "./AdsHandler";
import moment from "moment";
import Icon, { Icons } from "../../componanats/Icons";
import { useNavigation } from "@react-navigation/native";
import MyAdsListItem from "../../componanats/MyAdsListComponanat";
export default function MyAds(props) {
  const { packageData, deleteAd } = AdsHandler(props);
  const renderItem = ({ item, index }) => {
    return (
      <MyAdsListItem
        item={item}
        index={index}
        onDismiss={() => {
          let param = {
            id: item?._id,
          };
          deleteAd(param);
        }}
      />
    );
  };
  console.log('packageData',packageData);
  return (
    <View style={styles.container}>
      <CustomHeader showBackButton title="My Ads" />
      <View style={{ flex: 1 }}>
        <FlatList
          data={packageData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp(5),
          }}
        />
      </View>
    </View>
  );
}

const RenderItem = ({ item, index, onDelete }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.itemContainer]}>
      <Image
        style={{ height: hp(10), width: "100%", backgroundColor: "red" }}
        source={{ uri: item?.media }}
      />
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
            paddingHorizontal: wp("3%"),
            paddingVertical: SIZES.ten,
          }}
        >
          <MenuOption onSelect={onDelete}>
            <Text style={[styles.txt, { color: COLORS.fire }]}>{"Delete"}</Text>
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

      <PaymentData name={"Name"} description={item?.title} bold />
      <PaymentData
        name={"Compagin Ad"}
        description={`$${item?.adPaymentDetails.amount}`}
      />
      <PaymentData name={"Status"} description={`${item?.status}`} bold />
      <PaymentData
        name={"Date"}
        description={moment(item?.createdAt).format("MMMM Do YYYY")}
      />
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
    paddingHorizontal: wp("4%"),
    backgroundColor: COLORS.BLACK,
  },
  itemContainer: {
    borderRadius: wp(1),
    borderWidth: 1,
    borderColor: COLORS.white,
    marginTop: hp(2),
    // padding: wp(3),
    paddingVertical: hp(1),
    backgroundColor: COLORS.brownGrey,
  },
  txt: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginStart: wp(2),
    width: wp(30),
  },
  txt1: {
    fontSize: rf(1.3),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    marginStart: wp(2),
    width: wp(40),
  },
  icon: {
    color: COLORS.primary,
    fontSize: rf(2.5),
  },
  iconContainer: {
    backgroundColor: COLORS.blackWithOpacity,
    right: wp(2),
    paddingVertical: hp(1),
    borderRadius: wp(0.5),
  },
});
