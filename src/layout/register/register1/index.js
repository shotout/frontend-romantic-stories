/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {female, male} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';

export default function Register1({setGender}) {
  return (
    <>
      <View style={{justifyContent: 'center', flex: 0, marginTop: 80}}>
        <TouchableOpacity
          style={{marginBottom: 20}}
          onPress={() => setGender('Male')}>
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
        <TouchableOpacity onPress={() => setGender('Female')}>
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
    </>
  );
}
