import { Keyboard, StyleSheet, Text, View, BackHandler } from "react-native";
import React, { useEffect, useRef, useState } from "react";
// Configure the library (e.g., set the server URL)
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { SCREENS, CONSTANTS } from "../../constants/them";
import useReduxStore from "../../hook/UseReduxStore";
import utils from "../../utils";
import { useSocket } from "../../utils/SocketContext";
import {
  getAllCategorAction,
  getVideosByCategoryAction,
  onUpdateImageAction,
  onUpdateVideoAction,
  onUploadImageAction,
  onUploadVideoAction,
  saveIsUploading,
  saveUploadingData,
  saveUploadingProgress,
} from "../../redux/slices";
import AWS from 'aws-sdk'
AWS.config.update({
  accessKeyId:'AKIAUXMKYKMZYHPLHRXQ',
  secretAccessKey:'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',
  region:'us-east-1'
})
const s3=new AWS.S3()

const uploadTos3=(bucket,fileName,filePath)=>{
  const params={
Bucket:bucket,
Key:fileName,
Body:filePath
  }
  return s3.upload(params).promise()
}
export default function UploadingHandler(props) {
  const { dispatch, getState } = useReduxStore();
  const uploadingController = useRef(new AbortController());
  const { isUploading, uploadingData, uploadingProgress } = getState("videos");
  const { accessToken, userData } = getState("auth");
  const { channelData } = getState("channel");
  const { ProfileData } = getState("profile");
  const [selectedCategory, setSelectedCategory] = useState(
    uploadingData !== "" ? uploadingData?.selectedCategory : []
  );
  const [selectedData, setSelectedData] = useState(
    uploadingData !== "" ? uploadingData?.selectedData : ""
  );
  const [thumbNailData, setThumbnailData] = useState(
    uploadingData !== "" ? uploadingData?.thumbNailData : ""
  );
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [uploadThumbnailModal, setUploadThumbNailModal] = useState(false);
  const [showDropDownModal, setShowDropDownModal] = useState(false);
  const [successModal, setSuccesModal] = React.useState(false);
  const [videoTitle, setVideoTitle] = React.useState(
    uploadingData !== "" ? uploadingData?.videoTitle : ""
  );
  const [videoDescription, setVideoDescription] = React.useState(
    uploadingData !== "" ? uploadingData?.videoDescription : ""
  );
  const [videoDuration, setVideoDuration] = React.useState("");
  const [from, setFrom] = React.useState(props.route?.params.from);
  const [AllCategory, setAllCategory] = React.useState([]);

  const [data, setData] = useState([]);
  const socket = useSocket();
  const isUpdate = props.route.params.item ? true : false;

  useEffect(() => {
    if (props.route.params.item) {
      if (props.route.params.from === "Image") {
        setFrom(props.route.params.from);
        setSelectedData(props.route.params.item.image);
        setVideoTitle(props.route.params.item.caption);
        setVideoDescription(props.route.params.item.description);
      } else {
        setFrom(props.route?.params.from);
        setSelectedData(props.route.params.item.videoDetail?.url);
        setSelectedCategory(props.route.params.item.category[0]);
        setVideoTitle(props.route.params.item.title);
        setVideoDescription(props.route.params.item.description);
        setThumbnailData(props.route.params.item.thumbnailUrl);
        setSelectedCategory(props.route.params.item.category);
      }
    }
  }, []);
  useEffect(() => {
    getAllCategory();
    if (socket) {
      socket.on("upload-progress", (data) => {
        console.log("data===", data);
        dispatch(saveUploadingProgress(data.percentage));
      });
    }
  }, []);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onUploadVideo = async () => {
    if (selectedCategory?.length < 0) {
      utils.warningAlert("Please select video category");
      return;
    }
    if (utils.isEmptyOrSpaces(videoTitle)) {
      utils.warningAlert("Please enter video title");
      return;
    }
    if (utils.isEmptyOrSpaces(videoDescription)) {
      utils.warningAlert("Please enter video description");
      return;
    }

    dispatch(saveIsUploading(true));

    uploadVideo();
  };
  const fetchResourceFromURI = async uri => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    return blob;
  };
  const uploadVideo =async () => {
    const imageName = thumbNailData?.match(/.*\/(.*)$/)[1];
    const videoName = selectedData?.match(/.*\/(.*)$/)[1];
    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("channelId", ProfileData?.channel?._id);
    formData.append("ownerId", userData?._id);
    formData.append("duration", videoDuration);

    selectedCategory.map((item) => {
      formData.append("category", item);
    });
    if (thumbNailData.includes("file")) {
      formData.append("thumbnail", {
        name: imageName,
        type: "image/jpg",
        uri: thumbNailData,
      });
    }
    if (selectedData.includes("file")) {
      formData.append("video", {
        name: videoName,
        type: "video/mp4",
        uri: selectedData,
      });
    }
    if (props.route.params.item) {
      const body = {
        id: props.route.params.item?._id,
        formData: formData,
      };

      const data = {
        videoTitle,
        videoDescription,
        selectedCategory,
        thumbNailData,
        selectedData,
      };

      dispatch(saveUploadingData(data));

      dispatch(onUpdateVideoAction(body))
        .unwrap()
        .then((response) => {
          // console.log("onUpdateVideoAction response====", response);
          if (data?.message) {
            utils.successAlert(response?.message);
            props.navigation.navigate(SCREENS.Home);
          }
          dispatch(saveIsUploading(false));
          dispatch(saveUploadingData(""));
          getVideosByCategory();
          dispatch(saveUploadingProgress(0));
        })
        .catch((err) => {
          console.log("onUpdateVideoAction Error", err);
          dispatch(saveIsUploading(false));
          dispatch(saveUploadingProgress(0));
          dispatch(saveUploadingData(""));
        });
    } else {
      const data = {
        videoTitle,
        videoDescription,
        selectedCategory,
        thumbNailData,
        selectedData,
      };
      dispatch(saveUploadingData(data));

      let config = {
        headers: {
          Authorization: `Bearer ` + accessToken,
          "Content-Type": "multipart/form-data",
        },
        // signal: uploadingController.current.signal,
      };
console.log('formData====',JSON.stringify(formData));
      const onSuccess = ({ data }) => {
        console.log('responce===',data);
        if (data?.message) {
          utils.successAlert(data?.data.message);
          props.navigation.navigate(SCREENS.Home);
        }
        dispatch(saveIsUploading(false));
        dispatch(saveUploadingData(""));
        getVideosByCategory();
        dispatch(saveUploadingProgress(0));
      };

      const onFailure = (error) => {
        console.log("uploadVideo Error", error);
        dispatch(saveIsUploading(false));
        dispatch(saveUploadingProgress(0));
        dispatch(saveUploadingData(""));
        utils.errorAlert("Uploading Cancelled");
        props.navigation.navigate(SCREENS.Home);
      };

      axios
        .post(
          `${CONSTANTS.API_URLS.BASE_URL}${CONSTANTS.API_URLS.UPLOAD_VIDEO}`,
          formData,
          config
        )
        .then(onSuccess)
        .catch(onFailure);

      const fileDetail=await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: false,
      })
