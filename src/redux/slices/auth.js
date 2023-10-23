import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import postService from "../services/postWithoutToken.service";
import postservicewithToken from "../services/post.service";
import { API, CONSTANTS } from "../../constants/them";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";
import { saveProfile } from "./profile";
import { saveChannelData } from "./channel";
// import {showError, showSuccess} from '@/Utils/Validation/Helper/Snackbar';

const initialState = {
  accessToken: null,
  isLoading: false,
  userData: null,
};

export const login = createAsyncThunk(
  CONSTANTS.API_URLS.LOGIN,
  async (postData, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postService.posthWithoutToken(
        CONSTANTS.API_URLS.LOGIN,
        postData
      );
      thunk.dispatch(saveAccessToken(response?.accessToken));
      thunk.dispatch(saveUserData(response?.user));
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      utils.errorAlert(err.message);
      throw err;
    }
  }
);

export const signup = createAsyncThunk(
  CONSTANTS.API_URLS.SIGNUP,
  async (data, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postService.posthWithoutToken(
        CONSTANTS.API_URLS.SIGNUP,
        data
      );
      thunk.dispatch(hideLoader());

      utils.successAlert(response?.message);
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      console.log("err===", err);
      if (err.message) {
        utils.warningAlert(err.message);
      } else {
        utils.warningAlert(err);
      }
      throw err;
    }
  }
);
export const saveFcm = createAsyncThunk(
  CONSTANTS.API_URLS.SAVE_FCM,
  async (data, thunk) => {
    try {
      const response = await postservicewithToken.post(
        thunk,
        CONSTANTS.API_URLS.SAVE_FCM,
        data
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);

export const verifyOtp = createAsyncThunk(
  CONSTANTS.API_URLS.VERIFY_OTP,
  async (data, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postService.posthWithoutToken(
        CONSTANTS.API_URLS.VERIFY_OTP,
        data
      );
      thunk.dispatch(hideLoader());
     
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  CONSTANTS.API_URLS.FORGOT_PASSWORD,
  async (data, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postService.posthWithoutToken(
        CONSTANTS.API_URLS.FORGOT_PASSWORD,
        data
      );
      thunk.dispatch(hideLoader());
      utils.successAlert(response?.message);
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
      throw err;
    }
  }
);

export const resentOtp = createAsyncThunk(
  CONSTANTS.API_URLS.RESENT_OTP,
  async (data, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postService.posthWithoutToken(
        CONSTANTS.API_URLS.RESENT_OTP,
        data
      );
      thunk.dispatch(hideLoader());
      utils.successAlert(response?.message);
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      if (err.message) {
        utils.errorAlert(err.message);
      } else {
        utils.errorAlert(err);
      }
      throw err;
    }
  }
);

export const resetPassword = createAsyncThunk(
  CONSTANTS.API_URLS.RESET_PASSWORD,
  async (data, thunk) => {
    try {
      console.log("====", data);
      thunk.dispatch(saveisLoading(true));
      const response = await postService.patchWithToken(
        CONSTANTS.API_URLS.RESET_PASSWORD,
        data
      );
      thunk.dispatch(saveisLoading(false));
      return response;
    } catch (error) {
      thunk.dispatch(saveisLoading(false));
      let err = utils.showResponseError(error);
      throw err;
    }
  }
);

export const logout = createAsyncThunk(
  CONSTANTS.API_URLS.LOGOUT,
  async (data, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postservicewithToken.post(
        thunk,
        CONSTANTS.API_URLS.LOGOUT
      );
      thunk.dispatch(removeAccessToken());
      thunk.dispatch(hideLoader());

      return true;
    } catch (error) {
      // let err = utils.showResponseError(error);
      thunk.dispatch(hideLoader());
      throw err;
    }
  }
);

export const deleteAccountAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_ACCOUNT,
  async (data, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postservicewithToken.deletePost(
        thunk,
        CONSTANTS.API_URLS.DELETE_ACCOUNT
      );
      thunk.dispatch(removeAccessToken());
      thunk.dispatch(hideLoader());
    } catch (error) {
      let err = utils.showResponseError(error);
      thunk.dispatch(hideLoader());
      utils.errorAlert("", err);
      console.log(error);
      throw err;
    }
  }
);
export const getprofileFromSighnUpAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PROFILE,
  async (accessToken, thunk) => {
    try {
      const response = await postservicewithToken.get(
        accessToken,
        CONSTANTS.API_URLS.GET_PROFILE
      );
      thunk.dispatch(hideLoader());
      thunk.dispatch(saveProfile(response));
      return response
    } catch (error) {
      let err = utils.showResponseError(error);
      thunk.dispatch(hideLoader());
      utils.errorAlert("", err);
      console.log(error);
      throw err;
    }
  }
);
export const createChannelActionFromSighnUp = createAsyncThunk(
  CONSTANTS.API_URLS.CREATE_CHANNEL,
  async (body, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postservicewithToken.postFormDataOutToken(
        body.accessToken,
        CONSTANTS.API_URLS.CREATE_CHANNEL,
        body.formdata
      );
      thunk.dispatch(hideLoader());
      thunk.dispatch(saveChannelData(response?.data));
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      let accessToken = action.payload;
      state.accessToken = accessToken;
    },
    saveSignUpToken: (state, action) => {
      let accessToken = action.payload;
      state.accessToken = accessToken;
    },
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
    removeAccessToken: (state, action) => {
      state.accessToken = null;
    },
    saveisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
const saveAccessTokenToStorage = (accessToken) => {
  AsyncStorage.setItem(
    CONSTANTS.CACHE_KEYS.ACCESS_TOKEN,
    JSON.stringify(accessToken)
  );
};
export const {
  saveAccessToken,
  removeAccessToken,
  saveSignUpToken,
  saveisLoading,
  saveUserData,
} = authSlice.actions;
export default authSlice.reducer;
