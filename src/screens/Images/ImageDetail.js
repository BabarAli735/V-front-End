import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
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
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import Icon, { Icons } from "../../componanats/Icons";
import CirclImage from "../../componanats/CirclImage";
import * as ScreenOrientation from "expo-screen-orientation";
import BackArrow from "../../componanats/BackArrow";
import CommentBottomSheet from "../../componanats/CommentBottomSheet";
import { ResizeMode, Video } from "expo-av";
import HomeList from "../../componanats/HomeList";
import ImagesHandler from "./ImagesHandler";
import { useNavigation } from "@react-navigation/native";
import { Share } from "react-native";
import { TextInput } from "react-native";
import { memo } from "react";
import { FlatList } from "react-native";
import { ImageBackground } from "react-native";
import moment from "moment";
import CustomHeader from "../../componanats/CustomHeader";

export default function ImageDetail(props) {
  const {
    ImageDetail,
    isLike,
    isDisLike,
    showComentSheet,
    channelData,
    isCurrentUser,
    ComentsOnVideo,
    content,
    userData,
    commentId,
    isReply,
    ProfileData,
    isSubcribed,
    AllChannelImages,
    getTimeAgo,
    createCommentsOnVideos,
    setCommentId,
    setIsReply,
    setContent,
    deleteComment,
    onSubcribeChannel,
    setShowComentSheet,
    onLikeImage,
    onDisLikeImage,
  } = ImagesHandler(props);

  const renderItem = ({ item, index }) => {
    return (
      <RenderUserImages
        isCurrentUser={isCurrentUser}
        item={item}
        index={index}
        deleteChannelImage={() => {
          // deleteChannelImage(item._id);
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>

        <Image
          style={styles.mainImage}
          source={{ uri: ImageDetail?.image }}
        />

        <BackArrow style={styles.backArrow} />
        <View style={{ flex: 1, paddingHorizontal: wp(2) }}>
          <FlatList
            data={AllChannelImages}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: hp(2) }}
            ListHeaderComponent={() => {
              return (
                <HeaderComponant
                  ImageDetail={ImageDetail}
                  onLikeVideos={onLikeImage}
                  isLike={isLike}
                  isDisLike={isDisLike}
                  onDisLikeVideos={onDisLikeImage}
                  channelData={channelData}
                  isCurrentUser={isCurrentUser}
                  setShowComentSheet={setShowComentSheet}
                  onSubcribeChannel={onSubcribeChannel}
                  isSubcribed={isSubcribed}
                  ProfileData={ProfileData}
                  data={ComentsOnVideo}
                  getTimeAgo={getTimeAgo}
                />
              );
            }}
          />
        </View>

        <CommentBottomSheet
          data={ComentsOnVideo}
          isVisible={showComentSheet}
          setIsVisible={setShowComentSheet}
          text={content}
          setText={setContent}
          onSendComment={createCommentsOnVideos}
          isReply={isReply}
          setIsReply={setIsReply}
          setCommentId={setCommentId}
          commentId={commentId}
          userData={userData}
          ProfileData={ProfileData}
          deleteComment={deleteComment}
        />
      </View>
    </View>
  );
}

const HeaderComponant = memo(
  ({
    ImageDetail,
    onLikeVideos,
    isLike,
    isDisLike,
    onDisLikeVideos,
    channelData,
    isCurrentUser,
    setShowComentSheet,
    onSubcribeChannel,
    isSubcribed,
    ProfileData,
    data,
    getTimeAgo,
    setVideoDetailSheet,
  }) => {
    const navigation = useNavigation();

    return (
      <View
        style={{
          paddingBottom: hp(2),
        }}
      >
        <TouchableOpacity
          style={styles.container5}
          activeOpacity={0.85}
          onPress={() => {}}
        >
          <View style={{ marginTop: hp(1.5) }}>
            <Text style={styles.txt}>{ImageDetail?.caption}</Text>
            <View style={STYLES.row}>
              <Text style={[styles.txt1]}>
                {ImageDetail?.views.length} Views
              </Text>
              <Text style={[styles.txt1, { marginStart: wp(1.5) }]}>
                {getTimeAgo(ImageDetail?.createdAt)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{}}>
          <View style={STYLES.horLine} />
          <View style={styles.container1}>
            <TouchableOpacity
              style={STYLES.row}
              activeOpacity={0.85}
              onPress={() => {
                navigation.navigate(SCREENS.Channel, {
                  userId: ImageDetail?.channelId._id,
                });
              }}
            >
              <CirclImage uri={ProfileData?.channel?.channelLogo} />
              <View style={{ marginStart: wp(2) }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTFAMILY.RobotoMedium,
                  }}
                >
                  {ProfileData?.channel?.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.brown,
                    fontFamily: FONTFAMILY.Light,
                  }}
                >
                  {ProfileData?.channel?.subscribersCount} Subcriber
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
          <View style={STYLES.row}>
            <View style={styles.container3}>
              <TouchableOpacity
                style={styles.likeContainer}
                disabled={isLike}
                onPress={onLikeVideos}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    type={Icons.AntDesign}
                    name={"like1"}
                    style={[
                      styles.lDIcons,
                      {
                        color: isLike ? COLORS.primary : COLORS.white,
                      },
                    ]}
                  />

                  <Text style={styles.txtLike}>
                    {isLike
                      ? ImageDetail?.likes?.length + 1
                      : ImageDetail?.likes?.length}{" "}
                    |
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.likeContainer}
                disabled={isDisLike}
                onPress={onDisLikeVideos}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    type={Icons.SimpleLineIcons}
                    name={"dislike"}
                    style={styles.lDIcons}
                  />

                  <Text style={styles.txtLike}>
                    {isDisLike
                      ? ImageDetail?.dislikes?.length + 1
                      : ImageDetail?.dislikes?.length}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.container3, { marginLeft: wp(2) }]}>
              <TouchableOpacity
                style={styles.likeContainer}
                disabled={isLike}
                onPress={async () => {
                  try {
                    const result = await Share.share({
                      message:
                        "React Native | A framework for building native apps using React",
                    });
                  } catch (error) {
                    alert(error.message);
                  }
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    type={Icons.Entypo}
                    name={"forward"}
                    style={[
                      styles.lDIcons,
                      {
                        color: COLORS.white,
                      },
                    ]}
                  />
                  <Text style={styles.txtLike}>Share</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={STYLES.horLine} />

          {/* <TouchableOpacity
            style={{
              backgroundColor: COLORS.brownGrey,
              height: hp(14),
              padding: wp(2),
              borderRadius: wp(2),
            }}
            activeOpacity={0.7}
            onPress={() => {
              setShowComentSheet(true);
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[styles.txtComments, { fontFamily: FONTFAMILY.Light }]}
              >
                Comments {data?.length}
              </Text>
              <Icon
                type={Icons.AntDesign}
                name={"right"}
                style={[
                  styles.lDIcons,
                  {
                    color: COLORS.white,
                  },
                ]}
              />
            </View>
            {data?.length === 0 ? (
              <View style={styles.container4}>
                <View style={styles.imageInputContainer}>
                  <CirclImage
                    uri={ProfileData?.avatar}
                    style={{
                      height: wp(10),
                      width: wp(10),
                      borderRadius: wp(10),
                    }}
                  />
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputText}
                      placeholderTextColor={COLORS.white}
                      placeholder={"Add Comments"}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: hp(1),
                }}
              >
                <CirclImage uri={data[0]?.userId?.avtar} />
                <Text style={[styles.txt1, { marginStart: wp(2) }]}>
                  {data[0]?.content}
                </Text>
              </View>
            )}
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
);
const RenderUserImages = ({
  item,
  index,
  from,
  isCurrentUser,
  deleteChannelImage,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          navigation.navigate(SCREENS.ImageDetail, {
            id: item?._id,
          });
        }}
      >
        <ImageBackground
          style={styles.image1}
          imageStyle={{ borderRadius: wp(2) }}
          source={{
            uri: item?.image,
          }}
        >
          {/* {isCurrentUser && (
            <Menu
              style={{
                position: "absolute",
              }}
            >
              <MenuTrigger>
                <View style={styles.iconContainer}>
                  <Icon
                    type={Icons.Entypo}
                    name={"dots-three-vertical"}
                    style={styles.icon}
                  />
                </View>
              </MenuTrigger>

              <MenuOptions
                style={{
                  backgroundColor: COLORS.modal,
                  paddingHorizontal: wp("3%"),
                  paddingVertical: SIZES.ten,
                }}
              >
                <MenuOption onSelect={deleteChannelImage}>
                  <Text style={[styles.txt, { color: COLORS.fire }]}>
                    {"Delete"}
                  </Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => {
                    navigation.navigate(SCREENS.UploadImagesVideo, {
                      from: "Image",
                      item,
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.txt,
                      { color: COLORS.secondary, marginVertical: SIZES.ten },
                    ]}
                  >
                    {"Update"}
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )} */}
        </ImageBackground>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: hp(1.5),
        }}
      >
        <View>
          <Text style={[styles.txt, { marginTop: hp(1) }]}>
            {item?.caption}
          </Text>
          <Text style={[{ color: COLORS.brown, fontSize: rf(1.5) }]}>
            {moment(item.createdAt).format("MMMM Do YYYY")}
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
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(0.5),
    paddingHorizontal: wp(2.5),
    flex: 1,
  },
  container5: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(0.5),
  },
  container3: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(25),
    justifyContent: "center",
    marginTop: hp(1),
    backgroundColor: COLORS.brownGrey,
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
  },

  image: {
    height: hp(32),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
  image1: {
    height: hp(30),
    width: "100%",
    borderRadius: wp(2),
    marginTop: hp(2),
    alignItems: "flex-end",
  },
  subcriberContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    borderRadius: wp(1),
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    position: "absolute",
    top: 10,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    backgroundColor: COLORS.blackWithOpacity,
    marginLeft: wp(1.5),
    borderRadius: wp(2),
  },
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  txtLike: {
    color: COLORS.white,
    fontSize: rf(1.5),
    fontFamily: FONTFAMILY.RobotoLight,
    marginHorizontal: wp(1.5),
  },
  txt1: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Light,
  },
  txtSubciber: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    fontSize: rf(1.7),
  },
  txtComments: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    fontSize: rf(2),
  },
  upDownIcons: { alignItems: "center", justifyContent: "center" },
  careUp: {
    color: COLORS.white,
    fontSize: rf(2),
  },
  videoTime: {
    backgroundColor: COLORS.modal,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(1),
    width: wp(13),
    marginBottom: hp(2),
    marginRight: wp(1.5),
    height: hp(3),
  },
  lDIcons: {
    color: COLORS.white,
    fontSize: rf(2.5),
  },
  likeContainer: {
    alignItems: "center",
  },
  indicatorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainImage: {
    height: hp(32),
    width: "100%",

    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
  indicatorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  comments: {
    justifyContent: "space-between",
    backgroundColor: COLORS.brownGrey,
    borderRadius: wp(1),
    padding: wp(2),
  },
  commentstxt: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(1.5),
  },
  imageInputContainer: {
    flexDirection: "row",
    marginTop: hp(2),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.white,
    height: hp(6),
    borderRadius: wp(2),
    paddingHorizontal: wp(1.5),
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginStart: wp(1.5),
    justifyContent: "space-between",
  },
  container4: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  iconContainer: {
    backgroundColor: COLORS.blackWithOpacity,
    right: wp(2),
    top: hp(1),
    paddingVertical: hp(1),
    borderRadius: wp(0.5),
  },
  icon: {
    color: COLORS.primary,
    fontSize: rf(2.5),
  },
});
