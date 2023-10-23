import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  AllPost: null,
  likesData: null,
  CommentsData: null,
  showLikesSheet: false,
};
export const getAllPostAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALLPOST,
  async (params, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALLPOST,
        params
      );
      thunk.dispatch(hideLoader());
      thunk.dispatch(saveAllPost(response?.posts));
      return response?.posts;
    } catch (error) {
      let err = utils.showResponseError(error);
      thunk.dispatch(hideLoader());
      return err;
    }
  }
);

export const getPostLikes = createAsyncThunk(
  CONSTANTS.API_URLS.GET_POST_LIKES,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_POST_LIKES,
        params
      );

      thunk.dispatch(saveLikesData(response?.post_likes));
      return response?.post_likes;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const getPostComments = createAsyncThunk(
  CONSTANTS.API_URLS.GET_POST_COMMENTS,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_POST_COMMENTS,
        params
      );

      thunk.dispatch(saveCommentsData(response?.comments));
      return response?.comments;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const addPostAction = createAsyncThunk(
  CONSTANTS.API_URLS.ADD_POST,
  async (body, thunk) => {
    try {
      const response = await postServices.postFormData(
        thunk,
        CONSTANTS.API_URLS.ADD_POST,
        body
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const editPostAction = createAsyncThunk(
  CONSTANTS.API_URLS.EDIT_POST,
  async (body, thunk) => {
    try {
      const response = await postServices.postFormData(
        thunk,
        CONSTANTS.API_URLS.EDIT_POST,
        body
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onDeletePostAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_POST,
  async (body, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.DELETE_POST,
        body
      );
      // thunk.dispatch(getAllPostAction())
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onReportpostPostAction = createAsyncThunk(
  CONSTANTS.API_URLS.REPORT_POST,
  async (body, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.REPORT_POST,
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
export const onLikesPostAction = createAsyncThunk(
  CONSTANTS.API_URLS.LIKE_POST,
  async (body, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.LIKE_POST,
        body
      );
      return response;
    } catch (error) {
      // thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onSahrePostAction = createAsyncThunk(
  CONSTANTS.API_URLS.SHARE_POST,
  async (body, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.SHARE_POST,
        body
      );
       thunk.dispatch(getAllPostAction())
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onAddCommentsPostAction = createAsyncThunk(
  CONSTANTS.API_URLS.ADD_COMMENTS,
  async (body, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.ADD_COMMENTS,
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

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    saveAllPost: (state, action) => {
      state.AllPost = action.payload;
    },
    saveLikesData: (state, action) => {
      state.likesData = action.payload;
    },
    saveCommentsData: (state, action) => {
      state.CommentsData = action.payload;
    },
    setShowLikesSheet: (state, action) => {
      state.showLikesSheet = action.payload;
    },
  },
});

export const {
  saveAllPost,
  saveLikesData,
  setShowLikesSheet,
  saveCommentsData,
} = postSlice.actions;
export default postSlice.reducer;
