import React from 'react';
import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import Button from '../../components/buttons/Button';
import AnimatedLottieView from 'lottie-react-native';
import bookAnimate from '../../assets/lottie/book.json';

const Step1 = ({handleNext}) => {
  // return <></>;
  return (
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
          position: 'absolute',
          top: -40,
          backgroundColor: code_color.white,
          borderRadius: 50,
          borderColor: '#3F58DD',
          borderWidth: 4,
        }}>
        <AnimatedLottieView
          source={bookAnimate}
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
        }}>
        {'Discover a brand new\nEroTales Story every day.'}
      </Animatable.Text>
      <Animatable.Text
        delay={2500}
        duration={1000}
        animation={'fadeIn'}
        style={{
          color: code_color.white,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        {'Hungry for more?\nUnlock additional Stories\nanytime!'}
      </Animatable.Text>
      <Animatable.View
        delay={3500}
        animation={'fadeIn'}
        duration={1000}
        style={{flexDirection: 'row'}}>
        {/* <Button
          style={{
            backgroundColor: code_color.greyDefault,
            padding: 10,
            paddingHorizontal: 30,
            borderRadius: 20,
            marginVertical: 10,
            marginRight: 14,
          }}
          title={i18n.t('Prev')}
          onPress={() => {}}
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
          onPress={() => {
            alert('oeeee')
          }}
        />
      </Animatable.View>
    </View>
  );
};

export default Step1;
