import axios from "axios";
import { API, CONSTANTS } from "../../constants/them";

const put = async (thunk, uri, body) => {
  
  let config = {
    headers: {
      Authorization: `Bearer ` + thunk.getState()?.auth.accessToken,
    },
  };

  console.log('====',CONSTANTS.API_URLS.BASE_URL + uri);
  console.log('===',JSON.stringify(body));

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    console.log(error);
    throw error;
  };

  return axios
    .put(CONSTANTS.API_URLS.BASE_URL + uri, body, config)
    .then(onSuccess)
    .catch(onFailure);
};
const patch = async (thunk, uri, body) => {
  
  let config = {
    headers: {
      Authorization: `Bearer ` + thunk.getState()?.auth.accessToken,
    },
  };

  console.log('====',CONSTANTS.API_URLS.BASE_URL + uri);
  console.log('===',JSON.stringify(body));

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    console.log(error);
    throw error;
  };

  return axios
    .patch(CONSTANTS.API_URLS.BASE_URL + uri, body, config)
    .then(onSuccess)
    .catch(onFailure);
};
const putFormData = async (thunk, uri, body) => {

  let config = {
    headers: {
      Authorization: `Bearer ` + thunk.getState()?.auth.accessToken,
      "Content-Type": "multipart/form-data",
    },
  };

  // console.log(CONSTANTS.API_URLS.BASE_URL + uri, body, config);
  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = (error) => {
    throw error;
  };

  return axios
    .put(CONSTANTS.API_URLS.BASE_URL + uri, body, config)
    .then(onSuccess)
    .catch(onFailure);
};
const Put = {
  put,
  putFormData,
  patch
};

export default Put;
