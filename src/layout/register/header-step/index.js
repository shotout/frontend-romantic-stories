import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import AnimatedLottieView from 'lottie-react-native';

const activeLamp = require('../../../assets/icons/register_step/singleLove1.png');
const lampUnactive = require('../../../assets/icons/register_step/unactiveLove1.png');
// const lampActiveAnimation = require('../../../assets/icons/register_step/activeLove1.png');
const lampActiveAnimation = require('../../../assets/images/heart-progress-bar.gif');
const love = require('../../../assets/lottie/heart-progress-bar.json');
export default function HeaderStep({currentStep}) {
  const activeGift = () => (
    <View style={styles.ctnGift}>
      <AnimatedLottieView
      style={styles.ctnAnimate}
      source={love}
      // style={{width: 50, height: 50}}
      autoPlay
      duration={3000}
      loop={false}
    />
      {/* <Image source={lampActiveAnimation} style={styles.ctnUnactiveLamp} /> */}
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
  const animation = () => {
    return(
      <AnimatedLottieView
      source={love}
      style={{width: 100, height: 100}}
      autoPlay
      duration={3000}
      loop={true}
    />
    )
   
  }

  return (
    <View style={styles.ctnRoot}>
      <Image source={activeLamp} style={styles.ctnImgLamp} />
      {renderImageStep(2)}
      {renderImageStep(3)}
      {renderImageStep(4)}
      {renderImageStep(5)}
      {renderImageStep(6)}
      {/* {renderImageStep(7)} */}
    </View>
  );
}
