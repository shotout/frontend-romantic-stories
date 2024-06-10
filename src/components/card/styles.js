/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';
import { hp } from '../../utils/screen';

const screenWidth = Math.round(Dimensions.get('window').width) / 4 - hp(33);

export default StyleSheet.create({
  ctnRowSection: {
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: hp(4),
  },
  ctnIcon: {
    width: hp(28),
    height: hp(28),
    resizeMode: 'contain',
    marginBottom: hp(5),
  },
  ctnLabel: {
    color: colors.white,
    fontSize: moderateScale(12),
    textAlign: 'center',
    fontFamily: fonts.InterRegular,
    lineHeight: moderateScale(20)
  },
  ctnBox: {
    width: screenWidth,
    alignContent: 'center',
    alignItems: 'center',
  },
});
