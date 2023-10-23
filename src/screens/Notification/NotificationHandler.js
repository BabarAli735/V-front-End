import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useReduxStore from "../../hook/UseReduxStore";
import { useEffect } from "react";
import {
  deleteAllNotificationAction,
  deleteNotificationAction,
  getNotificationAction,
  markAsReadAction,
} from "../../redux/slices";
import moment from "moment";
import { useState } from "react";

export default function NotificationHandler(props) {
  const { dispatch, getState } = useReduxStore();
const [notificationData,setNotificationData]=useState([])
  useEffect(() => {
    getNotifications();
  }, []);

  const onMarkasRead = (data) => {
  
    const data1 = {
      id: data?._id,
    };
    let body=data?data1:{}
    dispatch(markAsReadAction(body))
      .unwrap()
      .then((response) => {
        // console.log("onMarkasRead response", response);
        getNotifications();
      })
      .catch((err) => {
        console.log("onMarkasRead Error", err);
      });
  };
  const onDeleteNotification = (data) => {
    const body = {
      id: data?._id,
    };
    
if (data) {
  
  dispatch(deleteNotificationAction(body))
    .unwrap()
    .then((response) => {
      console.log("onDeleteNotification response", response);
      getNotifications();
    })
    .catch((err) => {
      console.log("onDeleteNotification Error", err);
    });
}else{
  dispatch(deleteAllNotificationAction())
  .unwrap()
  .then((response) => {
    console.log("onDeleteNotification response", response);
    getNotifications();
  })
  .catch((err) => {
    console.log("onDeleteNotification Error", err);
  }); 
}
  };

  const getNotifications = () => {
    dispatch(getNotificationAction())
      .unwrap()
      .then((response) => {
        // console.log("getNotifications response===", response);
        setNotificationData(response)
      })
      .catch((err) => {
        console.log("getNotifications Error", err);
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

  return {notificationData, getTimeAgo, onMarkasRead, onDeleteNotification };
}

const styles = StyleSheet.create({});
