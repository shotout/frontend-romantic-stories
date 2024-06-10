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
  illustration_notif
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
import { fixedFontSize, hp, wp } from '../../../utils/screen';

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
          borderBottomRightRadius: wp(50),
          borderBottomLeftRadius: wp(50),
        }}>
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.grey,
            fontSize: fixedFontSize(14),
            marginHorizontal: wp(10),
            textAlign: 'center',
            marginVertical: hp(10),
          }}>
          {'Be the first to get new Stories'}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.blueDark,
            fontSize: fixedFontSize(32),
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: hp(20),
          }}>
          {'Activate \n notifications for \n new Stories'}
        </Text>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0,
            marginTop: hp(80),
          }}>
          <TouchableOpacity onPress={() => activeNotif()}>
            <Image source={illustration_notif}  style={{ width: hp(200), height: hp(200)}}/>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
