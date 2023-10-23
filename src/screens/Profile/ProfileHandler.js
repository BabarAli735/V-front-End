import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  getprofileAction,
  updateprofilAction,
  updateprofilOutTokenAction,
} from "../../redux/slices";
import useReduxStore from "../../hook/UseReduxStore";
import utils from "../../utils";
import { SCREENS } from "../../constants/them";

export default function ProfileHandler(props) {
  const { dispatch, getState } = useReduxStore();
  const { ProfileData } = getState("profile");
  const [email, setemail] = useState(ProfileData?.email);
  const [name, setname] = useState(ProfileData?.firstName);
  const [lname, setLname] = useState(ProfileData?.lastName);
  const [phone, setphone] = useState(ProfileData?.phoneNumber);
  const [uploadModal, setUploadImageModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [image, setimage] = useState({
    uri: ProfileData?.avatar,
  });
  React.useEffect(() => {
    getMyProfile();
  }, []);

  const getMyProfile = () => {
    dispatch(getprofileAction())
      .unwrap()
      .then((response) => {
        // console.log('getMyProfile response===',response);
      })
      .catch((err) => {
        console.log("getMyProfile Error", err);
      });
  };

  const updateProfile = () => {
    if(image.uri==='default.jpg'){
      utils.warningAlert('Please Select Image')
      return
    }
    const formData = new FormData();
    formData.append("firstName", name);
    formData.append("lastName", lname);
    if (ProfileData?.phoneNumber !== phone) {
      formData.append("phoneNumber", phone);
    }
    if (!image?.uri.includes("http")) {
      formData.append("avatar", {
        name: image?.uri?.split("/").slice(-1).toString(),
        type: "image/jpg",
        uri: image?.uri,
      });
    }

    console.log('formData====',formData);

    if (props?.route?.params?.from === "signUp") {
      let body = {
        accessToken: props?.route?.params?.accessToken,
        formData: formData,
      };
      dispatch(updateprofilOutTokenAction(body))
        .unwrap()
        .then((response) => {
          console.log("updateprofilOutTokenAction response", response);
          setShowCreateChannelModal(true);
        })
        .catch((err) => {
          console.log("updateprofilOutTokenAction Error", err);
        });
    } else {
      dispatch(updateprofilAction(formData))
        .unwrap()
        .then((response) => {
          console.log("updateprofilAction response", response);
          utils.successAlert('Profile Updated Successfully');
          getMyProfile();
        })
        .catch((err) => {
          console.log("updateprofilAction Error", err);
        });
    }
  };

  return {
    ProfileData,
    email,
    name,
    phone,
    image,
    uploadModal,
    lname,
    showCreateChannelModal,
    dispatch,
    setShowCreateChannelModal,
    updateProfile,
    setLname,
    setUploadImageModal,
    setimage,
    setphone,
    setname,
    setemail,
  };
}

const styles = StyleSheet.create({});
