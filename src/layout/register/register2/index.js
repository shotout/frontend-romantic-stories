/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {female, male} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';
import i18n from '../../../i18n/index';

export default function Register2({currentStep, name, changeText}) {
  return (
    <>
      <View
        style={{ marginTop: 40, marginHorizontal: 20, }}>
        <View style={{flexDirection: 'row', flex: 0, justifyContent: 'center' }}>
          <Text
            style={{
              color: code_color.blackDark,
              fontSize: 16,
              fontFamily: 'Roboto',
              textAlign: 'center',
            }}>
            {i18n.t('register.usingyrname')}
            <Text
              style={{
                color: code_color.blueDark,
                fontSize: 16,
                fontFamily: 'Roboto',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {' '}
              {i18n.t('register.bttrexp')}{' '}
            </Text>
            <Text
              style={{
                color: code_color.blackDark,
                fontSize: 16,
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}>
              {i18n.t('register.wthstry')}
            </Text>
          </Text>
        </View>
        <TextInput
          style={{
            borderColor: code_color.blueDark,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginVertical: 30,
            width: Dimensions.get('window').width - 60
          }}
          value={name}
          onChangeText={(text) => changeText(text)}
          placeholder="Your name"
        />
      </View>
    </>
  );
}
