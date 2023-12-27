import { Dimensions, PixelRatio } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

// Get Responsive Hight DP
export const wp = (px) => {
  let resized = 0;
  if (
    Dimensions.get('window').height >= 400
    && Dimensions.get('window').height < 600
  ) {
    resized = (px * 100) / 550;
  } else if (
    Dimensions.get('window').height >= 600
    && Dimensions.get('window').height < 700
  ) {
    resized = (px * 100) / 675;
  } else if (
    Dimensions.get('window').height >= 700
    && Dimensions.get('window').height < 800
    && Dimensions.get('window').width > 400
  ) {
    resized = (px * 100) / 675;
  } else if (
    Dimensions.get('window').height >= 700
    && Dimensions.get('window').height < 800
  ) {
    resized = (px * 100) / 750;
  } else if (
    Dimensions.get('window').height >= 800
    && Dimensions.get('window').height < 850
    && Dimensions.get('window').width < 400
  ) {
    // iPhone X
    resized = (px * 100) / 800;
  } else if (
    Dimensions.get('window').height >= 800
    && Dimensions.get('window').height < 1000
    && Dimensions.get('window').width < 450
  ) {
    // iphone Pro Max
    resized = (px * 100) / 810;
  } else if (
    Dimensions.get('window').height >= 800
    && Dimensions.get('window').height < 900
  ) {
    resized = (px * 100) / 600;
  } else if (
    Dimensions.get('window').height >= 900
    && Dimensions.get('window').height < 1000
  ) {
    resized = (px * 100) / 750;
  } else if (
    Dimensions.get('window').height >= 1000
    && Dimensions.get('window').height < 1200
  ) {
    resized = (px * 100) / 650;
  } else if (Dimensions.get('window').height > 1200) {
    resized = (px * 100) / 800;
  }
  return heightPercentageToDP(resized);
};

export const mergedWidth = (px) => {
  var resized = (px * 100) / 375;
  return widthPercentageToDP(resized);
};

// Get Responsive Width HP= window
export const hp = (px) => {
  let resized = 0;
  if (Dimensions.get('window').width <= 400) {
    resized = (px * 100) / 370;
  } else if (
    Dimensions.get('window').width >= 400
    && Dimensions.get('window').width < 700
  ) {
    resized = (px * 100) / 375;
  } else if (
    Dimensions.get('window').width >= 700
    && Dimensions.get('window').width < 800
  ) {
    resized = (px * 100) / 668;
  } else if (Dimensions.get('window').width >= 800) {
    resized = (px * 100) / 650;
  }
  return widthPercentageToDP(resized);
};

export const width = () => {
  let resized = 0;
  resized = Dimensions.get('window').width;
  return resized;
};

export const height = () => {
  let resized = 0;
  resized = Dimensions.get('window').height;
  return resized;
};

// Padding Right Home Screen
export const pd = (px) => {
  let resized = 0;
  if (Dimensions.get('window').width <= 400) {
    resized = '0%';
  } else if (
    Dimensions.get('window').width >= 400
    && Dimensions.get('window').width <= 699
  ) {
    resized = '1.5%';
  } else {
    resized = '1.5%';
  }
  return widthPercentageToDP(resized);
};

export const dw = (px) => {
  let resized = 0;
  if (Dimensions.get('window').width <= 400) {
    resized = Dimensions.get('window').width / px;
  } else if (
    Dimensions.get('window').width >= 400
    && Dimensions.get('window').width <= 699
  ) {
    resized = Dimensions.get('window').width / px;
  } else {
    resized = Dimensions.get('window').width / px / 2;
  }
  return widthPercentageToDP(resized);
};

export const hw = (px) => {
  let resized = 0;
  if (Dimensions.get('window').height <= 400) {
    resized = (Dimensions.get('window').height * 2) / px;
  } else if (
    Dimensions.get('window').height >= 400
    && Dimensions.get('window').height <= 720
  ) {
    resized = Dimensions.get('window').height / px;
  } else {
    resized = Dimensions.get('window').height / px / 2;
  }
  return heightPercentageToDP(resized);
};

export const logoTab = (px) => {
  let resized = 0;
  resized = Dimensions.get('window').width / px;
  return resized;
};

export const fontOrderScreen = (px) => {
  let resized = 0;
  if (Dimensions.get('window').width <= 399) {
    resized = (Dimensions.get('window').width * 1.5) / px;
  } else if (
    Dimensions.get('window').width >= 400
    && Dimensions.get('window').width <= 699
  ) {
    resized = (Dimensions.get('window').width * 2) / px;
  } else {
    resized = Dimensions.get('window').width / px;
  }
  return resized;
};

export const sizeImageCsv = () => {
  let resized = 0;
  if (Dimensions.get('window').width <= 399) {
    resized = wp(25);
  } else if (
    Dimensions.get('window').width >= 400
    && Dimensions.get('window'.width <= 699)
  ) {
    resized = wp(35);
  } else {
    resized = wp(50);
  }
  return resized;
};

// Get Responsive Fixed Font
export const fixedFontSize = (size) => {
  const responsiveSize = size / PixelRatio.getFontScale();
  const resized = wp(responsiveSize);
  return resized;
};
export const fixedFontSizeHp = (size) => {
  const responsiveSize = size / PixelRatio.getFontScale();
  const resized = wp(responsiveSize);
  return resized;
};
export const mergedFontSize = (size) => {
  var responsiveSize = size / PixelRatio.getFontScale();
  var resized = mergedWidth(responsiveSize);
  return resized;
};

export const formatAmount = (item) => {
  if (item > 999) {
    const data = item / 1000;
    return data.toFixed(1);
  }
  return item;
};

export const formatPercentage = (item) => {
  return item.toFixed(0);
};
