/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import {getListLanguange} from '../../../shared/request';
import {BACKEND_URL} from '../../../shared/static';
import { moderateScale } from 'react-native-size-matters';

export default function Register7({languange}) {
  const [lang, setLang] = useState(null);
  const [dataLang, setDataLang] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const avatar = await getListLanguange();
      setDataLang(avatar?.data);
    } catch (error) {
     
    }
  };
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
          borderBottomRightRadius: moderateScale(40),
          borderBottomLeftRadius: moderateScale(40),
        }}>
        <Text
        allowFontScaling={false}
          style={{
            color: code_color.blueDark,
            fontSize: moderateScale(28),
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: moderateScale(20),
          }}>
          {'Select the language \n of your stories'}
        </Text>
        <Text
        allowFontScaling={false}
          style={{
            color: code_color.grey,
            fontSize: moderateScale(13),
            marginHorizontal: moderateScale(10),
            textAlign: 'center',
            marginVertical: moderateScale(20),
          }}>
          {
            'Choose your content language. Many stories are only available in specific languages.'
          }
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginTop: moderateScale(50),
          }}>
          {dataLang.map((item, idx) => {
            return (
              <View style={{flex: 1, width: '90%'}}>
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => {
                    setLang(item.id);
                    languange(item.id);
                  }}>
                  <View
                    style={
                      lang === item.id
                        ? {
                            backgroundColor: code_color.splash,
                            borderRadius: moderateScale(35),
                            width: moderateScale(60),
                            padding: moderateScale(10),
                            height: moderateScale(60),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: idx === 0 ? 0 : 20,
                          }
                        : {
                            backgroundColor: code_color.grey,
                            borderRadius: moderateScale(35),
                            width: moderateScale(60),
                            padding: moderateScale(10),
                            height: moderateScale(60),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: idx === 1 ?  50 : 0
                          }
                    }>
                    <Image
                      resizeMode="contain"
                      style={{width: moderateScale(60), height: moderateScale(60)}}
                      source={{uri: `${BACKEND_URL}${item.image.url}`}}
                    />
                  </View>
                  <Text
                  allowFontScaling={false}
                    style={{
                      color:
                        lang === item.id ? code_color.splash : code_color.grey,
                      fontSize: moderateScale(13),
                      fontFamily: 'Roboto',
                      textAlign: 'center',
                      marginTop: moderateScale(20),
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderColor: code_color.grey,
                    borderWidth: idx === 0 ? 1 : 0,
                    marginVertical: moderateScale(20),
                  }}
                />
              </View>
            );
          })}
        </View>

        {/* <View
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
        </View> */}
      </View>
    </>
  );
}
