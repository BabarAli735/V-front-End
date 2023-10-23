import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import { COLORS, FONTFAMILY, STYLES } from "../../constants/them";
import Icon, { Icons } from "../Icons";
import {
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../common/responsivefunction";
import { ActivityIndicator } from "react-native";

export default function DocumentPickerModal({
  visible,
  setVisible,
  handleImageData,
  txtCamera,
  from,
}) {
  const [isLoading, setisLoading] = useState(false);

  const mediaType = from === "Video" ? "video/*" : "image/*";
  const takeFromCamera = async () => {
    setisLoading(true);
    ImagePicker.launchCameraAsync({
      mediaTypes:
        from === "Video"
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: from === "thumbnail" ? false : true,
    }).then(async (res) => {
      setisLoading(false);
      setVisible(false);
      handleImageData(res, "camera");
    });
  };

  const takeFromGallery = async () => {
    setisLoading(true);
    ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        from === "Video"
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: from === "thumbnail" ? false : true,
      selectionLimit:2048,
      
    }).then((res) => {
      setisLoading(false);

      setVisible(false);
      handleImageData(res, "gallery");
    });
  };

  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => {
          setVisible(false);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <>
              <RenderOption
                title={"Photo Library"}
                iconname={"images-outline"}
                iconType={Icons.Ionicons}
                onPress={takeFromGallery}
              />
              <View style={STYLES.horLine} />
              <RenderOption
                title={from === "Video" ? "Take Video" : "Take Image"}
                iconType={Icons.AntDesign}
                iconname={"camerao"}
                style={{}}
                onPress={takeFromCamera}
              />
              <View style={STYLES.horLine} />
              <RenderOption
                title={"Choose File"}
                iconType={Icons.FontAwesome}
                iconname={"folder-open-o"}
                onPress={async () => {
                  let result = await DocumentPicker.getDocumentAsync({
                    type: mediaType,
                    copyToCacheDirectory: true,
                  }).then((response) => {
                    setisLoading(false);
                    setVisible(false);
                    handleImageData(response);
                  });
                }}
              />
            </>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const RenderOption = ({ title, iconType, style, iconname, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.optionCOntainer, style]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.txt}>{title}</Text>
      <Icon name={iconname} type={iconType} color={COLORS.brown} size={24} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blackWithOpacity,
    justifyContent: "center",
    paddingHorizontal: wp(3),
  },
  modalContainer: {
    backgroundColor: "#272525",
    borderRadius: wp(2),
    padding: wp(3),
  },
  optionCOntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    fontFamily: FONTFAMILY.Bold,
    color: COLORS.white,
    fontSize: rf(2),
  },
});
