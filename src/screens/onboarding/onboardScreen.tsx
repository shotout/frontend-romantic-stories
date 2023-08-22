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
        style={{
          color: 'white',
          fontSize: 32,
          fontFamily: 'Comfortaa-SemiBold',
          textAlign: 'center',
        }}>
        {'Your Romance \n every day'}
      </Text>
      <Image
        source={logo}
        style={{
          resizeMode: 'contain',
          width: '30%',
          height: '20%',
          marginVertical: 120,
        }}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Register')}
        style={{
          backgroundColor: code_color.yellow,
          alignItems: 'center',
          justifyContent: 'center',
          height: 52,
          margin: 20,
          borderRadius: 12,
          position: 'absolute',
          bottom: 20,
          width: '90%',
        }}>
        <Text style={{fontFamily: 'Robotto', fontWeight: 'bold'}}>
          Get Started
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default OnboardScreen;
