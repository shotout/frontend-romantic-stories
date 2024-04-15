import {Adjust, AdjustEvent} from 'react-native-adjust';
import analytics from '@react-native-firebase/analytics';
import {
  Settings,
  AppEventsLogger,
  AEMReporterIOS,
} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {updatePostbackConversionValue} from '@brigad/react-native-skadnetwork';

export const ONBOARDING_COMPLETE = '7mm520';
export const APP_INSTALLED = 'oo3wj0';
export const SHOW_PAYWALL = 'ndl7xb';
export const FREE_TRIAL = '7ajk5x';

export const CANCEL_SUBSCRIBE_AFTER_TRIAL = '3gut9w';
export const SUBSCRIPTION_STORIES = 'w3z0zx';
export const SUBSCRIPTION_STORIES_AUDIO = 'kbfp0l';
export const STORY_SHARED = 'q0nxn4';
export const STORY_LIKED = '2aq90e';

export const REVENUE_TRACKING = 'noqvjc';
export const OPEN_OFFER_NOTIFICATION = 'demye5';

export const ADD_STORY_TO_LIBRARY = '3odq5e';
export const AUDIO_PLAYED = 'w89cr0';
export const BUY_10_AUDIO = '75mvdx';
export const BUY_50_AUDIO = 'dgq6u0';
export const FINISH_LISTEN_3 = 'ni1wnz';
export const FINISH_LISTEN_10 = 'cg5y5b';
export const FINISH_LISTEN_7 = '34ukg9';
export const FINISH_READ_10 = 'vbg4j1';
export const FINISH_READ_7 = '3pjz0y';
export const FINISH_READ_3 = 'h2zuqx';
export const TUTORIAL_FINISH = 'ji0xf4'

const setAdsConversion = async () => {
  await updatePostbackConversionValue(0);
};

const getScreenName = id => {
  switch (id) {
    case OPEN_OFFER_NOTIFICATION:
      return 'OPEN_OFFER_NOTIFICATION';
    case ONBOARDING_COMPLETE:
      return 'ONBOARDING_COMPLETE';
    case APP_INSTALLED:
      return 'APP_INSTALLED';
    case SHOW_PAYWALL:
      return 'SHOW_PAYWALL';
    case FREE_TRIAL:
      return 'FREE_TRIAL';
    case CANCEL_SUBSCRIBE_AFTER_TRIAL:
      return 'CANCEL_SUBSCRIBE_AFTER_TRIAL';
    case SUBSCRIPTION_STORIES:
      return 'SUBSCRIPTION_STORIES';
    case SUBSCRIPTION_STORIES_AUDIO:
      return 'SUBSCRIPTION_STORIES_AUDIO';
    case STORY_SHARED:
      return 'STORY_SHARED';
    case STORY_LIKED:
      return 'STORY_LIKED';
    case REVENUE_TRACKING:
      return 'SUBSCRIBE';
    case ADD_STORY_TO_LIBRARY:
      return 'ADD_STORY_TO_LIBRARY';
    case AUDIO_PLAYED:
      return 'AUDIO_PLAYED';
    case BUY_10_AUDIO:
      return 'BUY_10_AUDIO';
    case BUY_50_AUDIO:
      return 'BUY_50_AUDIO';
    case FINISH_LISTEN_3:
      return 'FINISH_LISTEN_3';
    case FINISH_LISTEN_10:
      return 'FINISH_LISTEN_10';
    case FINISH_LISTEN_7:
      return 'FINISH_LISTEN_7';
    case FINISH_READ_10:
      return 'FINISH_READ_10';
    case FINISH_READ_7:
      return 'FINISH_READ_7';
    case FINISH_READ_3:
      return 'FINISH_READ_3';
      case TUTORIAL_FINISH:
        return 'TUTORIAL_FINISH';
    default:
      return id;
  }
};

export const eventTracking = async (id, message) => {
  try {
    const adjustEvent = new AdjustEvent(id);
    if (message) {
      adjustEvent.setCallbackId(message);
    }
    Adjust.trackEvent(adjustEvent);
    AppEventsLogger.logEvent(getScreenName(id))
    await analytics().logEvent(getScreenName(id), {
      id,
    });
    if(__DEV__){
    console.log('Success tracking:', getScreenName(id));
    }
  } catch (err) {
    if(__DEV__){
    console.log('Err tracking:', err);
    }
  }
};

export const revenueTracking = async (price, currency) => {
  const adjustEvent = new AdjustEvent(REVENUE_TRACKING);

  adjustEvent.setRevenue(price, currency);

  Adjust.trackEvent(adjustEvent);
  await analytics().logEvent(getScreenName(REVENUE_TRACKING), {
    id: REVENUE_TRACKING,
    item: `PRICE ${price}, currency ${currency}`,
  });
  console.log('Revenue tracked:', price, currency);
};

export const askTrackingPermission = () => {
  AsyncStorage.setItem('allowTracking', 'yes');
  if (Platform.OS === 'ios') {
    Adjust.requestTrackingAuthorizationWithCompletionHandler(status => {
      switch (status) {
        case 0:
          // ATTrackingManagerAuthorizationStatusNotDetermined case
          // console.log("The user hasn't been asked yet");
          break;
        case 1:
          setAdsConversion();
          // ATTrackingManagerAuthorizationStatusRestricted case
          // console.log('The user device is restricted');
          setTimeout(() => {
            AsyncStorage.removeItem('allowTracking');
          }, 200);
          break;
        case 2:
          // ATTrackingManagerAuthorizationStatusDenied case
          // console.log('The user denied access to IDFA');
          setTimeout(() => {
            AsyncStorage.removeItem('allowTracking');
          }, 200);
          break;
        case 3:
          Settings.setAdvertiserTrackingEnabled(true);
          Settings.setAdvertiserIDCollectionEnabled(true);
          Settings.setAutoLogAppEventsEnabled(true);
          setAdsConversion();
          // ATTrackingManagerAuthorizationStatusAuthorized case
          // console.log('The user authorized access to IDFA');
          setTimeout(() => {
            AsyncStorage.removeItem('allowTracking');
          }, 200);
          break;
        default:
          // console.log('The status is not available');
          break;
      }
    });
  } else {
    Settings.setAdvertiserTrackingEnabled(true);
    Settings.setAdvertiserIDCollectionEnabled(true);
    Settings.setAutoLogAppEventsEnabled(true);
  }
};
