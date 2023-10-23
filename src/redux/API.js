// import {create} from 'apisauce';
// import { CONSTANTS } from '../constants';
// import { store } from './store';
// const API = create({
//   baseURL: CONSTANTS.API_URLS.BASE_URL,
//   timeout: 15000,
//   timeoutErrorMessage: 'Please try Again server is Busy now',
// });

// API.addRequestTransform(config => {
//   const {accessToken} = store.getState();
//   config.headers = {
//     Authorization: `Bearer ${accessToken}`,
//     'Content-Type': 'application/json',
//   };
//   return config;
// });

// export default API;