import io from "socket.io-client";
import { CONSTANTS } from "../constants/them";

export const initSocket = (userId, accessToken) => {
  const url = CONSTANTS.API_URLS.BASE_URL;
  const socket = io(`${url}?token=Bearer ${accessToken}`);

  // Emit the 'user-connected' event with the user ID
  socket.emit("user-connected", userId);

  console.log("user-connected", userId);
  return socket;
};
