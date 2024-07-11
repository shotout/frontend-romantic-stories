/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Fragment, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import {bg, bg_real, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {navigate} from '../../shared/navigationRef';
import { fixedFontSize, hp, wp } from '../../utils/screen';
import DeviceInfo from 'react-native-device-info';

const OnboardScreen = (props: any) => {
  const [isIPad, setIsIPad] = useState(false);
  useEffect(() => {
    const checkIfIPad = async () => {
      const isTablet = DeviceInfo.isTablet();
      setIsIPad(isTablet);
    };

    checkIfIPad();
  }, []);
  return (
    <ImageBackground
      source={bg_real}
      resizeMode={isIPad ? 'cover' : 'cover' }
      style={{
        width: Dimensions.get('window').width,
        height:  Dimensions.get('window').height ,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // aspectRatio:  1 / 2
       
      }}>
      <Text
      allowFontScaling={false}
        style={{
          color: 'white',
          fontSize: fixedFontSize(25),
          fontFamily: 'Comfortaa-SemiBold',
          textAlign: 'center',
          marginBottom: 40
        }}>
        {'Exciting Stories \n for your everyday fantasy'}
      </Text>
      <Image
        source={logo}
        style={{
          resizeMode: 'contain',
          width: wp(200),
          height: hp(140),
          // marginVertical: 100,
          marginBottom: wp(160)
        }}
      />

      <Button
        title={i18n.t('getStarted')}
        onPress={() => navigate('Register')}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default OnboardScreen;
