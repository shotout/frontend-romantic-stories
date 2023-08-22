/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, Fragment, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  StatusBar,
} from 'react-native';
import {bg, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import HeaderStep from '../../layout/register/header-step';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {isIphoneXorAbove} from '../../utils/devices';
import {female, male} from '../../assets/icons';
const RegisterScreen = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <View style={{backgroundColor: code_color.white, flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          backgroundColor: code_color.headerBlack,
          paddingTop: isIphoneXorAbove() ? 40 : 0,
        }}>
        <Text
          style={{
            color: code_color.white,
            textAlign: 'center',
            marginVertical: 15,
            fontSize: 18,
          }}>
          Let’s get to know you
        </Text>
        <HeaderStep currentStep={3} />
      </View>

      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <Text
          style={{
            color: code_color.blueDark,
            fontSize: 32,
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: 10,
          }}>
          {'What‘s your \n gender?'}
        </Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity>
            <Image source={male} />
            <Text
              style={{
                color: code_color.grey,
                fontSize: 14,
                fontFamily: 'Roboto',
                textAlign: 'center',
                marginTop: 10,
              }}>
              {'Male'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={female} />
            <Text
              style={{
                color: code_color.grey,
                fontSize: 14,
                fontFamily: 'Roboto',
                textAlign: 'center',
                marginTop: 10,
              }}>
              {'Female'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            bottom: 20
          }} >

          <Text
            style={{
              color: code_color.grey,
              fontSize: 14,
              fontFamily: 'Roboto',
              textAlign: 'center',
              marginTop: 10,
            }}>
            {'Prefer not to say'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default RegisterScreen;
