import { Dimensions, Platform, StyleSheet, StatusBar } from "react-native";
// import {getStatusBarHeight} from 'react-native-status-bar-height';

export const { width, height } = Dimensions.get("window");

/* *************** Colors ********** */
export const COLORS = {
  // base colors
  primary: "#e42027",
  // primary: "#69B4F5",
  secondary: "#1d6ec2",

  // normal colors
  black: "#1a1a1a",
  BLACK: "#1a1a1a",
  blue: "#3AA0FF",

  grey: "#F0F3F5",
  brownGrey: "#3a3d46",
  brown: "#AAB2B7",
  facebook: "#0037c1",
  apple: "#262a34",
  google: "#1d6ec2",
  golden: "#FDBF00",
  // gradients
  gradient: ["#20242b", "#3a3d46"],

  // colors
  crimson: "#860012",
  blackWithOpacity: "rgba(0, 0, 0, .2)",
  white: "#f2f2f2",
  whiteOpacity: "#FFFFFF80",
  LightwhiteOpacity: "#FFFFFF10",
  fire: "#FF3737",
  greyish: "#202020",
  transparent: "transparent",
  modal: "#1a1a1a",
  lightPurpal: "#f8e1fe",
  green: "#2aa058",
};

const appTheme = { COLORS };
export default appTheme;

/* * Fonts * */
export const FONTFAMILY = {
  Light: "Light",
  Medium: "Medium",
  Bold: "Bold",
  Regular: "Regular",
  SemiBold: "SemiBold",
  PoppinsBold: "PoppinsBold",
  PoppinsLight: "PoppinsLight",
  PoppinsMedium: "PoppinsMedium",
  RobotoBold: "RobotoBold",
  RobotoLight: "RobotoLight",
  RobotoMedium: "RobotoMedium",
};

/* golden Ma#FDBF00#FDBF00 */
export const googleTheme = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
];

/* * Images * */
export const IMAGES = {
  Background: require("../assets/Images/Background.png"),
  logo: require("../assets/Images/logo.png"),
};

/* * Screens * */
export const SCREENS = {
  DrawerNavigator: "DrawerNavigator",
  AuthStack: "AuthStack",
  BottomTab: "HomeTabs",
  MyDrawer: "MyDrawer",

  Splash: "Splash",
  Auth: "Auth",
  SignUp: "SignUp",
  SignIn: "SignIn",
  OtpVerification: "OtpVerification",

  OnBoarding: "OnBoarding",
  logintype: "logintype",
  Login: "Login",
  ChangePassword: "ChangePassword",
  ForgetPassword: "ForgetPassword",
  ResetPassword: "ResetPassword",
  OTP: "OTP",

  Home: "Home",
  Comments: "Comments",

  SearchFreind: "SearchFreind",
  FreindsList: "FreindsList",
  UsersFreindsList: "UsersFreindsList",

  Messages: "Messages",
  Chat: "Chat",
  ChatScreen: "ChatScreen",

  Post: "Post",
  Notification: "Notification",
  Subscription: "Subscription",
  SubscriptionDetail: "SubscriptionDetail",
  About: "EditPost",

  SearchVideos: "SearchVideos",
  VideoDetail: "VideoDetail",
  MyVideos: "MyVideos",
  MyFavouriteMovies: "MyFavouriteMovies",
  AddVedeo: "AddVedeo",
  MyAds: "MyAds",
  UploadAdds: "UploadAdds",
  RecentVideos: "RecentVideos",

  ImageDetail: "ImageDetail",

  Profile: "Profile",
  SubcribedUserProfile: "SubcribedUserProfile",
  UserInfo: "UserInfo",
  EditProfile: "EditProfile",
  ChanelImages: "ChanelImages",

  Channel: "Channel",
  UploadProfile: "UploadProfile",
  UploadCover: "UploadCover",
  UpdateCreatChannel: "UpdateCreatChannel",

  Notifications: "Notifications",
  Settings: "Settings",

  DeleteAccount: "DeleteAccount",
  Logout: "Logout",

  Settings: "Settings",
  AboutApp: "About",
  TermsConditions: "TermsConditions",
  Support: "Support",
  Help: "Help",

  MySubscription: "MySubscription",

  ReportHistory: "ReportHistory",
  CreateReport: "CreateReport",

  Earning: "Earning",
  AddLog: "AddLog",
  BuyAds: "BuyAds",
  Payment: "Payment",
  UploadImagesVideo: "UploadImagesVideo",
  EditVideo: "EditVideo",
  ChannelVideos: "ChannelVideos",
  ContactUs: "ContactUs",
  WebView: "WebView",
};

