import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTFAMILY, SCREENS, STYLES } from "../../constants/them";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
} from "../../common/responsivefunction";
import CirclImage from "../../componanats/CirclImage";
import Icon, { Icons } from "../../componanats/Icons";
import CustomButton from "../../componanats/CustomButton";
import { FlatList } from "react-native";
import RecentCategory from "../../componanats/RecentCategory";
import HomeList from "../../componanats/HomeList";
import BottomModal from "../../componanats/BottomModal";
import ReportUserModal from "../../componanats/ReportUserModal";
import BackArrow from "../../componanats/BackArrow";
export default function OtherUserProfile(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [showReportUserModal, setShowReportUserModal] = useState(false);
  const [showReportReasonModal, setShowReportReasonModal] = useState(false);
  const [successModal, setSuccesModal] = React.useState(false);
  const [successModal2, setSuccesModal2] = React.useState(false);
  const { status } = props.route.params;
  const [userStatus, setUserStatus] = useState(status);
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={COLORS.transparent} />
      <Image
        style={styles.image}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXBLr_ZUAjASNEScFX9oxoITwwDX5KQkYKw&usqp=CAU",
        }}
      />
      <BackArrow style={{ position: "absolute", top: 20, left: 10 }} />

      <View style={{ paddingHorizontal: wp(2) }}>
        <CirclImage style={styles.CirclImage} />
        {userStatus === "subcribed" && (
          <Text
            style={styles.txtReport}
            onPress={() => {
              setShowReportUserModal(true);
            }}
          >
            Report User
          </Text>
        )}
      </View>

      <Text style={[styles.txt, { textAlign: "center", marginTop: hp(2) }]}>
        Elsa Robert
      </Text>
      <Text style={[styles.txt1, { textAlign: "center", marginTop: hp(1.5) }]}>
        @elsarober 206 subcribe
      </Text>

      <View
        style={[
          STYLES.row,
          {
            justifyContent: "space-evenly",
            marginTop: hp(1),
          },
        ]}
      >
        <TouchableOpacity
          style={STYLES.row}
          onPress={() => {
            props.navigation.navigate(SCREENS.UserVideos, {
              from: "user",
            });
          }}
        >
          <Icon
            type={Icons.Ionicons}
            name={"videocam-outline"}
            style={{
              color: COLORS.white,
              fontSize: rf(3),
            }}
          />
          <Text
            style={[
              styles.txt1,
              { fontSize: rf(2), fontFamily: FONTFAMILY.RobotoLight },
            ]}
          >
            12
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[STYLES.row, {}]}
          onPress={() => {
            props.navigation.navigate(SCREENS.UserImages, {
              from: "user",
            });
          }}
        >
          <Icon
            type={Icons.Ionicons}
            name={"images-outline"}
            style={{
              color: COLORS.white,
              fontSize: rf(3),
            }}
          />
          <Text
            style={[
              styles.txt1,
              { fontSize: rf(2), fontFamily: FONTFAMILY.RobotoLight },
            ]}
          >
            12
          </Text>
        </TouchableOpacity>
      </View>
      {userStatus === "subcribed" ? (
        <View style={[STYLES.row, { justifyContent: "space-evenly" }]}>
          <CustomButton
            title={"unsubcribe"}
            btnStyle={styles.unsub}
            titleStyle={{
              fontFamily: FONTFAMILY.Medium,
              fontSize: rf(1.5),
            }}
            onPress={() => {
              setIsVisible(true);
            }}
          />
          <CustomButton
            title={"Message"}
            btnStyle={styles.btnMessage}
            titleStyle={{
              fontFamily: FONTFAMILY.Medium,
              fontSize: rf(1.5),
              color: COLORS.brownGrey,
            }}
            onPress={() => {
              props.navigation.navigate(SCREENS.ChatScreen);
            }}
          />
        </View>
      ) : (
        <>
          <View style={[STYLES.row, { marginTop: hp(1), paddingLeft: wp(4) }]}>
            <Text style={[styles.txt, { width: wp(50), textAlign: "justify" }]}>
              Subscribers
            </Text>
            <Text style={styles.txtsubcribe}>1000,00</Text>
          </View>
          <View style={[STYLES.row, { marginTop: hp(1), paddingLeft: wp(4) }]}>
            <Text style={[styles.txt, { width: wp(50), textAlign: "justify" }]}>
              Subscription Costs:
            </Text>
            <Text style={styles.txtCosts}>$1000,00</Text>
          </View>
          <View style={[STYLES.row, { justifyContent: "space-evenly" }]}>
            <CustomButton
              title={"Save"}
              btnStyle={styles.savebtn}
              titleStyle={{
                fontFamily: FONTFAMILY.Medium,
                fontSize: rf(1.5),
              }}
              onPress={() => {
                setUserStatus("subcribed");
              }}
            />
            <CustomButton
              title={"Cancel"}
              btnStyle={styles.cancelbtnstyle}
              titleStyle={{
                fontFamily: FONTFAMILY.Medium,
                fontSize: rf(2),
                color: COLORS.primary,
                textDecorationLine: "underline",
              }}
              onPress={() => {
                props.navigation.goBack();
              }}
            />
          </View>
        </>
      )}

      <View style={{ flex: 1, paddingHorizontal: wp(2.5) }}>
        {/* <Text style={[styles.txt, { marginTop: hp(1) }]}>
          Recent Image Uploads
        </Text> */}

        {/* <RecentImages /> */}
        <Text style={[styles.txt, { marginTop: hp(1) }]}>Recent Uploads</Text>
        <RecentCategory />
        <HomeList />
      </View>
      <BottomModal
        visible={showReportUserModal}
        setvisible={setShowReportUserModal}
        iconType={Icons.AntDesign}
        iconName={"questioncircleo"}
        text={"Are you sure you want to report this user ?"}
        yesno
        onSuccess={() => {
          setTimeout(() => {
            setShowReportReasonModal(true);
          }, 1000);
        }}
      />
      <ReportUserModal
        visible={showReportReasonModal}
        setvisible={setShowReportReasonModal}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        title="Report User"
        onSuccess={() => {
          //   props.navigation.goBack();
          setTimeout(() => {
            setSuccesModal2(true);
          }, 1000);
        }}
      />
      <BottomModal
        visible={successModal}
        setvisible={setSuccesModal}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        text={"User Successfully Reported!"}
        btnText="Continue"
        onSuccess={() => {}}
      />
      <BottomModal
        visible={isVisible}
        setvisible={setIsVisible}
        iconType={Icons.AntDesign}
        iconName={"questioncircleo"}
        text={"Are you sure you want to unsubcribe ?"}
        yesno
        onSuccess={() => {
          setUserStatus("unsubcribed");
          setTimeout(() => {
            setSuccesModal2(true);
          }, 1000);
        }}
      />
      <BottomModal
        visible={successModal2}
        setvisible={setSuccesModal2}
        iconType={Icons.AntDesign}
        iconName={"checkcircleo"}
        icoColor={COLORS.green}
        text={"Now you can't share content with your subcribers"}
        btnText="Continue"
        onSuccess={() => {}}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.BLACK },
  image: {
    height: hp(20),
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: wp(3),
    borderBottomRightRadius: wp(3),
  },
 
  txt: {
    fontSize: rf(1.8),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Bold,
  },
  txtReport: {
    textAlign: "right",
    marginTop: hp(1.5),
    textDecorationLine: "underline",
    color: COLORS.primary,
    fontSize: rf(1.8),
    fontFamily: FONTFAMILY.Bold,
  },
  txtCosts: {
    fontSize: rf(2),
    fontFamily: FONTFAMILY.RobotoLight,
    width: wp(30),
    textAlign: "justify",
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
    padding: wp(1),
    color: COLORS.white,
  },
  txtsubcribe: {
    fontSize: rf(2),
    fontFamily: FONTFAMILY.RobotoLight,
    width: wp(40),
    textAlign: "justify",
    color: COLORS.white,
  },
  txt1: {
    fontSize: rf(1.5),
    color: COLORS.white,
    fontFamily: FONTFAMILY.Light,
    marginStart: wp(2),
  },
  cancelbtnstyle: {
    backgroundColor: COLORS.transparent,
    height: hp(6),
    width: wp(30),
  },
  savebtn: {
    backgroundColor: COLORS.primary,
    height: hp(6),
    width: wp(30),
    borderRadius: wp(1),
  },
  btnMessage: {
    backgroundColor: COLORS.transparent,
    height: hp(5),
    width: wp(31),
    borderWidth: 1,
    borderColor: COLORS.brownGrey,
  },
  unsub: {
    backgroundColor: COLORS.primary,
    height: hp(5),
    width: wp(30),
    borderRadius: wp(1),
  },
  CirclImage: {
    position: "absolute",
    height: wp(23),
    width: wp(23),
    borderRadius: wp(23),
    borderWidth: 2,
    borderColor: COLORS.BLACK,
    alignSelf: "center",
    bottom: -10,
  },
});
