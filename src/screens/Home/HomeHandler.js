import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useReduxStore from "../../hook/UseReduxStore";
import {
  getVideosByCategoryAction,
  saveVideos,
  showLoader,
  saveAllVideos,
  getAllVideoCategorAction,
  saveFcm
} from "../../redux/slices";
import { SCREENS } from "../../constants/them";
import { useFocusEffect } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";

export default function HomeHandler(props) {
  const { dispatch, getState } = useReduxStore();
  const { AllVideos, ALLVIDEOS, VideosDurations,AllCategory } = getState("videos");
  const { userData } = getState("auth");
  const { ProfileData } = getState("profile");
  const  NotificationData=[] 
  const [selected, setSelected] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [videosDuration, setVideosDuration] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresing, setIsRefreshing] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isVisible, setIsisVisible] = useState(false);
  

  useEffect(()=>{
    if (props?.route?.name === SCREENS.Home || props?.route?.name === SCREENS.Post) {
      getAllCategory()
      getVideosByCategory();
    }
   
  },[selected])

  useEffect(()=>{
    if(props?.route?.name === SCREENS.Home){
      setIsisVisible(true)
      requesNotificationToken()
    }
   
  },[])

  const requesNotificationToken = async () => {
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
        saveFCM(token);
      });

    messaging().onTokenRefresh((token) => {
      saveFCM(token);
    });
  };

  const saveFCM = async (token) => {
    let data = {
      deviceToken: token,
    };
    dispatch(saveFcm(data))
      .unwrap()
      .then((response) => {
        console.log('saveFCM response====',response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getVideosByCategory = () => {
    let params = {
      categories: selected,
      page: 1,
    };
    let params1 = {
      page: 1,
    };

    let postData = selected === "All" ? params1 : params;

    if (ALLVIDEOS?.length) {
      if (selected === "All") {
        dispatch(saveAllVideos(ALLVIDEOS));
      } else {
        let List = ALLVIDEOS.filter((x) => x.category[0] === selected);
        dispatch(saveAllVideos(List));
      }
    }

    dispatch(getVideosByCategoryAction(postData))
      .unwrap()
      .then((response) => {
        setIsisVisible(false)
        setTotalCount(response?.totalCount);
        if (selected === "All") {
          dispatch(saveVideos(response?.data));
        }

        if (response?.data?.length >1) {
          setIsEnd(false);
        } else {
          setIsEnd(true);
        }
        setCurrentPage(1);
      })
      .catch((err) => {
        console.log("getVideosByCategory Error", err);
        setIsisVisible(false)

      });
  };

  const onRefresh = () => {
    let params1 = {
      page: 1,
      categories: selected === "All" ? "" : selected,
    };
    setIsRefreshing(true);
    setIsEnd(false);
    dispatch(getVideosByCategoryAction(params1))
      .unwrap()
      .then((response) => {
        if (response?.data?.length > 2) {
          setIsEnd(false);
        } else {
          setIsEnd(true);
        }
        setTotalCount(response.totalCount);
        setIsRefreshing(false);
        setCurrentPage(1);
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

    if (currentPage < totalPages && !isLoading) {
      const nextPage = currentPage + 1;

      let params1 = {
        categories: selected === "All" ? "" : selected,
        page: nextPage,
      };
      setIsLoading(true);
      dispatch(getVideosByCategoryAction(params1))
        .unwrap()
        .then((response) => {
          setCurrentPage(nextPage);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("getVideosByCategory Error", err);
        });
    }
  };
  const getAllCategory = () => {
    dispatch(getAllVideoCategorAction())
      .unwrap()
      .then((response) => {
        // console.log('getAllCategory response',response);
      })
      .catch((err) => {
        console.log("getAllCategory Error", err);
      });
  };
  return {
    AllVideos,
    userData,
    selected,
    ProfileData,
    isVisible,
    currentPage,
    isEnd,
    isRefresing,
    videosDuration,
    VideosDurations,
    NotificationData,
    AllCategory,
    setIsEnd,
    onRefresh,
    loadeMore,
    getVideosByCategory,
    setCurrentPage,
    setSelected,
  };
}

const styles = StyleSheet.create({});
