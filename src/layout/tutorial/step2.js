import React from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import Button from '../../components/buttons/Button';
import AnimatedLottieView from 'lottie-react-native';
import heartkAnimate from '../../assets/lottie/heart.json';
import {moderateScale} from 'react-native-size-matters';
import {hp} from '../../utils/screen';

const Step2 = ({handleNext, handlePrev}) => {
  // return <></>;
  return (
    <Animatable.View
      style={{
        backgroundColor: '#3F58DD',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: hp(40),
        alignItems: 'center',
        marginTop: '40%',
        paddingTop: hp(50),
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
          source={heartkAnimate}
          autoPlay={true}
          duration={2000}
          loop={false}
        />
      </View>
      <Animatable.Text
        delay={1500}
        duration={1000}
        animation={'fadeIn'}
        style={{
          color: code_color.white,
          textAlign: 'center',
          fontSize: moderateScale(17),
          fontWeight: 'bold',
          marginBottom: hp(20),
          marginTop: 20,
          lineHeight: hp(25),
        }}>
        {'Like & save your\r\nfavorite Stories.'}
      </Animatable.Text>
      <Animatable.View
        delay={2500}
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
            marginVertical: 10,
          }}
          title={i18n.t('Next')}
          onPress={() => handleNext()}
        />
      </Animatable.View>
    </Animatable.View>
  );
};

export default Step2;
