import {InterstitialAd, RewardedAd, RewardedInterstitialAd} from 'react-native-google-mobile-ads';
import {
  getRewardedColorThemeID,
  getRewardedBgColorID,
  getRewardedFontThemeID,
  getRewardedInsterstial12HID,
  getRewardedImageID,
  getRewardedInsterstialStoryID,
} from '../shared/adsId';

export const loadRewarded = async (handleOpen, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(
      getRewardedInsterstialStoryID(),
      {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      },
    );
  
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });
  export const loadRewardedWatch = async (handleOpen, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(
      getRewardedInsterstial12HID(),
      {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      },
    );
  
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });
  export const loadRewarded2 = async (handleOpen, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(
      getRewardedInsterstialStoryID(),
      {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      },
    );
  
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });
export const loadRewardedFont = async (handleOpen, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(getRewardedFontThemeID(), {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });
export const loadRewardedCategory = async (handleOpen, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(getRewardedFontThemeID(), {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });
export const loadRewardedColorTheme = async (handleOpen, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(getRewardedColorThemeID(), {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });
export const loadRewardedColorBg = async (handleOpen, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(getRewardedBgColorID(), {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });
export const loadRewardedAppIcon = async (handleOpen, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(getRewardedBgColorID(), {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });
export const loadInterstialAds = async (advert, onFailed) =>
  new Promise((resolve, reject) => {
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          console.log('Check adLoadCount:', adLoadCount);
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (onFailed && typeof onFailed === 'function') {
        onFailed();
      }
      console.log('failed load ad', e);
    }
  });

export const loadOpenAddsReward = async (advert, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 5) {
            if (onFailed && typeof onFailed === 'function') {
              console.log('ADLOAD FAILED');
              clearInterval(myInterval);
              onFailed();
            }
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (onFailed && typeof onFailed === 'function') {
        onFailed();
      }
      console.log('failed load ad', e);
    }
  });

  export const loadRewardedImage = async (handleOpen, onFailed) =>
  new Promise((resolve, reject) => {
    // const ADUNITID = Platform.OS === 'android' ? AD_APP_ID_ANDROID : AD_APP_ID_IOS
    const advert = RewardedAd.createForAdRequest(
      getRewardedImageID(),
      {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
      },
    );
  
    let adLoadCount = 0;
    try {
      advert.load();
      if (advert.loaded) {
        advert.show();
        resolve(advert);
      } else {
        const myInterval = setInterval(async () => {
          if (advert.loaded) {
            adLoadCount = 0;
            clearInterval(myInterval);
            advert.show();
            resolve(advert);
          }
          adLoadCount++;
          if (adLoadCount >= 7) {
            if (onFailed && typeof onFailed === 'function') {
              onFailed();
            }
            console.log('ADLOAD FAILED');
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed-ad');
          }
        }, 1000);
      }
    } catch (e) {
      if (handleOpen && typeof handleOpen === 'function') {
        handleOpen();
      }
      console.log('failed load ad', e);
    }
  });