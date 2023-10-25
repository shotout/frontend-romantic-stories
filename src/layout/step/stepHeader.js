import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';

const activeLamp = require('../../assets/images/step.png');
const lampUnactive = require('../..//assets/images/stepNull.png');
const lampActiveAnimation = require('../../assets/images/step.png');

export default function StepHeader({currentStep}) {
  const activeGift = () => (

      <Image source={lampActiveAnimation} style={styles.ctnUnactiveLamp} />
  
  );

  const unactiveLamp = () => (
    <Image source={lampUnactive} style={styles.ctnUnactiveLamp} />
  );

  function renderImageStep(stepItem) {
    if (stepItem <= currentStep) {
      return activeGift();
    }

    return unactiveLamp();
  }

  return (
    <View style={styles.ctnRoot}>
      <Image source={activeLamp} style={styles.ctnImgLamp} />
      {renderImageStep(2)}
      {renderImageStep(3)}
      {renderImageStep(4)}
      {renderImageStep(5)}
      {renderImageStep(6)}
      {renderImageStep(7)}
      {renderImageStep(8)}
      {renderImageStep(9)}
      {renderImageStep(9)}
    </View>
  );
}