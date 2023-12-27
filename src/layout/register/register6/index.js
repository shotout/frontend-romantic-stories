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

export default function Register5({gender, setTheme, userStory}) {
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
  const text = `Supporting myself during summer was actually pretty easy. As people started to\r\nromanticize Brazil once again, they started to like the language and aim to learn it, and being a good English speaker and native Portuguese speaker, I decided to offer private lessons.\r\nTo my delight, I have always had genuine clients who paid me really well, and most of them were old people too. My latest client, however, a long term, was my age\r\nand she was just... my type.\r\nShe had a beautiful smile and her body was to die for, which she often used to\r\nher advantage to distract me,`

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
            margin: wp(15),
            marginHorizontal: wp(100),
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
                  fontSize: fixedFontSize(6),
                  color: code_color.grey,
                  paddingHorizontal: wp(10),
                  paddingTop: wp(10),
                }}>
                Relationship
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: fixedFontSize(7),
                  paddingHorizontal: wp(10),
                  paddingTop: wp(5),
                }}>
                Jealous Portuguese Teacher
              </Text>
            </View>
            <View style={{justifyContent: 'flex-end', marginRight: wp(5)}}>
              <TouchableOpacity
                style={{
                  padding: 1,
                  paddingHorizontal: wp(7),
                  borderRadius: wp(20),
                  backgroundColor: colorsDefault,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Speaker width={8} />
                <Text
                  allowFontScaling={false}
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: fixedFontSize(6),
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
              marginVertical: wp(10),
              marginHorizontal: wp(10)
            }}
          />
          <Text
            allowFontScaling={false}
            style={{
              fontSize: fixedFontSize(7.5),
              textAlign: 'justify',
              paddingHorizontal: wp(10),
              lineHeight: 13,
              fontFamily: 'Robotto'
            }}>
            {' '}
            {text}
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
                    width={wp(13)}
                    height={wp(13)}
                    fill={colorsDefault}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{fontSize: fixedFontSize(6)}}>
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
                  setColorsDefault(item.theme_color);
                }}
                style={{
                  backgroundColor: item.theme_color,
                  width: wp(30),
                  height: hp(30),
                  borderRadius: wp(20),
                  borderWidth: 1,
                  borderColor: code_color.grey,
                  marginHorizontal: wp(10),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {colorsDefault === item.theme_color ? <ChecklistSvg /> : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
}
