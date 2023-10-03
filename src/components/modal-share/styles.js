import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../utils/devices';
import {code_color} from '../../utils/colors';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  ctnContent: {
    flex: 1,
    backgroundColor: code_color.headerBlack,
    marginTop: isIphoneXorAbove() ? moderateScale(40) : moderateScale(25),
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    alignItems: 'center',
    paddingTop: moderateScale(30),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: moderateScale(24),
  },
  blur: {
    fontSize: moderateScale(18),
    color: 'grey',
    textShadowColor: 'rgba(3, 5, 2, 10)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 4,
    // textShadowRadius: 6,
    // color: 'rgba(0, 0, 0, 0.2)',
    // textShadowColor: 'rgba(3, 5, 2, 10)',
  },
  hr: {
    width: '90%',
    height: 2,
    backgroundColor: code_color.white,
    opacity: 0.2,
    marginVertical: moderateScale(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingRight: moderateScale(30),
    paddingLeft: (width * 38) / 100,
    marginBottom: moderateScale(20),
  },
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  textTitle: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: code_color.white,
  },
  conQuote: {
    position: 'relative',
    backgroundColor: code_color.white,
    borderRadius: moderateScale(24),
    width: '80%',
    height: 'auto',
    marginTop: moderateScale(10),
    textAlign: 'center',
  },
  dropDown: {
    backgroundColor: code_color.white,
    padding: 5,
    borderRadius: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  textQuote: {
    fontSize: moderateScale(18),
    fontWeight: 400,
    marginHorizontal: moderateScale(20),
    lineHeight: moderateScale(34),
    marginTop: moderateScale(40),
    marginBottom: moderateScale(70),
  },
  textMarker: {
    position: 'absolute',
    bottom: moderateScale(20),
    alignSelf: 'center',
    fontSize: moderateScale(16),
    fontWeight: 'normal',
  },
  conFont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: moderateScale(30),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 400,
    color: code_color.white,
    lineHeight: 20,
  },
  horizontalScroll: {
    width: '100%',
    height: 75,
    paddingHorizontal: '5%',
  },
  conListFont: {
    width: '90%',
    height: 50,
    marginTop: moderateScale(10),
  },
  btnFont: {
    borderColor: code_color.white,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    height: 40,
  },
});
