/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {female, male} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { fixedFontSize, hp, wp } from '../../../utils/screen';
import { female_r, male_r } from '../../../assets/images';

export default function Register1({setGender, selectedGender, setType}) {
  return (
    <>
      <TouchableOpacity
        style={{marginBottom: hp(30), alignItems: 'center'}}
        onPress={() => setGender('Male')}>
        <Image
          source={setType === 'realistic' ? male_r : male}
          style={
            selectedGender === 'Male'
              ? styles.borderBlue
              : {
                  width: hp(105),
                  height: hp(105),
                  resizeMode: 'contain',
                }
          }
        />
        <Text
          allowFontScaling={false}
          style={{
            color:
              selectedGender === 'Male' ? code_color.splash : code_color.grey,
            fontSize: moderateScale(14),
            fontFamily: 'Roboto',
            textAlign: 'center',
            marginTop: hp(5),
            fontWeight: 'bold',
          }}>
          {'Male'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setGender('Female')}>
        <Image
          source={setType === 'realistic' ? female_r : female}
          style={
            selectedGender === 'Female'
              ? styles.borderBlue
              : {
                  width: hp(105),
                  height: hp(105),
                  resizeMode: 'contain',
                }
          }
        />
        <Text
          allowFontScaling={false}
          style={{
            color:
              selectedGender === 'Female' ? code_color.splash : code_color.grey,
            fontSize: moderateScale(14),
            fontFamily: 'Roboto',
            textAlign: 'center',
            marginTop: hp(5),
            fontWeight: 'bold',
          }}>
          {'Female'}
        </Text>
      </TouchableOpacity>
    </>
  );
}
