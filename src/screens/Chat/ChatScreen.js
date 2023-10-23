import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/them";
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../common/responsivefunction";
import Icon, { Icons } from "../../componanats/Icons";
import CustomHeader from "../../componanats/CustomHeader";
import CirclImage from "../../componanats/CirclImage";
import ChatHandler from "./ChatHandler";
import moment from "moment";

export default function ChatScreen(props) {
  const { ChatMessages, text, chatData, ProfileData, setText, onSendMessage } =
    ChatHandler(props);
  const renderItem = ({ item, index }) => {
    const isCurrentuser = ProfileData?._id === item.senderId?.id;
    let image = isCurrentuser
      ? item.senderId.avatar
      : chatData?.participant.avatar;
    return (
      <CharScreenComponant
        item={item}
        isCurrentuser={isCurrentuser}
        image={image} 
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        showBackButton
        title={chatData?.participant?.firstName}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={hp(6)}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            inverted
            data={ChatMessages}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: hp(5) }}
          />
        </View>
        <View style={styles.chatContainer}>
          <TextInput
            placeholder="type message here"
            style={{
              flex: 1,
              color: COLORS.grey,
            }}
            value={text}
            onChangeText={setText}
            placeholderTextColor={COLORS.grey}
          />
          <TouchableOpacity
            onPress={() => onSendMessage()}
            style={styles.btnSend}
          >
            <Icon
              name={"ios-send"}
              type={Icons.Ionicons}
              color={COLORS.grey}
              style={{}}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const CharScreenComponant = ({ item, isCurrentuser, image }) => {
  return (
    <View>
      <View
        style={[
          styles.itemContainer,
          {
            alignSelf: isCurrentuser ? "baseline" : "flex-end",
            flexDirection: isCurrentuser ? "row" : "row-reverse",
          },
        ]}
      >
        <CirclImage uri={image} />
        <View>
          <View style={styles.detail}>
            <Text style={[styles.txt, { lineHeight: hp("3%") }]}>
              {item.body}
            </Text>
          </View>
          <Text style={[styles.time]}>
            {" "}
            {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  chatContainer: {
    backgroundColor: COLORS.modal,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("2%"),
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
    height: hp(10),
    bottom: -3,
  },
  txt: {
    color: COLORS.white,
    fontSize: rf(2),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp("3%"),
    borderRadius: wp("2%"),
    marginTop: hp("2%"),
  },
  detail: {
    marginHorizontal: wp("2%"),
    backgroundColor: "#2E3040",
    // padding: wp("3%"),
    borderRadius: wp("2%"),
    maxWidth: wp("70%"),
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("2%"),
  },
  btnSend: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: wp(3),
    borderRadius: wp(10),
  },
  time: {
    color: COLORS.brown,
    alignSelf: "baseline",
    fontSize: rf(1.2),
    marginStart: wp(2),
  },
});
