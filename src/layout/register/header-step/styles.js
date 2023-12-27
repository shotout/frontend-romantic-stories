import {StyleSheet} from 'react-native';
// import {} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import { code_color } from '../../../utils/colors';
import { hp, wp } from '../../../utils/screen';

export default StyleSheet.create({
  ctnRoot: {
    margin: wp(20),
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
    height: hp(24),
    width: wp(24),
    resizeMode: 'contain',
  },
  ctnUnactiveLamp: {
    height: hp(24),
    width: wp(52),
    resizeMode: 'contain',
    marginLeft: 2
  },
  ctnAnimate: {
    height: hp(48),
    resizeMode: 'contain',
    marginTop: wp(-4.5),
    marginLeft: wp(-10)

  },
  ctnGiftLamp: {
    height: hp(70),
    width: wp(78),
    resizeMode: 'contain',
    // backgroundColor: 'red',
    left: wp(-26),
    top: wp(-26),
  },
  ctnGift: {
    height: wp(24),
    width: wp(52),
  },
});
