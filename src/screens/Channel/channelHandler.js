import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import useReduxStore from "../../hook/UseReduxStore";
import {
  createChannelActionFromSighnUp,
  getChannelVideosAction,
  getVideosDurationAction,
  getprofileAction,
  hideLoader,
  onDeleteAdAction,
  saveAccessToken,
  showLoader,
} from "../../redux/slices";
import {
  createChannelAction,
  getAllChannelImages,
  getAllChannelVideoCategoryAction,
  getChannelByPublic,
  onDeleteAllCHannelVideoAction,
  onDeleteCHannelImage,
  onDeleteCHannelVideo,
  onSubcribeChannelAction,
  updateChannelAction,
  onDislikeImageAction,
  onRemoveDislikeImageAction,
  onRemovelikeImageAction,
  onlikeImageAction,
} from "../../redux/slices/channel";
import utils from "../../utils";
import { SCREENS } from "../../constants/them";
import { onCreatChatAction } from "../../redux/slices/chat";

export default function channelHandler(props) {
  const { dispatch, getState } = useReduxStore();
  const { AllChannelImages } = getState("channel");
  const { userData } = getState("auth");
  const { ProfileData } = getState("profile");
  const { isVisible } = getState("loader");
  const { AllVideos } = getState("videos");

  const [channelNameModal, setchannelNameModal] = React.useState(false);
  const [successModal, setSuccesModal] = React.useState(false);
  const [isSubriber, setIsSubscriber] = useState(false);
  const [showReportUserModal, setShowReportUserModal] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showReportReasonModal, setShowReportReasonModal] = useState(false);
  const [successModal2, setSuccesModal2] = React.useState(false);
  const [isUploadCover, setIsuploadCover] = React.useState(false);
  const [isUploadProfile, setIsUploadProfile] = React.useState(false);
  const [isUpdateChannel, setIsUpdateChannel] = React.useState(false);
  const [coverImage, setCoverImage] = React.useState("");
  const [profileImage, setProfileImage] = React.useState("");
  const [selectedCategory, setselectedCategory] = useState("All");
  const [userStatus, setUserStatus] = useState("unsubcribed");
  const [showIndicator, setShowIndicator] = useState(false);
  const [AllCategory, setAllCategory] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [isLoading1, setIsLoading] = useState(false);
  const [isRefresing, setIsRefreshing] = useState(false);
  const [channelDetail, setChannelDetail] = useState();
  const [ChannelVideos, setChannelVideos] = useState([]);
  const [AllChannelVideos, setAllChannelVideos] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [videosDuration, setVideosDuration] = useState([]);
  const [channelInfo, setChannelInfo] = useState({
    channelName: "",
    subcriptionFee: "5",
    channelDescription: "",
  });
  const isCurrentUser = ProfileData?._id === channelDetail?.ownerId?._id;

  useFocusEffect(
    React.useCallback(() => {
      if (props?.route?.name === SCREENS.Channel) {
        if (props.route.params.userId) {
          dispatch(showLoader());
          getChannelData(props.route.params.userId);
          getVideosDuration();
          getAllChannelVideoCategory(props.route.params.userId);
        }
      }
      if (props?.route?.name === SCREENS.ChannelVideos) {
        dispatch(showLoader());
        getChannelData(props.route.params.userId);
        getAllChannelVideoCategory(props.route.params.userId);
        getChannelVideos(props.route.params.userId);
        getVideosDuration();
      }
      if (props?.route?.name === SCREENS.ChanelImages) {
        getChannelImages(props.route.params.userId);
      }
      if (props.route.name === SCREENS.UpdateCreatChannel) {
        if (props?.route?.params.Updatedata) {
          setProfileImage(props?.route.params.Updatedata.channelLogo);
          setCoverImage(props?.route.params.Updatedata.banner);
          handleChange({ channelName: props?.route.params.Updatedata.name });
          handleChange({ channelName: props?.route.params.Updatedata.name });
          handleChange({
            channelDescription: props?.route.params.Updatedata.description,
          });
        } else {
          setProfileImage(props?.route.params.image);
          setCoverImage(props?.route.params.cover);
        }
      }
    }, [])
  );

  useEffect(() => {
    if (props?.route?.name === SCREENS.Channel) {
      if (channelDetail !== undefined) {
        setProfileImage(channelDetail?.channelLogo);
        setCoverImage(channelDetail?.banner);
        handleChange({ channelName: channelDetail?.name });
        handleChange({ channelDescription: channelDetail?.description });
      }
    }
  }, [channelDetail]);

  useEffect(() => {
    if (
      props?.route?.name === SCREENS.Channel ||
      props?.route?.name === SCREENS.ChannelVideos
    ) {
      getChannelVideos(props.route.params.userId);
    }
  }, [selectedCategory]);

  const handleChange = useCallback(
    (value) => {
      setChannelInfo((state) => ({ ...state, ...value }));
    },
    [setChannelInfo]
  );

  const filteredlist = () => {
    if (selectedCategory !== "All") {
      let temp = [];
      channelDetail?.videos.map((item, index) => {
        if (item.category[0] === selectedCategory) {
          temp.push(item);
        }
      });
      return temp;
    } else {
      return channelDetail?.videos;
    }
  };
  const createChannel = () => {
    if (utils.isEmpty(channelInfo.channelName)) {
      utils.warningAlert("Please Enter Channel Name");
      return;
    }

    if (utils.isEmpty(channelInfo.channelDescription)) {
      utils.warningAlert("Please Enter Channel Description");
      return;
    }

    const formdata = new FormData();
    formdata.append("name", channelInfo.channelName);
    formdata.append("description", channelInfo.channelDescription);
    formdata.append("ownerId", userData?._id);
    formdata.append("subscriptionFee", parseInt(channelInfo.subcriptionFee));

    if (!profileImage.includes("http")) {
      formdata.append("channelLogo", {
        name: profileImage.split("/").slice(-1).toString(),
        type: "image/jpg",
        uri: profileImage,
      });
    }
    if (!profileImage.includes("http")) {
      formdata.append("banner", {
        name: coverImage.split("/").slice(-1).toString(),
        type: "image/jpg",
        uri: coverImage,
      });
    }

    if (props?.route.params.Updatedata) {
      let data = {
        id: props?.route.params.Updatedata?._id,
        body: formdata,
      };
      setShowIndicator(true);
      dispatch(updateChannelAction(data))
        .unwrap()
        .then((response) => {
          console.log("updateChannelAction response", response);
          setShowIndicator(false);
          props?.navigation.goBack();
        })
        .catch((err) => {
          console.log("createChannelAction Error", err);
          setShowIndicator(false);
        });
    } else {
      setShowIndicator(true);
      console.log(props?.route?.params);
      if (props?.route?.params?.from === "signUp") {
        const body = {
          accessToken: props?.route?.params.accessToken,
          formdata: formdata,
        };

        dispatch(createChannelActionFromSighnUp(body))
          .unwrap()
          .then(async (response) => {
            console.log("createChannelActionFromSighnUp response", response);
            setShowIndicator(false);
            await dispatch(saveAccessToken(body.accessToken));
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: SCREENS.DrawerNavigator,
                  },
                ],
              })
            );
          })
          .catch((err) => {
            console.log("createChannelActionFromSighnUp Error", err);
            setShowIndicator(false);
          });
      } else {
        dispatch(createChannelAction(formdata))
          .unwrap()
          .then((response) => {
            console.log("createChannelAction response", response);
            utils.successAlert("Channel Created Successfully");
            setchannelNameModal(false);
            props.navigation.navigate(SCREENS.Home);
            getMyProfile();
            setShowIndicator(false);
          })
          .catch((err) => {
            console.log("createChannelAction Error", err);
            setShowIndicator(false);
          });
      }
    }
  };

  const deleteChannel = () => {
    dispatch(onDeleteAdAction(channelDetail?._id))
      .unwrap()
      .then((response) => {
        console.log("deleteChannel response", response);
        props.navigation.navigate(SCREENS.DrawerNavigator);
        getMyProfile();
      })
      .catch((err) => {
        console.log("deleteChannel Error", err);
      });
  };

  const getMyProfile = () => {
    dispatch(getprofileAction())
      .unwrap()
      .then((response) => {
        // console.log('getMyProfile response===',response);
      })
      .catch((err) => {
        console.log("getMyProfile Error", err);
      });
  };
  const getChannelData = (id) => {
    dispatch(getChannelByPublic(id))
      .unwrap()
      .then((response) => {
        // console.log("getChannelByPublic response",response);
        setChannelDetail(response);
        getAllChannelVideoCategory(id);
      })
      .catch((err) => {
        console.log("getChannelByOwner Error", err);
      });
  };
  const getChannelImages = (id) => {
    dispatch(getAllChannelImages(id))
      .unwrap()
      .then((response) => {
        // console.log("getChannelImages response", JSON.stringify(response));
      })
      .catch((err) => {
        console.log("getChannelImages Error", err);
      });
  };

  const deleteChannelVideo = (id) => {
    dispatch(onDeleteCHannelVideo(id))
      .unwrap()
      .then((response) => {
        // console.log("deleteChannelVideo response", response);
        getChannelData(ProfileData?.channel?._id);
        getChannelVideos(ProfileData?.channel?._id);
        getAllChannelVideoCategory(ProfileData?.channel?._id);
      })
      .catch((err) => {
        console.log("deleteChannelVideo Error", err);
      });
  };
  const deleteChannelImage = (id) => {
    dispatch(onDeleteCHannelImage(id))
      .unwrap()
      .then((response) => {
        // console.log("deleteChannelImage response", response);
        getChannelImages(ProfileData?.channel?._id);
      })
      .catch((err) => {
        console.log("deleteChannelImage Error", err);
      });
  };
  const onDeleteAllChannelVideos = (id) => {
    dispatch(onDeleteAllCHannelVideoAction())
      .unwrap()
      .then((response) => {
        console.log("onDeleteAllChannelVideos response", response);
        getMyProfile();
      })
      .catch((err) => {
        console.log("deleteChannelVideo Error", err);
      });
  };
  const onSubcribeChannel = () => {
    const data = {
      id: channelDetail._id,
      flag: channelDetail?.isCurrentUserSubscribed
        ? "unsubscribe"
        : "subscribe",
    };

    dispatch(onSubcribeChannelAction(data))
      .unwrap()
      .then((response) => {
        console.log("onSubcribeChannel response", response);
        getChannelData(channelDetail._id);
      })
      .catch((err) => {
        console.log("onSubcribeChannel Error", err);
      });
  };

  const onCreateChat = () => {
    const body = {
      user: channelDetail?.ownerId?._id,
    };
    dispatch(onCreatChatAction(body))
      .unwrap()
      .then((response) => {
        console.log("onCreateChat response===", response);
        if (response?.id) {
          props.navigation.navigate(SCREENS.ChatScreen, {
            item: channelDetail,
            chatId: response?.id,
          });
        } else {
          props.navigation.navigate(SCREENS.ChatScreen, {
            item: channelDetail,
            chatId: response?.data.id,
          });
        }
      })
      .catch((err) => {
        console.log("onCreateChat Error", err);
      });
  };

  const getAllChannelVideoCategory = (id) => {
    const params = {
      channel_id: id,
    };

    dispatch(getAllChannelVideoCategoryAction(params))
      .unwrap()
      .then(async (response) => {
        // console.log("getAllChannelVideoCategory response", response?.length);
        if (response?.length !== 0) {
          setAllCategory(["All", ...response]);
        }
        setTimeout(() => {
          dispatch(hideLoader());
        }, 1000);
      })
      .catch((err) => {
        console.log("getAllChannelVideoCategory Error", err);
      });
  };
  const getChannelVideos = (id) => {
    let params = {
      categories: selectedCategory,
      page: 1,
      channel_id: id,
    };
    let params1 = {
      page: 1,
      channel_id: id,
    };

    let postData = selectedCategory === "All" ? params1 : params;
    if (AllChannelVideos?.length) {
      if (selectedCategory === "All") {
        setChannelVideos(AllChannelVideos);
      } else {
        let List = AllChannelVideos?.filter(
          (x) => x.category[0] === selectedCategory
        );
        setChannelVideos(List);
      }
    }
    dispatch(getChannelVideosAction(postData))
      .unwrap()
      .then((response) => {
        setTotalCount(response?.totalCount);
        // console.log("getChannelVideos ===",response);
        if (selectedCategory === "All") {
          setAllChannelVideos(response?.data);
        }
        setChannelVideos(response?.data);
        if (response?.data?.length > 2) {
          setIsEnd(false);
        } else {
          setIsEnd(true);
        }
        setCurrentPage(1);
      })
      .catch((err) => {
        console.log("getChannelVideos Error", err);
      });
  };

  const onRefresh = () => {
    let params1 = {
      page: 1,
      categories: selectedCategory === "All" ? "" : selectedCategory,
      channel_id: channelDetail?._id,
    };
    setIsRefreshing(true);
    setIsEnd(false);
    dispatch(getChannelVideosAction(params1))
      .unwrap()
      .then((response) => {
        setTotalCount(response.totalCount);
        setIsRefreshing(false);
        setIsEnd(false);
        setCurrentPage(1);
        setChannelVideos(response);
      })
      .catch((err) => {
        console.log("onRefresh Error", err);
        setIsRefreshing(false);
      });
  };

  const loadeMore = () => {
    const totalPages = Math.ceil(totalCount / 10);

    if (totalPages === currentPage) {
      setIsEnd(true);
    }

    if (currentPage < totalPages && !isLoading1) {
      const nextPage = currentPage + 1;

      let params1 = {
        categories: selectedCategory === "All" ? "" : selectedCategory,
        page: nextPage,
        channel_id: channelDetail?._id,
      };
      setIsLoading(true);
      dispatch(getChannelVideosAction(params1))
        .unwrap()
        .then((response) => {
          console.log("loadeMore response", response?.data.length);
          setCurrentPage(nextPage);
          setIsLoading(false);
          let data = params1?.page > 1 ? ChannelVideos : [];
          setChannelVideos(data?.concat(response?.data));
        })
        .catch((err) => {
          console.log("loadeMore Error", err);
        });
    }
  };

  const getCloser = (value, checkOne, checkTwo) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo)
      ? checkOne
      : checkTwo;

  const getVideosDuration = () => {
    dispatch(getVideosDurationAction({}))
      .unwrap()
      .then((response) => {
        //  console.log('response====',response?.length);
        setVideosDuration(response);
      })
      .catch((err) => {
        console.log("getVideosByCategory Error", err);
      });
  };

  const onLikeImage = (id) => {
    const params = {
      id: id,
    };
    dispatch(onlikeImageAction(params))
      .unwrap()
      .then((response) => {
        console.log("onLikeVideos response", response);
        getChannelImages(props.route.params.userId);
      })
      .catch((err) => {
        console.log("onLikeImage Error", err);
      });
  };
  const onRemoveLikeImage = (id) => {
    const params = {
      id: id,
    };
    dispatch(onRemovelikeImageAction(params))
      .unwrap()
      .then((response) => {
        console.log("onLRemoveLike response", response);
        getChannelImages(props.route.params.userId);
      })
      .catch((err) => {
        console.log("onRemoveLikeImage Error", err);
      });
  };

  const onDisLikeImage = (id) => {
    const params = {
      id: id,
    };

    dispatch(onDislikeImageAction(params))
      .unwrap()
      .then((response) => {
        // console.log("onDisLikeVideos response", response);
        // getVideoDetail();
      })
      .catch((err) => {
        console.log("onDisLikeImage Error", err);
      });
  };
  const onRemoveDisLikeImage = (id) => {
    const params = {
      id: id,
    };

    dispatch(onRemoveDislikeImageAction(params))
      .unwrap()
      .then((response) => {
        // console.log("onDisLikeVideos response", response);
        // getVideoDetail();
      })
      .catch((err) => {
        console.log("onRemoveDisLikeImage Error", err);
      });
  };

  return {
    isCurrentUser,
    channelNameModal,
    successModal,
    isVisible,
    showReportUserModal,
    showReportReasonModal,
    successModal2,
    userStatus,
    userData,
    channelInfo,
    isSubriber,
    showSaveButton,
    selectedCategory,
    isUploadCover,
    isUploadProfile,
    coverImage,
    profileImage,
    isUpdateChannel,
    ProfileData,
    AllChannelImages,
    showIndicator,
    AllCategory,
    AllVideos,
    isEnd,
    isRefresing,
    ChannelVideos,
    channelDetail,
    videosDuration,
    isLoading1,
    onLikeImage,
    onRemoveLikeImage,
    onDisLikeImage,
    onRemoveDisLikeImage,
    setIsLoading,
    getCloser,
    onRefresh,
    loadeMore,
    onCreateChat,
    deleteChannelImage,
    onSubcribeChannel,
    setIsUpdateChannel,
    handleChange,
    setProfileImage,
    setCoverImage,
    setIsUploadProfile,
    setIsuploadCover,
    getState,
    onDeleteAllChannelVideos,
    deleteChannelVideo,
    setselectedCategory,
    setShowSaveButton,
    setIsSubscriber,
    setChannelInfo,
    deleteChannel,
    setUserStatus,
    setSuccesModal2,
    setShowReportReasonModal,
    setShowReportUserModal,
    dispatch,
    setSuccesModal,
    setchannelNameModal,
    createChannel,
    filteredlist,
  };
}

const styles = StyleSheet.create({});
