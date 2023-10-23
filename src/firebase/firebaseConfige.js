import firebase, { initializeApp } from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";
import { saveFcm } from "../redux/slices";
const firebaseConfig = {
  apiKey: "AIzaSyAjdj-xZ7QYLRYNUd54P7LAeNGd1M41qnk",
  authDomain: "vijjio-f209e.firebaseapp.com",
  projectId: "vijjio-f209e",
  storageBucket: "vijjio-f209e.appspot.com",
  messagingSenderId: "375021151606",
  appId: "1:375021151606:android:7033a5afb97a97980cc657",
};
export default Firebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    requestUserPermission();
  } else {
    firebase.app();
    requestUserPermission();
  }
};
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
  console.log('requestUserPermission enable',);
  }
};

