import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  ChatLists: [],
  ChatMessages: [],
};
export const getChatListAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_CHATS,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALL_CHATS,
        params
      );
      thunk.dispatch(saveChatList(response?.data));
      thunk.dispatch(hideLoader());
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      thunk.dispatch(hideLoader());
      return err;
    }
  }
);
export const getChatMessagesAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CHATS_MESSAGES,
  async (params, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_CHATS_MESSAGES}${params}`,
        undefined
      );
      thunk.dispatch(saveChatMessages(response?.data));
      // thunk.dispatch(hideLoader());
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      thunk.dispatch(hideLoader());
      return err;
    }
  }
);
export const getChatdataAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CHATS_DATA,
  async (params, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_CHATS_DATA}${params}`,
        undefined
      );
      // thunk.dispatch(hideLoader());
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      thunk.dispatch(hideLoader());
      return err;
    }
  }
);

export const onCreatChatAction = createAsyncThunk(
  CONSTANTS.API_URLS.CREATE_CHAT,
  async (body, thunk) => {
    try {
      
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.CREATE_CHAT,
        body
      );
      thunk.dispatch(hideLoader());
      return response.data;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onSendMessageAction = createAsyncThunk(
  CONSTANTS.API_URLS.SEND_MESSAGE,
  async (body, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.SEND_MESSAGE,
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
export const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    saveChatList: (state, action) => {
      state.ChatLists = action.payload;
    },
    saveChatMessages: (state, action) => {
      state.ChatMessages = action.payload;
    },
  },
});

export const { saveChatList, saveChatMessages } = ChatSlice.actions;
export default ChatSlice.reducer;
