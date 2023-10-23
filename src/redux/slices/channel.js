import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import putServices from "../services/put.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  channelData: null,
  AllChannelVideos: [],
  AllChannelImages: [],
  AllSubscriptions: [],
};
export const getChannelByOwner = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CHANNEL_BY_OWNER,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_CHANNEL_BY_OWNER}${params}`,
        undefined
      );

      thunk.dispatch(saveChannelData(response?.data?.channels[0]));
      thunk.dispatch(hideLoader());
      return response?.data?.channels[0];
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getChannelByPublic = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CHANNEL_BY_PUBLIC,
  async (userId, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_CHANNEL_BY_PUBLIC}${userId}`,
        undefined
      );

      thunk.dispatch(saveChannelData(response?.data));
      return response?.data;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getAllChannelVideos = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_CHANNEL_VIDEOS,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_ALL_CHANNEL_VIDEOS}${params}`,
        undefined
      );

      thunk.dispatch(saveAllChannelVideo(response?.data));
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getAllChannelImages = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_CHANNEL_IMAGES,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_ALL_CHANNEL_IMAGES}${params}`,
        undefined
      );

      thunk.dispatch(saveAllChannelImages(response?.data));
      thunk.dispatch(hideLoader());

      return response?.data;
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getAllSubscription = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_SUBSCRIPTION,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_ALL_SUBSCRIPTION}`,
        {}
      );

      thunk.dispatch(saveAllSubscription(response?.data));
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const createChannelAction = createAsyncThunk(
  CONSTANTS.API_URLS.CREATE_CHANNEL,
  async (body, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await postServices.postFormData(
        thunk,
        CONSTANTS.API_URLS.CREATE_CHANNEL,
        body
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

export const createReportAction = createAsyncThunk(
  CONSTANTS.API_URLS.CREATE_REPORT_CHANNEL,
  async (body, thunk) => {
    try {
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.CREATE_REPORT_CHANNEL,
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
export const updateChannelAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_CHANNEL,
  async (data, thunk) => {
    try {
      // thunk.dispatch(showLoader());
      const response = await putServices.putFormData(
        thunk,
        `${CONSTANTS.API_URLS.UPDATE_CHANNEL}${data.id}`,
        data.body
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

export const onUpdateAdsAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_ADS,
  async (body, thunk) => {
    try {
      thunk.dispatch(showLoader());

      const response = await postServices.postFormData(
        thunk,
        `${CONSTANTS.API_URLS.UPDATE_ADS}${body.id}`,
        body.formData
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

export const onDeleteChannelAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_CHANNEL,
  async (id, thunk) => {
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
export const onDeleteCHannelVideo = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_CHANNEL_VIDEO,
  async (id, thunk) => {
    try {
      const response = await postServices.deletePost(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_CHANNEL_VIDEO}${id}`
      );
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onDeleteCHannelImage = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_CHANNEL_IMAGE,
  async (id, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.deletePost(
        thunk,
        `${CONSTANTS.API_URLS.DELETE_CHANNEL_IMAGE}${id}`
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
export const onDeleteAllCHannelVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.DELETE_ALL_CHANNEL_VIDEO,
  async (id, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.deletePost(
        thunk,
        CONSTANTS.API_URLS.DELETE_ALL_CHANNEL_VIDEO
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
export const onSubcribeChannelAction = createAsyncThunk(
  CONSTANTS.API_URLS.SUBCRIBE_CHANNEL,
  async (data, thunk) => {
    const body = {
      flag: data.flag,
    };
    try {
      const response = await putServices.put(
        thunk,
        `${CONSTANTS.API_URLS.SUBCRIBE_CHANNEL}/${data.id}`,
        body
      );
      return response;
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
        `${CONSTANTS.API_URLS.LIKE_IMAGE}?id=${params.id}`,
        {}
      );
  

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onRemovelikeImageAction = createAsyncThunk(
  CONSTANTS.API_URLS.REMOVE_LIKE_IMAGE,
  async (params, thunk) => {
    try {
      
  
      const response = await putServices.put(
        thunk,
        `${CONSTANTS.API_URLS.REMOVE_LIKE_IMAGE}?id=${params.id}`,
        {}
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
        `${CONSTANTS.API_URLS.DISLIKE_IMAGE}?id=${params.id}`,
        {}
      );

      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onRemoveDislikeImageAction = createAsyncThunk(
  CONSTANTS.API_URLS.REMOVE_DISLIKE_IMAGE,
  async (params, thunk) => {
    try {
      const response = await putServices.put(
        thunk,
        `${CONSTANTS.API_URLS.REMOVE_DISLIKE_IMAGE}?id=${params.id}`,
        {}
      );
   

      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const channelSlice = createSlice({
  name: "channelSlice",
  initialState,
  reducers: {
    saveChannelData: (state, action) => {
      state.channelData = action.payload;
    },
    saveAllChannelVideo: (state, action) => {
      state.AllChannelVideos = action.payload;
    },
    saveAllChannelImages: (state, action) => {
      state.AllChannelImages = action.payload;
    },
    saveAllSubscription: (state, action) => {
      state.AllSubscriptions = action.payload;
    },
  },
});

export const getAllChannelVideoCategoryAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_VIDEO_CATEGORY,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_ALL_VIDEO_CATEGORY}`,
        params
      );

      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const {
  saveChannelData,
  saveAllChannelVideo,
  saveAllSubscription,
  saveAllChannelImages,
} = channelSlice.actions;
export default channelSlice.reducer;
