/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {
  eng,
  female,
  font,
  ind,
  library,
  love,
  male,
  paper,
  settings,
  speaker,
} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';
import i18n from '../../../i18n/index';
import {ava1, ava2, ava3, imgBottom} from '../../../assets/images';
import Carousel from 'react-native-reanimated-carousel';
import {opacity, useSharedValue} from 'react-native-reanimated';
import LoveSvg from '../../../assets/icons/bottom/love.jsx';
import FontSvg from '../../../assets/icons/bottom/font.jsx';
import LibrarySvg from '../../../assets/icons/bottom/library.jsx';
import SettingSvg from '../../../assets/icons/bottom/settings.jsx';

export default function Register8({activeNotif}) {

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '70%',
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
        }}>
        <Text
          style={{
            color: code_color.grey,
            fontSize: 14,
            marginHorizontal: 10,
            textAlign: 'center',
            marginVertical: 10,
          }}>
          {'Be the first to get new content'}
        </Text>
        <Text
          style={{
            color: code_color.blueDark,
            fontSize: 32,
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: 20,
          }}>
          {'Activate \n notifications for \n new Stories'}
        </Text>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0,
            marginTop: 80,
          }}>
          <TouchableOpacity onPress={() => activeNotif()}>
            <Image source={speaker} />
          
          </TouchableOpacity>
          
        </View>
      </View>
    </>
  );
}
