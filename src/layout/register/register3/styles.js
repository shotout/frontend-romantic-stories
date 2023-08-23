import {StyleSheet} from 'react-native';
// import {} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import { code_color } from '../../../utils/colors';

export default StyleSheet.create({
  ctnRoot: {
    margin: 20,
    // paddingTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: code_color.headerBlack,
  },
  imgStep: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
  },
  ctnImgLamp: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  ctnUnactiveLamp: {
    height: 24,
    width: 52,
    resizeMode: 'contain',
  },
  ctnGiftLamp: {
    height: 70,
    width: 78,
    resizeMode: 'contain',
    // backgroundColor: 'red',
    left: -26,
    top: -26,
  },
  ctnGift: {
    height: 24,
    width: 52,
  },
});
