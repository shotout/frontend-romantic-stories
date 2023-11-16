import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {code_color} from '../../utils/colors';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    paddingBottom: moderateScale(20),
  },
  conQuote: {
    position: 'absolute',
    top: '-200%',
    backgroundColor: code_color.white,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conQuotePost: {
    position: 'absolute',
    top: '-200%',
    zIndex: 100,
    backgroundColor: code_color.white,
    width: '100%',
    aspectRatio: '1/1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
