import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

export const getAppOpenID = () => {
  // if (__DEV__) {
  //   return TestIds.REWARDED;
  // }
  if (Platform.OS === 'ios') {
     return 'ca-app-pub-1891825795064804/1249922350';
  } else {
    return 'ca-app-pub-1891825795064804/9371954959';
  }
};

export const getAdaptiveBannerID = () => {
  // if (__DEV__) {
  //   return TestIds.REWARDED;
  // }
 if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/2659244938';
  } else {
    return 'ca-app-pub-1891825795064804/2918227241';
  }
};



export const getRewardedColorThemeID = () => {
  // if (__DEV__) {
  //   return TestIds.REWARDED;
  // }
 if (Platform.OS === 'ios') {
   return 'ca-app-pub-1891825795064804/3572833361';
  } else {
    return 'ca-app-pub-1891825795064804/5348949461';
  }
};

export const getRewardedFontThemeID = () => {
  // if (__DEV__) {
  //   return TestIds.REWARDED;
  // }
  if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/7436040842';
  } else {
    return 'ca-app-pub-1891825795064804/5021646405';
  }
};

export const getRewardedImageID = () => {
  // if (__DEV__) {
  //   return TestIds.REWARDED;
  // }
  if (Platform.OS === 'ios') {
   return 'ca-app-pub-1891825795064804/7128934991';
  } else {
    return 'ca-app-pub-1891825795064804/6398291344';
  }
};

export const getRewardedBgColorID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  }
   if (Platform.OS === 'ios') {
  return 'ca-app-pub-1891825795064804/2842189712';
  } else {
    return 'ca-app-pub-1891825795064804/8207085081';
  }
};

export const getRewardedInsterstialStoryID = () => {
  // if (__DEV__) {
  //   return TestIds.REWARDED;
  // }
 if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/5276184232'
  } else {
    return 'ca-app-pub-1891825795064804/9564245502';
  }
};

export const getRewardedInsterstial12HID = () => {
  // if (__DEV__) {
  //   return TestIds.REWARDED;
  // }
 if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/5276184232'
  } else {
    return 'ca-app-pub-1891825795064804/6991458026';
  }
};