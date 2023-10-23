import "react-native-gesture-handler";
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import MainNavigation from "./src/navigation";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Provider, useSelector } from "react-redux";
import { COLORS, CONSTANTS, FONTFAMILY } from "./src/constants/them";
import { useEffect, useState } from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { MenuProvider } from "react-native-popup-menu";
import {
  responsiveFontSize as rf,
  heightPercentageToDP as hp,
} from "./src/common/responsivefunction";
import SocketContainer from "./src/utils/SocketContainer";
import Firebase from "./src/firebase/firebaseConfige";
export default function App() {
  useEffect(() => {
    fetchFonts();
    Firebase();
  }, []);

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        text1Style={{
          color: COLORS.white,
          fontSize: rf(2),
          fontFamily: FONTFAMILY.Bold,
        }}
        text2Style={{
          color: COLORS.white,
          fontSize: rf(1.5),
          fontFamily: FONTFAMILY.SemiBold,
        }}
        style={{ backgroundColor: COLORS.green }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          color: COLORS.white,
          fontSize: rf(2),
          fontFamily: FONTFAMILY.Bold,
        }}
        text2Style={{
          color: COLORS.white,
          fontSize: rf(1.5),
          fontFamily: FONTFAMILY.SemiBold,
        }}
        style={{ backgroundColor: COLORS.fire, height: hp("5%") }}
      />
    ),
  };

  const fetchFonts = () => {
    return Font.loadAsync({
      Bold: require("./src/assets/Fonts/Raleway-Bold.ttf"),
      Medium: require("./src/assets/Fonts/Raleway-Medium.ttf"),
      Light: require("./src/assets/Fonts/Raleway-Light.ttf"),
      Regular: require("./src/assets/Fonts/Raleway-Regular.ttf"),
      SemiBold: require("./src/assets/Fonts/Raleway-SemiBold.ttf"),
      PoppinsBold: require("./src/assets/Fonts/Poppins-Bold.ttf"),
      PoppinsLight: require("./src/assets/Fonts/Poppins-Light.ttf"),
      PoppinsMedium: require("./src/assets/Fonts/Poppins-Medium.ttf"),
      RobotoBold: require("./src/assets/Fonts/Roboto-Bold.ttf"),
      RobotoLight: require("./src/assets/Fonts/Roboto-Light.ttf"),
      RobotoMedium: require("./src/assets/Fonts/Roboto-Medium.ttf"),
    });
  };

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  async function uploadBackgroundVideo(data, accessToken) {
    const response = await FileSystem.uploadAsync(
      `${CONSTANTS.API_URLS.BASE_URL}${CONSTANTS.API_URLS.UPLOAD_VIDEO}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2E0NzBkNjdkYmY3NTk4MjRmMGQwZiIsImlhdCI6MTY5MzgwNzkwMCwiZXhwIjoxNjk3NDA3OTAwfQ.ZgzfM_aEk-HvsOV0njx5VzzG8O7kcvIeaxnRz57Gjaw`,
          "Content-Type": "multipart/form-data",
        },
        sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
        httpMethod: "POST",
        fieldName: "video",
        data: data,
        mimeType: "video/mp4",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      }
    );
    console.log(
      JSON.stringify(response.body),
      "Response from uploading to local server"
    );
  }
  return (
    <Provider store={store}>
    <SocketContainer>
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.BLACK }}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={COLORS.BLACK}
            />
            <MainNavigation />
          </SafeAreaView>
        </MenuProvider>
        <Toast config={toastConfig} />
      </PersistGate>
    </SocketContainer>
    </Provider>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
