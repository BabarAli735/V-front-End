import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import { COLORS, FONTFAMILY, STYLES } from "../constants/them";
import Icon, { Icons } from "../componanats/Icons";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "./SearchBar";
import moment from "moment";
import HandleEarning from "../screens/Earning/HandleEarning";
export default function EarningFilterModal({
  visible,
  options,
  onSuccess,
  setvisible,
  props,
}) {
  const navigation = useNavigation();
  const { selectedOption, ref, setSelectedoption } = HandleEarning(props);
  const { height } = Dimensions.get("screen");
  const startPointY = options?.from === "top" ? -height : height;
  const transY = useRef(new Animated.Value(0));
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [openTo, setOpenTo] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
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
          <Text
            style={[styles.txt3, { fontSize: rf(1.8), color: COLORS.white }]}
          >
            Select Date Range
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Option
              title={
                dateTo === "" ? "To" : moment(dateTo).format("MMMM Do YYYY")
              }
              iconName={"calendar"}
              type={Icons.Feather}
              onPress={() => setOpenTo(true)}
            />
            <Option
              title={
                dateFrom === ""
                  ? "From"
                  : moment(dateFrom).format("MMMM Do YYYY")
              }
              iconName={"calendar"}
              type={Icons.Feather}
              onPress={() => setOpenFrom(true)}
            />
          </View>
          <Text
            style={[styles.txt3, { fontSize: rf(1.8), color: COLORS.white }]}
          >
            Record per Page
          </Text>
          <ModalDropdown
            options={["10", "20", "30", "40", "50"]}
            ref={ref}
            dropdownStyle={styles.dropDown}
            dropdownTextHighlightStyle={styles.dropDownText}
            dropdownTextStyle={styles.dropDownText}
            renderRow={(rowData) => {
              return (
                <TouchableOpacity
                  underlayColor="cornflowerblue"
                  onPress={() => {
                    ref.current.hide();
                    setSelectedoption(rowData);
                  }}
                >
                  <Text
                    style={[
                      styles.dropDownText,
                      {
                        color:
                          selectedOption === rowData
                            ? COLORS.primary
                            : COLORS.white,
                      },
                    ]}
                  >{`${rowData}`}</Text>
                </TouchableOpacity>
              );
            }}
          >
            <Option
              title={selectedOption}
              iconName={"down"}
              type={Icons.AntDesign}
              onPress={() => {
                ref.current.show();
              }}
            />
          </ModalDropdown>

          <Text
            style={[
              styles.txt3,
              { fontSize: rf(1.8), color: COLORS.white, marginBottom: hp(2) },
            ]}
          >
            Search
          </Text>
          <SearchBar />
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
                Animated.timing(transY.current, {
                  toValue: startPointY,
                  duration: 0,
                  easing: Easing.inOut(Easing.ease),
                  useNativeDriver: true,
                }).start();
              }}
              btnStyle={{
                width: wp(30),
                height: hp(6),
                alignSelf: "center",
                backgroundColor: COLORS.transparent,
                borderWidth: 1,
                borderColor: COLORS.white,
              }}
            />
            <CustomButton
              title="Apply"
              onPress={() => {
                onClose();
                Animated.timing(transY.current, {
                  toValue: startPointY,
                  duration: 0,
                  easing: Easing.inOut(Easing.ease),
                  useNativeDriver: true,
                }).start();
                onSuccess();
              }}
              btnStyle={{ width: wp(31), height: hp(6), alignSelf: "center" }}
            />
          </View>
          {openTo && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode="date"
              display="default"
              disabled={openTo}
              onChange={(event, date) => {
                setOpenTo(false);

                setDateTo(date);
              }}
            />
          )}
          {openFrom && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode="date"
              display="default"
              disabled={openFrom}
              onChange={(event, date) => {
                setOpenFrom(false);
                setDateFrom(date);
              }}
            />
          )}
        </View>
      </Animated.View>
    </>
  );
}

const Option = ({ title, iconName, type, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: COLORS.brownGrey,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp(2),
        paddingVertical: hp(1),
        width: wp(40),
        marginTop: hp(1.5),
      }}
      onPress={onPress}
    >
      <Text
        style={[
          {
            fontSize: rf(1.8),
            color: COLORS.white,
            fontFamily: FONTFAMILY.Medium,
          },
        ]}
      >
        {title}
      </Text>
      <Icon
        type={type}
        name={iconName}
        style={{
          color: COLORS.brownGrey,
          fontSize: rf(2.5),
        }}
      />
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
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  txt3: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
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
  dropDownText: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(1.8),
    backgroundColor: COLORS.modal,
    color: COLORS.white,
    marginVertical: hp(1.5),
    paddingLeft: wp(2),
  },
  dropDown: { backgroundColor: COLORS.modal, width: wp(20) },
});
