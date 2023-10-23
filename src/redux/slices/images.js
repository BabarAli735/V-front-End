import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import putServices from "../services/put.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  ImageDetail: null,
  
};

export const getImageDetailAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_IMAGE_DETAIL,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_IMAGE_DETAIL}${params}`,
        undefined
      );

      thunk.dispatch(saveImageDetail(response?.data));
      thunk.dispatch(hideLoader());
      return response?.data;
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const onlikeImageAction = createAsyncThunk(
  CONSTANTS.API_URLS.LIKE_IMAGE,
  async (params, thunk) => {
    try {
      const response = await putServices.put(
        thunk,
        CONSTANTS.API_URLS.LIKE_IMAGE,
        params
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onDislikeImageAction = createAsyncThunk(
  CONSTANTS.API_URLS.DISLIKE_IMAGE,
  async (params, thunk) => {
    try {
      const response = await putServices.put(
        thunk,
        CONSTANTS.API_URLS.DISLIKE_IMAGE,
        params
      );

      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      return err;
    }
  }
);


export const onViewVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.VIEW_VIDEO,
  async (params, thunk) => {
    try {
      const response = await putServices.put(
        thunk,
        CONSTANTS.API_URLS.VIEW_VIDEO,
        params
      );

      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const onDeleteAdAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_ADS,
  async (id, thunk) => {
    console.log("===", `${CONSTANTS.API_URLS.DELETE_CHANNEL}${id}`);
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.deletePost(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_CHANNEL}${id}`
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const images = createSlice({
  name: "images",
  initialState,
  reducers: {
    saveImageDetail: (state, action) => {
      state.ImageDetail = action.payload;
    },
  },
});

export const {
    saveImageDetail
} = images.actions;
export default images.reducer;
