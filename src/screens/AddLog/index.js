import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  COLORS,
  FONTFAMILY,
  SCREENS,
  STYLES,
  width,
} from "../../constants/them";
import CustomHeader from "../../componanats/CustomHeader";
import CustomButton from "../../componanats/CustomButton";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../../common/responsivefunction";
import { useNavigation } from "@react-navigation/native";
import CirclImage from "../../componanats/CirclImage";
import Icon, { Icons } from "../../componanats/Icons";
import EarningFilterModal from "../../componanats/EarningFilterModal";
export default function AddLog(props) {
  const [showFilterModal, setShowFilterModal] = useState(false);

  const renderItem = ({ item, index }) => {
    return (
      <RenderItem
        item={item}
        index={index}
        onunSub={() => {
          setIsVisible(true);
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Add Log" showBackButton />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: hp(5),
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.addFeatureContainer}
        activeOpacity={0.85}
        onPress={() => {
          setShowFilterModal(true);
        }}
      >
        <Icon type={Icons.AntDesign} name={"plus"} color={COLORS.white} />
      </TouchableOpacity>
      <EarningFilterModal
        visible={showFilterModal}
        setvisible={setShowFilterModal}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        title="Report User"
        onSuccess={() => {
          //   props.navigation.goBack();
        }}
      />
    </View>
  );
}
const RenderItem = ({ item, index, onunSub }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.itemContainer]}>
      <PaymentData name={"Name"} description={"Total Amount"} bold />
      <PaymentData name={"Compagin Ad"} description={"$150"} />
      <PaymentData name={"Date"} description={"Status"} bold />
      <PaymentData name={"Dec 25, 2022"} description={"pending"} />
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
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(3),
  },
  itemContainer: {
    borderRadius: wp(1),
    borderWidth: 1,
    borderColor: COLORS.white,
    marginTop: hp(2),
    padding: wp(3),
    backgroundColor: COLORS.brownGrey,
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
    marginStart: wp(2),
    width: wp(40),
  },
  addFeatureContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    height: wp(15),
    width: wp(15),
    borderRadius: wp(15),
  },
});
