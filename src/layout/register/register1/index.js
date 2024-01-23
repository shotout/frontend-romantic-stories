/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {female, male} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { fixedFontSize, wp } from '../../../utils/screen';

export default function Register1({setGender, selectedGender}) {
  return (
    <>
      <TouchableOpacity
        style={{marginBottom: wp(30), alignItems: 'center'}}
        onPress={() => setGender('Male')}>
        <Image
          source={male}
          style={
            selectedGender === 'Male'
              ? styles.borderBlue
              : {
                  width: wp(105),
                  height: wp(105),
                  resizeMode: 'contain',
                }
          }
        />
        <Text
          allowFontScaling={false}
          style={{
            color:
              selectedGender === 'Male' ? code_color.splash : code_color.grey,
            fontSize: fixedFontSize(14),
            fontFamily: 'Roboto',
            textAlign: 'center',
            marginTop: wp(5),
            fontWeight: 'bold',
          }}>
          {'Male'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setGender('Female')}>
        <Image
          source={female}
          style={
            selectedGender === 'Female'
              ? styles.borderBlue
              : {
                  width: wp(105),
                  height: wp(105),
                  resizeMode: 'contain',
                }
          }
        />
        <Text
          allowFontScaling={false}
          style={{
            color:
              selectedGender === 'Female' ? code_color.splash : code_color.grey,
            fontSize: fixedFontSize(14),
            fontFamily: 'Roboto',
            textAlign: 'center',
            marginTop: wp(5),
            fontWeight: 'bold',
          }}>
          {'Female'}
        </Text>
      </TouchableOpacity>
    </>
  );
}
