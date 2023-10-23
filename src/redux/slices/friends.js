import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  FreiendsData:[],
  AllpeopleData:[],
  UserFriendsData:[],

};
export const searchFriendsAction = createAsyncThunk(
  CONSTANTS.API_URLS.SEARCH_ALL_PEOPLE,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.SEARCH_ALL_PEOPLE,
        params
      );

      thunk.dispatch(saveSearchedFriends(response?.users?.data));
      return response?.users?.data
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getAllFriendsListAction = createAsyncThunk(
  CONSTANTS.API_URLS.SEARCH_ALL_FREINDS,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.SEARCH_ALL_FREINDS,
        params
      );
      thunk.dispatch(hideLoader());
      thunk.dispatch(saveAllFriendsData(response?.friends));
      return response?.friends
    } catch (error) {
      let err = utils.showResponseError(error);
      thunk.dispatch(hideLoader());
      return err;
    }
  }
);
export const getUserFriendsListAction = createAsyncThunk(
  CONSTANTS.API_URLS.USER_FREINDS,
  async (params, thunk) => {
    try {
        thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.USER_FREINDS,
        params
      );
      thunk.dispatch(hideLoader());
      thunk.dispatch(saveUserFriendsData(response?.friends));
      return response?.friends
    } catch (error) {
      let err = utils.showResponseError(error);
      thunk.dispatch(hideLoader());
      return err;
    }
  }
);
export const getFriendsRequestAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_FREIND_REQUEST,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_FREIND_REQUEST,
        params
      );
      thunk.dispatch(hideLoader());

      return response?.requests
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      return err;
    }
  }
);


export const sendFreindRequestAction = createAsyncThunk(
  CONSTANTS.API_URLS.ADD_FREINDS,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.ADD_FREINDS,
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
export const deleteFriendAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_FREINDS,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.DELETE_FREINDS,
        params
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      utils.errorAlert('',err)
      return err;
    }
  }
);
export const acceptFreindRequestAction = createAsyncThunk(
  CONSTANTS.API_URLS.ACCEPT_REQUEST,
  async (params, thunk) => {
    try {
      // thunk.dispatch(showLoader());
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
      return error;
    }
  }
);
export const rejectFreindRequestAction = createAsyncThunk(
  CONSTANTS.API_URLS.REJECT_REQUEST,
  async (params, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.REJECT_REQUEST,
        params
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      // utils.errorAlert('',err)
      return error;
    }
  }
);
export const cancelFreindRequestAction = createAsyncThunk(
  CONSTANTS.API_URLS.CANCEL_FREINDS_REQUEST,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.CANCEL_FREINDS_REQUEST,
        params
      );
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      utils.errorAlert('',err)
      return err;
    }
  }
);


export const friendSlice = createSlice({
  name: "friendsSlice",
  initialState,
  reducers: {
    saveSearchedFriends: (state, action) => {
      state.AllpeopleData = action.payload;
    },
    saveAllFriendsData: (state, action) => {
      state.FreiendsData = action.payload;
    },
    saveUserFriendsData: (state, action) => {
      state.UserFriendsData = action.payload;
    },
  },
});

export const {saveSearchedFriends,saveAllFriendsData,saveUserFriendsData} = friendSlice.actions;
export default friendSlice.reducer;
