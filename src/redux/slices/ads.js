import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import putServices from "../services/put.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  PackageData: null,
  AllAds: [],
};
export const getPlanAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PLAN,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_PLAN,
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
export const getMyAdsAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_MYADS,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_MYADS,
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
export const getAllAdsAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_ADS,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALL_ADS,
        params
      );
      thunk.dispatch(saveAllAdsData(response));
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const createAdAction = createAsyncThunk(
  CONSTANTS.API_URLS.CREATE_ADD,
  async (body, thunk) => {
    try {
      const response = await postServices.postFormData(
        thunk,
        CONSTANTS.API_URLS.CREATE_ADD,
        body
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const createPaymentAction = createAsyncThunk(
  CONSTANTS.API_URLS.CREATE_PAYMENT,
  async (body, thunk) => {
    try {
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.CREATE_PAYMENT,
        body
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const deleteAdAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_ADD,
  async (param, thunk) => {
    try {
      const response = await postServices.deletePost(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_ADD}?id=${param?.id}`,
        {}
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const updateAdAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_ADD,
  async (param, thunk) => {
    try {
      const response = await putServices.put(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_ADD}/${param?.id}`,
        param.body
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const watchedAdAction = createAsyncThunk(
  CONSTANTS.API_URLS.WATCHED_ADD,
  async (body, thunk) => {
    try {
      const response = await putServices.patch(
        thunk,
        CONSTANTS.API_URLS.WATCHED_ADD,
        body
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const adsSlice = createSlice({
  name: "adsSlice",
  initialState,
  reducers: {
    savePackageData: (state, action) => {
      state.PackageData = action.payload;
    },
    saveAllAdsData: (state, action) => {
      state.AllAds = action.payload;
    },
  },
});

export const { savePackageData, saveAllAdsData } = adsSlice.actions;
export default adsSlice.reducer;
