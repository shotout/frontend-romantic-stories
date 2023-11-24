/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {female, male} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';
import i18n from '../../../i18n/index';
import { moderateScale } from 'react-native-size-matters';

export default function Register2({currentStep, name, changeText}) {
  return (
    <>
      <View
        style={{ marginTop: moderateScale(40), marginHorizontal: moderateScale(20), }}>
        <View style={{flexDirection: 'row', flex: 0, justifyContent: 'center' }}>
          <Text
          allowFontScaling={false}
            style={{
              color: code_color.blackDark,
              fontSize: moderateScale(16),
              fontFamily: 'Roboto',
              textAlign: 'center',
            }}>
            {i18n.t('register.usingyrname')}
            <Text
            allowFontScaling={false}
              style={{
                color: code_color.blueDark,
                fontSize: moderateScale(16),
                fontFamily: 'Roboto',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {' '}
              {i18n.t('register.bttrexp')}{' '}
            </Text>
            <Text
            allowFontScaling={false}
              style={{
                color: code_color.blackDark,
                fontSize: moderateScale(16),
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}>
              {i18n.t('register.wthstry')}
            </Text>
          </Text>
        </View>
        <TextInput
          allowFontScaling={false}
          style={{
            borderColor: code_color.blueDark,
            color: code_color.blackDark,
            borderWidth: moderateScale(1),
            borderRadius: moderateScale(5),
            padding: moderateScale(10),
            marginVertical: moderateScale(30),
            width: moderateScale(Dimensions.get('window').width - 60)
          }}
          placeholderTextColor={code_color.greyDefault}
          value={name}
          onChangeText={(text) => changeText(text)}
          placeholder="Your name"
        />
      </View>
    </>
  );
}
