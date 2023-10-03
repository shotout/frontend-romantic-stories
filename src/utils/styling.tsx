import {Dimensions} from 'react-native';

export const sizing = {
  getDimensionWidth: value => Dimensions.get('screen').width * value,
  getDimensionHeight: value => Dimensions.get('screen').height * value,
  getWindowWidth: value => Dimensions.get('window').width * value,
  getWindowHeight: value => Dimensions.get('window').height * value,
};
