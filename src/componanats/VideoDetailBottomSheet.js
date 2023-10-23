import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment/moment";
import React, { memo, useState } from "react";
import { COLORS, FONTFAMILY, SCREENS, SIZES, STYLES } from "../constants/them";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import CirclImage from "./CirclImage";
import Icon, { Icons } from "./Icons";
import { useNavigation } from "@react-navigation/native";
import HomeList from "./HomeList";
const VideoDetailBottomSheet = (props) => {
  const {
    VideoDetail,
    isCurrentUser,
    channelData,
    onSubcribeChannel,
    isSubcribed,
    setIsVisible,
    data,
    loadeMore,
    isEnd,
    isLoading,
    onRefresh,
  } = props;
  const navigation = useNavigation();
  return (
    <Modal visible={props.isVisible} transparent>
      <View style={styles.modal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.BottomSheetContainer}
        >
          <View style={styles.closeContainer}>
            <Text style={styles.txt}>{"Description"}</Text>
            <View style={STYLES.horLine} />
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                props.setIsVisible(false);
              }}
            >
              <Icon
                type={Icons.AntDesign}
                name="close"
                color={COLORS.white}
                size={rf(3)}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.horLine} />
          <Text style={styles.txt}>{VideoDetail?.description}</Text>
          <View style={styles.container2}>
            <View style={styles.totallikeContainer}>
              <Text style={styles.txt}>{VideoDetail?.likes?.length}</Text>
              <Text style={styles.txt1}>Likes</Text>
            </View>
            <View style={styles.totallikeContainer}>
              <Text style={styles.txt}>{VideoDetail?.views?.length}</Text>
              <Text style={styles.txt1}>Views</Text>
            </View>
            <View style={styles.totallikeContainer}>
              <Text style={styles.txt}>
                {moment(VideoDetail?.createdAt).format("MMM D")}
              </Text>
              <Text style={styles.txt1}>
                {moment(VideoDetail?.createdAt).format("YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.horLine} />

          <View style={{ flex: 1,  }}>
            <HomeList
              data={data}
              loadeMore={loadeMore}
              isEnd={isEnd}
              isLoading={false}
              titleColor={COLORS.white}
              onChannelPress={(item) => {
                setIsVisible(false);
                navigation.navigate(SCREENS.Channel, {
                  from: "user",
                  userId: item?.channelId._id,
                });
              }}
              ListHeaderComponent={() => {
                return (
                  <View style={styles.container1}>
                    <TouchableOpacity
                      style={STYLES.row}
                      activeOpacity={0.85}
                      onPress={() => {
                        navigation.navigate(SCREENS.Channel, {
                          userId: VideoDetail?.channelId[0]._id,
                        });
                        setTimeout(() => {
                          setIsVisible(false);
                        }, 1000);
                      }}
                    >
                      <CirclImage uri={VideoDetail?.channelId[0]?.channelLogo} />
                      <View style={{ marginStart: wp(2) }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            fontFamily: FONTFAMILY.RobotoMedium,
                          }}
                        >
                          {VideoDetail?.channelId[0]?.name}
                        </Text>
                        <Text
                          style={{
                            color: COLORS.brown,
                            fontFamily: FONTFAMILY.Light,
                          }}
                        >
                          {channelData?.subscribersCount} Subcriber
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {!isCurrentUser && (
                      <TouchableOpacity
                        onPress={onSubcribeChannel}
                        style={styles.subcriberContainer}
                      >
                        <Text style={styles.txtSubciber}>
                          {isSubcribed ? "unsubscribe" : "subscribe"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flexGrow: 1,
    backgroundColor: COLORS.blackWithOpacity,
    justifyContent: "flex-end",
  },
  BottomSheetContainer: {
    backgroundColor: COLORS.BLACK,
    borderTopLeftRadius: rf(3),
    borderTopRightRadius: wp(3),
    paddingHorizontal: wp(2),
    height: hp(76),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
    height: hp(6),
    borderRadius: wp(2),
    paddingHorizontal: wp(1.5),
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginStart: wp(1.5),
  },
  container1: {
    paddingHorizontal: wp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom:hp(2)
  },
  imageInputContainer: {
    flexDirection: "row",
    marginBottom: hp(2),
  },
  closeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp("2%"),
    paddingHorizontal: wp(2),
  },
  titleContainer: { marginStart: wp(2), marginTop: hp(2) },
  inputText: { color: COLORS.white, flex: 1 },
  txtTitle: {
    fontSize: rf(1.2),
    fontFamily: FONTFAMILY.Light,
    color: COLORS.brownGrey,
  },
  likeDisLikeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(1),
    width: wp(30),
  },
  line: {
    height: 4,
    width: 100,
    backgroundColor: COLORS.Greyscale,
    alignSelf: "center",
    marginTop: hp("2%"),
  },
  renderItemContainer: {
    marginTop: hp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: hp("5%"),
  },
  close: {
    position: "absolute",
    right: 10,
  },
  iconDislike: {
    color: COLORS.brownGrey,
    fontSize: rf(1.8),
  },
  txt: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(2),
  },
  txt1: {
    color: COLORS.white,

    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(1.5),
  },
  option: {
    position: "absolute",
    right: 5,
    top: -10,
    width: wp(30),
    backgroundColor: COLORS.modal,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
  },
  txtdelete: {
    fontSize: rf(1.7),
    fontFamily: FONTFAMILY.Bold,
    color: COLORS.white,
  },
  horLine: {
    height: hp(0.1),
    width: wp(90),
    backgroundColor: COLORS.brownGrey,
    marginVertical: hp(2),
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  totallikeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  subcriberContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(1),
  },
  txtSubciber: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    fontSize: rf(1.7),
  },
});
export default memo(VideoDetailBottomSheet);
