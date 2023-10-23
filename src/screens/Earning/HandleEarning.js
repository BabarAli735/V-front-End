import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import useReduxStore from "../../hook/UseReduxStore";

export default function HandleEarning(props) {
  const ref = useRef();
  const { dispatch, getState } = useReduxStore();
  const { ProfileData } = getState("profile");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedOption, setSelectedoption] = React.useState("Select");

  return {
    ref,
    showFilterModal,
    selectedOption,
    ProfileData,
    setSelectedoption,
    setShowFilterModal,
  };
}

const styles = StyleSheet.create({});
