import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  AllReportData: [],
};
export const getAllReportsAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_REPORTS,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALL_REPORTS,
        params
      );

      thunk.dispatch(saveReports(response?.data));
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getAllUserReportsAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_USER_REPORTS,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALL_USER_REPORTS,
        params
      );

      thunk.dispatch(saveReports(response?.data));
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const updateprofilAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_PROFILE,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.postFormData(
        thunk,
        CONSTANTS.API_URLS.UPDATE_PROFILE,
        params
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      utils.errorAlert("", err);
      return err;
    }
  }
);
export const deleteReportAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_REPORTS,
  async (id, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.deletePost(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_REPORTS}${id}`,
        {}
      );
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      // utils.errorAlert('',err)
      return err;
    }
  }
);
export const deleteUserReportAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_USER_REPORTS,
  async (id, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.deletePost(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_USER_REPORTS}`,
        {}
      );
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      // utils.errorAlert('',err)
      return err;
    }
  }
);
export const reportSlice = createSlice({
  name: "reportSlice",
  initialState,
  reducers: {
    saveReports: (state, action) => {
      state.AllReportData = action.payload;
    },
  },
});

export const { saveReports } = reportSlice.actions;
export default reportSlice.reducer;
