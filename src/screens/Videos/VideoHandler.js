import { StyleSheet, BackHandler } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useReduxStore from "../../hook/UseReduxStore";
import {
  continueWatch,
  getAllRecentVideosAction,
  getChannelVideosAction,
  getSimilarVideoAction,
  getVideoDetailAction,
  getVideosByCategoryAction,
  getVideosDurationAction,
  hideLoader,
  onDislikeVideoAction,
  onRemoveDislikeVideoAction,
  onRemovelikeVideoAction,
  onlikeVideoAction,
  onSaveRecentVideoAction,
  onViewVideoAction,
  saveVideoDuration,
  showLoader,
  watchedAdAction,
} from "../../redux/slices";
import { SCREENS } from "../../constants/them";
import {
  addCommentsAction,
  addReplysAction,
  getCommentsOnVideoAction,
  onDeleteCommentsAction,
} from "../../redux/slices/comments";
import utils from "../../utils";
import {
  createReportAction,
  getChannelByPublic,
  onSubcribeChannelAction,
} from "../../redux/slices/channel";
import moment from "moment";
export default function VideoHandler(props) {
  const ref = useRef();
  const chatListRef = useRef();
  const videoRef = React.useRef(null);
  const { dispatch, getState } = useReduxStore();
  const {
    AllVideos,
    VideoDetail,
    SimilarVideos,
    ContinueWatch,
    AllRecentVideos,
    VideosDurations,
  } = getState("videos");
  const { ComentsOnVideo } = getState("comments");
  const { ProfileData } = getState("profile");
  const { AllChannelVideos, channelData } = getState("channel");
  const { isVisible } = getState("loader");
  const { AllAds } = getState("ads");
  const videoTime = useRef(0);
  const id = useRef(0);
  const isCurrentUser = ProfileData?._id === channelData?.ownerId?._id;
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDisLike, setIsDisLike] = useState(false);
  const [isUserDisLike, setIsUserDisLike] = useState(false);
  const [isUserLike, setIsUserLike] = useState(false);
  const [isVideolEnd, setisVideolEnd] = useState(false);
  const [showComentSheet, setShowComentSheet] = useState(false);
  const [showVideoDetailSheet, setVideoDetailSheet] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [recentVideos, setRecentVideos] = useState([]);
  const [isSubcribed, setIsSubcribed] = useState(
    channelData?.isCurrentUserSubscribed
  );
  const [content, setContent] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [selected, setSelected] = useState("All");
  const [searchTimer, setSearchTimer] = useState(null);
  const [selectedCategory, setselectedCategory] = useState("All");
  const [ChannelVideos, setChannelVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading1, setIsLoading] = useState(false);
  const [debouncedTime, setdebouncedTime] = useState(0);
  const [counter, setshowCounter] = useState(0);
  const [showCounter, setshowshowCounter] = useState(false);
  const [timer, settimer] = useState(0);
  const [showReportReasonModal, setShowReportReasonModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [adsShown, setAdsShown] = useState([]);

  useEffect(() => {
    if (props?.route.name === SCREENS.SearchVideos) {
      getVideosByCategory({});
    }
    if (props?.route.name === SCREENS.RecentVideos) {
      getAllRecentVideos({});
    }
    if (props?.route.name === SCREENS.VideoDetail) {
      id.current = props?.route?.params?.id;
      dispatch(showLoader());
      getVideoDetail();
      getSimilarVideos();
      getCommentsOnVideos();
      // const intervalId = setInterval(() => {
      //   getCommentsOnVideos();
      // }, 10000);
      // return () => clearInterval(intervalId);
    }
  }, [props?.route?.params?.id]);

  useEffect(() => {
    const backAction = () => {
      onBackTo(videoTime.current);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove();
      if (Platform.OS === "ios") {
        saveContinueWatch(videoTime.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log("timer====", timer);
    if (timer > 0) {
      setTimeout(() => {
        settimer(timer - 1);
      }, 1000);
    } else {

    }
  }, [timer]);

  const searchText = (e) => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    setSearchTimer(
      setTimeout(() => {
        let params = {
          page: 1,
          limit: 10,
          q: e,
        };
        getVideosByCategory(params);
      }, 1000)
    );
  };

  const getVideosByCategory = (params) => {
    dispatch(getVideosByCategoryAction(params))
      .unwrap()
      .then((response) => {})
      .catch((err) => {
        console.log("getVideosByCategory Error", err);
      });
  };
  const getAllRecentVideos = () => {
    dispatch(getAllRecentVideosAction())
      .unwrap()
      .then((response) => {
        // console.log("getAllRecentVideos response====", response);
        setRecentVideos(response);
      })
      .catch((err) => {
        console.log("getAllVideos Error", err);
      });
  };

  const getVideoDetail = () => {
    const id = props?.route?.params.id;

    dispatch(getVideoDetailAction(id))
      .unwrap()
      .then((response) => {
        // console.log("getVideoDetailAction response", response);
        getChannelData(response[0]?.channelId[0]?._id);
        getChannelVideos();
        setIsLike(response[0]?.userLiked);
        setIsDisLike(response[0]?.userDisLiked);
        setLikeCount(response[0]?.likesCount);
        setIsUserDisLike(response[0]?.userDisLiked);
        setIsUserLike(response[0]?.userLiked);
      })
      .catch((err) => {
        console.log("getVideoDetail Error", err);
      });
  };

  const getSimilarVideos = () => {
    const id = props?.route?.params.id;
    dispatch(getSimilarVideoAction(id))
      .unwrap()
      .then((response) => {
        // console.log("getSimilarVideos response", response);
        dispatch(hideLoader());
      })
      .catch((err) => {
        console.log("getSimilarVideos Error", err);
      });
  };
  const getCommentsOnVideos = () => {
    const id = props?.route?.params.id;
    dispatch(getCommentsOnVideoAction(id))
      .unwrap()
      .then((response) => {
        // console.log("getCommentsOnVideos response", response);
      })
      .catch((err) => {
        console.log("getCommentsOnVideos Error", err);
      });
  };
  const deleteComment = (id) => {
    dispatch(onDeleteCommentsAction(id))
      .unwrap()
      .then((response) => {
        console.log("deleteCommnet response", response);
        getCommentsOnVideos();
      })
      .catch((err) => {
        console.log("deleteComment Error", err);
      });
  };
  const createCommentsOnVideos = () => {
    if (utils.isEmptyOrSpaces(content)) {
      utils.warningAlert("Please Enter Comments");
      return;
    }

    if (isReply) {
      const data = {
        reply: content,
        videoId: props?.route?.params.id,
        userId: ProfileData?._id,
        commentId: commentId,
      };
      dispatch(addReplysAction(data))
        .unwrap()
        .then((response) => {
          getCommentsOnVideos();
          getVideoDetail();
          setContent("");
          // chatListRef?.current.scrollToIndex({
          //   index: ComentsOnVideo?.length - 1,
          // });
        })
        .catch((err) => {
          console.log("addReplysAction Error", err);
        });
    } else {
      const data = {
        content: content,
        videoId: props?.route?.params.id,
        userId: ProfileData?._id,
      };
      dispatch(addCommentsAction(data))
        .unwrap()
        .then((response) => {
          console.log("createCommentsOnVideos response", response);
          getCommentsOnVideos();
          getVideoDetail();
          setContent("");

          // chatListRef.current.scrollToIndex({
          //   index: ComentsOnVideo?.length - 1,
          // });
        })
        .catch((err) => {
          console.log("createCommentsOnVideos Error", err);
        });
    }
  };

  const onLikeVideos = useCallback(async () => {
    const params = {
      id: props?.route?.params.id,
    };
    if (isUserDisLike) {
      setIsDisLike(false);
      await dispatch(onRemoveDislikeVideoAction(params));
      setIsDisLike(false);
    }
    setTimeout(async () => {
      setIsLike(!isLike);
      if (isLike) {
        setLikeCount(likeCount - 1);
        await dispatch(onRemovelikeVideoAction(params));
      } else {
        setLikeCount(likeCount + 1);
        await dispatch(onlikeVideoAction(params));
      }
    }, 500);
  }, [isLike, isDisLike, likeCount, isUserDisLike, isUserLike]);

  const onDisLikeVideos = useCallback(async () => {
    const params = {
      id: props?.route?.params.id,
    };
    if (isUserLike) {
      setIsLike(false);
      await dispatch(onRemovelikeVideoAction(params));
      setIsUserLike(false);
    }

    setTimeout(async () => {
      setIsDisLike(!isDisLike);

      if (isDisLike) {
        await dispatch(onRemoveDislikeVideoAction(params));
      } else {
        await dispatch(onDislikeVideoAction(params));
      }
    }, 500);
  }, [isDisLike, isDisLike, isUserDisLike, isUserLike]);

  const onViewVideo = () => {
    const params = {
      id: props?.route?.params.id,
    };
    dispatch(onViewVideoAction(params))
      .unwrap()
      .then((response) => {})
      .catch((err) => {
        console.log("onViewsVideo Error", err);
      });
  };
  const onSaveRecentVideo = () => {
    const body = {
      channelId: VideoDetail[0]?.channelId[0]?._id,
      videoId: props?.route?.params.id,
    };
    dispatch(onSaveRecentVideoAction(body))
      .unwrap()
      .then((response) => {
        // console.log("onSaveRecentVideo response", response);
      })
      .catch((err) => {
        console.log("onSaveRecentVideo Error", err);
      });
  };

  const statusBar = (a) => {
    let time = Math.round(a?.positionMillis);
    videoTime.current = time;
    let secound = time / 1000;
    if (secound === 0) return;
    const ten = Boolean(parseInt(secound) % 10 == 0);
    console.log('secound===',secound);
    if (ten) {
      const current = Math.floor(a?.positionMillis / 1000);
      if (current !== debouncedTime) {
        setdebouncedTime(current);
        settimer(5);
        setshowshowCounter(true);
        setTimeout(() => {
          videoRef?.current.setStatusAsync({ shouldPlay: false });
          setshowshowCounter(false);
          setShowAdd(true);
        }, 7000);
      }
    }
    if (a.durationMillis !== undefined && a.positionMillis !== undefined) {
      if (a.durationMillis === a.positionMillis) {
        setisVideolEnd(true);
        videoTime.current = 0;
        videoRef?.current.setStatusAsync({ shouldPlay: false });
        // videoRef?.current.setStatusAsync({ positionMillis: 0, shouldPlay: true });
      }
    }
  };

  const checkWatchMovie = () => {
    // console.log("response====", response);
    let find = VideosDurations?.find(
      (x) => x?.videoId === props?.route?.params?.id
    );
    if (find) {
      videoTime.current = find?.duration;
      videoRef?.current?.playFromPositionAsync(Number(find?.duration));
    } else {
      videoRef?.current.setStatusAsync({ shouldPlay: true });
    }
  };
  const saveContinueWatch = (videoTime) => {
    const body = {
      videoId: id.current,
      duration: videoTime,
    };
    dispatch(saveVideoDuration(body))
      .unwrap()
      .then((response) => {
        // console.log("saveContinueWatch response" );
        getVideosDuration();
      })
      .catch((error) => {
        console.log("saveContinueWatch", error);
      });
  };
  const onBackTo = (videoTime) => {
    saveContinueWatch(videoTime, id);
    props.navigation.goBack();
  };
  const getChannelData = (id) => {
    dispatch(getChannelByPublic(id))
      .unwrap()
      .then((response) => {
        // console.log("getChannelByPublic response", JSON.stringify(response));
      })
      .catch((err) => {
        console.log("getChannelByOwner Error", err);
      });
  };
  const onSubcribeChannel = () => {
    const data = {
      id: channelData?._id,
      flag: channelData?.isCurrentUserSubscribed ? "unsubscribe" : "subscribe",
    };
    setIsSubcribed(!isSubcribed);
    dispatch(onSubcribeChannelAction(data))
      .unwrap()
      .then((response) => {
        console.log("onSubcribeChannel response", response);
        getChannelData(channelData?._id);
      })
      .catch((err) => {
        console.log("onSubcribeChannel Error", err);
      });
  };

  const filteredlist = () => {
    if (selectedCategory !== "All") {
      let temp = [];
      ContinueWatch?.map((item, index) => {
        if (item.category[0] === selectedCategory) {
          temp.push(item);
        }
      });
      return temp;
    } else {
      return channelData?.videos;
    }
  };

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
  const getVideosDuration = (videoTime) => {
    dispatch(getVideosDurationAction({}))
      .unwrap()
      .then((response) => {
        //  console.log('response====',response?.length);
      })
      .catch((err) => {
        console.log("getVideosByCategory Error", err);
      });
  };

  const getChannelVideos = (id) => {
    let params = {
      page: 1,
      channel_id: VideoDetail[0]?.channelId[0]._id,
    };

    dispatch(getChannelVideosAction(params))
      .unwrap()
      .then((response) => {
        setTotalCount(response?.totalCount);
        // console.log("getChannelVideos ===",response?.totalCount);

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

  const loadeMore = () => {
    const totalPages = Math.ceil(totalCount / 10);

    if (totalPages === currentPage) {
      setIsEnd(true);
    }

    if (currentPage < totalPages && !isLoading1) {
      const nextPage = currentPage + 1;

      let params1 = {
        page: nextPage,
        channel_id: VideoDetail?.channelId?._id,
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
  const onCreateReport = (data) => {
    if (utils.isEmptyOrSpaces(data.title)) {
      utils.warningAlert("Please Enter Report Title");
      return;
    }
    if (utils.isEmptyOrSpaces(data.description)) {
      utils.warningAlert("Please Enter Report description");
      return;
    }
    const body = {
      title: data?.title,
      description: data?.description,
      objectType: "Video",
      object: props?.route?.params.id,
    };

    dispatch(createReportAction(body))
      .unwrap()
      .then((response) => {
        console.log("onCreateReport response", response);
        utils.successAlert(response?.message);
      })
      .catch((err) => {
        console.log("onCreateReport Error", err);
      });
  };

  const watchedAd = (body) => {
    console.log("body===", body);
    dispatch(watchedAdAction(body))
      .unwrap()
      .then((response) => {
        console.log("watchedAdAction response", response);
      })
      .catch((err) => {
        console.log("watchedAdAction Error", err);
        dispatch(hideLoader());
      });
  };

  return {
    AllVideos,
    VideoDetail,
    ref,
    videoRef,
    isLike,
    isDisLike,
    isSubcribed,
    SimilarVideos,
    ComentsOnVideo,
    content,
    isReply,
    commentId,
    AllChannelVideos,
    videoTime,
    showComentSheet,
    selected,
    channelData,
    isCurrentUser,
    ProfileData,
    selectedCategory,
    isVisible,
    showVideoDetailSheet,
    AllRecentVideos,
    recentVideos,
    VideosDurations,
    chatListRef,
    isEnd,
    ChannelVideos,
    isVideolEnd,
    showReportReasonModal,
    likeCount,
    showAdd,
    AllAds,
    counter,
    timer,
    showCounter,
    setshowshowCounter,
    settimer,
    setshowCounter,
    setShowAdd,
    checkWatchMovie,
    onCreateReport,
    setShowReportReasonModal,
    setisVideolEnd,
    loadeMore,
    saveContinueWatch,
    onSaveRecentVideo,
    onViewVideo,
    setVideoDetailSheet,
    getTimeAgo,
    filteredlist,
    setselectedCategory,
    onSubcribeChannel,
    searchText,
    setSelected,
    setShowComentSheet,
    onBackTo,
    statusBar,
    deleteComment,
    onLikeVideos,
    onDisLikeVideos,
    setCommentId,
    setIsReply,
    createCommentsOnVideos,
    setContent,
    setIsSubcribed,
    setIsDisLike,
    setIsLike,
    watchedAd,
  };
}

const styles = StyleSheet.create({});
