import React from "react";
import { RefreshControl, Alert } from "react-native";
import Toast from "react-native-toast-message";

class utils {
  confirmAlert(title, msg, callback) {
    Alert.alert(
      title,
      msg,
      [
        { text: "NO", onPress: () => callback("error") },
        { text: "YES", onPress: () => callback("success") },
      ],
      { cancelable: false }
    );
  }

  successAlert(txt1, txt2) {
    Toast.show({
      type: "success",
      text1: txt1,
      text2: txt2,
    });
  }

  warningAlert(txt1, txt2) {
    Toast.show({
      type: "error",
      text1: txt1,
      text2: txt2,
      position:'bottom'
    });
  }

  errorAlert(txt1, txt2) {
    Toast.show({
      type: "error",
      text1: txt1,
      text2: txt2,
      position:'bottom',
    });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  isNull(obj) {
    if (obj === null || obj === undefined || obj === "") {
      return true;
    } else {
      return false;
    }
  }
  validateEmail(str) {
    var pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return pattern.test(str);
  }

  passValidation(value) {
    return value.length < 6 || value.length > 16;
  }
  ObjectValidation(objectData) {
    let data = Object.entries(objectData).every(([key, val]) => val);
    return data;
  }

  isEmptyOrSpaces(str) {
    if (str !== undefined) {
      return str === null || str.match(/^ *$/) !== null;
    }
  }

  _refreshControl(refhresList, isRef = false) {
    return (
      <RefreshControl
        refreshing={isRef}
        onRefresh={refhresList}
        title={"Pull to Refresh"}
        tintColor={"blue"}
        colors={["white"]}
        progressBackgroundColor={"blue"}
      />
    );
  }

  serializeObj(obj) {
    var str = [];
    for (var p in obj)
      if (obj[p] != "") {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  showResponseError(error) {
    var authErrorRegex = /4[0-9][1-9]/g;
    var serverErrorRegex = /5[0-9][0-9]/g;

    if (error.message === "Network Error") {
      return "Please check your network";
    } else {
      if (error.response) {
        let errorCode = JSON.stringify(
          "error.response.status==",
          error.response.status
        );

        // console.log(JSON.stringify(error?.response));
        // console.log(
        //   "showResponseError error?.response.data",
        //   error?.response.data
        // );

      //   if (errorCode === "400") {
      //     let response = error.response.data;
      //     var error = "";
      //     if (this.isEmpty(response.data)) {
      //       error = response.message;
      //     } else {
      //       var temp = response.data[Object.keys(response.data)[0]];
      //       error = JSON.stringify(temp).replace("[", "").replace("]", "");
      //     }
      //     return error;
      //   } else if (authErrorRegex.test(errorCode)) {
      //     return "Authentication failed";
      //   } else if (serverErrorRegex.test(errorCode)) {
      //     return "Something went wrong with the server";
      //   }
      // } else {
      //   return error?.response.data;
      return error?.response.data;
      }
    }
  }
}

export default new utils();
