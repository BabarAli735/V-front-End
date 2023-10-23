import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import putServices from "../services/put.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";
import postservicewithToken from "../services/post.service";

const initialState = {
  ProfileData: null,
  UserPost: [],
};
export const getprofileAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PROFILE,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_PROFILE,
        params
      );

      thunk.dispatch(saveProfile(response));
      thunk.dispatch(hideLoader())
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader())
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getUserInfoAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_USERINFO,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_USERINFO,
        params
      );
      thunk.dispatch(hideLoader());
      return response?.user_info;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getUserPostAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_USER_POST,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_USER_POST,
        params
      );
      thunk.dispatch(hideLoader());
      thunk.dispatch(saveUserPost(response?.posts));
      return response?.posts;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const updateprofilAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_PROFILE,
  async (data, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await putServices.putFormData(
        thunk,
        CONSTANTS.API_URLS.UPDATE_PROFILE,
        data
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      if (err.message) {
        utils.errorAlert(err.message);
      } else {
        utils.errorAlert(err);
      }
      return err;
    }
  }
);
export const updateprofilOutTokenAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_PROFILE,
  async (body, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postservicewithToken.putFormDataOutToken(
        body.accessToken,
        CONSTANTS.API_URLS.UPDATE_PROFILE,
        body.formData
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      if (err.message) {
        utils.errorAlert(err.message);
      } else {
        utils.errorAlert(err);
      }
      return err;
    }
  }
);

export const updatePasswordAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_PASSWORD,
  async (body, thunk) => {
    try {
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.UPDATE_PASSWORD,
        body
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      state.ProfileData = action.payload;
    },
    saveUserPost: (state, action) => {
      state.UserPost = action.payload;
    },
  },
});

export const { saveProfile, saveUserPost } = profileSlice.actions;
export default profileSlice.reducer;
