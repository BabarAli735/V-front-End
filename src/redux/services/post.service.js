import axios from "axios";
import { API, CONSTANTS } from "../../constants/them";

const post = async (thunk, uri, body) => {
  let config = {
    headers: {
      Authorization: `Bearer ` + thunk.getState()?.auth.accessToken,
    },
  };

  // console.log(CONSTANTS.API_URLS.BASE_URL + uri);
  // console.log(JSON.stringify(body));
  // console.log(config);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    console.log('error',error);
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_URL + uri, body, config)
    .then(onSuccess)
    .catch(onFailure);
};
const get = async (accessToken, uri, body) => {
  let config = {
    headers: {
      Authorization: `Bearer ` + accessToken,
    },
  };

  // console.log(CONSTANTS.API_URLS.BASE_URL + uri);
  // console.log(JSON.stringify(body));
  // console.log(config);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    console.log(error);
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_URL + uri, config)
    .then(onSuccess)
    .catch(onFailure);
};
const deletePost = async (thunk, uri, body) => {
  let config = {
    headers: {
      Authorization: `Bearer ` + thunk.getState()?.auth.accessToken,
    },
  };

  console.log("deletePost", CONSTANTS.API_URLS.BASE_URL + uri);
  console.log(JSON.stringify(body));
  console.log(config);

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    console.log(error);
    throw error;
  };

  return axios
    .delete(CONSTANTS.API_URLS.BASE_URL + uri, config)
    .then(onSuccess)
    .catch(onFailure);
};
const postFormData = async (thunk, uri, body) => {

  let config = {
    headers: {
      Authorization: `Bearer ` + thunk.getState()?.auth.accessToken,
      "Content-Type": "multipart/form-data",
    },
  };

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_URL + uri, body,config)
    .then(onSuccess)
    .catch(onFailure);

    
};
const postFormDataOutToken = async (accessToken, uri, body) => {
  let config = {
    headers: {
      Authorization: `Bearer ` + accessToken,
      "Content-Type": "multipart/form-data",
    },
  };

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_URL + uri, body, config)
    .then(onSuccess)
    .catch(onFailure);
};
const putFormDataOutToken = async (accessToken, uri, body) => {
  let config = {
    headers: {
      Authorization: `Bearer ` + accessToken,
      "Content-Type": "multipart/form-data",
    },
  };

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  console.log(CONSTANTS.API_URLS.BASE_URL + uri, body, config);
  return axios
    .put(CONSTANTS.API_URLS.BASE_URL + uri, body, config)
    .then(onSuccess)
    .catch(onFailure);
};

const Post = {
  post,
  get,
  postFormData,
  postFormDataOutToken,
  deletePost,
  putFormDataOutToken
};

export default Post;
