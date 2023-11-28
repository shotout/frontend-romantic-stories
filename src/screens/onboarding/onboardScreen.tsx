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
} from 'react-native';
import {bg, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {navigate} from '../../shared/navigationRef';

const OnboardScreen = (props: any) => {
  return (
    <ImageBackground
      source={bg}
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
      allowFontScaling={false}
        style={{
          color: 'white',
          fontSize: 28,
          fontFamily: 'Comfortaa-SemiBold',
          textAlign: 'center',
        }}>
        {'Exciting Stories \n for your everyday fantasy'}
      </Text>
      <Image
        source={logo}
        style={{
          resizeMode: 'contain',
          width: '50%',
          height: '30%',
          // marginVertical: 100,
          marginBottom: 160
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
