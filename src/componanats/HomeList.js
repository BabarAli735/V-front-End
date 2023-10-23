import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  FlatList,
  RefreshControl,
} from "react-native";
import FastImage from "react-native-fast-image";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { COLORS, FONTFAMILY, SCREENS, SIZES } from "../constants/them";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import Icon, { Icons } from "./Icons";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import channelHandler from "../screens/Channel/channelHandler";
import VideosListSkeleton, {
  VideoSkeleton,
} from "./skeleton/VideosListSkeleton";
import HomeListFooter from "./HomeListFooter";
import {saveHomeListLeavingIndex} from '../redux/slices'
import useReduxStore from "../hook/UseReduxStore";
import { useSharedValue } from "react-native-reanimated";
const HomeList = (props) => {
  const {dispatch,getState}=useReduxStore()
  let List = props?.data ? props?.data : data;
const selectedCategory=useSharedValue('')
  const {HomelistIndex}=getState('videos')
  const onEndReachedCalledDuringMomentum = React.useRef(true);
  const ref = React.useRef(null);
  const index=useRef(0)
  useScrollToTop(ref);
//   useEffect(()=>{
//   c
// }
// setTimeout(()=>{
//   scrollToIndex()
// },500)
//     return()=>{    
      
//   dispatch(saveHomeListLeavingIndex(index.current))

//     }
//     },[index.current])
    
  const onEndReachedHandler = async ({ distanceFromEnd }) => {
    if (!onEndReachedCalledDuringMomentum.current) {
      props.loadeMore();
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  const renderItem = ({ item,index}) => {
    let find = props.videosDuration?.find((x) => x?.videoId === item?.id);
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
        owner={props?.owner}
        props={props}
        onDeleteVideo={() => {
          props.deleteChannelVideo(item?._id);
        }}
        dispatch={dispatch}
        titleColor={props?.titleColor}
      />
    );
  };
  
  const keyExtractor = useCallback((item, index) => index.toString());
 
       const onViewableItemsChanged=({changed})=>{
index.current=changed[0].index
       }
  
  // 2. create a reference to the function (above)
  const viewabilityConfigCallbackPairs = React.useRef([
    {onViewableItemsChanged },
  ])
  return (
    <View style={{ flex: 1, marginTop: hp(2) }}>
      <FlatList
        data={List}
        ref={ref}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={props.ListHeaderComponent}
        viewabilityConfig={{viewAreaCoveragePercentThreshold:5}}
        // pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
        onScroll={props.onScroll}
        refreshControl={
          <RefreshControl
            refreshing={props.isLoading}
            onRefresh={props?.onRefresh}
            tintColor={COLORS.white}
          />
        }
        extraData={props.extraData}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          if (List?.length === 0) {
            return null;
          } else {
            return (
              <>
                {props.isEnd ? (
                  <View style={styles.endContainer}>
                    <Text style={styles.txt2}>No More</Text>
                  </View>
                ) : (
                  [1].map((item, index) => {
                    return <VideoSkeleton key={index.toString()} />;
                  })
                )}
              </>
            );
          }
        }}
        
        disableVirtualization={true}
        initialNumToRender={20}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        onEndReached={onEndReachedHandler}
      />
    </View>
  );
};

const RenderItem = memo(
  ({ item, index, owner, onDeleteVideo, value, titleColor, props,dispatch,List }) => {
    const navigation = useNavigation();
    function toHoursAndMinutes(ms) {
      const totalSeconds = ms / 1000;
      const totalMinutes = Math.floor(totalSeconds / 60);

      const seconds = totalSeconds % 60;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      // console.log("seconds===", seconds.toFixed(0));
      // console.log("minuts===", minutes);
      // console.log("hours===", hours);
      if (seconds !== 0 || hours !== 0 || minutes !== 0) {
        return `${parseInt(hours)}:${parseInt(minutes)}:${parseInt(seconds)}`;
      }
    }
    return (
      <>
        <TouchableOpacity
          onPress={() => {
  dispatch(saveHomeListLeavingIndex(index))
         
            navigation.navigate(SCREENS.VideoDetail, { id: item?._id });
          }}
          style={[styles.itemContainer]}
        >
          <FastImage
            style={styles.image}
            source={{
              uri: item?.thumbnailUrl,
            }}
          >
            {owner && (
              <Menu
                style={{
                  position: "absolute",
                  top: 0,
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
                  <MenuOption onSelect={onDeleteVideo}>
                    <Text style={[styles.txt, { color: COLORS.fire }]}>
                      {"Delete"}
                    </Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => {
                      navigation.navigate(SCREENS.UploadImagesVideo, {
                        from: "Video",
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
                      {"update"}
                    </Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            )}
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
          </FastImage>
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
  itemContainer: {
    backgroundColor: COLORS.modal,
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    overflow: "hidden",
  },
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
  },
  txt2: {
    fontSize: rf(2.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  txt1: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.RobotoBold,
  },
  image: {
    height: hp(25),
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
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
  endContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
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
export default memo(HomeList);
