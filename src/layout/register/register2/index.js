/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {female, male} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';
import i18n from '../../../i18n/index';
import {moderateScale, scale} from 'react-native-size-matters';
import {fixedFontSize, hp, wp} from '../../../utils/screen';

export default function Register2({currentStep, name, changeText}) {
  return (
    <>
      <View
        style={{
          marginTop: wp(15),
          marginHorizontal: wp(20),
        }}>
        <View style={{flexDirection: 'row', flex: 0, justifyContent: 'center'}}>
          <Text
            allowFontScaling={false}
            style={{
              color: code_color.blackDark,
              fontSize: fixedFontSize(15),
              fontFamily: 'Roboto',
              textAlign: 'center',
            }}>
            {i18n.t('register.usingyrname')}
            <Text
              allowFontScaling={false}
              style={{
                color: code_color.blueDark,
                fontSize: fixedFontSize(15),
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
                fontSize: fixedFontSize(15),
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
            borderWidth: wp(1),
            borderRadius: wp(5),
            padding: wp(10),
            fontSize: hp(14),
            marginVertical: wp(30),
            // width: wp(Dimensions.get('window').width - 60),
            width: Dimensions.get('window').width - 60,
          }}
          placeholderTextColor={code_color.greyDefault}
          value={name}
          onChangeText={text => changeText(text)}
          placeholder="Your name"
        />
      </View>
    </>
  );
}
