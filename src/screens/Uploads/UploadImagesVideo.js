import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import * as Progress from "react-native-progress";
import { createThumbnail } from "react-native-create-thumbnail";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import { COLORS, CONSTANTS, FONTFAMILY, STYLES } from "../../constants/them";
import CustomHeader from "../../componanats/CustomHeader";
import Icon, { Icons } from "../../componanats/Icons";
import InputText from "../../componanats/InputText";
import CustomButton from "../../componanats/CustomButton";
import BottomModal from "../../componanats/BottomModal";
import UploadingHandler from "./UploadingHandler";
import DocumentPickerModal from "../../componanats/modal/DocumentPickerModal";
import { ActivityIndicator } from "react-native";
export default function UploadImagesVideo(props) {
  const ref = useRef();
  const {
    selectedCategory,
    selectedData,
    thumbNailData,
    uploadImageModal,
    uploadThumbnailModal,
    showDropDownModal,
    successModal,
    AllCategory,
    videoTitle,
    videoDescription,
    from,
    isUploading,
    isUpdate,
    uploadingProgress,
    uploadingController,
    data, setData,
    uploadImage,
    setVideoDuration,
    setVideoDescription,
    setVideoTitle,
    dispatch,
    onUploadVideo,
    dismissKeyboard,
    setSuccesModal,
    setShowDropDownModal,
    setUploadThumbNailModal,
    setUploadImageModal,
    setThumbnailData,
    setSelectedData,
    setSelectedCategory,
  } = UploadingHandler(props);
 
  return (
    <TouchableWithoutFeedback style={{}} onPress={dismissKeyboard}>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.BLACK,
          paddingHorizontal: wp(2),
        }}
        showsVerticalScrollIndicator={false}
      >
        <CustomHeader
          title={from === "Video" ? "Upload Video" : "Upload Image"}
          showBackButton
        />
        {isUploading && (
          <ShowPogressVideo
            progress={uploadingProgress}
            controller={uploadingController}
            isUpdate={isUpdate}
          />
        )}
        <TouchableOpacity
          style={[styles.uploadVideo]}
          activeOpacity={1}
          onPress={() => {
            if (selectedData === "") {
              setUploadImageModal(true);
            }
          }}
        >
          {selectedData ? (
            <>
              {from === "Video" ? (
                <Video
                  // ref={video}
                  style={styles.Image}
                  source={{
                    uri: selectedData,
                  }}
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  useNativeControls={isUploading ? false : true}
                  onPlaybackStatusUpdate={(status) => {}}
                  onLoad={(data) => {
                    setVideoDuration(data.durationMillis);
                  }}
                />
              ) : (
                <Image
                  style={styles.Image}
                  source={{
                    uri: selectedData,
                  }}
                  resizeMode="cover"
                />
              )}
              {!isUpdate && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    if (!isUploading) {
                      setSelectedData("");
                    }
                  }}
                  style={styles.crosButton}
                >
                  <Icon
                    type={Icons.Entypo}
                    name={"cross"}
                    color={COLORS.white}
                    size={20}
                    style={{}}
                  />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text style={[styles.txt1]}>
              Tap here to upload the {from === "Video" ? "Video" : "Image"}
            </Text>
          )}
        </TouchableOpacity>
        {selectedData && (
          <>
            {from === "Video" ? (
              <RenderVideo
                thumbNailData={thumbNailData}
                showDropDownModal={showDropDownModal}
                setShowDropDownModal={setShowDropDownModal}
                setUploadThumbNailModal={setUploadThumbNailModal}
                selectedData={selectedData}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSuccesModal={setSuccesModal}
                onUploadVideo={onUploadVideo}
                AllCategory={AllCategory}
                videoTitle={videoTitle}
                videoDescription={videoDescription}
                setVideoDescription={setVideoDescription}
                setVideoTitle={setVideoTitle}
                dispatch={dispatch}
                setThumbnailData={setThumbnailData}
                isUpdate={isUpdate}
                isUploading={isUploading}
                data={data}
                setData={setData}
              />
            ) : (
              <RenderImage
                setSuccesModal={setSuccesModal}
                caption={videoTitle}
                description={videoDescription}
                setDescription={setVideoDescription}
                setCaption={setVideoTitle}
                uploadImage={uploadImage}
                isUpdate={isUpdate}
              />
            )}
          </>
        )}
        <DocumentPickerModal
          visible={uploadImageModal}
          setVisible={setUploadImageModal}
          from={from}
          handleImageData={(res) => {
            if (res.type === "success") {
              setSelectedData(res.uri);
              createThumbnail({
                url: res.uri,
                timeStamp: 10000,
              })
                .then((response) => {
                  console.log(response);
                  // setVideoTHumnail(response?.path);
                  setThumbnailData(`file://${response?.path}`);
                })
                .catch((err) => console.log({ err }));
            }
            if (res.assets !== null) {
              setSelectedData(res.assets[0].uri);
              createThumbnail({
                url: res.assets[0].uri,
                timeStamp: 10000,
              })
                .then((response) => {
                  console.log(response);
                  setThumbnailData(`file://${response?.path}`);

                  // setVideoTHumnail(response?.path);
                })
                .catch((err) => console.log({ err }));
            }
          }}
        />
        <DocumentPickerModal
          visible={uploadThumbnailModal}
          setVisible={setUploadThumbNailModal}
          from={"thumbnail"}
          handleImageData={(res) => {
            if (res.type === "success") {
              setThumbnailData(res.uri);
            }
            if (res.assets !== null) {
              setThumbnailData(res.assets[0].uri);
            }
          }}
        />
        <BottomModal
          visible={successModal}
          setvisible={setSuccesModal}
          iconType={Icons.AntDesign}
          iconName={"checkcircleo"}
          icoColor={COLORS.green}
          text={from === "Video" ? "Video is Uploading" : "Image is Uploading"}
          btnText="Continue"
          onSuccess={() => {
            props.navigation.goBack();
          }}
        />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const DropDownModal = ({
  visible,
  inVisible,
  AllCategory,
  selectedCategory,
  setSelectedCategory,
  data,
  setData,
}) => {
  return (
    <Modal style={{ flex: 1 }} visible={visible} transparent>
      <View style={styles.dropDownContainer}>
        <View style={styles.listContainer}>
          <Text style={styles.txt3}>{"Select Video Category"}</Text>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <RenderItem
                  item={item}
                  index={index}
                  inVisible={inVisible}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  onselect={(itemdata) => {
                    const temp = [];
                    data?.filter((item, index) => {
                      if (itemdata.item === item.item) {
                        temp.push({ ...item, isSelected: !item.isSelected });
                      } else {
                        temp.push(item);
                      }
                      setData(temp);
                    });
                  }}
                />
              );
            }}
            contentContainerStyle={styles.container2}
            ItemSeparatorComponent={() => {
              return <View style={styles.itemSeprator} />;
            }}
            ListFooterComponent={() => {
              return (
                <CustomButton
                  title="Add"
                  onPress={() => {
                    let temp = [];
                    data.map((item, index) => {
                      if (item.isSelected) {
                        temp.push(item.item);
                      }
                    });
                    setSelectedCategory(temp);
                    inVisible(false);
                  }}
                />
              );
            }}
          />
          <TouchableOpacity
            style={styles.closeContainer}
            onPress={() => {
              inVisible(false);
            }}
          >
            <Icon
              name={"close"}
              type={Icons.AntDesign}
              size={rf(3)}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const RenderItem = ({
  item,
  index,
  inVisible,
  selectedCategory,
  setSelectedCategory,
  onselect,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.dropdowItemContainer}
        onPress={() => {
          onselect(item);
        }}
      >
        <Icon
          name={item.isSelected ? "checkbox-active" : "checkbox-passive"}
          type={Icons.Fontisto}
          size={rf(1.8)}
          color={COLORS.white}
          style={{ marginTop: hp(0.5) }}
        />
        <Text style={[styles.txt2]}>{item.item}</Text>
      </TouchableOpacity>
    </View>
  );
};
const RenderVideo = ({
  thumbNailData,
  showDropDownModal,
  AllCategory,
  setShowDropDownModal,
  setUploadThumbNailModal,
  selectedCategory,
  setSelectedCategory,
  dispatch,
  videoTitle,
  setVideoTitle,
  videoDescription,
  setVideoDescription,
  onUploadVideo,
  setThumbnailData,
  isUpdate,
  isUploading,
  data,
  setData
}) => {
  
 
  return (
    <View>
      <View>
        <InputText
          placeholder={"Select video category"}
          iconName="down"
          iconType={Icons.AntDesign}
          hideLabel
          rightIcon
          onPress={() => {
            if (!isUploading) {
              setShowDropDownModal(true);
            }
          }}
        />
        <View style={styles.container3} activeOpacity={0.85}>
          <FlatList
            data={selectedCategory}
            numColumns={3}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.categoryContainer}>
                  <Text style={styles.txtcat}>{item}</Text>

                  <TouchableOpacity
                    style={{ borderRadius: wp(1), marginLeft: wp(0.2) }}
                    disabled={isUploading}
                    onPress={() => {
                      let temp = selectedCategory.filter(
                        (data) => data !== item
                      );
                      setSelectedCategory(temp);
                      const temp2 = [];
                      data?.filter((fiteritem, index) => {
                        if (item === fiteritem.item) {
                          temp2.push({
                            ...fiteritem,
                            isSelected: !fiteritem.isSelected,
                          });
                        } else {
                          temp2.push(fiteritem);
                        }
                        setData(temp2);
                      });
                    }}
                  >
                    <Icon
                      name={"close"}
                      type={Icons.Ionicons}
                      color={COLORS.white}
                      size={rf(2.3)}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            contentContainerStyle={{}}
          />
        </View>
        <DropDownModal
          visible={showDropDownModal}
          inVisible={setShowDropDownModal}
          AllCategory={AllCategory}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          data={data}
          setData={setData}
        />
      </View>

      <TouchableOpacity
        style={[styles.uploadVideo]}
        activeOpacity={1}
        onPress={() => {
          if (!isUploading) {
            if (thumbNailData === "") {
              setUploadThumbNailModal(true);
            }
          }
        }}
      >
        {thumbNailData ? (
          <>
            <View>
              <Image
                style={{ height: hp("29%"), width: "100%" }}
                source={{
                  uri: thumbNailData,
                }}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.transparent,
                  height: hp("30%"),
                  width: "100%",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  if (!isUploading) {
                    setUploadThumbNailModal(true);
                  }
                }}
              >
                <Text style={styles.txt}>Tap here to change thumbnail</Text>
              </TouchableOpacity>
            </View>
            {!isUpdate && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={async () => {
                  if (!isUploading) {
                    setThumbnailData("");
                  }
                }}
                style={styles.crosButton}
              >
                <Icon
                  type={Icons.Entypo}
                  name={"cross"}
                  color={COLORS.white}
                  size={18}
                  style={{}}
                />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Text style={[styles.txt1]}>
            Tap here to upload the Video thumbnail
          </Text>
        )}
      </TouchableOpacity>
      <InputText
        placeholder="Add video title here"
        hideLabel
        value={videoTitle}
        onChangeText={setVideoTitle}
        disableInput={isUploading}
      />
      <InputText
        placeholder="Add video description here"
        hideLabel
        style={{ height: hp(20), justifyContent: "flex-start" }}
        value={videoDescription}
        onChangeText={setVideoDescription}
        multiline
        disableInput={isUploading}
      />
      <CustomButton
        title={"Upload Video"}
        btnStyle={{ marginHorizontal: wp(10), marginTop: hp(3) }}
        onPress={onUploadVideo}
        disabled={isUploading}
      />
    </View>
  );
};

