import React from 'react';
import {Image, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import Button from '../../components/buttons/Button';
import AnimatedLottieView from 'lottie-react-native';
import quoteAnimate from '../../assets/lottie/quote.json';

const Step5 = ({handleNext, handlePrev}) => {
  // return <></>;
  return (
    <View
      style={{
        backgroundColor: '#3F58DD',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 40,
        alignItems: 'center',
        marginTop: '20%',
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
          source={quoteAnimate}
          autoPlay={true}
          duration={2000}
          loop={false}
          style={{
            height: 92,
            width: 92,
            left: -3.6,
            top: -3.6,
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
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 20,
          marginTop: 20,
          lineHeight: 25,
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
            padding: 10,
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