export const SIZES = {
  // global sizes
  five: height * 0.0055,
  ten: height * 0.011,
  fifteen: height * 0.017,
  twenty: height * 0.023,
  twentyWidth: width * 0.05,
  twentyFive: height * 0.03,
  twentyFiveWidth: width * 0.08,
  fifty: height * 0.075,
  fiftyWidth: width * 0.13,

  // font sizes
  h16: width * 0.034,
  h18: width * 0.038,
  h20: width * 0.042,
  h22: width * 0.048,
  h24: width * 0.055,
  body08: width * 0.024,
  body10: width * 0.028,
  body12: width * 0.032,
  body14: width * 0.036,
  body16: width * 0.04,
  body18: width * 0.045,
};

export const FONTS = {
  RegularFont16: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h16,
    color: COLORS.BLACK,
  },
  boldFont18: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h18,
    color: COLORS.BLACK,
  },
  boldFont20: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h20,
    color: COLORS.BLACK,
  },
  boldFont22: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h22,
    color: COLORS.BLACK,
  },
  boldFont24: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h24,
    color: COLORS.BLACK,
  },
  mediumFont10: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body10,
    color: COLORS.BLACK,
  },
  mediumFont12: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body12,
    color: COLORS.BLACK,
  },
  mediumFont14: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.body14,
    color: COLORS.BLACK,
  },
  mediumFont16: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body16,
    color: COLORS.BLACK,
  },
  mediumFont18: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body18,
    color: COLORS.BLACK,
  },
  lightFont08: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body08,
    color: COLORS.BLACK,
  },
  lightFont10: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body10,
    color: COLORS.BLACK,
  },
  lightFont12: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body12,
    color: COLORS.BLACK,
  },
  lightFont14: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body14,
    color: COLORS.BLACK,
  },
  lightFont16: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body16,
    color: COLORS.BLACK,
  },
  lightFont18: {
    fontFamily: FONTFAMILY.Light,
    fontSize: SIZES.body18,
    color: COLORS.BLACK,
  },
};

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : null,
  },
  splashLogo: {
    width: SIZES.fifteen * 13,
    height: SIZES.fifteen * 13,
    alignSelf: "center",
  },
  loginView: {
    flex: 1,
    width: "100%",
    marginTop: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
  },
  lightText: {
    fontFamily: FONTFAMILY.Light,
  },
  mediumText: {
    fontFamily: FONTFAMILY.Medium,
  },
  boldText: {
    fontFamily: FONTFAMILY.Bold,
  },
  headingText: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.twenty + 5,
    color: COLORS.black,
  },
  paragraphText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.fifteen - 1,
    color: COLORS.black,
  },
  drawerItem: {
    paddingHorizontal: SIZES.fifteen + 3,
    paddingVertical: SIZES.fifteen,
    borderRadius: SIZES.fifteen,
  },
  drawerIcon: {
    fontSize: SIZES.fifteen + 10,
  },
  drawerText: {
    fontSize: SIZES.fifteen,
    fontFamily: FONTFAMILY.Medium,
    color: COLORS.black,
    marginHorizontal: SIZES.fifteen - 5,
  },
  horLine: {
    height: 0.3,
    marginVertical: SIZES.ten,
    backgroundColor: COLORS.brownGrey,
  },
  CardStyle: {
    backgroundColor: COLORS.blackWithOpacity,
    paddingHorizontal: SIZES.fifteen,
    justifyContent: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.twenty,
  },
  CardImage: {
    height: width * 0.1,
    width: width * 0.1,
    position: "absolute",
    right: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

/* * Api Path * */

export const CONSTANTS = {
  REDUX_ACTIONS: {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    SIGNUP: "SIGNUP",
    ACCESSTOKEN: "ACCESSTOKEN",
    AUTHENTICATE: "AUTHENTICATE",
  },

  API_URLS: {
    // BASE_URL: "https://api.vijjio.com/",
    BASE_URL: "http://192.168.10.2:5001/",
    IMAGE: "https://reignsol.com/palmbeach-app",
    LOGIN: "api/user/login",
    LOGOUT: "api/user/logout",
    DELETE_ACCOUNT: "api/user/my-account",
    SIGNUP: "api/user/register",
    SAVE_FCM: "api/user/update-device-token",
    VERIFY_OTP: "api/user/verify-otp",
    FORGOT_PASSWORD: "api/user/forget-password",
    RESENT_OTP: "api/user/resend-otp",
    RESET_PASSWORD: "api/user/update-password",

    // profile
    GET_PROFILE: "api/user/my-account",
    GET_USER_POST: "api/user/user-posts",
    GET_USERINFO: "api/user/user-info",
    UPDATE_PROFILE: "api/user/my-account",
    UPDATE_PASSWORD: "",

    // post
    GET_ALLPOST: "api/user/all-posts",
    ADD_POST: "api/user/add-post",
    EDIT_POST: "api/user/edit-post",
    DELETE_POST: "api/user/delete-post",
    REPORT_POST: "api/user/report-post",
    LIKE_POST: "api/user/like-dislike",
    SHARE_POST: "api/user/share-post",
    ADD_COMMENTS: "api/user/add-comment",
    GET_POST_LIKES: "api/user/post-like",
    GET_POST_COMMENTS: "api/user/post-comments",

    // videos
    GET_ALL_VIDEOS: "api/video/all",
    GET_VIDEOS_DURATION: "api/video/get-durations",
    GET_ALL_RECENT_VIDEOS: "api/video/get-recent",
    GET_VIDEO_DETAIL: "api/video/detail/",
    GET_SIMILAR_VIDEO: "api/video/similar/",
    GET_ALL_CATEGORY: "api/category/all",
    GET_ALL_VIDEO_CATEGORY: "api/video/get-categories",
    GET_VIDEO_COMMENTS: "api/comment/all/",
    UPLOAD_VIDEO: "api/video/create",
    UPDATE_VIDEO: "api/video/update/",
    LIKE_VIDEO: "api/video/interactions/likes",
    REMOVE_LIKE_VIDEO: "api/video/interactions/remove-likes",
    DISLIKE_VIDEO: "api/video/interactions/dislikes",
    REMOVE_DISLIKE_VIDEO: "api/video/interactions/remove-dislikes",
    VIEW_VIDEO: "api/video/interactions/views",
    SAVE_RECENT_VIDEO: "api/video/store-recent",
    CONTINIE_WATCH: "api/video/add-duration",

    // Image
    UPLOAD_IMAGE: "api/image/create",
    UPDATE_IMAGE: "api/image/",
    GET_IMAGE_DETAIL: "api/image/",
    LIKE_IMAGE: "api/image/interactions/likes",
    DISLIKE_IMAGE: "api/image/interactions/dislikes",
    REMOVE_DISLIKE_IMAGE: "api/image/interactions/remove-dislikes",
    REMOVE_LIKE_IMAGE: "api/image/interactions/remove-likes",

    // comments
    GET_VIDEO_COMMENTS: "api/comment/all/",
    CREATE_COMMENT: "api/comment/create",
    ADD_REPLY_ON_COMMENT: "api/comment/reply/",
    DELETE_COMMENT: "api/comment/delete/",
    SUBCRIBE_CHANNEL: "api/channel/subscribe-channel",

    // channel
    CREATE_CHANNEL: "api/channel/create",
    CREATE_REPORT_CHANNEL: "api/report/create",
    UPDATE_CHANNEL: "api/channel/update/",
    GET_CHANNEL_BY_OWNER: "api/channel/fetch-by-owner/",
    GET_CHANNEL_BY_PUBLIC: "api/channel/fetch/",
    GET_ALL_CHANNEL_VIDEOS: "api/channel/fetch-channel-videos/",
    DELETE_CHANNEL_IMAGE: "api/image/delete/",
    GET_ALL_CHANNEL_IMAGES: "api/image/get-all/",
    GET_ALL_SUBSCRIPTION: "api/channel/subscribe-channel",
    GET_ALL_ADDS: "api/user/all-ads",
    DELETE_CHANNEL: "api/channel/delete/",
    DELETE_CHANNEL_VIDEO: "api/video/delete/",
    DELETE_ALL_CHANNEL_VIDEO: "api/video/delete-all",

    // Chats
    GET_ALL_CHATS: "api/chat/fetch-all-conversations",
    GET_CHATS_DATA: "api/chat/fetch/",
    GET_CHATS_MESSAGES: "api/message/fetch-all/",
    CREATE_CHAT: "api/chat/create",
    SEND_MESSAGE: "api/message/create",

    // Notification
    GET_ALL_NOTIFICATION: "api/notifications",
    DELETE_NOTIFICATION: "api/notifications",
    MARK_AS_READ: "api/notifications",
    MARK_AS_READ_ALL: "api/user/mark-all-as-read",
    TOGGLE_PUSH_NOTIFICATION: "api/user/push-notification",

    //Report
    GET_ALL_REPORTS: "api/report/getAllReports",
    DELETE_REPORTS: "api/report/deleteReport/",
    GET_ALL_USER_REPORTS: "api/report/getAllUserReports",
    DELETE_USER_REPORTS: "api/report/deleteUsersReport",

    //Ads
    GET_PLAN: "api/plan",
    GET_MYADS: "api/ads/my-ads",
    GET_ALL_ADS: "api/ads",
    CREATE_ADD: "api/ads/create",
    CREATE_PAYMENT: "api/ads/payment",
    DELETE_ADD: "api/ads",
    WATCHED_ADD: "api/ads/watched",
  },

  /* * FirebaseConstants * */
  FIREBASE: {
    CHAT: "Chat",
    MESSAGES: "messages",
    USERS: "Users",
    CHATHEADS: "ChatHeads",
    READ: "read",
    TOKEN: "Tokens",
    FCM: "https://fcm.googleapis.com/fcm/send",
    SINGLE: "SINGLE",
  },

  DESTINATIONS: {
    SIGN_UP: "sign_up",
    FORGOT_PASSWORD: "forgot_password",
  },

  CACHE_KEYS: {
    ACCESS_TOKEN: "access_token",
    IS_FIRST_TIME: "is_first_time",
  },
};

export const FIREBASELABELS = {};
