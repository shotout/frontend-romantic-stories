/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import { sizing } from '../../utils/styling';
import { isIphoneXorAbove } from '../../utils/devices';
import { code_color } from '../../utils/colors';


export default StyleSheet.create({
  ctnBackgroundImage: {
    resizeMode: 'cover',
    width: sizing.getWindowWidth(1),
    height: sizing.getDimensionHeight(0.9),
  },
  ctnIcon: {
    flex: 1,
    // backgroundColor: 'red',
    marginBottom: isIphoneXorAbove() ? 0 : 0
  },
  quotesWrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 20
    
  },
  ctnQuotesIcon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 30
  },
  txtQuotesWrapper: {
    paddingHorizontal: 10,
    position:'relative',
 
  },
  ctnQuotes: {
    // textAlign: 'justify',
    // fontFamily: fonts.QuotesText,
    lineHeight: 24,
    
    
  },
  ctnRowButton:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: isIphoneXorAbove() ? 80) : 40),
    marginBottom: 15,
    marginTop: 40
  },
  ctnRowButton2:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: isIphoneXorAbove() ? 80) : 40),
    marginBottom: 15,
    marginTop: 20
  },
  ctnBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 44,
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: 130
  },
  imgBtn: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 8
  },
  txtButton:{
    color: code_color.white,
    // fontFamily: fonts.InterMedium,
  },
  mgLeft:{
    marginLeft: 16
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
    width: 50,
    height: 50,
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
    fontSize: 16,
  },
  subBottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctnRounded: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnPopupShare:{
    position: 'absolute',
    bottom: -65,
    right: -63,
    aspectRatio: 249 / 93,
    width: 170,
    overflow: 'visible'
  },
  ctnUnion:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
});
