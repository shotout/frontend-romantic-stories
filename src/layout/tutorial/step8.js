import React from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {code_color} from '../../utils/colors';
import Button from '../../components/buttons/Button';
import AnimatedLottieView from 'lottie-react-native';
import levelAnimate from '../../assets/lottie/level.json';
import {hp} from '../../utils/screen';
import {moderateScale} from 'react-native-size-matters';

const Step8 = ({handleNext}) => {
  // return <></>;
  return (
    <Animatable.View
      animation={'fadeIn'}
      delay={4000}
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
          source={levelAnimate}
          autoPlay={true}
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
        delay={1500}
        duration={1000}
        animation={'fadeIn'}
        style={{
          color: code_color.white,
          textAlign: 'center',
          fontSize: moderateScale(17),
          fontWeight: 'bold',
          marginBottom: hp(20),
          marginTop: hp(20),
          lineHeight: hp(24),
        }}>
        {
          'Gather Experience by\nfinishing Stories, Level\nUp and become a Master\nof Romance!'
        }
      </Animatable.Text>
      <Animatable.View
        delay={2500}
        animation={'fadeIn'}
        duration={1000}
        style={{flexDirection: 'row', marginHorizontal: 15}}>
        <Button
          style={{
            backgroundColor: code_color.yellow,
            padding: hp(10),
            marginHorizontal: 30,
            borderRadius: 20,
            marginVertical: 10,
            flex: 1,
            alignItems: 'center',
          }}
          title={'Start reading'}
          onPress={() => handleNext()}
        />
      </Animatable.View>
    </Animatable.View>
  );
};

export default Step8;
