import axios from 'axios';
import {API, CONSTANTS} from '../../constants/them';

const get = (url, config) => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };
  return axios
    .get(API.BaseUrl + url, config)
    .then(onSuccess)
    .catch(onFailure);
};
const getServiceWithoutToken = {
  get,
};

export default getServiceWithoutToken;