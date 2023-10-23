import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants/them";
import useReduxStore from "../../hook/UseReduxStore";

export default function Loader() {
  const { dispatch, getState } = useReduxStore();
  const { isVisible } = getState("loader");
  return (
    <Modal visible={isVisible} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.whiteOpacity,
        }}
      >
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
