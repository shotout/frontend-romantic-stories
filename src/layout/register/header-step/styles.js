import {Platform, StyleSheet} from 'react-native';
// import {} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import { code_color } from '../../../utils/colors';
import { hp, wp } from '../../../utils/screen';


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
    marginLeft: 2
  },
  ctnAnimate: {
    height: 48,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'android' ? -7 : wp(-4.5),
    marginLeft: Platform.OS === 'android' ? -16 : -10

  },
  ctnAnimateIpad: {
    height: 48,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'android' ? -7 : wp(-2.5),
    marginLeft: Platform.OS === 'android' ? -16 : -10

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
