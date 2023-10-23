import { StyleSheet } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  hideLoader,
  showLoader,
  login,
  signup,
  forgotPassword,
  verifyOtp,
  resetPassword,
  resentOtp,
  getprofileFromSighnUpAction,
} from "../../redux/slices";
import { SCREENS } from "../../constants/them";
import utils from "../../utils";

export default function authHandler(props) {
  const dispatcher = useDispatch();
  const { navigation, route } = props;
  const [email, setemail] = useState(__DEV__ ? "babar@yopmail.com" : "");
  const [password, setpassword] = useState(__DEV__ ? "12345678" : "");
  const [repassword, setrepassword] = useState(__DEV__ ? "12345678" : "");
  const [newpassword, setnewpassword] = useState(__DEV__ ? "12345678" : "");
  const [name, setname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setphone] = useState("");
  const [code, setCode] = useState(__DEV__ ? "" : "");
  const [isRemember, setisRemember] = useState(false);
  const [countryCode, setCountryCode] = useState("US");
  const [country, setCountry] = useState("+1");
  const [showcountryPicker, setShowCountryPicker] = useState(false);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const loginHandler = (data) => {
    if (utils.isEmpty(password) || utils.isEmpty(email)) {
      utils.warningAlert("enter email/password");
      return;
    }

    if (!utils.validateEmail(email)) {
      utils.warningAlert("Enter Valid email");
      return;
    }
    if (password?.length < 8) {
      utils.warningAlert("Enter correnct password");
      return;
    }
    const postData = {
      email,
      password,
    };
    dispatcher(login(postData))
      .unwrap()
      .then((response) => {})
      .catch((err) => {
        if (err.message === "User email is not verified") {
          props.navigation.navigate(SCREENS.OtpVerification, {
            email: email,
            from: "login",
          });
        }
      });
  };

  const signUpHnadler = () => {
    if (utils.isEmpty(name)) {
      utils.warningAlert("Please Enter First Name");
      return;
    }
    if (utils.isEmpty(lastname)) {
      utils.warningAlert("Please Enter Last Name");
      return;
    }
    if (utils.isEmptyOrSpaces(phone)) {
      utils.warningAlert("Please Enter Phone Number");
      return;
    }
    // if (country !== "+1") {
    //   if (country.callingCode[0] === undefined) {
    //     utils.warningAlert("Please select Country which has code");
    //     return;
    //   }
    // }

    if (!utils.validateEmail(email)) {
      utils.warningAlert("Enter Valid email");
      return;
    }
    if (password?.length < 8) {
      utils.warningAlert("Enter correct password");
      return;
    }
    if (repassword !== password) {
      utils.warningAlert("Enter correct confirm password");
      return;
    }

    const countryCode = country !== "+1" ? `+${country.callingCode[0]}` : "+1";
    const data = {
      email: email,
      password: password,
      firstName: name,
      lastName: lastname,
      phoneNumber: countryCode.concat(phone),
    };
    dispatcher(signup(data))
      .unwrap()
      .then((response) => {
        console.log("response==", response);
        props.navigation.navigate(SCREENS.OtpVerification, {
          email: data.email,
          from: "signup",
        });
      })
      .catch((err) => {});
  };

  const forgetPasswaordHnadler = () => {
    if (!utils.validateEmail(email)) {
      utils.warningAlert("Enter Valid email");
      return;
    }
    const data = {
      email: email.toString(),
    };
    dispatcher(forgotPassword(data))
      .unwrap()
      .then((response) => {
        console.log("response", response);
        props.navigation.navigate(SCREENS.ResetPassword, {
          email:email,
          from: "forgetPassword",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const otpverify = () => {
    if (utils.isEmpty(code)) {
      utils.warningAlert("Enter valid code");
      return;
    }
    const data = {
      OTP: code,
      email: props.route.params.email,
    };
    dispatcher(verifyOtp(data))
      .unwrap()
      .then((response) => {
        if (props.route.params.from === "signup") {
          getMyProfile(response?.accessToken);
        } else {
          navigation.navigate(SCREENS.ResetPassword, {
            email: props.route.params.email,
          });
        }
      })
      .catch((err) => {
        utils.errorAlert(err?.message);
        console.log("====", err);
      });
  };
  const resendOtpVarification = () => {
    const data = {
      email: props.route.params.email,
    };
    dispatcher(resentOtp(data))
      .unwrap()
      .then((response) => {
        console.log("responce===", response);
      })
      .catch((err) => {
        utils.errorAlert(err?.message);
        console.log("====", err);
      });
  };

  const resetPasswordHnadler = () => {
    if (password?.length < 8) {
      utils.warningAlert("Password length must be greater than 8");
      return;
    }
    if (password !== newpassword) {
      utils.warningAlert("password and confirm password do not match");
      return;
    }
    const data = {
      // email: route?.params?.email,
      password: password,
      password_confirmation: repassword,
    };
    dispatcher(resetPassword(data))
      .unwrap()
      .then((response) => {
        utils.successAlert(response?.message);
        navigation.replace(SCREENS.Login);
        dispatcher(hideLoader());
      })
      .catch((err) => {
        console.log('======',err);
        utils.errorAlert(err.message)
        dispatcher(hideLoader());
      });
    dispatcher(showLoader());
  };
  const getMyProfile = (accessToken) => {
    dispatcher(getprofileFromSighnUpAction(accessToken))
      .unwrap()
      .then((res) => {
        // console.log("getMyProfile response===", res);
        props.navigation.navigate(SCREENS.EditProfile, {
          accessToken: accessToken,
          from: "signUp",
        });
      })
      .catch((err) => {
        console.log("getMyProfile Error", err);
      });
  };
  return {
    navigation,
    email,
    password,
    repassword,
    name,
    code,
    phone,
    isRemember,
    lastname,
    countryCode,
    country,
    showcountryPicker,
    resendOtpVarification,
    dispatcher,
    setShowCountryPicker,
    onSelect,
    setCountry,
    setCountryCode,
    setLastname,
    setisRemember,
    setphone,
    setCode,
    setemail,
    setpassword,
    setrepassword,
    setname,
    loginHandler,
    signUpHnadler,
    forgetPasswaordHnadler,
    resetPasswordHnadler,
    otpverify,
    newpassword,
    setnewpassword,
  };
}

const styles = StyleSheet.create({});
