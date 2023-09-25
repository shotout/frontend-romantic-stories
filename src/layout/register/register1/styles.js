import {StyleSheet} from 'react-native';
// import {} from 'react-native-size-matters';
// import {isIphoneXorAbove} from '../../../shared/devices';
import {code_color} from '../../../utils/colors';

export default StyleSheet.create({
  borderBlue: {
    borderWidth: 2,
    borderColor: code_color.splash,
    borderRadius: 60,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
