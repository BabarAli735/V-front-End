import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon, { Icons } from "./Icons";
import moment from "moment";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import CirclImage from "./CirclImage";
import { COLORS, FONTS, SIZES } from "../constants/them";

const { width } = Dimensions.get("window");
const TRANSLATE_X_THERESOLD = -width * 0.3;
const LIST_ITEM_HEIGHT = 70;
export default function NotificationListComponanat({
  task,
  onDismiss,
  simultaneousHandlers,
  onAccept,
  onReject,
  onMarkAsRead,
}) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const opacity = useSharedValue(1);
  const marginVertical = useSharedValue(10);
  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onStart: () => {},
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THERESOLD;
      if (shouldBeDismissed) {
        // translateX.value = withTiming(-width);
        //   itemHeight.value = withTiming(0);
        //   marginVertical.value = withTiming(0);
        //   opacity.value = withTiming(0, undefined, (isFinished) => {
        //     if (isFinished && onDismiss) {
        //       runOnJS(onDismiss)(task);
        //     }
        //   });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      borderBottomWidth: 1,
      borderColor: task.status === "read" ? COLORS.transparent : COLORS.fire,
      transform: [{ translateX: translateX.value }],
    };
  });
  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THERESOLD ? 1 : 0
    );
    return {
      opacity,
    };
  });
  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

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
  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <GestureHandlerRootView style={[{ paddingHorizontal: SIZES.fifteen }]}>
        <PanGestureHandler
          onGestureEvent={panGesture}
          simultaneousHandlers={simultaneousHandlers}
        >
          <Animated.View style={[styles.card, rStyle]}>
            <CirclImage style={styles.image} />

            <View style={{ flex: 1, paddingLeft: SIZES.fifteen }}>
              <Text style={[FONTS.mediumFont12, { color: COLORS.white }]}>
                task?.payload?.title
              </Text>
              <Text style={[FONTS.mediumFont10, { color: COLORS.white }]}>
                {getTimeAgo(task?.created_at)}
              </Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      
          <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (task.isOpened) {
                  return;
                }
                if (translateX.value < TRANSLATE_X_THERESOLD) {
                //   onMarkAsRead(task);
                }
              }}
              style={{
                marginRight: wp("6%"),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.secondary,
                height: "100%",
                width: wp("23%"),
                borderRadius: wp("2%"),
              }}
              disabled={task.status === "read"}
            >
              <Icon
                type={Icons.Ionicons}
                name={
                  task.isOpened
                    ? "ios-checkmark-done"
                    : "checkmark-outline"
                }
                color={COLORS.white}
                size={30}
              />
              <Text style={[FONTS.mediumFont12, { color: COLORS.white }]}>
                Read
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (translateX.value < TRANSLATE_X_THERESOLD) {
                //   onDismiss(task);
                }
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: wp("15%"),
                height: "100%",
              }}
            >
              <Icon
                type={Icons.Ionicons}
                name="md-trash-outline"
                color={COLORS.white}
                size={30}
              />
              <Text style={[FONTS.mediumFont12, { color: COLORS.white }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </Animated.View>
        
      </GestureHandlerRootView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  task: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    backgroundColor: "white",
    shadowOpacity: 0.5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    borderRadius: 10,
  },
  taskContainer: {
    // width: "100%",
    // alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: hp("10%"),
    width: 150,
    position: "absolute",
    backgroundColor: COLORS.fire,
    right: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    borderTopLeftRadius: wp("2%"),
    top: 0,
    flexDirection: "row",
    paddingRight: wp("2%"),
    borderRadius: wp("2%"),
  },
  iconContainer1: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    backgroundColor: COLORS.primary,
    position: "absolute",
    right: 75,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: wp("2%"),
    top: 10,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.fifteen,
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.fifteen,
    backgroundColor: COLORS.apple,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: width,
  },
});
