import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal } from "react-native";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../../common/responsivefunction";
import { ScrollView } from "react-native";
import { COLORS, FONTFAMILY, STYLES } from "../../constants/them";
import InputText from "../../componanats/InputText";
import CustomButton from "../../componanats/CustomButton";
import CustomHeader from "../../componanats/CustomHeader";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import HandleReportHistory from "./HandleReportHistory";
export default function CreateReport(props) {
  const {
    reportTitle,
    description,
    isLoading,
    onCreateReport,
    setDescription,
    setTitle,
  } = HandleReportHistory(props);

  return (
    <View style={[styles.container]}>
      <CustomHeader
        title={`Create ${props.route.params.from} Report`}
        showBackButton
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: hp(6) }}>
          <InputText
            style={{ color: COLORS.brownGrey, marginTop: hp(2) }}
            placeholder="Enter Report title"
            placeholderTextColor={COLORS.white}
            value={reportTitle}
            onChangeText={setTitle}
          />
          <InputText
            value={description}
            onChangeText={setDescription}
            style={{
              height: hp(20),
              justifyContent: "flex-start",
              marginTop: hp(2),
            }}
            placeholder="Enter Report description"
            placeholderTextColor={COLORS.brownGrey}
            description
          />

          <View style={styles.btnContainer}>
            <CustomButton
              title="Cancel"
              onPress={() => {
                props.navigation.goBack();
              }}
              btnStyle={styles.cancelBtn}
            />
            <CustomButton
              title="Submmit"
              onPress={onCreateReport}
              btnStyle={styles.submmitBtn}
              showIndicator={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const ReasonOption = ({ title, setSelectedReason, selectedReason }) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", marginTop: hp(1.3) }}
      onPress={() => {
        setSelectedReason(title);
      }}
    >
      <View
        style={{
          height: wp(4),
          width: wp(4),
          borderRadius: wp(4),
          borderWidth: 1,
          borderColor: COLORS.primary,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor:
              selectedReason === title ? COLORS.primary : COLORS.transparent,
            height: wp(2.5),
            width: wp(2.5),
            borderRadius: wp(2.5),
          }}
        />
      </View>
      <Text style={[styles.txt2, { marginStart: wp(1.3) }]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(2),
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalView: {
    flex: 1,
    shadowColor: COLORS.white,
    justifyContent: "space-between",
  },
  txt: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    width: wp(80),
    marginVertical: hp(2),
    lineHeight: hp(3),
    textAlign: "center",
  },
  txt2: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  txt3: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginTop: hp(1.5),
  },
  iconContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: wp("5%"),
    maxHeight: hp("50%"),
  },
  closeIconContainer: {
    marginHorizontal: wp(3),
    marginTop: hp(2),
    paddingHorizontal: wp(2),
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
    height: hp(15),
  },
  itemContainer: {
    marginTop: hp("3%"),
  },
  cancelBtn: {
    width: wp(35),
    height: hp(6),
    alignSelf: "center",
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  submmitBtn: { width: wp(35), height: hp(6), alignSelf: "center" },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: hp(5),
  },
});
