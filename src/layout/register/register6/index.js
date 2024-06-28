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
import {getListTheme} from '../../../shared/request';
import ChecklistSvg from './../../../assets/icons/checklist';
import {moderateScale} from 'react-native-size-matters';
import Speaker from '../../../assets/icons/speaker';
import { fixedFontSize, hp, wp } from '../../../utils/screen';
import DeviceInfo from 'react-native-device-info';

export default function Register5({gender, setTheme, userStory, handleSetColorTheme}) {
  const [colorsDefault, setColorsDefault] = useState(code_color.splash);

  const [colorsBg, setColorsBg] = useState([
    {
      id: 1,
      code: '#3F58DD',
    },
    {
      id: 2,
      code: '#2C8272',
    },
    {
      id: 3,
      code: '#942AA7',
    },
    {
      id: 4,
      code: '#0D648B',
    },
    {
      id: 5,
      code: '#604A9E',
    },
  ]);
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
  const text = `Supporting myself during summer was actually pretty easy. As people started to\r\nromanticize Brazil once again, they started to like the language and aim to learn it, and being a good English speaker and native Portuguese speaker, I decided to offer private lessons.\r\nTo my delight, I have always had genuine clients who paid me really well, and most of them were old people too. My latest client, however, a long term, was my age\r\nand she was just... my type.\r\nShe had a beautiful smile and her body was to die for, which she often used to\r\nher advantage to distract me,`

  useEffect(() => {
    fetchCategory();
  }, []);
  const [isIPad, setIsIPad] = useState(false);
  useEffect(() => {
    const checkIfIPad = async () => {
      const isTablet = DeviceInfo.isTablet();
      setIsIPad(isTablet);
    };

    checkIfIPad();
  }, []);
  const fetchCategory = async () => {
    try {
      // const avatar = await getListTheme();
      // setColorsBg(avatar?.data);
      setBgThem(code ? code : selectedBgTheme.code);
      handleSetColorTheme(code_color.splash);
    } catch (error) {
      handleSetColorTheme(code_color.splash);
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
          borderBottomRightRadius: wp(50),
          borderBottomLeftRadius: wp(50),
        }}>
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.blueDark,
            fontSize: fixedFontSize(23),
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: wp(23),
          }}>
          {'Choose color\n theme'}
        </Text>

        <View
          style={{
            margin: hp(15),
            marginHorizontal: hp(100),
            borderWidth: 0.5,
            borderColor: '#D9D9D9',
            // padding: 10,
            backgroundColor: code_color.white,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: fixedFontSize(isIPad ? 8 :6),
                  color: code_color.grey,
                  paddingHorizontal: wp(10),
                  paddingTop: wp(10),
                }}>
                Relationship
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: fixedFontSize(isIPad ? 10 : 7),
                  paddingHorizontal: wp(10),
                  paddingTop: hp(5),
                }}>
                Jealous Portuguese Teacher
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end', marginRight: wp(5)}}>
              <TouchableOpacity
                style={{
                  padding: 1,
                  paddingHorizontal: hp(isIPad ? 10 :7),
                  borderRadius: hp(20),
                  backgroundColor: colorsDefault,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Speaker width={isIPad ?  15 : 8} />
                <Text
                  allowFontScaling={false}
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: fixedFontSize(isIPad ? 8 :6),
                    color: code_color.white,
                    marginLeft: wp(2),
                  }}>
                  Listen
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: colorsDefault,
              marginVertical: hp(10),
              marginHorizontal: wp(10)
            }}
          />
          <Text
            allowFontScaling={false}
            style={{
              fontSize: fixedFontSize(isIPad ? 10 : 7.5),
              textAlign: isIPad ? 'auto' : 'justify',
              paddingHorizontal: wp(10),
              lineHeight:  isIPad ? 25 : 13,
              fontFamily: 'Roboto',
              color: code_color.grey,
            }}>
            {' '}
            {text}
          </Text>

          <Image
            source={imgBottom}
            resizeMode="contain"
            style={{width: '100%', height: isIPad ? '25%': '15%'}}
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
              borderWidth: wp(0.5),
              borderColor: code_color.grey,
              marginBottom: wp(1),
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: wp(5),
            }}>
            {menu.map((item, i) => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <item.image
                    width={hp(isIPad ?  18 : 13)}
                    height={hp( isIPad ?  18 : 13)}
                    fill={colorsDefault}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: fixedFontSize(isIPad ?  8 : 6),  color: code_color.grey,}}>
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: wp(20),
          }}>
          {colorsBg.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setTheme(item.id);
                  setColorsDefault(item.code);
                  handleSetColorTheme(item.code)
                }}
                style={{
                  backgroundColor: item.code,
                  width: hp(30),
                  height: hp(30),
                  borderRadius: hp(20),
                  borderWidth: 1,
                  borderColor: code_color.grey,
                  marginHorizontal: hp(10),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {colorsDefault === item.code ? <ChecklistSvg /> : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
}
