import React, { useEffect, useState } from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import AnimatedLottieView from 'lottie-react-native';
import { wp } from '../../../utils/screen';
import DeviceInfo from 'react-native-device-info';

const activeLamp = require('../../../assets/icons/register_step/singleLove1.png');
const lampUnactive = require('../../../assets/icons/register_step/unactiveLove1.png');
// const lampActiveAnimation = require('../../../assets/icons/register_step/activeLove1.png');
const lampActiveAnimation = require('../../../assets/images/heart-progress-bar.gif');
const love = require('../../../assets/lottie/heart-progress-bar.json');
export default function HeaderStep({currentStep}) {
  const [isIPad, setIsIPad] = useState(false);
  useEffect(() => {
    const checkIfIPad = async () => {
      const isTablet = DeviceInfo.isTablet();
      setIsIPad(isTablet);
    };

    checkIfIPad();
  }, []);
  const activeGift = () => (
    <View style={styles.ctnGift}>
      <AnimatedLottieView
      style={isIPad ? styles.ctnAnimateIpad : styles.ctnAnimate}
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
      style={{width:  wp(100), height: hp(100)}}
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
