import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import Icon, { Icons } from "./Icons";
import { FONTS, SIZES, COLORS, width, FONTFAMILY } from "../constants/them";
import utils from "../utils";
import {
  widthPercentageToDP as wp,
  responsiveFontSize as rf,
  heightPercentageToDP,
} from "../common/responsivefunction";

export default function InputText(props) {
  const {
    email,
    value,
    hasIcon,
    iconType,
    iconName,
    password,
    style,
    required = true,
    multiline,
    placeholder,
    onPress,
    hideLabel,
    rightIcon,
    righttext,
    notrequire,
    disableInput,
    hasCountryPicker,
    onSelect,
    showcountryPicker,
    countryCode,
    maxLength,
  } = props;

  const [focused, setFocused] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [secureTextIcon, setSecureTextIcon] = useState("eye-slash");
  const [iconColor, setIconColor] = useState(COLORS.brown);
  const [borderColor, setBorderColor] = useState(COLORS.brown);

  const showPassword = () => {
    if (secureTextIcon === "eye") {
      setSecureTextIcon("eye-slash");
      setSecureText(true);
    } else {
      setSecureTextIcon("eye");
      setSecureText(false);
    }
  };

  const validate = () => {
    if (utils.isEmptyOrSpaces(value)) {
      return false;
    } else if (email && !utils.validateEmail(value)) {
      return false;
    } else {
      return true;
    }
  };

  const errorMsg = () => {
    if (utils.isEmptyOrSpaces(value)) {
      return "This field is required!";
    } else if (email && !utils.validateEmail(value)) {
      return "Invalid email!";
    } else {
      return "";
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={onPress ? false : true}
        onPress={() => {
          onPress();
        }}
        style={{ marginTop: SIZES.fifteen }}
      >
        {placeholder && hideLabel ? (
          <Text
            style={{
              color: COLORS.brown,
              marginLeft: SIZES.ten,
              marginBottom: SIZES.ten,
            }}
          >
            {hideLabel}
          </Text>
        ) : null}

        <View style={[styles.container, { borderColor: borderColor}, style]}>
          <View style={styles.flexRow}>
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={onPress ? false : true}
              onPress={() => {
                onPress();
              }}
              style={[{ flex: 1 }, styles.flexRow]}
            >
              {!hasCountryPicker && hasIcon ? (
                <View style={{ flex: 0.1 }}>
                  <Icon
                    type={iconType}
                    name={iconName}
                    style={{
                      color: iconColor,
                      fontSize: SIZES.twenty,
                    }}
                  />
                </View>
              ) : null}
              {onPress ? (
                <Text
                  style={[
                    {
                      color: COLORS.brown,
                      fontFamily: FONTFAMILY.Medium,
                      fontSize: SIZES.body14,
                    },
                  ]}
                >
                  {value ? value : placeholder}
                </Text>
              ) : (
                <>
                  {hasCountryPicker && (
                    <CountryPicker
                      onSelect={onSelect}
                      visible={showcountryPicker}
                      countryCode={countryCode}
                      withCallingCode
                      theme={{
                        fontFamily: FONTFAMILY.Medium,
                        resizeMode: "contain",
                      }}
                    />
                  )}
                  <TextInput
                    {...props}
                    selectionColor={COLORS.primary}
                    placeholderTextColor={iconColor}
                    secureTextEntry={password ? secureText : false}
                    editable={disableInput ? false : true}
                    style={[
                      multiline ? styles.multiLineStyle : styles.txtInputStyle,
                      styles.texInput,
                    ]}
                    multiline={multiline}
                    onFocus={() => {
                      setFocused(true);
                      setIconColor(COLORS.primary);
                      setBorderColor(COLORS.primary);
                    }}
                    onBlur={() => {
                      setFocused(false);
                      setIconColor(COLORS.brown);
                      setBorderColor(COLORS.brown);
                      
                    }}
                    maxLength={maxLength}
                    blurOnSubmit={true}
                    
                  />
                </>
              )}
            </TouchableOpacity>
            {rightIcon ? (
              <View style={{ flex: 0.1 }}>
                <Icon
                  type={iconType}
                  name={iconName}
                  style={{
                    color: iconColor,
                    fontSize: SIZES.twenty,
                  }}
                />
              </View>
            ) : null}
            {righttext ? (
              <View style={{ flex: 0.2 }}>
                <Text
                  style={[
                    {
                      color: COLORS.primary,
                      fontSize: rf(1.6),
                      fontFamily: FONTFAMILY.Bold,
                    },
                  ]}
                >
                  {"Choose"}
                </Text>
              </View>
            ) : null}
            {password ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={showPassword}
                style={{ flex: 0.1, alignItems: "flex-end" }}
              >
                <Icon
                  name={secureTextIcon}
                  type={Icons.FontAwesome}
                  style={styles.eyeIconStyle}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* {focused && required && !validate() && (
          <Text style={[FONTS.mediumFont10, styles.errorTextStyle, , {}]}>
            {errorMsg()}
          </Text>
        )} */}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: wp(2),
    borderRadius: SIZES.ten,
    backgroundColor: COLORS.blackWithOpacity,
    borderWidth: 1.5,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtInputStyle: {
    flex: 1,
    height: 55,
    color: COLORS.white,
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body14,
  },
  multiLineStyle: {
    height:heightPercentageToDP(18),
    marginTop: heightPercentageToDP(1.5),
    color: COLORS.secondary,
    textAlignVertical: "top",
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.body14,
    lineHeight: 18,
    width:wp(95),
  },

  eyeIconStyle: {
    fontSize: SIZES.twenty,
    color: COLORS.white,
    padding: 5,
  },
  errorTextStyle: {
    color: "red",
    marginTop: SIZES.five,
    marginHorizontal: SIZES.twenty,
  },
  texInput: {
    fontFamily: FONTFAMILY.Medium,
    color: COLORS.white,
  },
});
