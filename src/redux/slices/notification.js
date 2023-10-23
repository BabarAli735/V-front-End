import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import putServices from "../services/put.service";
import deleteServices from "../services/delete.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  NotificationData: [],
};

export const getNotificationAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_NOTIFICATION,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALL_NOTIFICATION
      );

      thunk.dispatch(saveNotifications(response?.data));
      thunk.dispatch(hideLoader());
      return response?.data;
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const acceptFreindRequestAction = createAsyncThunk(
  CONSTANTS.API_URLS.ACCEPT_REQUEST,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.ACCEPT_REQUEST,
        params
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      // utils.errorAlert('',err)
      return err;
    }
  }
);
export const deleteNotificationAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_NOTIFICATION,
  async (params, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.deletePost(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_NOTIFICATION}?id=${params.id}`,
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
export const deleteAllNotificationAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_NOTIFICATION,
  async (id, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.deletePost(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_NOTIFICATION}`,
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
export const markAsReadAction = createAsyncThunk(
  CONSTANTS.API_URLS.MARK_AS_READ,
  async (body, thunk) => {
    try {
      const response = await putServices.put(
        thunk,
        CONSTANTS.API_URLS.MARK_AS_READ,
        body
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
export const markAsReadAllAction = createAsyncThunk(
  CONSTANTS.API_URLS.MARK_AS_READ_ALL,
  async (params, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.MARK_AS_READ_ALL,
        params
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      // utils.errorAlert('',err)
      return err;
    }
  }
);
export const onToggleNotificationAction = createAsyncThunk(
  CONSTANTS.API_URLS.TOGGLE_PUSH_NOTIFICATION,
  async (params, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.TOGGLE_PUSH_NOTIFICATION,
        params
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      // utils.errorAlert('',err)
      return err;
    }
  }
);
export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    saveNotifications: (state, action) => {
      state.NotificationData = action.payload;
    },
  },
});

export const { saveNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
