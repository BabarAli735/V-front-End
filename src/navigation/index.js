import * as React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Login";
import { COLORS, FONTFAMILY, SCREENS } from "../constants/them";
import SighnUp from "../screens/Auth/SighnUp";
import ForgetPassword from "../screens/Auth/ForgetPassword";
import Verification from "../screens/Auth/Verification";
import ResetPassword from "../screens/Auth/ResetPassword";
import ChatScreen from "../screens/Chat/ChatScreen";
import VideoDetail from "../screens/Videos/VideoDetail";
import Profile from "../screens/Profile";
import ChanelImages from "../screens/Channel/ChannelImages";
import EditProfile from "../screens/Profile/EditProfile";
import DrawerNavigator from "./Drawer";
import ReportHistory from "../screens/ReportHistory";
import Earning from "../screens/Earning";
import AddLog from "../screens/AddLog";
import Notification from "../screens/Notification";
import BuyAds from "../screens/BuyAds";
import UploadAdd from "../screens/BuyAds/UploadAdd";
import UploadImagesVideo from "../screens/Uploads/UploadImagesVideo";
import EditVideo from "../screens/Uploads/EditVideo";
import ChannelVideos from "../screens/Channel/ChannelVideos";
import ContactUs from "../screens/Content/ContactUs";
import Setting from "../screens/Setting";
import OtherUserProfile from "../screens/Profile/OtherUserProfile";
import Channel from "../screens/Channel";
import UpdateCreatChannel from "../screens/Channel/UpdateCreateChannel";
import NavigationHandler from "./NavigationHandler";
import SearchVideos from "../screens/Videos/SearchVideos";
import {
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
  widthPercentageToDP as wp,
} from "../common/responsivefunction";
import UploadProfile from "../screens/Channel/UploadProfile";
import UploadCover from "../screens/Channel/UploadCover";
import Loader from "../componanats/modal/Loader";
import WebView from "../screens/Content/WebView";
import ImageDetail from "../screens/Images/ImageDetail";
import RecentVideos from "../screens/Videos/RecentVideos";
import Payment from "../screens/BuyAds/Payment";
import CreateReport from "../screens/ReportHistory/CreateReport";
import ChangePassword from "../screens/Auth/ChangePassword";
import MyAds from "../screens/BuyAds/MyAds";

const Stack = createNativeStackNavigator();

function MainNavigation() {
  const { accessToken } = NavigationHandler();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}
        >
          {accessToken === null ? (
            <>
              <Stack.Screen name={SCREENS.Login} component={Login} />
              <Stack.Screen name={SCREENS.SignUp} component={SighnUp} />
              <Stack.Screen
                name={SCREENS.ForgetPassword}
                component={ForgetPassword}
              />
              <Stack.Screen
                name={SCREENS.OtpVerification}
                component={Verification}
              />
              <Stack.Screen
                name={SCREENS.ResetPassword}
                component={ResetPassword}
              />
              <Stack.Screen
                name={SCREENS.EditProfile}
                component={EditProfile}
              />
              <Stack.Screen
                name={SCREENS.UploadProfile}
                component={UploadProfile}
              />
              <Stack.Screen
                name={SCREENS.UploadCover}
                component={UploadCover}
              />
              <Stack.Screen name={SCREENS.UpdateCreatChannel} component={UpdateCreatChannel} />
            </>
          ) : (
            <>
              <Stack.Screen
                name={SCREENS.DrawerNavigator}
                component={DrawerNavigator}
              />
              <Stack.Screen name={SCREENS.ChatScreen} component={ChatScreen} />
              <Stack.Screen
                name={SCREENS.UserInfo}
                component={OtherUserProfile}
              />
              <Stack.Screen
                name={SCREENS.VideoDetail}
                component={VideoDetail}
                // options={{ gestureEnabled: false }}
              />
              <Stack.Screen
                name={SCREENS.RecentVideos}
                component={RecentVideos}
              />
              <Stack.Screen
                name={SCREENS.ImageDetail}
                component={ImageDetail}
              />
              <Stack.Screen
                name={SCREENS.SearchVideos}
                component={SearchVideos}
              />
              <Stack.Screen name={SCREENS.Profile} component={Profile} />
              <Stack.Screen
                name={SCREENS.EditProfile}
                component={EditProfile}
              />
              <Stack.Screen
                name={SCREENS.ChangePassword}
                component={ChangePassword}
              />

              <Stack.Screen
                name={SCREENS.ChanelImages}
                component={ChanelImages}
              />
              <Stack.Screen
                name={SCREENS.ChannelVideos}
                component={ChannelVideos}
              />
              <Stack.Screen name={SCREENS.Channel} component={Channel} />
              <Stack.Screen name={SCREENS.UpdateCreatChannel} component={UpdateCreatChannel} />
              <Stack.Screen
                name={SCREENS.UploadProfile}
                component={UploadProfile}
              />
              <Stack.Screen
                name={SCREENS.UploadCover}
                component={UploadCover}
              />

              <Stack.Screen
                name={SCREENS.ReportHistory}
                component={ReportHistory}
              />
              <Stack.Screen
                name={SCREENS.CreateReport}
                component={CreateReport}
              />
              <Stack.Screen name={SCREENS.Earning} component={Earning} />
              <Stack.Screen name={SCREENS.AddLog} component={AddLog} />
              <Stack.Screen name={SCREENS.BuyAds} component={BuyAds} />
              <Stack.Screen name={SCREENS.UploadAdds} component={UploadAdd} />
              <Stack.Screen name={SCREENS.MyAds} component={MyAds} />
              <Stack.Screen
                name={SCREENS.Notification}
                component={Notification}
              />
              <Stack.Screen
                name={SCREENS.UploadImagesVideo}
                component={UploadImagesVideo}
              />
              <Stack.Screen name={SCREENS.EditVideo} component={EditVideo} />
              <Stack.Screen name={SCREENS.ContactUs} component={ContactUs} />
              <Stack.Screen name={SCREENS.WebView} component={WebView} />
              <Stack.Screen name={SCREENS.Settings} component={Setting} />
              <Stack.Screen name={SCREENS.Payment} component={Payment} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {/* <Loader/> */}
    </>
  );
}

export default MainNavigation;

const styles = StyleSheet.create({
  progressContainer: {
    paddingHorizontal: wp(2),
    paddingBottom: hp(2),
  },
  progress: {
    backgroundColor: COLORS.modal,
    height: hp(4),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2),
  },
  txt: {
    fontSize: rf(2),
    fontFamily: FONTFAMILY.Bold,
    color: COLORS.white,
  },
});
