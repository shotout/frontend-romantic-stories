/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {female, male} from '../../../assets/icons';
import {code_color} from '../../utils/colors';
import { moderateScale } from 'react-native-size-matters';

export default function Button({style, onPress, title, colorsText, image}) {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={
          style != undefined
            ? style
            : {
                backgroundColor: code_color.yellow,
                alignItems: 'center',
                justifyContent: 'center',
                height: moderateScale(52),
                margin: moderateScale(20),
                borderRadius: moderateScale(12),
                position: 'absolute',
                bottom: moderateScale(20),
                width: '90%',
              }
        }>
          <View>
          {image}
        <Text
          allowFontScaling={false}
          style={{fontFamily: 'Robotto', fontWeight: 'bold', fontSize: moderateScale(14), color: !!colorsText ? colorsText : code_color.black}}>
          {title}
        </Text>
          </View>
         
      </TouchableOpacity>
    </>
  );
}
