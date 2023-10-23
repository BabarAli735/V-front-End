import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
} from "../../constants/them";
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../common/responsivefunction";
import CustomHeader from "../../componanats/CustomHeader";
import CustomButton from "../../componanats/CustomButton";
import AdsHandler from "./AdsHandler";

export default function BuyAdds(props) {
  const { packageData } = AdsHandler(props);
  const [sliderCount, setSliderCount] = useState(1);
  return (
    <View style={styles.container}>
      <CustomHeader showBackButton title="Buy Ads" />
      <Text
        style={{
          fontFamily: FONTFAMILY.Bold,
          fontSize: rf(2),
          color: COLORS.white,
          textAlign: "center",
        }}
      >
        Select A Package That's Right For You!
      </Text>
      <View style={styles.packageContainer}>
        <Text
          style={[
            styles.txt1,
            { marginTop: hp("2%"), alignSelf: "center", lineHeight: hp("3%") },
          ]}
        >
          Basic Package
        </Text>
        <Slider
          style={{
            width: "97%",
            height: 40,
            alignSelf: "center",
            marginVertical: SIZES.fifteen,
          }}
          minimumValue={packageData[0]?.minAmount}
          maximumValue={packageData[0]?.maxAmount}
          minimumTrackTintColor={COLORS.white}
          maximumTrackTintColor={COLORS.white}
          thumbTintColor={COLORS.primary}
          onValueChange={(val) => {
            setSliderCount(parseInt(val));
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: SIZES.fifteen,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTFAMILY.Bold,
                fontSize: rf(2),
              }}
            >
              Price
            </Text>
            <View style={styles.box}>
              <Text style={[FONTS.mediumFont16, { color: COLORS.white }]}>
                ${sliderCount * packageData[0]?.amount}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: FONTFAMILY.Bold,
                fontSize: rf(2),
                color: COLORS.white,
              }}
            >
              Ads
            </Text>
            <View style={styles.box}>
              <Text
                style={[
                  {
                    color: COLORS.white,
                    fontFamily: FONTFAMILY.Bold,
                    fontSize: rf(2),
                  },
                ]}
              >
                {sliderCount * packageData[0]?.impressions}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontFamily: FONTFAMILY.Medium,
            fontSize: rf(1.8),
            color: COLORS.white,
            textAlign: "center",
          }}
        >
          Maecenas eu mauris sit amit nisi cursus valutpat tincidant ac dui
          mauris id ligual eu depibus
        </Text>
        {/* <CustomButton
          title="Select Package"
          btnStyle={{
            marginTop: hp("3%"),
            backgroundColor: COLORS.transparent,
            borderWidth: 1,
            borderColor: COLORS.white,
            marginHorizontal: wp(8),
          }}
          onPress={() => {}}
        /> */}
      </View>

      <CustomButton
        title="Continue"
        btnStyle={{ marginTop: hp("3%"), marginHorizontal: wp(8) }}
        onPress={() => {
          props.navigation.navigate(SCREENS.UploadAdds, {
            id: packageData[0]?._id,
            amount_range: sliderCount * packageData[0]?.amount,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("4%"),
    backgroundColor: COLORS.BLACK,
  },
  packageContainer: {
    flex: 0.6,
    marginTop: hp("4%"),
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingHorizontal: wp("2.5%"),
    borderRadius: wp("2%"),
  },
  txt1: {
    color: COLORS.white,
    fontSize: rf(2),
    fontFamily: FONTFAMILY.Bold,
  },
  box: {
    backgroundColor: COLORS.gradientStartColor,
    paddingHorizontal: SIZES.twentyFive,
    paddingVertical: SIZES.ten,
    width: wp("30%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.five,
    // fontSize: 13,
    // fontFamily: FONTFAMILY.Medium,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.twenty,
    borderRadius: SIZES.ten,
    marginTop: SIZES.fiftyWidth,
    // marginTop: SIZES.fifteen,
  },
  selectPkgBtn: {
    paddingHorizontal: wp("3%"),
  },
});
