import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Share,
} from "react-native";
import FastImage from "react-native-fast-image";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from "../../constants/them";
import CustomHeader from "../../componanats/CustomHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import Icon, { Icons } from "../../componanats/Icons";
import channelHandler from "./channelHandler";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";
export default function ChannelImages(props) {
  const {
    AllChannelImages,
    ProfileData,
    deleteChannelImage,
    onLikeImage,
    onRemoveLikeImage,
    onDisLikeImage,
    onRemoveDisLikeImage,
  } = channelHandler(props);
  const [isImageViewVisible, setisImageViewVisible] = useState(false);

  const renderItem = ({ item, index }) => {
    return (
      <RenderUserImages
        isImageViewVisible={isImageViewVisible}
        onLikeImage={onLikeImage}
        onRemoveLikeImage={onRemoveLikeImage}
        onDisLikeImage={onDisLikeImage}
        onRemoveDisLikeImage={onRemoveDisLikeImage}
        item={item}
        index={index}
        ProfileData={ProfileData}
        deleteChannelImage={() => {
          deleteChannelImage(item._id);
        }}
        setisImageViewVisible={setisImageViewVisible}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={COLORS.BLACK} />
      <CustomHeader title="User Images" showBackButton />
      <FlatList
        data={AllChannelImages}
        renderItem={renderItem}
        contentContainerStyle={{}}
      />
    </View>
  );
}

const RenderUserImages = ({
  item,
  index,
  from,
  deleteChannelImage,
  ProfileData,
  onLikeImage,
  onRemoveLikeImage,
  onDisLikeImage,
  onRemoveDisLikeImage,
  setisImageViewVisible,
  isImageViewVisible,
}) => {
  const navigation = useNavigation();
  const [isLike, setIsLike] = useState(item?.userLiked);
  const [isDisLike, setIsDisLike] = useState(item?.userDisLiked);
  const [count, setCount] = useState(1);
  const isCurrentUser = ProfileData?._id === item?.ownerId;
  const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
  const scale = useSharedValue(1);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, []);
  // console.log('item===',item);

  const handleLike = () => {
    setIsDisLike(false)
    if(item.userDisLiked){
      onRemoveDisLikeImage(item?._id)
    }
    scale.value = withSpring(2);
    setTimeout(() => {
      scale.value = withTiming(1);
      setIsLike(!isLike)
      if (isLike) {
        onRemoveLikeImage(item?._id);
      } else {
        onLikeImage(item?._id);
      }   
    }, 1000);
  
  };
  const handleDisLike = () => {
    if(item.userLiked){
      onRemoveLikeImage(item?._id)
    }
    setIsLike(false)
    setTimeout(() => {
      setIsDisLike(!isDisLike)
      if (isDisLike) {
        onRemoveDisLikeImage(item?._id);
      } else {
        onDisLikeImage(item?._id);
      }   
    }, 300);
  
  };
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          // navigation.navigate(SCREENS.ImageDetail, {
          //   id: item._id,
          // });
          setisImageViewVisible(true);
        }}
      >
        <FastImage
          style={styles.image}
          imageStyle={{ borderRadius: wp(2) }}
          source={{
            uri: item?.image,
          }}
        >
          {isCurrentUser && (
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
          )}
        </FastImage>
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
          <Text style={[styles.txt, {}]}>{item?.caption}</Text>
          <Text style={[{ color: COLORS.brown, fontSize: rf(1.5) }]}>
            {moment(item.createdAt).format("MMMM Do YYYY")}
          </Text>
        </View>
        <View style={STYLES.row}>
          <View style={styles.container3}>
            <TouchableOpacity style={styles.likeContainer} onPress={handleLike}>
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

                <Text style={styles.txtLike}>
                  {item?.likesCount}
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.txtLike}>|</Text>
            <TouchableOpacity
              style={styles.likeContainer}
              onPress={handleDisLike}
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
      </View>
      <ImageView
        images={[
          {
            uri: item?.image,
          },
        ]}
        imageIndex={0}
        visible={isImageViewVisible}
        onRequestClose={() => setisImageViewVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(2),
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.fifteen,
  },
  image: {
    height: hp(30),
    width: "100%",
    borderRadius: wp(2),
    marginTop: hp(2),
    alignItems: "flex-end",
  },
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  icon: {
    color: COLORS.primary,
    fontSize: rf(2.5),
  },
  iconContainer: {
    backgroundColor: COLORS.blackWithOpacity,
    right: wp(2),
    top: hp(1),
    paddingVertical: hp(1),
    borderRadius: wp(0.5),
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
  likeContainer: {
    alignItems: "center",
  },
  lDIcons: {
    color: COLORS.white,
    fontSize: rf(2.5),
  },
  txtLike: {
    color: COLORS.white,
    fontSize: rf(1.5),
    fontFamily: FONTFAMILY.RobotoLight,
    marginHorizontal: wp(1.5),
  },
});
