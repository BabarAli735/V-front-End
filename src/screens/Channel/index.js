import React, { useRef } from "react";
import Icon, { Icons } from "../../componanats/Icons";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
  ImageBackground,
} from "react-native";
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
  width,
} from "../../constants/them";
import CirclImage from "../../componanats/CirclImage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import CustomButton from "../../componanats/CustomButton";
import { useNavigation } from "@react-navigation/native";
import BottomModal from "../../componanats/BottomModal";
import BackArrow from "../../componanats/BackArrow";
import channelHandler from "./channelHandler";
import CategoryList from "../../componanats/CategoryList";
import ChannelSkeleton from "../../componanats/skeleton/ChannelSkeleton";
import { memo } from "react";
import { useCallback } from "react";
import { VideoSkeleton } from "../../componanats/skeleton/VideosListSkeleton";
import HomeListFooter from "../../componanats/HomeListFooter";
const { diffClamp } = Animated;
const headerHeight = hp(70);
const Channel = (props) => {
  const {
    isCurrentUser,
    channelData,
    channelInfo,
    isSubriber,
    channelDetail,
    selectedCategory,
    coverImage,
    profileImage,
    isUpdateChannel,
    isUploadCover,
    isUploadProfile,
    ProfileData,
    isVisible,
    showIndicator,
    AllCategory,
    isEnd,
    isRefresing,
    ChannelVideos,
    videosDuration,
    onCreateChat,
    onSubcribeChannel,
    deleteChannel,
    setProfileImage,
    setCoverImage,
    setIsUpdateChannel,
    setIsUploadProfile,
    setIsuploadCover,
    setselectedCategory,
    setIsSubscriber,
    createChannel,
    handleChange,
    setShowReportReasonModal,
    loadeMore,
    onRefresh,
    getCloser,
  } = channelHandler(props);
  const ref = useRef(null);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  const translateYNumber = useRef();

  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  const handleSnap = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight / 2
      )
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
            -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };

  const renderItem = useCallback(({ item, index }) => {
    let find = videosDuration?.find((x) => x?.videoId === item?.id);
    let duration = item?.videoDetail?.duration
      ? item?.videoDetail?.duration
      : 50;
    let total = find?.duration / duration;

    let value = find ? (parseInt(total * 100) ? parseInt(total * 100) : 0) : 0;
    return (
      <RenderItem
        value={value}
        item={item}
        index={index}
        owner={isCurrentUser}
        props={props}
      />
    );
  }, []);

  const onEndReachedHandler = async ({ distanceFromEnd }) => {
    if (!ref.current) {
      loadeMore();
      ref.current = true;
    }
  };

  if (isVisible && channelDetail === undefined) {
    return <ChannelSkeleton />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.modal }}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
          <Header
            {...{
              headerHeight,
              channelDetail,
              isCurrentUser,
              onSubcribeChannel,
              setIsSubscriber,
              onCreateChat,
              selectedCategory,
              setselectedCategory,
              AllCategory,
              setIsUpdateChannel,
              deleteChannel,
              setShowReportReasonModal,
            }}
          />
        </Animated.View>
        <Animated.FlatList
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: hp(50),
            paddingHorizontal: wp(2),
          }}
          onScroll={handleScroll}
          ref={ref}
          onMomentumScrollEnd={handleSnap}
          bounces={false}
          data={ChannelVideos}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={onEndReachedHandler}
          refreshing={isRefresing}
          onRefresh={onRefresh}
          ListFooterComponent={() => {
            if (ChannelVideos?.length === 0) {
              return null;
            } else {
              return (
                <View style={{ alignItems: "center" }}>
                  {isEnd ? (
                    <View style={styles.endContainer}>
                      <Text style={styles.txt2}>No More</Text>
                    </View>
                  ) : (
                    [1].map((item, index) => {
                      return <VideoSkeleton key={index.toString()} />;
                    })
                  )}
                </View>
              );
            }
          }}
        />
      </SafeAreaView>
     

      <BottomModal
        visible={isSubriber}
        setvisible={setIsSubscriber}
        iconType={Icons.AntDesign}
        iconName={"questioncircleo"}
        text={"Are you sure you want to unsubcribe ?"}
        yesno
        onSuccess={() => {
          onSubcribeChannel();
        }}
      />
    </View>
  );
};
const Header = (props) => {
  const {
    isCurrentUser,
    channelDetail,
    onSubcribeChannel,
    setIsSubscriber,
    onCreateChat,
    selectedCategory,
    setselectedCategory,
    AllCategory,
    setIsUpdateChannel,
    deleteChannel,
    setShowReportReasonModal,
  } = props;
  const navigation = useNavigation();
  return (
    <>
      <View style={[styles.subHeader1, {}]}>
        <Image
          style={styles.image}
          source={{
            uri: channelDetail?.banner,
          }}
        />
        <BackArrow
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: COLORS.blackWithOpacity,
            borderRadius: wp(1.5),
          }}
        />
        <View style={{}}>
          <CirclImage
            style={styles.CirclImage}
            uri={channelDetail?.channelLogo}
          />
          <Menu
            style={{
              alignSelf: "flex-end",
              marginTop: hp(1.5),
            }}
          >
            <MenuTrigger>
              <Icon
                type={Icons.Entypo}
                name={"dots-three-vertical"}
                style={styles.icon}
              />
            </MenuTrigger>

            <MenuOptions style={styles.menuOption}>
              <MenuOption
                onSelect={() => {
                  if (isCurrentUser) {
                    deleteChannel();
                  } else {
                    // setShowReportReasonModal(true);
                    navigation.navigate(SCREENS.CreateReport, {
                      from: "Channel",
                      id:channelDetail?._id
                    });
                  }
                }}
              >
                <Text style={[styles.txt, { color: COLORS.fire }]}>
                  {isCurrentUser ? "Delete" : "Report"}
                </Text>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  if(isCurrentUser){

                    navigation.navigate(SCREENS.UpdateCreatChannel,{
                      Updatedata:channelDetail
                    })
                  }
                }}
              >
                <Text
                  style={[
                    styles.txt,
                    { color: COLORS.secondary, marginVertical: SIZES.ten },
                  ]}
                >
                  {isCurrentUser ? "Update" : "Cancel"}
                </Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View style={{ marginTop: hp(2) }}>
          <Text style={styles.txtTitle}>{channelDetail?.name}</Text>
          <UserDetail
            isCurrentUser={isCurrentUser}
            channelData={channelDetail}
            onSubcribeChannel={onSubcribeChannel}
            setIsSubscriber={setIsSubscriber}
            onCreateChat={onCreateChat}
          />
        </View>
      </View>

      <View style={{ paddingVertical: hp(2), paddingHorizontal: wp(2) }}>
        <CategoryList
          selected={selectedCategory}
          onSelect={(item) => {
            setselectedCategory(item);
          }}
          data={AllCategory}
        />
      </View>
    </>
  );
};

