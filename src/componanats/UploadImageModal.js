import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import { COLORS, FONTFAMILY } from "../constants/them";
import Icon, { Icons } from "./Icons";
import utils from "../utils";
import AletModal from "./AlertModal";
import { Linking } from "react-native";
// import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
export default function UploadImageModal({
  visible,
  setVisible,
  handleImageData,
  type,
}) {
  const [isCamerPermissionDenied, setIsCameraPermissionDenied] =
    useState(false);
  const [isPhotoPermissionDenied, setIsPhotoPermissionDenied] = useState(false);

  const takeFromCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        // Handle denied permission
        // console.log("not Granted");
        setIsCameraPermissionDenied(true);
        return;
      } else {
        ImagePicker.launchCameraAsync({
          mediaTypes:
            type === "Video"
              ? ImagePicker.MediaTypeOptions.Videos
              : ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 0.2,
          allowsMultipleSelection: false,
        })
          .then(async (res) => {
            if (res?.assets !== null) {
              setVisible(false);
              handleImageData(res, "camera");
            }
          })
          .catch((error) => {
            console.log("error====", error);
          });
        }
    } catch (err) {}
  };

  const takeFromGallery = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        // Handle denied permission
        // console.log("not Granted");
        setIsPhotoPermissionDenied(true);
        return;
      } else {
        ImagePicker.launchImageLibraryAsync({
          mediaTypes:
            type === "Video"
              ? ImagePicker.MediaTypeOptions.Videos
              : ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
          allowsMultipleSelection: false,
        }).then((res) => {
          console.log("takeFromGallery res", res);
          if (res?.assets !== null) {
            setVisible(false);
            handleImageData(res, "gallery");
          }
        });
      }
    }
     catch (error) {}
  };

  const onPress = () => {
    setVisible(false);
  };
  return (
    <Modal visible={visible} transparent>
      <View style={[styles.container]}>
        <View style={[styles.modalView, {}]}>
          <View style={styles.closeIconContainer}>
            <Text style={styles.txt}>Choose your action</Text>
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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => takeFromCamera()}
            >
              <View style={{ alignItems: "center" }}>
                <Icon
                  name={"camera"}
                  type={Icons.AntDesign}
                  color={COLORS.brown}
                  size={24}
                />
                <Text style={styles.txt2}>Camera</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => takeFromGallery()}
            >
              <View style={{ alignItems: "center" }}>
                <Icon
                  name={"photo"}
                  type={Icons.MaterialIcons}
                  color={COLORS.brown}
                  size={24}
                />
                <Text style={styles.txt2}>Gallery</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <AletModal
        isModalVisible={isCamerPermissionDenied}
        desc="Please Enabled Camera Permission"
        title={"Allow Permission"}
        onAccepte={() => {
          setIsCameraPermissionDenied(false);
          Linking.openSettings();
        }}
        onCancelled={() => {
          setIsCameraPermissionDenied(false);
        }}
      />
      <AletModal
        isModalVisible={isPhotoPermissionDenied}
        desc="Please Enabled Gallery Permission"
        title={"Allow Permission"}
        onAccepte={() => {
          setIsPhotoPermissionDenied(false);
          Linking.openSettings();
        }}
        onCancelled={() => {
          setIsPhotoPermissionDenied(false);
        }}
      />
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
    alignItems: "center",
  },
  innerContainer: {
    // width: '70%',
    // height: '20%',
    backgroundColor: "red",
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
    shadowColor: COLORS.whiteOpacity,
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
    color: COLORS.brown,
    fontFamily: FONTFAMILY.Bold,
  },
  iconContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    paddingHorizontal: wp("5%"),
    marginVertical: hp("2%"),
    marginBottom: hp(2),
  },
  closeIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
