import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { FlatList } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

import {
  COLORS,
  FONTFAMILY,
  SCREENS,
  SIZES,
  STYLES,
} from "../../constants/them";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../../common/responsivefunction";
import SearchBar from "../../componanats/SearchBar";
import CustomHeader from "../../componanats/CustomHeader";
import CirclImage from "../../componanats/CirclImage";
import CustomButton from "../../componanats/CustomButton";
import { useNavigation } from "@react-navigation/native";
import BottomModal from "../../componanats/BottomModal";
import Icon, { Icons } from "../../componanats/Icons";
import HandleReportHistory from "./HandleReportHistory";
import moment from "moment";
export default function ReportHistory(props) {
  const {
    ref,
    isVisible,
    successModal,
    selectedOption,
    ReportData,
    deleteReport,
    handleSelectedReport,
    setSuccesModal,
    setIsVisible,
  } = HandleReportHistory(props);

  const renderItem = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        index={index}
        deleteReport={() => {
          deleteReport(item._id);
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Report History" showBackButton />
      <ModalDropdown
        options={["All", "Channel Reports", "Videos Reports"]}
        ref={ref}
        dropdownStyle={styles.dropDown}
        dropdownTextHighlightStyle={styles.dropDownText}
        dropdownTextStyle={styles.dropDownText}
        renderRow={(rowData) => {
          return (
            <TouchableOpacity
              underlayColor="cornflowerblue"
              onPress={() => {
                handleSelectedReport(rowData);
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
        <SearchBar
          placeHolder={
            selectedOption !== "" ? selectedOption : "Channel Reports"
          }
          onPress={() => {
            ref.current.show();
          }}
        />
      </ModalDropdown>

      <FlatList
        data={ReportData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      />
      <BottomModal
        visible={isVisible}
        setvisible={setIsVisible}
        iconType={Icons.AntDesign}
        iconName={"questioncircleo"}
        text={"Are you sure you want to unsubcribe ?"}
        yesno
        onSuccess={() => {
          setTimeout(() => {
            setSuccesModal(true);
          }, 1000);
        }}
      />
      <BottomModal
        visible={successModal}
        setvisible={setSuccesModal}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        text={"Now you can't share content with your subcribers"}
        btnText="Continue"
        onSuccess={() => {
          props.navigation.goBack();
        }}
      />
    </View>
  );
}

const RenderItem = ({ item, index, deleteReport }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.itemContainer]}>
      <Menu style={{ alignItems: "flex-end" }}>
        <MenuTrigger>
          <Icon
            type={Icons.Entypo}
            name={"dots-three-vertical"}
            style={styles.icon}
          />
        </MenuTrigger>

        <MenuOptions
          style={{
            backgroundColor: COLORS.modal,
            paddingHorizontal: wp("3%"),
            paddingVertical: SIZES.ten,
          }}
        >
          <MenuOption onSelect={deleteReport}>
            <Text style={[styles.txt, { color: COLORS.fire }]}>{"Delete"}</Text>
          </MenuOption>
          <MenuOption onSelect={() => {}}>
            <Text
              style={[
                styles.txt,
                { color: COLORS.secondary, marginVertical: SIZES.ten },
              ]}
            >
              {"Cancel"}
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <View style={[STYLES.row, { marginTop: hp(0.5) }]}>
        <Text style={[styles.txt]}>Report Title</Text>
        <Text style={styles.txtsubcriers}>{item.title}</Text>
      </View>
      <View style={[STYLES.row, { marginTop: hp(0.5) }]}>
        <Text style={[styles.txt]}>Reported On :</Text>
        <Text style={styles.txtsubcriers}>
          {moment(item.createdAt).format("MMMM Do YYYY")}
        </Text>
      </View>
      <View style={[STYLES.row, { marginTop: hp(0.5) }]}>
        <Text style={[styles.txt]}>Reason :</Text>
        <Text style={styles.txtsubcriers}>{item.description}</Text>
      </View>
      <View style={[STYLES.row, { marginTop: hp(0.5) }]}>
        <Text style={[styles.txt]}>status :</Text>
        <Text style={[styles.txtsubcriers, { width: wp(50) }]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          title={"View"}
          btnStyle={styles.btn}
          titleStyle={{ fontFamily: FONTFAMILY.Medium, fontSize: rf(1.5) }}
          onPress={() => {
            if (item?.objectType === "Channel") {
              navigation.navigate(SCREENS.Channel, {
                from: "user",
                userId: item?.object,
              });
            }
            if (item?.objectType === "Video") {
              navigation.navigate(SCREENS.VideoDetail, {
                id: item?.object,
              });
            }
          }}
        />
      </View>
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
    borderColor: COLORS.brownGrey,
    marginTop: hp(2),
    padding: wp(3),
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
    width: wp(40),
  },
  txtsubcriers: {
    color: COLORS.white,
    fontSize: rf(1.8),
    fontFamily: FONTFAMILY.Light,
    width: wp(30),
  },
  btn: {
    backgroundColor: COLORS.primary,
    height: hp(5),
    width: wp(40),
  },
  btnContainer: {
    alignItems: "center",
    marginTop: hp(0.5),
  },
  dropDownText: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(1.8),
    backgroundColor: COLORS.modal,
    color: COLORS.white,
    marginVertical: hp(1.5),
    paddingLeft: wp(2),
  },
  dropDown: { backgroundColor: COLORS.modal, width: wp(93) },
  icon: {
    color: COLORS.white,
    fontSize: rf(2.5),
  },
});

const data = [
  {
    id: 0,
    title: "Current",
  },
  {
    id: 1,
    title: "All",
  },
  {
    id: 2,
    title: "Sad Music",
  },
  {
    id: 1,
    title: "K-Drama",
  },
  {
    id: 1,
    title: "Movie",
  },
];
