import React, { useEffect, useState } from 'react';
import { initSocket } from '../utils/Socket';
import useReduxStore from '../hook/UseReduxStore';
import { SocketContext } from './SocketContext';

const SocketContainer = ({ children }) => {
    const { dispatch, getState } = useReduxStore();
  const { accessToken, userData } = getState("auth");
  const { ProfileData } = getState("profile");

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  //  *** S O C K E T   C O N N E C T I O N ***
  useEffect(() => {
    if (accessToken!==null&&ProfileData?._id) {
      console.log('auth passed and socket connected');
      setSocket(initSocket(ProfileData?._id, accessToken));
    }
  }, [accessToken]);

  const getMessageByIdFn = (data) => {
    console.log('getMessageById', data);
  };



  useEffect(() => {
    if (socket && accessToken!==null) {
      socket.on('message-received', getMessageByIdFn);
    }
  }, [accessToken, socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketContainer;
