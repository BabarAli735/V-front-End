import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from "../constants/them";
import Icon, { Icons } from "../componanats/Icons";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
export default function ChangeSubcriptionCost({
  visible,
  yesno,
  options,
  text,
  textStyle,
  onSuccess,
  setvisible,
  setChangeCost,
}) {
  const navigation = useNavigation();
  const { height } = Dimensions.get("screen");
  const startPointY = options?.from === "top" ? -height : height;
  const transY = useRef(new Animated.Value(0));
  const [selectedReason, setSelectedReason] = useState("");
  const onClose = () => {
    setvisible(false);
  };
  useEffect(() => {
    if (visible) {
      startAnimation(0);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      onClose();
      Animated.timing(transY.current, {
        toValue: startPointY,
        duration: 0,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, []);

  const startAnimation = (toValue) => {
    Animated.timing(transY.current, {
      toValue,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: transY.current }] },
        ]}
      >
        <View style={[styles.modalView, STYLES.shadow]}>
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
          <TouchableOpacity
            onPress={() => {
              onClose();
              Animated.timing(transY.current, {
                toValue: startPointY,
                duration: 0,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }).start();

              setTimeout(() => {
                setChangeCost(true);
              }, 1000);
            }}
          >
            <Text style={[styles.txt2, { marginTop: hp(2) }]}>
              Edit Details
            </Text>
          </TouchableOpacity>

          <View style={[STYLES.horLine, { marginVertical: hp(2) }]} />
          <TouchableOpacity
            onPress={() => {
              onClose();
              Animated.timing(transY.current, {
                toValue: startPointY,
                duration: 0,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }).start();
            }}
          >
            <Text style={[styles.txt2, { marginBottom: hp(5) }]}>
              View who Reported
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: COLORS.blackWithOpacity,
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
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    textAlign: "center",
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