const UserDetail = ({
  isCurrentUser,
  channelData,
  setIsSubscriber,
  onSubcribeChannel,
  onCreateChat,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text
        style={styles.txtShortbio}
      >{`@${channelData?.name} ${channelData?.subscribersCount} subscribe`}</Text>

      <View style={styles.videoimageContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={STYLES.row}
          onPress={() => {
            
              navigation.navigate(SCREENS.ChannelVideos, {
                from: "owner",
                userId: channelData?._id,
              });
            
          }}
        >
          <Icon
            type={Icons.Ionicons}
            name={"videocam-outline"}
            style={styles.videoicon}
          />
          <Text style={styles.txtVideoCount}>
            {channelData?.videos?.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[STYLES.row, {}]}
          onPress={() => {
           
              navigation.navigate(SCREENS.ChanelImages, {
                userId: channelData?._id,
              });
            
          }}
        >
          <Icon
            type={Icons.Ionicons}
            name={"images-outline"}
            style={styles.videoicon}
          />
          <Text style={styles.txtVideoCount}>
            {channelData?.images?.length}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subcriberContainer}>
        <Text style={[styles.txt, { width: wp(40), textAlign: "justify" }]}>
          Subscribers
        </Text>
        <Text style={styles.txtsubcribe}>{channelData?.subscribersCount}</Text>
      </View>
      <View style={styles.subcriberContainer}>
        <Text style={styles.txtsubcribe}>Subscription Costs:</Text>
        <Text style={styles.txtsubcribe}>
          {`$${channelData?.subscriptionFee}`}
        </Text>
      </View>
      {!isCurrentUser && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title={
              channelData?.isCurrentUserSubscribed ? "unsubcribe" : "subcribe"
            }
            btnStyle={styles.unsub}
            titleStyle={styles.txtsubcribe}
            onPress={() => {
              if (channelData?.isCurrentUserSubscribed) {
                setIsSubscriber(true);
              } else {
                onSubcribeChannel();
              }
            }}
            hasIcon
          />
          <CustomButton
            title={"Message"}
            btnStyle={styles.msg}
            titleStyle={styles.txtsubcribe}
            onPress={onCreateChat}
            hasIcon
          />
        </View>
      )}
    </View>
  );
};



