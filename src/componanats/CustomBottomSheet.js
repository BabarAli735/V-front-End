import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import { COLORS, FONTFAMILY, STYLES } from "../constants/them";
import Icon, { Icons } from "./Icons";
export default function CustomBottomSheet({
  visible,
  options,
  setVisible,
  handleData,
  title,
  Data,
}) {

  const { height } = Dimensions.get("screen");
  const startPointY = options?.from === "top" ? -height : height;
  const transY = useRef(new Animated.Value(0));
  useEffect(() => {
    if (visible) {
      startAnimation(0);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      setVisible(false);
      Animated.timing(transY.current, {
        toValue: startPointY,
        duration: 0,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, []);

  const startAnimation = (toValue) => {
    Animated.timing(transY.current, {
      toValue,
      duration: 350,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const onPress = () => {
    setVisible(false);
    Animated.timing(transY.current, {
      toValue: startPointY,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: transY.current }] },
        ]}
      >
        <View style={[styles.modalView]}>
          <View style={styles.closeIconContainer}>
            <Text style={styles.txt}>{title}</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
              <Icon
                name={"close"}
                type={Icons.MaterialIcons}
                color={COLORS.brown}
                size={24}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <FlatList
              data={Data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => {
                      handleData(item.title);
                      onPress();
                    }}
                  >
                    <Text style={styles.txt}>{item.title}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{
                paddingBottom: hp("3%"),
              }}
            />
          </View>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalView: {
    backgroundColor: COLORS.modal,
    borderTopLeftRadius: wp("3%"),
    borderTopRightRadius: wp("3%"),
    padding: wp(3),
    width: "100%",
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  txt: {
    fontSize: rf(2),
    color: COLORS.brown,
    fontFamily: FONTFAMILY.Bold,
  },
  txt2: {
    fontSize: rf(1.5),
    color: COLORS.black,
    fontFamily: FONTFAMILY.Bold,
  },
  iconContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: wp("5%"),
    maxHeight: hp("30%"),
  },
  closeIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContainer: {
    marginTop: hp("3%"),
  },
});
