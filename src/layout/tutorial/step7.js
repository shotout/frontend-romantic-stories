import React from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import Button from '../../components/buttons/Button';
import AnimatedLottieView from 'lottie-react-native';
import shareAnimate from '../../assets/lottie/share.json';
import {hp} from '../../utils/screen';
import {moderateScale} from 'react-native-size-matters';

const Step7 = ({handleNext}) => {
  // return <></>;
  return (
    <View
      style={{
        backgroundColor: '#3F58DD',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: '17%',
        alignItems: 'center',
        marginTop: '50%',
        paddingTop: hp(50),
        width: '66%',
      }}>
      <View
        style={{
          width: hp(80),
          height: hp(80),
          position: 'absolute',
          top: hp(-40),
          backgroundColor: code_color.white,
          borderRadius: hp(50),
          borderColor: '#3F58DD',
          borderWidth: hp(4),
        }}>
        <AnimatedLottieView
          source={shareAnimate}
          autoPlay={true}
          delay={0}
          duration={2000}
          loop={false}
          style={{
            height: hp(60),
            width: hp(60),
            left: hp(2),
            top: hp(2),
          }}
        />
      </View>
      <Animatable.Text
        delay={0}
        duration={1000}
        animation={'fadeIn'}
        style={{
          color: code_color.white,
          textAlign: 'center',
          fontSize: moderateScale(17),
          fontWeight: 'bold',
          marginBottom: hp(20),
          marginTop: hp(10),
          lineHeight: hp(24),
        }}>
        {
          'Everything ready?\nSave your Custom Quote\nor Share it with your\nFriends!'
        }
      </Animatable.Text>
      <Animatable.View
        delay={0}
        animation={'fadeIn'}
        duration={1000}
        style={{flexDirection: 'row'}}>
        {/* <Button
          style={{
            backgroundColor: code_color.yellow,
            padding: 10,
            paddingHorizontal: 30,
            borderRadius: 20,
            marginVertical: 10,
            marginRight: 14,
          }}
          title={i18n.t('Prev')}
          onPress={handlePrev}
        /> */}
        <Button
          style={{
            backgroundColor: code_color.yellow,
            padding: hp(10),
            paddingHorizontal: 30,
            borderRadius: 20,
            marginTop: 10,
            marginBottom: 15,
          }}
          title={i18n.t('Next')}
          onPress={() => handleNext()}
        />
      </Animatable.View>
    </View>
  );
};

export default Step7;
