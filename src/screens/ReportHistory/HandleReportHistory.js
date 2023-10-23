import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import useReduxStore from "../../hook/UseReduxStore";
import {
  deleteReportAction,
  getAllUserReportsAction,
} from "../../redux/slices/reports";
import { SCREENS } from "../../constants/them";
import { createReportAction } from "../../redux/slices/channel";
import utils from "../../utils";

export default function HandleReportHistory(props) {
  const ref = useRef();
  const { dispatch, getState } = useReduxStore();
  const { AllReportData } = getState("report");
  const { ProfileData } = getState("profile");
  const [isVisible, setIsVisible] = React.useState(false);
  const [successModal, setSuccesModal] = React.useState(false);
  const [selectedOption, setSelectedoption] = React.useState("All");
  const [ReportData, setReportData] = React.useState("");
  const [reportTitle, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsloading] = React.useState(false);
  useEffect(() => {
    if (props.route.name === SCREENS.ReportHistory) {
      getAllUserReportReport();
    }
  }, []);

  const getAllUserReportReport = () => {
    dispatch(getAllUserReportsAction())
      .unwrap()
      .then((response) => {
        // console.log("getAllUserReportReport response", response);
        // setReportData(response);
        if (selectedOption === "All") {
          setReportData(response);
        }
        if (selectedOption === "Channel Reports") {
          const filterValue = "Channel";
          const filteredData = response.filter((val) =>
            val.objectType.includes(filterValue)
          );
          setReportData(filteredData);
        }
        if (selectedOption === "Videos Reports") {
          const filterValue = "Video";
          const filteredData = response.filter((val) =>
            val.objectType.includes(filterValue)
          );
          setReportData(filteredData);
        }
      })
      .catch((err) => {
        console.log("getAllUserReportReport Error", err);
      });
  };
  const deleteReport = (id) => {
    dispatch(deleteReportAction(id))
      .unwrap()
      .then((response) => {
        console.log("deleteReport response", response);
        getAllUserReportReport();
      })
      .catch((err) => {
        console.log("getAllUserReportReport Error", err);
      });
  };

  const handleSelectedReport = (data) => {
    ref.current.hide();
    setSelectedoption(data);
    if (data === "All") {
      setReportData(AllReportData);
    }
    if (data === "Channel Reports") {
      const filterValue = "Channel";
      const filteredData = AllReportData.filter((val) =>
        val.objectType.includes(filterValue)
      );
      setReportData(filteredData);
    }
    if (data === "Videos Reports") {
      const filterValue = "Video";
      const filteredData = AllReportData.filter((val) =>
        val.objectType.includes(filterValue)
      );
      setReportData(filteredData);
    }
  };
  const onCreateReport = (item) => {
    if (utils.isEmptyOrSpaces(reportTitle)) {
      utils.warningAlert("Please Enter Report Title");
      return;
    }
    if (utils.isEmptyOrSpaces(description)) {
      utils.warningAlert("Please Enter Report description");
      return;
    }
    const body = {
      title: reportTitle,
      description: description,
      objectType: props.route.params.from,
      object: props.route.params.id,
    };
    setIsloading(true);
    dispatch(createReportAction(body))
      .unwrap()
      .then((response) => {
        console.log("onCreateReport response", response);
        setIsloading(false);

        utils.successAlert(response?.message);
        props.navigation.goBack();
      })
      .catch((err) => {
        setIsloading(false);
        console.log("onCreateReport Error", err);
      });
  };
  return {
    ref,
    isVisible,
    successModal,
    selectedOption,
    ReportData,
    AllReportData,
    reportTitle,
    description,
    isLoading,
    onCreateReport,
    setDescription,
    setTitle,
    handleSelectedReport,
    setReportData,
    setSelectedoption,
    setSuccesModal,
    setIsVisible,
    deleteReport,
  };
}

const styles = StyleSheet.create({});
