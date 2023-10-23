import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { COLORS } from "../../constants/them";
export default function WebViewScreen(props) {
  const { url } = props.route.params;
  return (
    <View style={styles.container}>
      <WebView style={styles.container} source={{ uri: url }} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
});
