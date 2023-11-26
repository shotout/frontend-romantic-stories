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
  female,
  font,
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
import { getListTheme } from '../../../shared/request';
import ChecklistSvg from './../../../assets/icons/checklist';
import { moderateScale } from 'react-native-size-matters';

export default function Register5({gender, setTheme}) {
  const [colorsDefault, setColorsDefault] = useState(code_color.splash);

  const [colorsBg, setColorsBg] = useState([]);
  const [menu, setMenu] = useState([
    {
      image: LoveSvg,
      name: 'SAVE',
    },
    {
      image: LibrarySvg,
      name: 'MY LIBRARY',
    },
    {
      image: FontSvg,
      name: 'TEXT',
    },
    {
      image: SettingSvg,
      name: 'SETTINGS',
    },
  ]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const avatar = await getListTheme();
      setColorsBg(avatar?.data);
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  };
  // const handleChange = index => {
  //   setAvatar(dataAva[index].id);
  // };

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
          borderBottomRightRadius: moderateScale(50),
          borderBottomLeftRadius: moderateScale(50),
        }}>
        <Text
        allowFontScaling={false}
          style={{
            color: code_color.blueDark,
            fontSize: moderateScale(28),
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: moderateScale(15),
          }}>
          {'Choose color \n theme'}
        </Text>

        <View
          style={{
            margin: moderateScale(20),
            marginHorizontal: moderateScale(100),
            borderWidth: 0.5,
            borderColor: '#D9D9D9',
            // padding: 10,
            backgroundColor: code_color.white,
          }}>
          <Text allowFontScaling={false} style={{fontSize: moderateScale(9), paddingHorizontal: (10), paddingTop: (10)}}>
            Fistful of Reefer: A Pulpy Action Series from Schism 8
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: colorsDefault,
              marginVertical: moderateScale(10),
            }}
          />
          <Text allowFontScaling={false}
            style={{fontSize: moderateScale(7.5), textAlign: 'justify', paddingHorizontal: moderateScale(10)}}>
            {' '}
            Srishti and Sameer were childhood friends. Both were neighbors till class 7. After that, Srishti's parents shifted to another side of the same city. They both cried a lot that day while she was leaving. They were still in touch with one another.
            Even their friendship was popular among students and teachers. They had played together. They learned things together. They went to the same preschool, the same school. Srishti was crying on her first day, but Sameer made her smile. They both had the same interests in painting. They had shared many moments. Those moments were very special to them.
          </Text>

          <Image
            source={imgBottom}
            resizeMode="contain"
            style={{width: '100%', height: '15%'}}
          />

          <View style={{alignItems: 'flex-end'}}>
            <Image
              source={paper}
              resizeMode="contain"
              style={{alignItems: 'flex-end'}}
            />
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: code_color.grey,
              marginBottom: moderateScale(1),
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: moderateScale(5),
            }}>
            {menu.map((item, i) => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <item.image width={moderateScale(13)} height={moderateScale(13)} fill={colorsDefault} />
                  <Text allowFontScaling={false} style={{fontSize: moderateScale(6)}}>{item.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: moderateScale(20),
          }}>
          {colorsBg.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setTheme(item.id);
                  setColorsDefault(item.theme_color);
                }}
                style={{
                  backgroundColor: item.theme_color,
                  width: moderateScale(30),
                  height: moderateScale(30),
                  borderRadius: moderateScale(20),
                  borderWidth: 1,
                  borderColor: code_color.grey,
                  marginHorizontal: moderateScale(10),
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                  {colorsDefault === item.theme_color ? <ChecklistSvg /> : null}
                </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
}
