import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import i18n from '../i18n';

export const isIphone = Platform.OS === 'ios';

export const isIphoneXorAbove = () => isIphone && DeviceInfo.hasNotch();
export const isIphone14Pro = DeviceInfo.hasDynamicIsland();

export const getDefaultLanguange = async () => {
  let lang = await AsyncStorage.getItem('bahasa');
  if (lang === undefined || lang === null) {
    AsyncStorage.setItem('bahasa', 'id_ID');
    i18n.locale = 'id_ID';
    return 'id_ID';
  } else {
    i18n.locale = lang;
    return lang;
  }
};
