/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import { sizing } from '../../utils/styling';
import { isIphoneXorAbove } from '../../utils/devices';
import { code_color } from '../../utils/colors';
import { fixedFontSize, hp, wp } from '../../utils/screen';


export default StyleSheet.create({
  ctnBackgroundImage: {
    resizeMode: 'cover',
    width: wp(sizing.getWindowWidth(1)),
    height: hp(sizing.getDimensionHeight(0.9)),
  },
  ctnIcon: {
    flex: 1,
    // backgroundColor: 'red',
    marginBottom: 0
  },
  quotesWrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: wp(10),
    
  },
  ctnQuotesIcon: {
    width: wp(80),
    height: hp(80),
    alignSelf: 'center',
    marginBottom: wp(30)
  },
  txtQuotesWrapper: {
    // paddingHorizontal: 10,
    position:'relative',
  },
  ctnQuotes: {
    textAlign: 'justify',
    // fontFamily: fonts.QuotesText,
   
    // letterSpacing: 0
  },
  ctnRowButton:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: isIphoneXorAbove() ? 80) : 40),
    marginBottom: wp(15),
    marginTop: wp(40)
  },
  ctnRowButton2:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: isIphoneXorAbove() ? 80) : 40),
    marginBottom: wp(15),
    marginTop: wp(20)
  },
  ctnBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(12),
    height: hp(44),
    borderRadius: wp(44),
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: wp(130)
  },
  imgBtn: {
    width: wp(22),
    height: hp(22),
    resizeMode: 'contain',
    marginRight: wp(8)
  },
  txtButton:{
    color: code_color.white,
    // fontFamily: fonts.InterMedium,
  },
  mgLeft:{
    marginLeft: wp(16)
  },
  ctnAbsolute:{
    position: 'absolute'
  },
  bgYellow:{
    backgroundColor: code_color.yellow,
    borderColor: '#515151',
    borderWidth: 1
  },
  txtBlack:{
    color: code_color.grey
  },
  traceBg:{
    width: wp(50),
    height: hp(50),
    resizeMode: 'contain',
  },
  ctnBgWatermark:{
    position: 'absolute',
    top: 60,
    left: 20,
    tintColor: 'red'
    // backgroundColor: 'gray',
    // opacity: 0.4,
    // padding: 5
  },
  ctnBgTrace:{

    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  ctnWatermark: {
    position: 'absolute',
    top: isIphoneXorAbove() ? 130 : 100,
    alignSelf: 'center'
  },
  txtWatermark: {
    // fontFamily: fonts.InterMedium,
    color: code_color.splash,
    fontSize: fixedFontSize(16),
  },
  subBottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctnRounded: {
    width: wp(50),
    height: hp(50),
    borderRadius: wp(50 / 2),
    padding: wp(12),
    marginHorizontal:wp(12),
    marginBottom: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnPopupShare:{
    position: 'absolute',
    bottom: -65,
    right: -63,
    aspectRatio: 249 / 93,
    width: wp(170),
    overflow: 'visible'
  },
  ctnUnion:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
});
