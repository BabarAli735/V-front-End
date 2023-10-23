// import messaging from "@react-native-firebase/messaging";
import { saveFcm } from "../redux/slices";
import useReduxStore from "../hooks/UseReduxStore";

// export async function requestUserPermission(dispatch) {
//   try {
//     messaging()
//       .getToken()
//       .then((token) => {
//         saveFCM(token);
//       });

//     messaging().onTokenRefresh((token) => {
//       saveFCM(token);
//     });
//   } catch (error) {
//     console.log("error===", error);
//   }
// }


