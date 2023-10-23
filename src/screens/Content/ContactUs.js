import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import CustomHeader from "../../componanats/CustomHeader";
import { COLORS } from "../../constants/them";
import InputText from "../../componanats/InputText";
import CustomButton from "../../componanats/CustomButton";
import BottomModal from "../../componanats/BottomModal";
import { Icons } from "../../componanats/Icons";
export default function ContactUs() {
  const [successModal, setSuccesModal] = React.useState(false);

  return (
    <View style={styles.container}>
      <CustomHeader title="Contact Us" showBackButton />
      <InputText placeholder="Name" hideLabel />
      <InputText placeholder="Email" hideLabel />
      <InputText
        placeholder="Message"
        hideLabel
        style={{ height: hp(20), justifyContent: "flex-start" }}
      />
      <CustomButton
        title="Submit"
        btnStyle={{ marginHorizontal: wp(15) }}
        onPress={() => {
          setSuccesModal(true);
        }}
      />
      <BottomModal
        visible={successModal}
        setvisible={setSuccesModal}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        titleIcon="Thank you for contacting us!"
        text={
          "We Have recieved your request and would back to you soon through email address you provided"
        }
        btnText="Ok"
        onSuccess={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    paddingHorizontal: wp(2.5),
  },
});
