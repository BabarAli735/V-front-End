import axios from 'axios';
import { CONSTANTS } from '../../constants/them'
import { useSelector } from 'react-redux';
// import {store} from '../store';

const get = (thunk,url, params) => {

  let config = {
    headers: {
      Authorization: `Bearer ` + thunk.getState()?.auth.accessToken,
      'Content-Type': 'application/json',
    },
    params: params,
  };
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    console.log('error===',error);
    console.log('params===',params);
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_URL + url,config)
    .then(onSuccess)
    .catch(onFailure);
};

const getService = {
  get,
};

export default getService;