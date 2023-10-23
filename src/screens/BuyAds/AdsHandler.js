import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useReduxStore from "../../hook/UseReduxStore";
import {
  createAdAction,
  createPaymentAction,
  deleteAdAction,
  getMyAdsAction,
  getPlanAction,
  hideLoader,
  showLoader,
  updateAdAction,
  watchedAdAction,
} from "../../redux/slices";
import { SCREENS } from "../../constants/them";
import utils from "../../utils";
import { STRIPE_PUBLISHABLE_KEY } from "../../../keys";

export default function AdsHandler(props) {
  const { dispatch, getState } = useReduxStore();
  const { accessToken } = getState("auth");
  const [packageData, setPackageData] = useState([]);
  const [openGenderSelection, setOpenGenderSelection] = useState(false);
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [myAds, setMyAds] = useState([]);
  const [CardInput, setCardInput] = React.useState({});

  const [addVideoData, setAddVieoData] = useState({
    Title: "",
    selectedType: "Select Ads Type",
    description: "",
    url: "",
  });
  useEffect(() => {
    if (props.route.name === SCREENS.BuyAds) getPlanData();
    if (props.route.name === SCREENS.MyAds) getMyAdsData();
    if (props.route.name === SCREENS.UploadAdds) {
      if (props.route.params.item) {
        handleData({
          Title: props.route.params.item.title,
          description: props.route.params.item.description,
          url: props.route.params.item.url,
          selectedType: props.route.params.item.type,
        });
      }
    }
  }, []);

  const handleData = useCallback(
    (value) => {
      setAddVieoData((state) => ({ ...state, ...value }));
    },
    [addVideoData]
  );
  const onPress = useCallback(() => {
    if (selectedAd == null) {
      setUploadImageModal(true);
    }
  }, [uploadImageModal, selectedAd]);
  const getPlanData = () => {
    dispatch(getPlanAction({}))
      .unwrap()
      .then((response) => {
        // console.log("getPlanData response", response);
        setPackageData(response?.data);
      })
      .catch((err) => {
        console.log("getPlanData Error", err);
      });
  };
  const getMyAdsData = () => {
    dispatch(getMyAdsAction({}))
      .unwrap()
      .then((response) => {
        // console.log("getMyAdsData response", response);
        setPackageData(response?.data);
      })
      .catch((err) => {
        console.log("getMyAdsData Error", err);
      });
  };
  const createAdd = (body) => {
    dispatch(createAdAction(body))
      .unwrap()
      .then((response) => {
        console.log("createAdd response", response);
        utils.successAlert(response?.message);
        props.navigation.navigate(SCREENS.BottomTab);
        dispatch(hideLoader());
      })
      .catch((err) => {
        console.log("createAdd Error", err);
      });
  };
  const createPayment = (body, creditCardToken) => {
    console.log("body====", body);
    dispatch(createPaymentAction(body))
      .unwrap()
      .then((response) => {
        console.log("createPayment response", response?.data);

        const imageName =
          props?.route?.params?.body.type[0].uri?.match(/.*\/(.*)$/)[1];
        const formData = new FormData();
        formData.append("transactionId", response?.data?._id);
        formData.append("title", props.route.params.body.title);
        formData.append("description", props.route.params.body?.description);
        formData.append("type", props.route?.params.body?.type[0].type);
        formData.append("stripeCustId", body?.id);
        formData.append("card_last_four_digit", creditCardToken?.last4);
        formData.append(
          "card_expiry",
          `${creditCardToken?.exp_month}/${creditCardToken?.exp_year}`
        );
        if (props.route.params.body.type[0].type === "image") {
          formData.append("media", {
            name: imageName,
            type: "image/jpg",
            uri: props.route.params.body.type[0].uri,
          });
        }
        if (props.route.params.body.type[0].type === "video") {
          formData.append("media", {
            name: imageName,
            type: "video/mp4",
            uri: props.route.params.body.type[0].uri,
          });
        }
        // console.log("formData====", JSON.stringify(formData));
        createAdd(formData);
      })
      .catch((err) => {
        console.log("createPayment Error", err);
      });
  };
  const deleteAd = (param) => {
    dispatch(deleteAdAction(param))
      .unwrap()
      .then((response) => {
        // console.log("deleteAd response", response);
        setPackageData((data) =>
          data?.filter((item, index) => item?._id !== param?.id)
        );
      })
      .catch((err) => {
        console.log("deleteAd Error", err);
      });
  };
  const updateAd = (param) => {
    dispatch(showLoader());

    dispatch(updateAdAction(param))
      .unwrap()
      .then((response) => {
        console.log("updateAd response", response);
        utils.successAlert(response?.message);

        props.navigation.navigate(SCREENS.BottomTab);
        dispatch(hideLoader());
      })
      .catch((err) => {
        console.log("updateAd Error", err);
        dispatch(hideLoader());
      });
  };

  const onSubmit = async () => {
    dispatch(showLoader());
    if (CardInput.valid == false || typeof CardInput.valid == "undefined") {
      utils.errorAlert("Invalid Credit Card");
      dispatch(hideLoader());

      return false;
    }
    if (
      Object.keys(CardInput).length === 0 &&
      CardInput.constructor === Object
    ) {
      props.navigation.goBack();
      dispatch(hideLoader());
      return false;
    }

    try {
      // Create a credit card token
      const creditCardToken = await getCreditCardToken(CardInput);
      const body = {
        token: creditCardToken?.res.id,
        planId: props?.route.params.id,
        amount_range: props?.route.params.amount_range,
      };
      // console.log("creditCardToken===", creditCardToken);
      createPayment(body, creditCardToken.res.card);
      if (creditCardToken.error) {
        utils.errorAlert("creditCardToken error");
        dispatch(hideLoader());
        return;
      }
    } catch (e) {
      dispatch(hideLoader());
      console.log(e);
      return;
    }

    // addCard(creditCardToken?.res?.id);
  };
  const _onChange = (data) => {
    setCardInput(data);
  };
  function getCreditCardToken(creditCardData) {
    const card = {
      "card[number]": creditCardData.values.number.replace(/ /g, ""),
      "card[exp_month]": creditCardData.values.expiry.split("/")[0],
      "card[exp_year]": creditCardData.values.expiry.split("/")[1],
      "card[cvc]": creditCardData.values.cvc,
      "card[name]": creditCardData.values.name,
    };

    return fetch("https://api.stripe.com/v1/tokens", {
      headers: {
        // Use the correct MIME type for your server
        Accept: "application/json",
        // Use the correct Content Type to send data to Stripe
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
      },

      // Use a proper HTTP method
      method: "post",

      // Format the credit card data to a string of key-value pairs
      // divided by &

      body: Object.keys(card)
        .map((key) => key + "=" + card[key])
        .join("&"),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res====", res);
        return { res, mcard: card };
      })
      .catch((error) => {
        console.log("eeeeeeee", error);
      });
  }
  //
  const addCard = async (token) => {
    if (Object.keys(CardInput).length <= 0) {
      utils.errorAlert("please enter card details");
      return;
    }

    const cardDetail = {
      cardholder_name: CardInput["values"]["name"],
      card_number: CardInput["values"]["number"],
      expiry_date: CardInput["values"]["expiry"],
      cvv: CardInput["values"]["cvc"],
    };

    if (cardDetail.card_number === "") {
      dispatch(hideLoader());
      utils.errorAlert("Card Number is required*.");
      return;
    }
    if (cardDetail.expiry_date === "") {
      dispatch(hideLoader());
      utils.errorAlert("Expiry date is required*.");

      return;
    }
    if (cardDetail.cvv === "") {
      dispatch(hideLoader());
      utils.errorAlert("CVV/CVC is required*.");
      return;
    }
    let body = {
      token_from_js: token,
      amount: props.route?.params?.item?.quantity,
      id: props.route?.params?.item?.id,
    };

    let config = {
      headers: {
        Authorization: `Bearer ` + accessToken,
      },
    };

    const onSuccess = ({ data }) => {
      utils.successAlert(data?.message);
      dispatch(hideLoader());
      // navigation.navigate(SCREENS.BottomTab, {screen: SCREENS.SideMenu});
    };

    const onFailure = (error) => {
      let err = utils.showResponseError(error);
      console.log("--->", err);

      //   dispatch(hideLoader());
    };

    axios
      .post(
        CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.PAYMENT,
        body,
        config
      )
      .then(onSuccess)
      .catch(onFailure);
  };
  return {
    accessToken,
    packageData,
    openGenderSelection,
    selectedAd,
    addVideoData,
    uploadImageModal,
    CardInput,
    setCardInput,
    setUploadImageModal,
    handleData,
    onPress,
    setAddVieoData,
    setSelectedAd,
    setOpenGenderSelection,
    createAdd,
    onSubmit,
    _onChange,
    deleteAd,
    updateAd,
  };
}

const styles = StyleSheet.create({});