const RenderImage = ({
  setSuccesModal,
  caption,
  description,
  setCaption,
  setDescription,
  uploadImage,
}) => {
  return (
    <View style={{ marginTop: hp(2) }}>
      <InputText
        placeholder="Add caption here"
        hideLabel
        value={caption}
        onChangeText={setCaption}
      />
      <InputText
        placeholder="Add description here"
        hideLabel
        style={styles.description}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <CustomButton
        title={"Upload Image"}
        btnStyle={styles.btn}
        onPress={uploadImage}
      />
    </View>
  );
};

const ShowPogressVideo = ({ progress, controller,isUpdate }) => {
  const p1 = progress !== undefined ? progress : 0;
  const p2 = p1 / 100;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progress}>
        <Text style={styles.txt}>Uploading Video</Text>
        {Math.round(p1) !== 100 || Math.round(p1) <= 1 ? (
          <Text style={[styles.txt, { color: COLORS.primary }]}>
            {Math.round(p1)}
          </Text>
        ) : (
          <ActivityIndicator size={"small"} color={COLORS.primary} />
        )}
      </View>
      {Math.round(p1) !== 100 ? (
        <Progress.Bar
          progress={Math.round(p1) / 100}
          width={wp(90)}
          color={COLORS.primary}
          indeterminate={false}
        />
      ) : (
        <Progress.Bar
          progress={0.99}
          width={wp(90)}
          color={COLORS.primary}
          indeterminate={false}
        />
      )}
      {!isUpdate && (
        <TouchableOpacity
          style={styles.cancel}
          activeOpacity={0.85}
          onPress={() => {
            controller.current.abort();
          }}
        >
          <Text style={styles.txt}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
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
    borderWidth: 2,
    borderColor: COLORS.brown,
    justifyContent: "center",
    borderRadius: wp("2%"),
    borderStyle: "dashed",
    overflow: "hidden",
    marginHorizontal: wp(2),
    paddingHorizontal: 5,
    padding: 5,
  },
  txt1: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Light,
    marginStart: wp("5%"),
    textAlign: "center",
  },
  txt2: {
    fontSize: rf(2),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Light,
    marginStart: wp(1.5),
  },
  crosButton: {
    position: "absolute",
    right: 3,
    top: 3,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    height: wp(6),
    width: wp(6),
    borderRadius: wp("5%"),
  },
  Image: { height: hp("29%"), width: "100%" },
  dropDownContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: COLORS.blackWithOpacity,
    paddingHorizontal: wp(2),
  },
  listContainer: {
    height: hp(90),
    backgroundColor: COLORS.modal,
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
  },
  txt3: {
    textAlign: "center",
    fontFamily: FONTFAMILY.Bold,
    marginTop: hp(2.5),
    color: COLORS.white,
    marginStart: wp(1.5),
  },
  container2: {
    backgroundColor: COLORS.modal,
    padding: wp(2),
    borderRadius: wp(2),
    paddingBottom: hp(5),
  },
  itemSeprator: {
    height: hp(0.1),
    backgroundColor: COLORS.brown,
    marginTop: hp(2),
  },
  closeContainer: {
    padding: wp(3),
    position: "absolute",
    right: 0,
    top: 0,
  },
  dropdowItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(1.5),
  },
  description: { height: hp(15), justifyContent: "flex-start" },
  btn: { marginHorizontal: wp(10), marginTop: hp(3) },
  progressContainer: {
    paddingHorizontal: wp(2),
    paddingBottom: hp(2),
  },
  progress: {
    backgroundColor: COLORS.modal,
    height: hp(4),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2),
  },
  txt: {
    fontSize: rf(2),
    fontFamily: FONTFAMILY.Bold,
    color: COLORS.white,
    textAlign: "center",
  },
  txtcat: {
    fontSize: rf(1.25),
    fontFamily: FONTFAMILY.Bold,
    color: COLORS.white,
  },
  container3: {
    width: "100%",
    marginTop: hp(2),
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(1),
    marginRight: wp(1.5),
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(1.3),
    paddingVertical: hp(0.5),
    borderRadius: wp(0.5),
  },
  cancel: {
    backgroundColor: COLORS.primary,
    alignSelf: "flex-end",
    marginTop: hp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: wp(1),
  },
});
