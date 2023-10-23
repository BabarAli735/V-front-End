import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../common/responsivefunction";
import { COLORS, FONTFAMILY, SCREENS } from "../constants/them";
import { useNavigation } from "@react-navigation/native";
export default function RecentUploads({ data }) {
  const navigation = useNavigation();
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          navigation.navigate(SCREENS.ImageDetail, {
            id: item?._id,
          });
        }}
      >
        <Image
          style={styles.image1}
          source={{
            uri: item?.image,
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ marginTop: hp(1) }}>
      <Text style={styles.txtTitle}>Recent Images </Text>

      <FlatList
        numColumns={4}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: wp(3) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image1: {
    height: hp(10),
    width: wp(22),
    marginRight: wp(2),
    marginTop: hp(1),
    borderRadius: wp(2),
  },
  txtTitle: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
});
