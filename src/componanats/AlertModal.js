import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";

import { COLORS, FONTFAMILY, FONTS, IMAGES } from "../constants/them";
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "../common/responsivefunction";

export default function AletModal({
  isModalVisible,
  onAccepte,
  onCancelled,
  title,
  desc,
}) {
  return (
    <Modal visible={Boolean(isModalVisible)} transparent>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContentContainer,
            {
              backgroundColor: COLORS.modal,
              paddingHorizontal: 30,
              height: hp("30%"),
            },
          ]}
        >
          <Image
            source={IMAGES.logo}
            style={styles.deleteLogo}
            resizeMode="contain"
          />
          <Text
            style={[
              {
                textAlign: "center",
                color: COLORS.white,
                fontFamily: FONTFAMILY.Bold,
                fontSize: rf(1.5),
              },
            ]}
          >
            {" "}
            {title}{" "}
          </Text>
          <Text
            style={[
              {
                textAlign: "center",
                fontFamily: FONTFAMILY.Bold,
                color: COLORS.white,
                fontSize: rf(1.5),
              },
            ]}
          >
            {" "}
            {desc}{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.commonBtnContainer}
              activeColor="white"
              onPress={onCancelled}
            >
              <Text style={styles.txt}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.onAcceptContainer}
              onPress={onAccepte}
            >
              <Text style={styles.txt}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.blackWithOpacity,
  },
  deleteLogo: { width: wp("30%"), height: wp("20%"), borderRadius: wp("2%") },

  modalContentContainer: {
    backgroundColor: "red",
    height: "30%",
    width: "80%",
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  commonBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: heightPercentageToDP(6),
    borderRadius: 10,
    borderBottomColor: "gray",
    backgroundColor: COLORS.transparent,
    width: wp("30%"),
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
  },
  txt: {
    textAlign: "center",
    fontFamily: FONTFAMILY.Bold,
    color: COLORS.white,
    fontSize: rf(1.5),
  },
  onAcceptContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: heightPercentageToDP(6),
    borderRadius: 10,
    borderBottomColor: "gray",
    backgroundColor: COLORS.primary,
    width: wp("30%"),
    marginLeft: wp(3),
  },
});
