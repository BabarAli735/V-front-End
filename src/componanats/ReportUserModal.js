import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal } from "react-native";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import { COLORS, FONTFAMILY, STYLES } from "../constants/them";
import CustomButton from "./CustomButton";
import InputText from "./InputText";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
export default function ReportUserModal({
  visible,
  options,
  onSuccess,
  setvisible,
  title,
}) {
  const [selectedReason, setSelectedReason] = useState("");
  const [reportTitle, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onClose = () => {
    setvisible(false);
  };

  return (
    <Modal visible={visible} transparent>
      <View
        style={[
          styles.container,
          // { transform: [{ translateY: transY.current }] },
        ]}
      >
        <View style={[styles.modalView, STYLES.shadow]}>
          <ScrollView>
            <View
              style={{
                height: hp(0.7),
                borderRadius: wp(2),
                backgroundColor: COLORS.brownGrey,
                marginTop: hp(1),
                width: wp(30),
                alignSelf: "center",
              }}
            />
            <Text style={[styles.txt3, { textAlign: "center" }]}>{title}</Text>
            {/* <Text style={[styles.txt3, { fontSize: rf(1.5) }]}>
            Select the reason for reporting
          </Text> */}
            {/* <ReasonOption
            title={"False Claim"}
            setSelectedReason={setSelectedReason}
            selectedReason={selectedReason}
          />
          <ReasonOption
            title={"PlagiarisedContent"}
            setSelectedReason={setSelectedReason}
            selectedReason={selectedReason}
          />
          <ReasonOption
            title={"Other"}
            setSelectedReason={setSelectedReason}
            selectedReason={selectedReason}
          /> */}
            <InputText
              style={{ color: COLORS.brownGrey }}
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
              }}
              placeholder="Enter Report description"
              placeholderTextColor={COLORS.brownGrey}
              description
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <CustomButton
                title="Cancel"
                onPress={() => {
                  onClose();
                }}
                btnStyle={{
                  width: wp(35),
                  height: hp(6),
                  alignSelf: "center",
                  backgroundColor: COLORS.transparent,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                }}
              />
              <CustomButton
                title="Submmit"
                onPress={() => {
                  onClose();

                  const data = {
                    title: reportTitle,
                    description: description,
                  };
                  onSuccess(data);
                }}
                btnStyle={{ width: wp(35), height: hp(6), alignSelf: "center" }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
  outerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: hp(2),
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalView: {
    backgroundColor: COLORS.modal,
    borderTopLeftRadius: wp("3%"),
    borderTopRightRadius: wp("3%"),
    padding: wp(3),
    width: "100%",
    shadowColor: COLORS.white,

    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
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
});
