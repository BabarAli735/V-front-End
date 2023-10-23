import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  getAllSubscription,
  onSubcribeChannelAction,
} from "../../redux/slices/channel";
import useReduxStore from "../../hook/UseReduxStore";
import { useFocusEffect } from "@react-navigation/native";

export default function SubscriptionHandler() {
  const { dispatch, getState } = useReduxStore();
  const { AllSubscriptions } = getState("channel");
  const [isVisible, setIsVisible] = React.useState(false);
  const [successModal, setSuccesModal] = React.useState(false);
  const [searchData, setSearchData] = useState([]);
  const [unSubId, setUnSubId] = useState();

  useFocusEffect(
    React.useCallback(() => {
      getSubscription();
    }, [])
  );

  const searchFilterFunction = (e) => {
    if (e !== "") {
      let text = e.toLowerCase();
      let filteredList = AllSubscriptions.filter((item) => {
        return item?.name.toLowerCase().match(text);
      });
      setSearchData(filteredList);
    } else {
      setSearchData(AllSubscriptions);
    }
  };

  const getSubscription = () => {
    dispatch(getAllSubscription())
      .unwrap()
      .then((response) => {
        // console.log("getSubscription response===", response);
        setSearchData(response);
      })
      .catch((err) => {
        console.log("getSubscription Error", err);
      });
  };

  const onSubcribeChannel = (id) => {
    const data = {
      id: id,
      flag: "unsubscribe",
    };

    dispatch(onSubcribeChannelAction(data))
      .unwrap()
      .then((response) => {
        console.log("onSubcribeChannel response", response);
        setIsVisible(false);
        getSubscription();
      })
      .catch((err) => {
        console.log("onSubcribeChannel Error", err);
      });
  };
  return {
    AllSubscriptions,
    isVisible,
    successModal,
    searchData,
    unSubId,
    setUnSubId,
    searchFilterFunction,
    onSubcribeChannel,
    setSuccesModal,
    setIsVisible,
  };
}

const styles = StyleSheet.create({});
