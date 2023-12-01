import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

export const getAppOpenID = () => {
  if (__DEV__) {
    return TestIds.APP_OPEN;
  } else if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/5459829097';
  } else {
    return 'ca-app-pub-1891825795064804/1271764500';
  }
};

export const getAdaptiveBannerID = () => {
  if (__DEV__) {
    return TestIds.GAM_BANNER;
  } else if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/5998562713';
  } else {
    return 'ca-app-pub-1891825795064804/8992445613';
  }
};

export const getRewardedCategoryID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  } else if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/9207502414';
  } else {
    return 'ca-app-pub-1891825795064804/4576568782';
  }
};

export const getRewardedOutOfQuotesID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  } else if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/6581339078';
  } else {
    return 'ca-app-pub-1891825795064804/6616370774';
  }
};

export const getRewardedThemeID = () => {
  if (__DEV__) {
    return TestIds.REWARDED;
  } else if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/4971893878';
  } else {
    return 'ca-app-pub-1891825795064804/7801497923';
  }
};

export const getRewardedInsterstialID = () => {
  if (__DEV__) {
    return TestIds.INTERSTITIAL;
  } else if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/2369781260';
  } else {
    return 'ca-app-pub-1891825795064804/8504167513';
  }
};

export const getRewardedInsterstialLearnMoreID = () => {
  if (__DEV__) {
    return TestIds.INTERSTITIAL;
  } else if (Platform.OS === 'ios') {
    return 'ca-app-pub-1891825795064804/8207883533';
  } else {
    return 'ca-app-pub-1891825795064804/8614506820';
  }
};