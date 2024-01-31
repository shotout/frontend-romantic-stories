import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const activeLamp = require('../../assets/images/step.png');
const lampUnactive = require('../../assets/images/stepNull.png');
const lampActiveAnimation = require('../../assets/images/step.png');

export default function StepHeader({currentStep}) {
  const animateGift = () => (
    <ImageBackground
      source={lampUnactive}
      style={{
        height: 8,
        position: 'relative',
        marginTop: 0,
        borderRadius: 4,
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <Animatable.Image
        animation={{
          from: {
            left: -40,
          },
          to: {
            left: 0,
          },
          easing: 'linear',
        }}
        duration={currentStep === 8 ? 18000 : currentStep === 7 ? 5500 : 7000}
        source={lampActiveAnimation}
        style={styles.ctnUnactiveLamp}
      />
    </ImageBackground>
  );

  const activeGift = () => (
    <FastImage
      source={lampActiveAnimation}
      style={styles.ctnUnactiveLamp}
      resizeMode={FastImage.resizeMode.contain}
    />
  );

  const unactiveLamp = () => (
    <FastImage
      source={lampUnactive}
      style={styles.ctnUnactiveLamp}
      resizeMode={FastImage.resizeMode.contain}
    />
  );

  function renderImageStep(stepItem) {
    if (stepItem < currentStep) {
      return activeGift();
    }

    if (stepItem == currentStep) {
      return animateGift();
    }

    return unactiveLamp();
  }

  return (
    <View style={styles.ctnRoot}>
      {renderImageStep(2)}
      {renderImageStep(3)}
      {renderImageStep(4)}
      {renderImageStep(5)}
      {renderImageStep(6)}
      {renderImageStep(7)}
      {renderImageStep(8)}
      {renderImageStep(9)}
      {/* {renderImageStep(10)} */}
    </View>
  );
}
