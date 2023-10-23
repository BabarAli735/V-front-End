import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import CirclImage from "./CirclImage";
import { COLORS, FONTFAMILY, SCREENS, STYLES } from "../constants/them";
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../common/responsivefunction";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { Share } from "react-native";
import Icon, { Icons } from "./Icons";
import { useState } from "react";
import { onDislikeVideoAction, onlikeVideoAction } from "../redux/slices";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
export default function HomeListFooter(props) {
  const dispatch = useDispatch();
  const { item, titleColor } = props;
  const [isLike, setIsLike] = useState(false);
  const [isDisLike, setIsDisLike] = useState(false);
  const onLikeVideos = useCallback(() => {
    const id = item.id;
    const params = {
      id: item.id,
    };
    setIsLike(true);
    setIsDisLike(false);
    dispatch(onlikeVideoAction(params))
      .unwrap()
      .then((response) => {
        console.log("onLikeVideos response", response);
      })
      .catch((err) => {
        console.log("onLikeVideos Error", err);
      });
  }, [isLike]);
  const onDisLikeVideos = useCallback(() => {
    const params = {
      id: item.id,
    };
    setIsLike(false);
    setIsDisLike(true);
    dispatch(onDislikeVideoAction(params))
      .unwrap()
      .then((response) => {
        // console.log("onDisLikeVideos response", response);
      })
      .catch((err) => {
        console.log("onLikeVideos Error", err);
      });
  }, [isDisLike]);
  const getTimeAgo = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    const diff = now.diff(created);
    const duration = moment.duration(diff);

    if (duration.asSeconds() < 60) {
      return `${Math.round(duration.asSeconds())} seconds ago`;
    } else if (duration.asMinutes() < 60) {
      return `${Math.round(duration.asMinutes())} minutes ago`;
    } else if (duration.asHours() < 24) {
      return `${Math.round(duration.asHours())} hours ago`;
    } else if (duration.asDays() < 30) {
      return `${Math.round(duration.asDays())} days ago`;
    } else {
      return `${Math.round(duration.asMonths())} months ago`;
    }
  };
  const navigation = useNavigation();
  return (
    <>
      {/* <View
        style={[
          STYLES.row,
          { backgroundColor: COLORS.BLACK, alignSelf: "flex-end" },
        ]}
      >
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
                size={rf(2)}
              />

              <Text style={styles.txtLike}>
                {isLike ? item?.likes?.length + 1 : item?.likes?.length}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.txtLike}>|</Text>
          <TouchableOpacity
            style={styles.likeContainer}
            disabled={isDisLike}
            onPress={onDisLikeVideos}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.txtLike}>
                {isDisLike
                  ? item?.dislikes?.length + 1
                  : item?.dislikes?.length}
              </Text>
              <Icon
                type={Icons.AntDesign}
                name={"dislike1"}
                style={[
                  styles.lDIcons,
                  {
                    transform: [{ rotateY: "180deg" }],
                    color: isDisLike ? COLORS.black : COLORS.white,
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
      </View> */}
      <TouchableOpacity
        style={[styles.container, props.style]}
        activeOpacity={0.8}
        onPress={props.onPress}
      >
        <CirclImage uri={item?.channelId?.channelLogo} />
        <View style={{ marginStart: wp(2) }}>
          <Text
            style={[
              styles.txt,
              { color: titleColor ? titleColor : COLORS.white },
            ]}
            numberOfLines={2}
          >
            {item?.title}
          </Text>
          <View style={STYLES.row}>
            <Text
              style={[
                styles.txt1,
                { color: titleColor ? titleColor : COLORS.white },
              ]}
            >
              {item?.channelId?.name} -{" "}
            </Text>

            <Text
              style={[
                styles.txt1,
                { color: titleColor ? titleColor : COLORS.white },
              ]}
            >
              {item?.views?.length} Views{" "}
            </Text>
            <Text
              style={[
                styles.txt1,
                { color: titleColor ? titleColor : COLORS.white },
              ]}
            >
              {getTimeAgo(item?.createdAt)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(1),
  },
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  txt1: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Light,
  },
  container3: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(28),
    justifyContent: "center",
    backgroundColor: COLORS.brownGrey,
    borderRadius: wp(2),
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(2),
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
