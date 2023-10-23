import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import useReduxStore from "../../hook/UseReduxStore";
import { deleteAccountAction } from "../../redux/slices";

export default function SettingHandler() {
  const { dispatch, getState } = useReduxStore();
  const [isVisible, setIsVisible] = useState(false);
  const [successModal, setSuccesModal] = React.useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const togglePusNotification = () => {
    toggleSwitch();
  };

  const deleteAccount = () => {
    dispatch(deleteAccountAction())
      .unwrap()
      .then((response) => {
        console.log("deleteAccount response", response);
      })
      .catch((err) => {
        console.log("deleteAccount Error", err);
      });
  };
  return{
    deleteAccount,
      isVisible,
      successModal,
      isEnabled,
      togglePusNotification,
      setIsEnabled,
      setSuccesModal,
      setIsVisible
  }
}

const styles = StyleSheet.create({});
