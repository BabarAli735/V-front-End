import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../../constants/them";
import getServices from "../services/get.service";
import postServices from "../services/post.service";
import putServices from "../services/put.service";
import utils from "../../utils";
import { hideLoader, showLoader } from "./loader";

const initialState = {
  ALLVIDEOS: [],
  AllVideos: [],
  AllRecentVideos: [],
  AllChannelVideos: [],
  VideoDetail: [],
  SimilarVideos: [],
  uploadingData: null,
  isUploading: false,
  AllCategory: [],
  ContinueWatch: [],
  VideosDurations: [],
  uploadingProgress:0,
  HomelistIndex:0
};
export const continueWatch = createAsyncThunk(
  CONSTANTS.API_URLS.CONTINIE_WATCH,
  async (List, thunk) => {
    try {
      thunk.dispatch(saveContinueWatch(List));
      return List;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const saveVideoDuration = createAsyncThunk(
  CONSTANTS.API_URLS.CONTINIE_WATCH,
  async (params, thunk) => {
    try {
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.CONTINIE_WATCH,
        params
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getAllVideosAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_VIDEOS,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALL_VIDEOS,
        {}
      );

      thunk.dispatch(saveAllVideos(response?.data));
      thunk.dispatch(hideLoader());

      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getAllRecentVideosAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_RECENT_VIDEOS,
  async (params, thunk) => {
    try {
      thunk.dispatch(showLoader());

      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALL_RECENT_VIDEOS,
        {}
      );

      thunk.dispatch(hideLoader());

      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getVideosByCategoryAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_VIDEOS,
  async (params, thunk) => {
    try {
      let data = params?.page > 1 ? thunk.getState().videos?.AllVideos : [];
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALL_VIDEOS,
        params
      );
      thunk.dispatch(saveAllVideos(data?.concat(response?.data)));
      thunk.dispatch(hideLoader());
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getVideosDurationAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_VIDEOS_DURATION,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_VIDEOS_DURATION,
        params
      );
      thunk.dispatch(saveVideosDurations(response?.data));
      return response?.data;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getChannelVideosAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_VIDEOS,
  async (params, thunk) => {
    try {
      let data = params?.page > 1 ? thunk.getState().videos?.AllVideos : [];
      const response = await getServices.get(
        thunk,
        CONSTANTS.API_URLS.GET_ALL_VIDEOS,
        params
      );
      // thunk.dispatch(saveChannelVideos(data?.concat(response?.data)));
      // if (params?.categories === undefined) {
      //   console.log("response?.data", response?.data.length);
      //   thunk.dispatch(saveChannelVideos(response?.data));
      // }
      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getVideoDetailAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_VIDEO_DETAIL,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_VIDEO_DETAIL}${params}`,
        undefined
      );

      thunk.dispatch(saveVideoDetail(response?.data));
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getSimilarVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_SIMILAR_VIDEO,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_SIMILAR_VIDEO}${params}`,
        undefined
      );

      thunk.dispatch(saveSimilarVideos(response?.data));
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getAllCategorAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_CATEGORY,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_ALL_CATEGORY}`,
        {}
      );

      thunk.dispatch(hideLoader());
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const getAllVideoCategorAction = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ALL_VIDEO_CATEGORY,
  async (params, thunk) => {
    try {
      const response = await getServices.get(
        thunk,
        `${CONSTANTS.API_URLS.GET_ALL_VIDEO_CATEGORY}`,
        {}
      );

      thunk.dispatch(saveAllCategory(["All", ...response?.data]));
      return response?.data;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const onUploadVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPLOAD_VIDEO,
  async (body, thunk) => {
    try {
      const response = await postServices.postFormData(
        thunk,
        CONSTANTS.API_URLS.UPLOAD_VIDEO,
        body
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onUpdateVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_VIDEO,
  async (body, thunk) => {
    try {
      const response = await putServices.putFormData(
        thunk,
        `${CONSTANTS.API_URLS.UPDATE_VIDEO}${body.id}`,
        body.formData
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onUploadImageAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPLOAD_IMAGE,
  async (body, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await postServices.postFormData(
        thunk,
        CONSTANTS.API_URLS.UPLOAD_IMAGE,
        body
      );
      thunk.dispatch(hideLoader());

      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      utils.warningAlert(err);
      return err;
    }
  }
);
export const onUpdateImageAction = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_IMAGE,
  async (body, thunk) => {
    try {
      thunk.dispatch(showLoader());
      const response = await putServices.putFormData(
        thunk,
        `${CONSTANTS.API_URLS.UPDATE_IMAGE}${body.id}`,
        body.formData
      );
      thunk.dispatch(hideLoader());

      return response;
    } catch (error) {
      thunk.dispatch(hideLoader());

      let err = utils.showResponseError(error);
      utils.warningAlert(err);
      return err;
    }
  }
);
export const onlikeVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.LIKE_VIDEO,
  async (params, thunk) => {
    try {
      const response = await putServices.put(
        thunk,
        `${CONSTANTS.API_URLS.LIKE_VIDEO}?id=${params.id}`,
        {}
      );
  

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onRemovelikeVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.REMOVE_LIKE_VIDEO,
  async (params, thunk) => {
    try {
      
  
      const response = await putServices.put(
        thunk,
        `${CONSTANTS.API_URLS.REMOVE_LIKE_VIDEO}?id=${params.id}`,
        {}
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);

export const onDislikeVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.DISLIKE_VIDEO,
  async (params, thunk) => {
    try {
   
      const response = await putServices.put(
        thunk,
        `${CONSTANTS.API_URLS.DISLIKE_VIDEO}?id=${params.id}`,
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
export const onRemoveDislikeVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.REMOVE_DISLIKE_VIDEO,
  async (params, thunk) => {
    try {
      const response = await putServices.put(
        thunk,
        `${CONSTANTS.API_URLS.REMOVE_DISLIKE_VIDEO}?id=${params.id}`,
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



export const onViewVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.VIEW_VIDEO,
  async (params, thunk) => {
    try {
      const response = await putServices.put(
        thunk,
        `${CONSTANTS.API_URLS.VIEW_VIDEO}?id=${params.id}`,
        {}
      );

      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  }
);
export const onSaveRecentVideoAction = createAsyncThunk(
  CONSTANTS.API_URLS.SAVE_RECENT_VIDEO,
  async (body, thunk) => {
    try {
      const response = await postServices.post(
        thunk,
        CONSTANTS.API_URLS.SAVE_RECENT_VIDEO,
        body
      );

      return response;
    } catch (error) {
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
      // thunk.dispatch(showLoader());
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
export const videos = createSlice({
  name: "videos",
  initialState,
  reducers: {
    saveAllVideos: (state, action) => {
      state.AllVideos = action.payload;
    },
    saveVideos: (state, action) => {
      state.ALLVIDEOS = action.payload;
    },
    saveAllRecentVideos: (state, action) => {
      state.AllRecentVideos = action.payload;
    },
    saveChannelVideos: (state, action) => {
      state.AllChannelVideos = action.payload;
    },
    saveSimilarVideos: (state, action) => {
      state.SimilarVideos = action.payload;
    },
    saveVideoDetail: (state, action) => {
      state.VideoDetail = action.payload;
    },
    saveUploadingData: (state, action) => {
      state.uploadingData = action.payload;
    },
    saveIsUploading: (state, action) => {
      state.isUploading = action.payload;
    },
    saveAllCategory: (state, action) => {
      state.AllCategory = action.payload;
    },
    saveContinueWatch: (state, action) => {
      state.ContinueWatch = action.payload;
    },
    saveVideosDurations: (state, action) => {
      state.VideosDurations = action.payload;
    },
    saveUploadingProgress: (state, action) => {
      state.uploadingProgress = action.payload;
    },
    saveHomeListLeavingIndex: (state, action) => {
      state.HomelistIndex = action.payload;
    },
  },
});

export const {
  saveAllVideos,
  saveVideoDetail,
  saveSimilarVideos,
  saveUploadingData,
  saveIsUploading,
  saveAllCategory,
  saveContinueWatch,
  saveAllRecentVideos,
  saveChannelVideos,
  saveVideos,
  saveVideosDurations,
  saveUploadingProgress,
  saveHomeListLeavingIndex
} = videos.actions;
export default videos.reducer;
