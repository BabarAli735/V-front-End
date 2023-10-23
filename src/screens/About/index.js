import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS, CONSTANTS, FONTFAMILY } from "../../constants/them";
import { WebView } from "react-native-webview";

export default function About() {
  const url = `${CONSTANTS.API_URLS.BASE_URL}static/about-us.html`;
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
