import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import useReduxStore from "../../hook/UseReduxStore";
import {
  onDislikeVideoAction,
  onlikeVideoAction,
  showLoader,
} from "../../redux/slices";
import { SCREENS } from "../../constants/them";
import {
  addCommentsAction,
  addReplysAction,
  getCommentsOnVideoAction,
  onDeleteCommentsAction,
} from "../../redux/slices/comments";
import utils from "../../utils";
import { getImageDetailAction, onDislikeImageAction, onlikeImageAction } from "../../redux/slices/images";
import {
  getChannelByPublic,
  onSubcribeChannelAction,
} from "../../redux/slices/channel";
import moment from "moment";

export default function ImagesHandler(props) {
  const { dispatch, getState } = useReduxStore();
  const { ImageDetail } = getState("images");
  const { ComentsOnVideo } = getState("comments");
  const { userData } = getState("auth");
  const { ProfileData } = getState("profile");
  const { channelData,AllChannelImages } = getState("channel");
  const isCurrentUser = ProfileData?._id === ImageDetail?.ownerId;
  const [isLike, setIsLike] = useState(false);
  const [isDisLike, setIsDisLike] = useState(false);
  const [showComentSheet, setShowComentSheet] = useState(false);
  const [content, setContent] = useState("");
  const [isReply, setIsReply] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [searchTimer, setSearchTimer] = useState(null);
  const [isSubcribed, setIsSubcribed] = useState(
    channelData?.isCurrentUserSubscribed
  );

  useEffect(async () => {
    if (props?.route.name === SCREENS.SearchVideos) {
      getImageDetail();
    }
    if (props?.route.name === SCREENS.ImageDetail) {
      await dispatch(showLoader());
      getImageDetail();
      getCommentsOnVideos();
    }
  }, [props?.route?.params?.id]); 

  const getImageDetail = () => {
    const id = props?.route?.params.id;
    dispatch(getImageDetailAction(id))
      .unwrap()
      .then((response) => {
        console.log("getVideoDetailAction response", response);
      })
      .catch((err) => {
        console.log("getVideoDetail Error", err);
      });
  };

  const getCommentsOnVideos = () => {
    const id = props?.route?.params.id;
    dispatch(getCommentsOnVideoAction(id))
      .unwrap()
      .then((response) => {
        // console.log("getSimilarVideos response", response);
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
          getImageDetail();
          setContent("");
        })
        .catch((err) => {
          console.log("addReplysAction Error", err);
        });
    } else {
      const data = {
        content: content,
        videoId: props?.route?.params.id,
        userId: ProfileData._id,
      };
      dispatch(addCommentsAction(data))
        .unwrap()
        .then((response) => {
          // console.log("createCommentsOnVideos response", response);
          getCommentsOnVideos();
          getImageDetail();
          setContent("");
        })
        .catch((err) => {
          console.log("createCommentsOnVideos Error", err);
        });
    }
  };

  const onLikeImage = () => {
    const id = props?.route?.params.id;
    setIsLike(true);
    setIsDisLike(false);
    dispatch(onlikeImageAction(id))
      .unwrap()
      .then((response) => {
        console.log("onLikeVideos response", response);
        getImageDetail();
      })
      .catch((err) => {
        console.log("onLikeVideos Error", err);
      });
  };
  const onDisLikeImage = () => {
    const id = props?.route?.params.id;
    setIsLike(false);
    setIsDisLike(true);
    dispatch(onDislikeImageAction(id))
      .unwrap()
      .then((response) => {
        // console.log("onDisLikeVideos response", response);
        getImageDetail();
      })
      .catch((err) => {
        console.log("onLikeVideos Error", err);
      });
  };
  const onSubcribeChannel = () => {
    const data = {
      id: channelData._id,
      flag: channelData?.isCurrentUserSubscribed ? "unsubscribe" : "subscribe",
    };

    dispatch(onSubcribeChannelAction(data))
      .unwrap()
      .then((response) => {
        console.log("onSubcribeChannel response", response);
        getChannelData(channelData._id);
      })
      .catch((err) => {
        console.log("onSubcribeChannel Error", err);
      });
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
  return {
    ImageDetail,
    isLike,
    isDisLike,
    showComentSheet,
    channelData,
    isCurrentUser,
    ComentsOnVideo,
    content,
    isReply,
    userData,
    commentId,
    ProfileData,
    isSubcribed,
    AllChannelImages,
    getTimeAgo,
    createCommentsOnVideos,
    setCommentId,
    setIsReply,
    setContent,
    deleteComment,
    onSubcribeChannel,
    setShowComentSheet,
    onLikeImage,
    onDisLikeImage,
  };
}

const styles = StyleSheet.create({});
