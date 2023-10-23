import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useReduxStore from "../hook/UseReduxStore";
import messaging from "@react-native-firebase/messaging";
import {
  getNotificationAction,
  getVideosDurationAction,
  getprofileAction,
  showLoader,
  saveIsUploading,
  saveUploadingData,
  saveHomeListLeavingIndex,
  getAllAds,
  getAllAdsAction,
} from "../redux/slices";

export default function NavigationHandler() {
  const { dispatch, getState } = useReduxStore();
  const { accessToken, userData } = getState("auth");
  const { isUploading, uploadingData } = getState("videos");
  const { ProfileData } = getState("profile");
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isVisible, setvisible] = React.useState(false);
  const [isuploadModal, setIsUploadModal] = React.useState(false);

  React.useEffect(() => {
    dispatch(saveIsUploading(false));
    dispatch(saveUploadingData(""));
    dispatch(saveHomeListLeavingIndex(0));

    if (accessToken !== null) {
      getMyProfile();
      getVideosDuration();
      getNotifications();
      notificationListener();
      getAllAds();
    }
  }, [accessToken]);

  const notificationListener = async () => {
    messaging().onNotificationOpenedApp((rm) => {
      console.log("Notification caused app to open from background", rm);
    });

    // Check forGround
    messaging().onMessage(async (rm) => {
      console.log("Notification in foreground", rm);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((rm) => {
        console.log("Notification in getInitialNotification", rm);
        // navref?.current?.navigate(SCREENS.MyOrder)
      })
      .catch((error) => {
        console.log("getInitialNotification ======> ", error);
      });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled ======++++++", remoteMessage);
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
  const getAllAds = () => {
    dispatch(getAllAdsAction())
      .unwrap()
      .then((response) => {
        // console.log("getAllAds response===", response);
      })
      .catch((err) => {
        console.log("getAllAds Error", err);
      });
  };
  const getNotifications = () => {
    dispatch(getNotificationAction())
      .unwrap()
      .then((response) => {
        // console.log('getNotifications response===',response);
      })
      .catch((err) => {
        console.log("getMyProfile Error", err);
      });
  };

  const getVideosDuration = () => {
    dispatch(getVideosDurationAction({}))
      .unwrap()
      .then((response) => {
        //  console.log('response====',response?.length);
      })
      .catch((err) => {
        console.log("getVideosByCategory Error", err);
      });
  };

  return {
    accessToken,
    userData,
    isLogoutModalVisible,
    isUploading,
    uploadingData,
    isVisible,
    isuploadModal,
    ProfileData,
    setIsUploadModal,
    setvisible,
    setIsLogoutModalVisible,
    dispatch,
  };
}

const styles = StyleSheet.create({});