// const filePath=fileDetail.uri
// const filename=fileDetail.name
// let img = await fetch(fileDetail.uri);
// const blob = await img.blob();
// console.log('blob===',blob);
// try{
//   // const responce =await uploadTos3('vijio-videos',filename,blob)
// console.log('responce ====',responce);

// }catch(error){
//   console.log('error====',error);
// }
    // }

    // const fileDetail = await DocumentPicker.getDocumentAsync({
    //   type: "video/*",
    //   copyToCacheDirectory: true,
    // });
    
    // const filePath = fileDetail.uri;
    // const filename = fileDetail.name;
    // console.log('fileDetail.uri===',fileDetail.uri);
    
    // try {
    //   const img = await fetch(selectedData);
    
    //   if (!img.ok) {
    //     throw new Error(`Fetch failed with status ${img.status}`);
    //   }
    
    //   const blob = await img.blob();
    //   console.log('blob ===', blob);
    
      // Assuming uploadTos3 is a function that works correctly
      // const response = await uploadTos3('vijio-videos', filename, blob);
      // console.log('response ===', response);
    // } catch (error) {
    //   console.log('error ===', error);
    }
    
  };
  const uploadImage = () => {
    if (selectedData === "") {
      utils.warningAlert("Please Select Image");
      return;
    }
    if (utils.isEmptyOrSpaces(videoTitle)) {
      utils.warningAlert("Please Image Caption");
      return;
    }
    if (utils.isEmptyOrSpaces(videoDescription)) {
      utils.warningAlert("Please Enter Image Description");
      return;
    }

    const imageName = selectedData?.match(/.*\/(.*)$/)[1];
    const formData = new FormData();
    formData.append("caption", videoTitle);
    formData.append("description", videoDescription);
    formData.append("channelId", ProfileData?.channel?._id);
    formData.append("ownerId", ProfileData?._id);

    if (selectedData.includes("file")) {
      formData.append("image", {
        name: imageName,
        type: "image/jpg",
        uri: selectedData,
      });
    }

    if (props.route.params.item) {
      const body = {
        id: props.route.params.item?._id,
        formData: formData,
      };
      dispatch(onUpdateImageAction(body))
        .unwrap()
        .then((response) => {
          // console.log("onUpdateImageAction response====", response);
          if (response?.message) {
            utils.successAlert(response?.message);
            setSelectedData("");
            setVideoTitle("");
            setVideoDescription("");
          }
        })
        .catch((err) => {
          // console.log("onUpdateImageAction Error", err);
        });
    } else {
      dispatch(onUploadImageAction(formData))
        .unwrap()
        .then((response) => {
          if (response?.message) {
            utils.successAlert(response?.message);
            setSelectedData("");
            setVideoTitle("");
            setVideoDescription("");
          }
        })
        .catch((err) => {
          console.log("uploadImage Error", err);
        });
    }
  };

  const getVideosByCategory = () => {
    let postData = {
      page: 1,
    };

    dispatch(getVideosByCategoryAction(postData))
      .unwrap()
      .then((response) => {
        // console.log('responce====',response);
      })
      .catch((err) => {
        console.log("getVideosByCategory Error", err);
      });
  };

  const getAllCategory = () => {
    dispatch(getAllCategorAction())
      .unwrap()
      .then((response) => {
        // console.log("getAllCategory response", response);
        setAllCategory(response);
        var array = [...response].filter((item) => item !== "All");
        let arr = [];
        array.map((item, index) => {
          arr.push({ item, isSelected: false });
        });
        setData(arr);
      })
      .catch((err) => {
        console.log("getAllCategory Error", err);
      });
  };
  return {
    AllCategory,
    selectedCategory,
    selectedData,
    thumbNailData,
    uploadImageModal,
    uploadThumbnailModal,
    showDropDownModal,
    successModal,
    videoTitle,
    videoDescription,
    accessToken,
    videoDuration,
    from,
    isUploading,
    uploadingData,
    uploadingProgress,
    isUpdate,
    uploadingController,
    data,
    setData,
    uploadImage,
    setVideoDuration,
    onUploadVideo,
    setVideoDescription,
    setVideoTitle,
    dismissKeyboard,
    setSuccesModal,
    setShowDropDownModal,
    setUploadThumbNailModal,
    setUploadImageModal,
    setThumbnailData,
    setSelectedData,
    setSelectedCategory,
    dispatch,
  };
}

const styles = StyleSheet.create({});
