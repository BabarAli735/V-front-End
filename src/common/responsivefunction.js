import { Dimensions, PixelRatio } from 'react-native';


// Windows height and width values.
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

/**
 * This function convert width percentage into width pixel ratio
 * @param widthPercent 
 * @returns Display Pixels
 */
const widthPercentageToDP = (widthPercent) => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

/**
 * This function gets the width percentage according to the orientation.
 * @param widthPercent 
 * @param sWidth 
 * @returns width percentage value
 */
const widthPercentageOrientation = (widthPercent, sWidth) => {
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(sWidth * elemWidth / 100);
};

/**
 * This function convert height percentage to pixel ratio
 * @param heightPercent 
 * @returns 
 */
const heightPercentageToDP = (heightPercent) => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

/**
 * This function gets the height percentage according to the orientation.
 * @param heightPercent 
 * @param sHeight 
 * @returns 
 */
const heightPercentageOrientation = (heightPercent, sHeight) => {
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(sHeight * elemHeight / 100);
};

// Helper height and width presets
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

// Horizantal Scale calculated values. 
const scale = (size) => screenWidth / guidelineBaseWidth * size;
const scaleO = (size, sWidth) => sWidth / guidelineBaseWidth * size;

// Vertical Scale calculated values.
const verticalScale = (size) => screenHeight / guidelineBaseHeight * size;
const verticalScaleO = (size, h) => h / guidelineBaseHeight * size;

// Moderate scale values.
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const moderateScaleO = (size, sWidth, factor = 0.5) => size + (scaleO(size, sWidth) - size) * factor;

/**
 * Responsive scale values
 * @param 
 * @returns Number
 */
const responsiveFontSize = (f) => {
    const tempHeight = (16 / 9) * screenWidth;
    return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(screenWidth, 2)) * (f / 100);
};


export {
    screenWidth,
    screenHeight,
    moderateScale,
    verticalScale,
    responsiveFontSize,
    widthPercentageToDP,
    heightPercentageToDP,
    widthPercentageOrientation,
    heightPercentageOrientation,
    moderateScaleO,
    verticalScaleO
};