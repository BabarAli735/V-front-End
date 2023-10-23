import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useReduxStore from "../../hook/UseReduxStore";
import {
  getChatListAction,
  getChatMessagesAction,
  getChatdataAction,
  onSendMessageAction,
} from "../../redux/slices/chat";
import { SCREENS } from "../../constants/them";
import utils from "../../utils";

export default function ChatHandler(props) {
  const { dispatch, getState } = useReduxStore();
  const { ChatLists, ChatMessages } = getState("chat");
  const { userData } = getState("auth");
  const { ProfileData } = getState("profile");

  const [searchData, setSearchData] = useState([]);
  const [messages, setmessages] = useState([1]);
  const [text, setText] = useState("");
  const [chatData, setChatData] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      if (props.route.name === SCREENS.Chat) {
        getAllChats();
      }
    }, [])
  );
  useEffect(() => {
    if (props.route.name === SCREENS.ChatScreen) {
      getChatMessages(props.route.params.chatId);
      getChatData(props.route.params.chatId);
      const intervalId = setInterval(() => {
        getChatMessages(props.route.params.chatId);
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, []);

  const getChatData = (id) => {
    dispatch(getChatdataAction(id))
      .unwrap()
      .then((response) => {
        // console.log("getChatData response", response);
        setChatData(response);
      })
      .catch((err) => {
        console.log("getChatData Error", err);
      });
  };
  const getChatMessages = (id) => {
    dispatch(getChatMessagesAction(id))
      .unwrap()
      .then((response) => {
        // console.log("getChatMessages response", response);
      })
      .catch((err) => {
        console.log("getChatMessages Error", err);
      });
  };
  const getAllChats = async () => {
    dispatch(getChatListAction())
      .unwrap()
      .then((response) => {
        // console.log("getAllChats response", response);
        setSearchData(response);
      })
      .catch((err) => {
        console.log("getAllChats Error", err);
      });
  };
  const searchFilterFunction = (e) => {
    if (e !== "") {
      let text = e.toLowerCase();
      let filteredList = searchData.filter((item) => {
        return item?.participant?.firstName.toLowerCase().match(text);
      });
      console.log("filteredList===", filteredList);
      setSearchData(filteredList);
    } else {
      setSearchData(ChatLists);
    }
  };
  const onSendMessage = () => {
    if (utils.isEmptyOrSpaces(text)) {
      utils.warningAlert("Please Enter Message");
      return;
    }
    const body = {
      senderId: ProfileData?._id,
      receiverId: chatData.participant?.id,
      body: text,
      chatId: chatData?._id,
    };
    dispatch(onSendMessageAction(body))
      .unwrap()
      .then((response) => {
        // console.log("onSendMessage response", response);
        getChatMessages(chatData?._id);
        setText("");
      })
      .catch((err) => {
        console.log("onSendMessage Error", err);
      });
  };

  return {
    ChatLists,
    searchData,
    messages,
    text,
    ChatMessages,
    userData,
    ProfileData,
    chatData,
    onSendMessage,
    setText,
    setmessages,
    searchFilterFunction,
  };
}

const styles = StyleSheet.create({});
