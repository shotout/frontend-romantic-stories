import React from 'react';
import {Dimensions, Image, Platform, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import Button from '../../components/buttons/Button';
import AnimatedLottieView from 'lottie-react-native';
import quoteAnimate from '../../assets/lottie/quote.json';
import {hp} from '../../utils/screen';
import {moderateScale} from 'react-native-size-matters';
import { step5 } from '../../assets/icons';
import { quoteReal } from '../../assets/images';

const Step5 = ({handleNext, handlePrev, type}) => {
  // return <></>;
  return (
    <View
      style={{
        backgroundColor: '#3F58DD',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: hp(40),
        alignItems: 'center',
        marginTop: '20%',
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
          {Platform.OS === 'ios' && type != 'realistic'  ?
        <AnimatedLottieView
          source={quoteAnimate}
          autoPlay={true}
          duration={2000}
          loop={false}
          style={{
            height: hp(92),
            width: hp(92),
            left: hp(-3.6),
            top: hp(-3.6),
            zIndex: 1
          }}
        /> : 
        <Image source={quoteReal} resizeMode='contain'  style={{ height: hp(72), width: hp(72), borderRadius: 100}}/> }
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
          lineHeight: moderateScale(24),
        }}>
        {
          'Save & transform parts of the\nStory into a Custom\nQuote by selecting it.'
        }
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
    </View>
  );
};

export default Step5;
