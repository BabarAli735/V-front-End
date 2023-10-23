import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  ComentsOnVideo: [],
};

export const getCommentsOnVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_VIDEO_COMMENTS,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_VIDEO_COMMENTS}${params}`,
        undefined
      );

      thunk.dispatch(saveComentsOnVideo(response?.data));
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const addCommentsAction = createAsyncThunk(
  CONSTANTS.API_URLS.CREATE_COMMENT,
  async (body, thunk) => {
    try {
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.CREATE_COMMENT,
        body
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
export const addReplysAction = createAsyncThunk(
  CONSTANTS.API_URLS.ADD_REPLY_ON_COMMENT,
  async (data, thunk) => {
    let body = {
      user: data.userId,
      text: data.reply,
    };
    try {
      const response = await postServices.post(
        thunk,
        `${CONSTANTS.API_URLS.ADD_REPLY_ON_COMMENT}${data.commentId}`,
        body
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
export const onDeleteCommentsAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_COMMENT,
  async (id, thunk) => {
    try {
      const response = await postServices.deletePost(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_COMMENT}${id}`
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
export const comments = createSlice({
  name: "comments",
  initialState,
  reducers: {
    saveComentsOnVideo: (state, action) => {
      state.ComentsOnVideo = action.payload;
    },
  },
});

export const { saveComentsOnVideo } = comments.actions;
export default comments.reducer;
