import axios from 'axios';
import { CONSTANTS } from '../../constants/them';
import { store } from '../store';

const deleteWithToken = async (uri, body) => {
  let config = {
    headers: {
      Authorization: store.getState()?.auth.accessToken,
    },
  };

  const onSuccess = ({ data }) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .delete(CONSTANTS.API_URLS.BASE_URL + uri, body, config)
    .then(onSuccess)
    .catch(onFailure);
};

const DeleteWithToken = {
  deleteWithToken,
};

export default DeleteWithToken;