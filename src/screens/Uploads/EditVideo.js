import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import { COLORS, FONTFAMILY, STYLES } from "../../constants/them";
import CustomHeader from "../../componanats/CustomHeader";
import Icon, { Icons } from "../../componanats/Icons";
import UploadImageModal from "../../componanats/UploadImageModal";
import InputText from "../../componanats/InputText";
import CustomButton from "../../componanats/CustomButton";
import BottomModal from "../../componanats/BottomModal";
export default function EditVideo(props) {
  const ref = useRef();
  const { from } = props.route?.params;
  const [selectedData, setSelectedData] = useState("");
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [successModal, setSuccesModal] = React.useState(false);
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: hp(5) }}
      >
        <StatusBar translucent={false} />
        <CustomHeader title={"Edit Video"} showBackButton />

        {from === "Video" ? (
          <View>
            <View
              style={[styles.uploadVideo]}
              activeOpacity={1}
              onPress={() => {
                // setUploadImageModal(true);
              }}
            >
              <Video
                // ref={video}
                style={{ height: hp("30%"), width: "100%" }}
                source={
                  selectedData
                    ? {
                        uri: selectedData[0].uri,
                      }
                    : require("../../assets/video.mp4")
                }
                resizeMode={ResizeMode.COVER}
                isLooping
                useNativeControls
                onPlaybackStatusUpdate={(status) => {}}
                onError={(err) => {
                  console.log("error===", err);
                }}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={async () => {
                  setUploadImageModal(true);
                }}
                style={styles.crosButton}
              >
                <Icon
                  type={Icons.Entypo}
                  name={"cross"}
                  color={COLORS.white}
                  style={{}}
                />
              </TouchableOpacity>
            </View>
            <View>
              <InputText
                placeholder="Select Video Category"
                iconName="down"
                iconType={Icons.AntDesign}
                hideLabel
                rightIcon
                onPress={() => {
                  setShowDropDownModal(true);
                }}
              />
              <DropDownModal
                visible={showDropDownModal}
                inVisible={setShowDropDownModal}
              />
            </View>
            <InputText placeholder="Add Video title here" hideLabel />
            <InputText
              placeholder="Add Video description here"
              hideLabel
              style={{ height: hp(20), justifyContent: "flex-start" }}
            />

            <CustomButton
              title={"Edit Video"}
              btnStyle={{ marginHorizontal: wp(10), marginTop: hp(3) }}
              onPress={() => {
                setSuccesModal(true);
              }}
            />
          </View>
        ) : (
          <View style={{ marginTop: hp(2) }}>
            <InputText
              placeholder="Add caption here"
              iconName="email"
              hideLabel
            />
            <CustomButton
              title={"Upload Image"}
              btnStyle={{ marginHorizontal: wp(10), marginTop: hp(3) }}
              onPress={() => {
                setSuccesModal(true);
              }}
            />
          </View>
        )}
      </ScrollView>
      <UploadImageModal
        visible={uploadImageModal}
        setVisible={setUploadImageModal}
        options={{ type: "slide", from: "bottom" }}
        type={props.route.params.from}
        handleImageData={(res) => {
          setSelectedData(res.assets);
        }}
      />
      <BottomModal
        visible={successModal}
        setvisible={setSuccesModal}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        text={
          from === "Video"
            ? "Video Succefully Uploaded"
            : "Image Succefully Uploaded"
        }
        btnText="Continue"
        onSuccess={() => {
          props.navigation.goBack();
        }}
      />
    </>
  );
}

const DropDownModal = ({ visible, inVisible }) => {
  return (
    <Modal style={{}} visible={visible} transparent>
      <View
        style={{ top: hp(54), paddingHorizontal: wp(3), marginLeft: wp(3) }}
      >
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={(item, index) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: hp(1.2),
                }}
                onPress={() => {
                  inVisible(false);
                }}
              >
                <Icon
                  name={"checkbox-passive"}
                  type={Icons.Fontisto}
                  size={rf(1.5)}
                  color={COLORS.white}
                />
                <Text style={[styles.txt2]}>Category </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{
            backgroundColor: COLORS.modal,
            padding: wp(2),
            borderRadius: wp(2),
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(3),
  },
  uploadVideo: {
    marginTop: hp("4%"),
    height: hp("30%"),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.brown,
    borderRadius: wp("2%"),
    borderStyle: "dashed",
    overflow: "hidden",
    marginHorizontal: wp(2),
  },
  txt1: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Light,
    marginStart: wp("5%"),
    textAlign: "center",
  },
  txt2: {
    fontSize: rf(1.7),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Light,
    marginStart: wp(1.5),
  },
  crosButton: {
    position: "absolute",
    right: 10,
    top: 0,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: wp("1%"),
    borderRadius: wp("5%"),
  },
});