const RenderItem = memo(
  ({ item, index, owner, onDeleteVideo, value, titleColor, props }) => {
    const navigation = useNavigation();
    function toHoursAndMinutes(ms) {
      const totalSeconds = ms / 1000;
      const totalMinutes = Math.floor(totalSeconds / 60);

      const seconds = totalSeconds % 60;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      if (seconds !== 0 || hours !== 0 || minutes !== 0) {
        return `${parseInt(hours)}:${parseInt(minutes)}:${parseInt(seconds)}`;
      }
    }
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREENS.VideoDetail, { id: item?._id });
          }}
          style={[styles.itemContainer2]}
        >
          <ImageBackground
            style={styles.image2}
            source={{
              uri: item?.thumbnailUrl,
            }}
          >
            {item?.videoDetail?.duration && (
              <View
                style={{
                  backgroundColor: COLORS.modal,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: wp(1),
                  width: wp(13),
                  marginBottom: hp(2),
                  marginRight: wp(1.5),
                  height: hp(3),
                  alignSelf: "flex-end",
                }}
              >
                <Text style={styles.txt1}>
                  {toHoursAndMinutes(item.videoDetail.duration)}
                </Text>
              </View>
            )}
          </ImageBackground>
          <View
            style={{
              backgroundColor: COLORS.primary,
              height: 2,
              width: `${value}%`,
            }}
          ></View>
        </TouchableOpacity>
        <HomeListFooter
          style={{ marginBottom: hp(1.5) }}
          description={item.description}
          item={item}
          onPress={() => {
            if (props.onChannelPress) {
              props.onChannelPress(item);
            } else {
              navigation.navigate(SCREENS.Channel, {
                from: "user",
                userId: item?.channelId._id,
              });
            }
          }}
          titleColor={titleColor}
        />
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: wp(2),
    marginTop: hp(1.2),
  },
  txt: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    textAlign: "center",
  },
  txtTitle: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    textAlign: "center",
  },
  txt1: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    marginStart: wp(2),
  },
  txtShortbio: {
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    textAlign: "center",
    fontSize: rf(1.2),
  },
  outerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  videoimageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: hp(1.5),
  },
  container1: {
    position: "absolute",
    backgroundColor: COLORS.modal,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: COLORS.blackWithOpacity,
  },
  visualViewport: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: hp(1),
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalView: {
    backgroundColor: COLORS.modal,
    borderTopLeftRadius: wp("5%"),
    borderTopRightRadius: wp("5%"),
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
  image: {
    height: hp(20),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
    alignSelf: "center",
  },
  cover: {
    height: hp(20),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
    backgroundColor: COLORS.whiteOpacity,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  image1: {
    height: hp(10),
    width: wp(22),
    marginRight: wp(2),
    marginTop: hp(1),
    borderRadius: wp(2),
  },
  txtReport: {
    textAlign: "right",
    marginTop: hp(1.5),
    textDecorationLine: "underline",
    color: COLORS.primary,
    fontSize: rf(1.8),
    fontFamily: FONTFAMILY.Bold,
  },
  CostsContainer: {
    fontSize: rf(2),
    fontFamily: FONTFAMILY.RobotoLight,
    color: COLORS.white,
    width: wp(30),
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
    paddingHorizontal: wp(1.5),
  },
  txtsubcribe: {
    fontSize: rf(2),
    fontFamily: FONTFAMILY.RobotoLight,
    width: wp(40),
    color: COLORS.white,
  },
  cancelbtnstyle: {
    backgroundColor: COLORS.transparent,
    height: hp(6),
    width: wp(30),
  },
  savebtn: {
    backgroundColor: COLORS.primary,
    height: hp(6),
    width: wp(30),
    borderRadius: wp(1),
  },
  btnMessage: {
    backgroundColor: COLORS.transparent,
    height: hp(5),
    width: wp(31),
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
  },
  unsub: {
    backgroundColor: COLORS.primary,
    height: hp(5),
    width: wp(30),
    borderRadius: wp(1),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  msg: {
    backgroundColor: COLORS.transparent,
    height: hp(5),
    width: wp(30),
    borderRadius: wp(1),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  CirclImage: {
    height: wp(23),
    width: wp(23),
    borderRadius: wp(23),
    borderWidth: 2,
    borderColor: COLORS.BLACK,
    position: "absolute",
    alignSelf: "center",
    bottom: -10,
  },
  CirclImage1: {
    height: wp(23),
    width: wp(23),
    borderRadius: wp(23),
    borderWidth: 2,
    borderColor: COLORS.BLACK,
    alignSelf: "center",
    bottom: hp(5),
  },
  icon: {
    color: COLORS.white,
    fontSize: rf(2.5),
    right: wp(2),
    top: hp(1),
  },
  circleImage1: {
    alignSelf: "center",
    height: wp(20),
    width: wp(20),
  },
  titleContainer: {},
  videoicon: {
    color: COLORS.white,
    fontSize: rf(3),
  },
  txtVideoCount: {
    color: COLORS.white,
    fontSize: rf(2),
    fontFamily: FONTFAMILY.RobotoLight,
    marginStart: wp(1),
  },
  subcriberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(1),
    paddingLeft: wp(4),
  },
  menuOption: {
    backgroundColor: COLORS.modal,
    paddingVertical: SIZES.ten,
    alignItems: "baseline",
    paddingHorizontal: wp(3),
  },
  txtSave: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: rf(1.5),
  },
  txtCancel: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: rf(2),
    color: COLORS.primary,
    textDecorationLine: "underline",
  },
  txtMessage: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: rf(1.5),
    color: COLORS.brownGrey,
  },
  txtrecentUpload: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginTop: hp(1),
  },
  uploadContainer: {
    width: wp(99),
    backgroundColor: COLORS.primary,
    height: hp(20),
    alignItems: "center",
  },
  backArrow: { position: "absolute" },
  editbtn: {
    color: COLORS.primary,
    fontSize: rf(3),
    position: "absolute",
    alignSelf: "center",
    right: wp(40),
    backgroundColor: COLORS.primary,
    padding: wp(0.5),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: COLORS.white,
    top: 20,
  },
  inputContainer: {
    paddingHorizontal: wp(2),
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  header: {
    position: "absolute",
    backgroundColor: COLORS.BLACK,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1,
  },
  subHeader: {
    height: headerHeight / 2,
    width: "100%",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  subHeader1: {
    width: "100%",
  },
  conversation: { color: "white", fontSize: 16, fontWeight: "bold" },
  searchText: {
    color: "#8B8B8B",
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
  },
  searchBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#0F0F0F",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  listItem: {
    flexDirection: "row",
    width: "95%",
    marginLeft: 10,
    marginTop: 18,
    alignItems: "center",
  },
  contactIcon: {
    height: 60,
    width: 60,
    borderRadius: 999,
  },
  contactName: {
    marginLeft: 15,
    fontSize: 16,
    color: "white",
  },
  messageContainer: {
    marginRight: 20,
    paddingHorizontal: 15,
    width: width * 0.8,
  },
  message: {
    fontSize: 14,
    color: "#979799",
  },
  itemContainer: {
    backgroundColor: COLORS.modal,
    paddingHorizontal: wp(4),
    paddingVertical: hp(0.8),
    marginRight: wp(2),
    borderRadius: wp(1),
  },
  itemContainer2: {
    backgroundColor: COLORS.modal,
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    overflow: "hidden",
  },
  image2: {
    height: hp(25),
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  endContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
  },
  txt2: {
    fontSize: rf(2.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
});

export default Channel;
