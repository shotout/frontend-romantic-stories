import React, { useState } from 'react';
import {Image, View} from 'react-native';
import {imgStep2} from '../../assets/images';
import * as Animatable from 'react-native-animatable';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import Button from '../../components/buttons/Button';
import AnimatedLottieView from 'lottie-react-native';
import listenAnimate from '../../assets/lottie/listen.json';

const Step3 = ({handleNext, handlePrev}) => {
  const [show, setShow] = useState(false)
  setTimeout(() => {
    setShow(true)
  }, 500);
  // return <></>;
  return (
    <>
    {show ?
     <View
      style={{
        backgroundColor: '#3F58DD',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 40,
        alignItems: 'center',
        marginTop: '40%',
        paddingTop: 50,
      }}>
      <View
        style={{
          width: 80,
          height: 80,
          position: 'relative',
          overflow: 'hidden',
          marginTop: -90,
          backgroundColor: code_color.white,
          borderRadius: 50,
          borderColor: '#3F58DD',
          borderWidth: 4,
        }}>
        <AnimatedLottieView
          style={{
            height: 90,
            width: 90,
            left: -3,
            top: -3,
          }}
          source={listenAnimate}
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
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 20,
          marginTop: 20,
          lineHeight: 25,
        }}>
        {
          'You can also enjoy any of\r\nthe Stories as Audio-\r\nbook. Relax while we\r\nread it out for you'
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
            padding: 10,
            paddingHorizontal: 30,
            borderRadius: 20,
            marginVertical: 10,
          }}
          title={i18n.t('Next')}
          onPress={handleNext}
        />
      </Animatable.View>
    </View>: null }
    </>
   
  );
};

export default Step3;
