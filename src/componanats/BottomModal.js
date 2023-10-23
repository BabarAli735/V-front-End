import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import { COLORS, FONTFAMILY, SCREENS, STYLES } from "../constants/them";
import Icon, { Icons } from "../componanats/Icons";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import InputText from "./InputText";
export default function BottomModal({
  visible,
  yesno,
  text,
  icoColor,
  textStyle,
  onSuccess,
  onFailure,
  iconType,
  iconName,
  setvisible,
  textInput,
  title,
  titleIcon,
  btnText,
  upload,
  setTextInputs,
}) {
  const navigation = useNavigation();

  const handleChange = useCallback(
    (value) => {
      setTextInputs((state) => ({ ...state, ...value }));
    },
    [setTextInputs]
  );
  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback
        style={{}}
        onPress={() => {
          setvisible(false);
        }}
      >
        <View style={[styles.container]}>
          {upload ? (
            <View style={[styles.modalView, STYLES.shadow, { height: hp(20) }]}>
              <View style={styles.line} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate(SCREENS.UploadImagesVideo, {
                    from: "image",
                  });
                  setvisible(false);
                }}
                style={{ marginTop: hp(1.5) }}
              >
                <Text style={[styles.txt3, { textAlign: "center" }]}>
                  Upload Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate(SCREENS.UploadImagesVideo, {
                    from: "Video",
                  });
                  setvisible(false);
                }}
                style={{ marginVertical: hp(1.5) }}
              >
                <Text style={[styles.txt3, { textAlign: "center" }]}>
                  Upload Video
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.modalView, STYLES.shadow]}>
              <View style={styles.line} />
              {title ? (
                <Text style={[styles.txt3, { textAlign: "center" }]}>
                  {title}
                </Text>
              ) : (
                <>
                  <Icon
                    name={iconName}
                    type={iconType}
                    color={icoColor ? icoColor : COLORS.primary}
                    size={rf(10)}
                    style={styles.icon1}
                  />
                  {titleIcon && (
                    <Text style={styles.txtTitle}>{titleIcon}</Text>
                  )}
                </>
              )}
              <View>
                {textInput ? (
                  <>
                    <InputText
                      placeholder="Enter Channel Name"
                      Value={textInput.channelName}
                      onChangeText={(value) => {
                        handleChange({ channelName: value });
                      }}
                    />
                    <InputText
                      placeholder="Enter Channel Profile"
                      Value={textInput.channelProfile}
                      onChangeText={(value) => {
                        handleChange({ channelProfile: value });
                      }}
                    />
                    <InputText
                      placeholder="Enter Channel Description"
                      Value={textInput.channelDescription}
                      style={{ height: hp(15), justifyContent: "flex-start" }}
                      onChangeText={(value) => {
                        handleChange({ channelDescription: value });
                      }}
                    />
                  </>
                ) : (
                  <Text style={[styles.txt, textStyle]}>{text}</Text>
                )}
              </View>
              {yesno ? (
                <View style={styles.container1}>
                  <CustomButton
                    title="Yes"
                    onPress={() => {
                      setvisible(false);
                      onSuccess();
                    }}
                    btnStyle={{
                      width: wp(30),
                      height: hp(6),
                      alignSelf: "center",
                      backgroundColor: COLORS.transparent,
                      borderWidth: 1,
                      borderColor: COLORS.white,
                    }}
                    hasIcon
                  />
                  <CustomButton
                    title="No"
                    onPress={() => {
                      setvisible(false);
                      if (onFailure) {
                        onFailure();
                      }
                    }}
                    btnStyle={{
                      width: wp(30),
                      height: hp(6),
                      alignSelf: "center",
                    }}
                    hasIcon
                  />
                </View>
              ) : (
                <CustomButton
                  title={btnText ? btnText : "Continue"}
                  onPress={() => {
                    onSuccess();
                  }}
                  btnStyle={{ width: wp(50), alignSelf: "center" }}
                />
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
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
    shadowColor: COLORS.white,

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
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    width: wp(80),
    marginVertical: hp(2),
    lineHeight: hp(3),
    textAlign: "center",
    alignSelf: "center",
  },
  txt2: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  txt3: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
    marginTop: hp(1.5),
  },
  iconContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: wp("5%"),
    maxHeight: hp("50%"),
  },
  closeIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    marginTop: hp("3%"),
  },
  line: {
    height: hp(0.7),
    borderRadius: wp(2),
    backgroundColor: COLORS.brownGrey,
    marginTop: hp(1),
    width: wp(30),
    alignSelf: "center",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: hp(2.5),
  },
  icon1: { alignSelf: "center", marginTop: hp(2) },
  txtTitle: {
    fontSize: rf(2),
    fontFamily: FONTFAMILY.Bold,
    marginTop: hp(1.5),
    textAlign: "center",
    color: COLORS.primary,
  },
});
