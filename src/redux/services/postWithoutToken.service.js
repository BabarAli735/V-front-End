import axios from 'axios';
import {API, CONSTANTS} from '../../constants/them';

const posthWithoutToken = async (uri, body) => {
  const onSuccess = ({data}) => {

    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_URL + uri, body)
    .then(onSuccess)
    .catch(onFailure);
};

const postWitoutToken = {
   posthWithoutToken,
};

export default postWitoutToken;