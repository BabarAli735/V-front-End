import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
// import { ResizeMode, Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import Video from 'react-native-video';
import { COLORS, FONTFAMILY, SCREENS, STYLES } from "../../constants/them";
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
import HomeList from "../../componanats/HomeList";
import VideoHandler from "./VideoHandler";
import VideoDetailSkeleton from "../../componanats/skeleton/VideoDetailSkeleton";
import { useNavigation } from "@react-navigation/native";
import VideoDetailBottomSheet from "../../componanats/VideoDetailBottomSheet";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import ShowAddComponent from "../../componanats/ShowAddComponent";

function VideoDetail(props) {
  const {
    VideoDetail,
    isLike,
    isDisLike,
    SimilarVideos,
    ComentsOnVideo,
    content,
    isReply,
    commentId,
    userData,
    videoRef,
    likeCount,
    showComentSheet,
    channelData,
    isCurrentUser,
    ProfileData,
    isVisible,
    isSubcribed,
    showVideoDetailSheet,
    chatListRef,
    ChannelVideos,
    isEnd,
    isVideolEnd,
    showAdd,
    AllAds,
    counter,
    timer,
    showCounter,
    setshowshowCounter,
    settimer,
    setshowCounter,
    setShowAdd,
    checkWatchMovie,
    setShowReportReasonModal,
    setisVideolEnd,
    loadeMore,
    saveContinueWatch,
    onSaveRecentVideo,
    onViewVideo,
    setVideoDetailSheet,
    getTimeAgo,
    onSubcribeChannel,
    setShowComentSheet,
    onBackTo,
    statusBar,
    deleteComment,
    onLikeVideos,
    onDisLikeVideos,
    setCommentId,
    setIsReply,
    createCommentsOnVideos,
    setContent,
    setIsLike,
    watchedAd,
  } = VideoHandler(props);

  const randomObject = useRef();
  const ListHeaderComponent = memo(() => {
    return (
      <HeaderComponant
        VideoDetail={VideoDetail[0]}
        onLikeVideos={onLikeVideos}
        isLike={isLike}
        isDisLike={isDisLike}
        onDisLikeVideos={onDisLikeVideos}
        // channelData={channelData}
        isCurrentUser={isCurrentUser}
        setShowComentSheet={setShowComentSheet}
        onSubcribeChannel={onSubcribeChannel}
        isSubcribed={isSubcribed}
        ProfileData={ProfileData}
        data={ComentsOnVideo}
        getTimeAgo={getTimeAgo}
        setVideoDetailSheet={setVideoDetailSheet}
        setShowReportReasonModal={setShowReportReasonModal}
        setIsLike={setIsLike}
        likeCount={likeCount}
      />
    );
  });

  useEffect(() => {
    // Usage
    randomObject.current = getRandomObjectFromArray(AllAds.data);
    if (showAdd) {
      let body = {
        id: randomObject?.current?._id,
      };
      watchedAd(body);
      setTimeout(() => {
        setShowAdd(false);
        videoRef?.current.setStatusAsync({ shouldPlay: true });
      }, 10000);
    }
  }, [showAdd]);

  function getRandomObjectFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  return (
    <>
      {isVisible ? (
        <VideoDetailSkeleton />
      ) : (
        <View style={styles.container}>
          
          <View style={{ flex:1 }}>
            <View style={{backgroundColor:COLORS.transparent,height: hp(32)}}>
            {true && (
                <ShowCounter timer={timer} randomObject={randomObject} />
              )}
              <Video
                ref={videoRef}
                style={styles.image}
                shouldPlay={false}
                source={{
                  uri: VideoDetail[0]?.videoDetail?.url,
                }}
                resizeMode={'cover'}
                onLoad={() => {
                  onViewVideo();
                  onSaveRecentVideo();
                  ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT

                  if (randomObject.current?.type === "image") {
                    setTimeout(() => {
                      checkWatchMovie();
                      setShowAdd(false);
                    }, 10000);
                  } else {
                  }
                }}
                onLoadStart={() => {
                  setShowAdd(true);
                }}
                controls
                // useNativeControls={!isVideolEnd}
                // onPlaybackStatusUpdate={(e) => statusBar(e)}
                // onFullscreenUpdate={async (e) => {
                //   if (e.fullscreenUpdate === 0) {
                //     await ScreenOrientation?.lockAsync(
                //       ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
                //     );
                //   }
                //   if (e.fullscreenUpdate === 2) {
                //     await ScreenOrientation?.lockAsync(
                //       ScreenOrientation.OrientationLock.PORTRAIT
                //     );
                //   }
                // }}
              />

           
                  {false && (
              <ShowAddComponent
                randomObject={randomObject}
                setShowAdd={setShowAdd}
                videoRef={videoRef}
                onLoadVideo={() => {
                  setTimeout(() => {
                    setShowAdd(false);
                    checkWatchMovie();
                  }, 10000);
                }}
              />
            )}
            </View>

        
            {isVideolEnd && (
              <ImageBackground
                style={[
                  styles.loaderImage,
                  { alignItems: "center", justifyContent: "center" },
                ]}
                source={{ uri: VideoDetail[0]?.thumbnailUrl }}
              >
                <TouchableOpacity
                  style={styles.playIcon}
                  onPress={() => {
                    setisVideolEnd(false);
                    videoRef?.current?.playFromPositionAsync(Number(0));
                  }}
                  activeOpacity={0.8}
                >
                  <Icon
                    type={Icons.MaterialIcons}
                    name={"replay"}
                    color={COLORS.white}
                    size={rf(5)}
                  />
                </TouchableOpacity>
                <BackArrow
                  style={styles.backArrow}
                  onPress={() => onBackTo(0)}
                />
              </ImageBackground>
            )}
            <HomeList
              data={SimilarVideos}
              isEnd={true}
              ListHeaderComponent={ListHeaderComponent}
              extraData={SimilarVideos}
            />
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
              chatListRef={chatListRef}
            />
            <VideoDetailBottomSheet
              isVisible={showVideoDetailSheet}
              setIsVisible={setVideoDetailSheet}
              VideoDetail={VideoDetail[0]}
              isCurrentUser={isCurrentUser}
              channelData={channelData}
              onSubcribeChannel={onSubcribeChannel}
              isSubcribed={isSubcribed}
              data={ChannelVideos}
              loadeMore={loadeMore}
              isEnd={isEnd}
            />
          </View>
        </View>
      )}
    </>
  );
}
const HeaderComponant = memo(
  ({
    VideoDetail,
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
    likeCount,
  }) => {
    const navigation = useNavigation();

    const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
    const scale = useSharedValue(1);
    const reanimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    }, []);

    return (
      <View style={{ paddingBottom: hp(2) }}>
        <View
          style={styles.container2}
          activeOpacity={0.85}
          onPress={() => {
            setVideoDetailSheet(true);
          }}
        >
          <View
            style={{
              flex: 1,
              marginTop: hp(0.5),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setVideoDetailSheet(true);
              }}
            >
              <Text style={styles.txt}>{VideoDetail?.title}</Text>
              <View style={STYLES.row}>
                <Text style={[styles.txt1]}>
                  {VideoDetail?.viewsCount} Views
                </Text>
                <Text style={[styles.txt1, { marginStart: wp(1.5) }]}>
                  {getTimeAgo(VideoDetail?.createdAt)}
                </Text>
              </View>
            </TouchableOpacity>
            {!isCurrentUser && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate(SCREENS.CreateReport, {
                    from: "Video",
                    id: VideoDetail?._id,
                  });
                }}
              >
                <Text style={[styles.txt, { color: COLORS.primary }]}>
                  Report Video
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{}}>
          <View style={STYLES.horLine} />
          <View style={styles.container1}>
            <TouchableOpacity
              style={STYLES.row}
              activeOpacity={0.85}
              onPress={() => {
                navigation.navigate(SCREENS.Channel, {
                  userId: VideoDetail?.channelId[0]._id,
                });
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
                {/* <Text
                  style={{
                    color: COLORS.brown,
                    fontFamily: FONTFAMILY.Light,
                  }}
                >
                  {channelData?.subscribersCount} Subcriber
                </Text> */}
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
                onPress={() => {
                  scale.value = withSpring(2);
                  setTimeout(() => {
                    scale.value = withTiming(1);
                    onLikeVideos();
                  }, 500);
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AnimatedIcon
                    name={isLike ? "like1" : "like2"}
                    style={[
                      styles.lDIcons,
                      {
                        color: isLike ? COLORS.primary : COLORS.white,
                      },
                      reanimatedStyle,
                    ]}
                    size={rf(2)}
                  />

                  <Text style={styles.txtLike}>{likeCount}</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.txtLike}>|</Text>
              <TouchableOpacity
                style={styles.likeContainer}
                onPress={onDisLikeVideos}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon
                    type={Icons.AntDesign}
                    name={isDisLike ? "dislike1" : "dislike2"}
                    style={[
                      styles.lDIcons,
                      {
                        transform: [{ rotateY: "180deg" }],
                        color: COLORS.white,
                      },
                    ]}
                    size={rf(1.8)}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.container3, { marginLeft: wp(2) }]}>
              <TouchableOpacity
                style={styles.likeContainer}
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

          <TouchableOpacity
            style={styles.comments}
            activeOpacity={0.7}
            onPress={() => {
              setShowComentSheet(true);
            }}
          >
            <View style={styles.commentstxt}>
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
                <CirclImage uri={data[0]?.userId?.avatar} />
                <Text style={[styles.txt1, { marginStart: wp(2) }]}>
                  {data[0]?.content}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const ShowCounter = ({ timer, randomObject }) => {
  return (
    <View style={styles.showCounter}>
      {/* <Image
        source={{ uri: randomObject?.current.media }}
        style={{ width: wp("12%"), height: wp("8%") }}
      /> */}
      <Text
        style={{
          color: COLORS.BLACK,
          fontFamily: FONTFAMILY.Bold,
          fontSize: rf(1.5),
          marginStart: wp(1.5),
        }}
      >
        ads in {timer}
      </Text>
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
  },
  container3: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(28),
    justifyContent: "center",
    marginTop: hp(1),
    backgroundColor: COLORS.brownGrey,
    borderRadius: wp(2),
    paddingVertical: hp(0.8),
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
    height: hp(32),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
    backgroundColor: "red",
    position: "absolute",
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
  container4: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  backArrow: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    backgroundColor: COLORS.blackWithOpacity,
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
  loaderImage: {
    height: hp(32),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
    position: "absolute",
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
    alignItems: "center",
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
  playIcon: {
    // position: "absolute",
    // top: 100,
    // alignSelf: "center",
    backgroundColor: COLORS.primary,
    padding: wp(2),
    borderRadius: wp(2),
  },

  showCounter: {
    position: "absolute",
    bottom: 10,
    right: 100,
    zIndex:99,
    // flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.brown,
    paddingVertical: hp(0.5),
  },
});

export default memo(VideoDetail);
