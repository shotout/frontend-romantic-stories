import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {sizing} from '../../shared/styling';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  ctnRoot: {
    width: sizing.getWindowWidth(1),
    height: sizing.getWindowHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    marginTop:  moderateScale(-36),
  },
  modalBody: {
    backgroundColor: '#fff',
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(28),
    paddingVertical: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
  imageLoading: {
    width: moderateScale(90),
    height: moderateScale(90),
  },
  text: {
    fontSize: moderateScale(12),
    fontFamily: 'Muli-Bold',
    color: '#000',
    textAlign: 'center',
    top: -18,
  },
  absoluter: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
