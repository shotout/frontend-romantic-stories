import {StyleSheet} from 'react-native';
// import {} from 'react-native-size-matters';
// import {isIphoneXorAbove} from '../../../shared/devices';
import {code_color} from '../../../utils/colors';
import {hp} from '../../../utils/screen';

export default StyleSheet.create({
  borderBlue: {
    borderWidth: 2,
    borderColor: code_color.splash,
    borderRadius: hp(60),
    width: hp(105),
    height: hp(105),
    resizeMode: 'contain',
  },
  filter: {
    // tintColor: "gray",
  }
});
