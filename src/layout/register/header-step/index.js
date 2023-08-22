import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';

const activeLamp = require('../../../assets/icons/register_step/lamp_light.png');
const lampUnactive = require('../../../assets/icons/register_step/lamp_tutorial.png');
const lampActiveAnimation = require('../../../assets/icons/register_step/tutorial_lamp_once.gif');

export default function HeaderStep({currentStep}) {
  const activeGift = () => (
    <View style={styles.ctnGift}>
      <Image source={lampActiveAnimation} style={styles.ctnGiftLamp} />
    </View>
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
    </View>
  );
}
