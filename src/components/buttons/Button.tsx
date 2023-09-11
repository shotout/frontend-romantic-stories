/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {female, male} from '../../../assets/icons';
import { code_color } from '../../utils/colors';

export default function Button({style, onPress, title}) {
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
                height: 52,
                margin: 20,
                borderRadius: 12,
                position: 'absolute',
                bottom: 20,
                width: '90%',
              }
        }>
        <Text style={{fontFamily: 'Robotto', fontWeight: 'bold', fontSize: 15}}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}
