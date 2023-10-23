import { persistStore, persistReducer, } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import loaderReducer from './slices/loader';
import authReducer from "./slices/auth";
import loaderReducer from "./slices/loader";
import modalReducer from "./slices/modal";
import commentsReducer from "./slices/comments";
import profileReducer from "./slices/profile";
import postReducer from "./slices/post";
import videosReducer from "./slices/videos";
import imagesReducer from "./slices/images";
import chatReducer from "./slices/chat";
import friendReducer from "./slices/friends";
import notificationReducer from "./slices/notification";
import channelReducer from "./slices/channel";
import reportReducer from "./slices/reports";
import adsReducer from "./slices/ads";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  profile: profileReducer,
  post: postReducer,
  videos: videosReducer,
  images:imagesReducer,
  chat: chatReducer,
  friends: friendReducer,
  notification: notificationReducer,
  channel: channelReducer,
  modal: modalReducer,
  comments: commentsReducer,
  report: reportReducer,
  ads: adsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/removeAccessToken") {
    return appReducer([], action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  })
});

export const persistor = persistStore(store);
