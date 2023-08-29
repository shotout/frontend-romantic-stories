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

export default function Register7({gender}) {
  const [lang, setLang] = useState(0);

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
            color: code_color.blueDark,
            fontSize: 32,
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: 20,
          }}>
          {'Select the language \n of your stories'}
        </Text>
        <Text
          style={{
            color: code_color.grey,
            fontSize: 14,
            marginHorizontal: 10,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          {
            'Choose your content language. Many stories are only available in specific languages.'
          }
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 0,
            marginTop: 80,
          }}>
          <TouchableOpacity onPress={() => setLang(0)}>
            <View
              style={
                lang === 0
                  ? {
                      backgroundColor: code_color.splash,
                      borderRadius: 35,
                      width: 65,
                      padding: 10,
                      height: 65,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : null
              }>
              <Image source={eng} />
            </View>
            <Text
              style={{
                color: lang === 0 ? code_color.splash : code_color.grey,
                fontSize: 14,
                fontFamily: 'Roboto',
                textAlign: 'center',
                marginTop: 10,
              }}>
              {'Inggris'}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderColor: code_color.grey,
              borderWidth: 1,
              flex: 1,
              width: '90%',
              marginVertical: 10,
            }}
          />
          <TouchableOpacity onPress={() => setLang(1)}>
            <View
              style={
                lang === 1
                  ? {
                      backgroundColor: code_color.splash,
                      borderRadius: 35,
                      width: 65,
                      padding: 10,
                      height: 65,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }
                  : null
              }>
              <Image resizeMode="contain" source={ind} />
            </View>

            <Text
              style={{
                color: lang === 1 ? code_color.splash : code_color.grey,
                fontSize: 14,
                fontFamily: 'Roboto',
                textAlign: 'center',
                marginTop: 10,
              }}>
              {'Indonesia'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
