import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

import { COLORS, FONTFAMILY, SCREENS, STYLES } from "../constants";
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../common/responsivefunction";
import moment from "moment";
import CirclImage from "./CirclImage";
function CharScreenComponant({ item }) {



  return (
    <>
      <View>
        <View
          style={[
            styles.itemContainer,
            {
              alignSelf: isCurrentuser ? "baseline" : "flex-end",
              flexDirection: isCurrentuser ? "row" : "row-reverse",
            },
          ]}
        >
          <CirclImage />

          <View style={styles.detail}>
            <Text style={[styles.txt, { lineHeight: hp("3%") }]}>
              item.message
            </Text>
            <Text style={[styles.time]}>{moment(item.created_at).format("LT")}</Text>
          </View>
        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp("3%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
  },
  detail: {
    marginHorizontal: wp("2%"),
    backgroundColor: "#2E3040",
    // padding: wp("3%"),
    borderRadius: wp("2%"),
    maxWidth: wp("70%"),
    paddingHorizontal:wp("5%"),
    paddingVertical:wp("2%"),
  },
  txt: {
    color: COLORS.white,
    fontSize: rf(1.7),
    fontFamily: FONTFAMILY.Medium,
  },
  time: {
    color: COLORS.white,
    fontSize: rf(1.2),
    fontFamily: FONTFAMILY.Medium,
  },
  image: {
    height: wp("16%"),
    width: wp("16%"),
    borderRadius: wp("16%"),
  },
});

export default memo(ChatComponanat);
