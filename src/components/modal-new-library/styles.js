import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    paddingBottom: moderateScale(20),
  },
  ctnScroll: {
    flexGrow: 1,
    paddingBottom: isIphoneXorAbove() ? moderateScale(100) : moderateScale(120),
  },
  rowHeaderText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: moderateScale(20),
  },
  boldHeader: {
    color: colors.black,
    fontSize: moderateScale(20),
    fontFamily: fonts.InterBold,
    textAlign: 'center',
  },
  txtDesc: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontFamily: fonts.InterMedium,
    textAlign: 'center',
    marginTop: moderateScale(4),
  },
  ctnContent: {
    height: '100%',
    width: '100%',
    minHeight: sizing.getDimensionHeight(1),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingBottom: 0,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    marginTop: isIphoneXorAbove() ? moderateScale(10) : moderateScale(0),
  },
  ctnRelative: {
    position: 'relative',
  },
  txtHeaderBtn: {
    fontSize: moderateScale(14),
    color: colors.tosca,
    fontFamily: fonts.InterMedium,
  },
  ctnJustifyEnd: {
    justifyContent: 'flex-end',
  },
  txtMix: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(18),
    color: colors.black,
    textAlign: 'center',
  },
  marginTop: {
    marginVertical: moderateScale(20),
  },
  btnClose: {
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  btnStyle: {
    position: 'absolute',
    right: 0,
    top: moderateScale(20),
  },
  ctnLabel: {
    borderColor: colors.defaultBorder,
    borderBottomWidth: moderateScale(1),
    paddingBottom: moderateScale(16),
    marginBottom: moderateScale(16),
  },
  ctnHeader: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(16),
  },
  ctnTextHeader: {
    paddingTop: moderateScale(0),
    paddingBottom: moderateScale(20),
  },
  txtBlack: {
    color: '#000',
  },
  ctnClose: {
    paddingTop: isIphoneXorAbove() ? moderateScale(78) : moderateScale(60),
  },
  ctnStyle: {
    marginBottom: isIphoneXorAbove() ? moderateScale(120) : moderateScale(120),
  },
  ctnBanner: {
    paddingBottom: isIphoneXorAbove() ? 110 : 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: moderateScale(10),
  },
  ctnBgWrap: {
    backgroundColor: colors.lightYellow,
    padding: moderateScale(20),
    borderRadius: moderateScale(20 / 2),
    marginBottom: moderateScale(16),
    marginHorizontal: moderateScale(20),
  },
  ctnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctnIcon: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'contain',
  },
  ctnRowLeft: {
    flex: 1,
  },
  titleStyle: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(18),
    color: colors.black,
    paddingBottom: moderateScale(10),
  },
  subTitleStyle: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.black,
  },
  ctnItemCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    marginBottom: moderateScale(20),
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    paddingVertical: moderateScale(12),
  },
  checklistContainer: {
    width: moderateScale(35),
  },
  ctnIconItem: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  ctnIconIndicator: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
    height: moderateScale(25),
    width: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctnText: {
    flex: 1,
  },
  txtCategory: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontFamily: fonts.InterMedium,
    textAlign: 'center',
  },
  ctnIconCategory: {
    width: moderateScale(35),
  },
  imgIconStyle: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: 'contain',
  },
});
