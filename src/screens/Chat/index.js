import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useRef } from "react";
import { COLORS, IMAGES, SIZES } from "../../constants/them";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "../../common/responsivefunction";
import ChatListComponanat from "../../componanats/ChatListComponanat";
import ItemSeparatorComponent from "../../componanats/ItemSeparatorComponent";
import SearchBar from "../../componanats/SearchBar";
import CustomHeader from "../../componanats/CustomHeader";
import ChatHandler from "./ChatHandler";

export default function Chat(props) {
  const { searchData, searchFilterFunction } = ChatHandler(props);
const flatlistref=useRef()
  return (
    <View style={styles.container}>
      <CustomHeader title="Message" showBackButton />
      <SearchBar onChangeText={searchFilterFunction} />
      <FlatList
        data={searchData}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: hp("5%"),
          marginTop: hp("2%"),
        }}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
}

const renderItem = ({ item, index }) => {
  return <ChatListComponanat item={item} index={index} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: widthPercentageToDP(2),
  },
});
