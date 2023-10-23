import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, SCREENS } from "../../constants/them";
import CustomHeader from "../../componanats/CustomHeader";
import SearchBar from "../../componanats/SearchBar";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import Icon, { Icons } from "../../componanats/Icons";
import VideoHandler from "./VideoHandler";
export default function SearchVideos(props) {
  const { AllVideos,searchText } = VideoHandler(props);

  const renderItem = ({ item, index }) => {
    return <RenderItem item={item} index={index} props={props} />;
  };
  return (
    <View style={styles.container}>
      <CustomHeader title={"Search Videos"} showBackButton />
      <SearchBar placeHolder="Search Videos" onChangeText={searchText}/>
      <FlatList
        data={AllVideos}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const RenderItem = ({ item, index, props }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.85}
      onPress={() => {
        props.navigation.navigate(SCREENS.VideoDetail, {
          id: item?._id,
        });
      }}
    >
      <View style={styles.iconContainer}>
        <Icon
          type={Icons.AntDesign}
          name={"search1"}
          size={rf(2)}
          color={COLORS.white}
        />
        <Text style={styles.txt}>{item.title}</Text>
      </View>
      <Image
        style={styles.img}
        source={{
          uri: item.thumbnailUrl,
        }}
        resizeMode={"cover"}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(2),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(1.5),
  },
  txt: {
    fontSize: rf(1.8),
    fontFamily: FONTFAMILY.Bold,
    color: COLORS.white,
    marginStart: wp(2.5),
  },
  img: {
    height: hp(5),
    width: wp(18),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainerStyle: {
    paddingBottom: hp(3),
  },
});
