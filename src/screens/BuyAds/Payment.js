import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { CreditCardInput } from "../../componanats/StripCardComponent";
import { STRIPE_PUBLISHABLE_KEY } from "../../../keys";
import axios from "axios";
import CustomHeader from "../../componanats/CustomHeader";
import { hideLoader, showLoader } from "../../redux/slices";
import utils from "../../utils";
import useReduxStore from "../../hook/UseReduxStore";
import { COLORS, CONSTANTS, FONTS, SIZES } from "../../constants/them";
import CustomButton from "../../componanats/CustomButton";
import { KeyboardAvoidingView } from "react-native";
import AdsHandler from "./AdsHandler";

function Payment(props) {
  const { CardInput, accessToken, setCardInput, onSubmit, _onChange } =
    AdsHandler(props);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <CustomHeader showBackButton title="Payment" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ padding: SIZES.five, paddingBottom: 50 }}
        >
          <CreditCardInput
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={[
              styles.inputStyle,
              {
                backgroundColor: COLORS.white + 20,
              },
            ]}
            labelStyle={[
              styles.labelStyle,
              {
                color: COLORS.white,
              },
            ]}
            validColor="#FFF"
            placeholderColor={COLORS.white}
            requiresName={true}
            onChange={_onChange}
          />
          <CustomButton
            title="Pay Now"
            onPress={() => {
              onSubmit();
            }}
            btnStyle={styles.btnStyle}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: 5,
  },
  inputStyle: {
    backgroundColor: COLORS.BLACK,
    // height: 50,
    borderRadius: SIZES.twentyFive,
    // marginHorizontal: SIZES.five / 2,
    // paddingHorizontal: SIZES.five / 3,
    // marginVertical: SIZES.five * 1.3,
    color: COLORS.white,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: Platform.OS === "ios" ? SIZES.fifteen : 0,
    paddingTop: Platform.OS === "ios" ? SIZES.fifteen : 0,
  },
  labelStyle: {
    // marginBottom: 5,
    fontSize: SIZES.h16 - 2,
    color: COLORS.white,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.twenty,
    borderRadius: SIZES.ten,
    marginTop: SIZES.fiftyWidth,
    marginHorizontal: SIZES.twenty,
  },
  btnTitle: [
    FONTS.mediumFont16,
    {
      textAlign: "center",
      color: COLORS.white,
    },
  ],
  btnStyle: {
    marginHorizontal: SIZES.fifteen,
  },
});

export default Payment;
