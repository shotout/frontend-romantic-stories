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
          {'Choose color \n theme'}
        </Text>

        <View
          style={{
            margin: 20,
            marginHorizontal: 100,
            borderWidth: 0.5,
            borderColor: '#D9D9D9',
            // padding: 10,
            backgroundColor: code_color.white,
          }}>
          <Text style={{fontSize: 9, paddingHorizontal: 10, paddingTop: 10}}>
            Fistful of Reefer: A Pulpy Action Series from Schism 8
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: colorsDefault,
              marginVertical: 10,
            }}
          />
          <Text
            style={{fontSize: 9, textAlign: 'justify', paddingHorizontal: 10}}>
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            scelerisque, arcu in imperdiet auctor, metus sem cursus tortor, sed
            fringilla orci metus ac ex. Nunc pharetra, lacus in egestas
            vulputate, nisi erat auctor lectus, vitae pulvinar metus metus et
            ligula. Etiam porttitor urna nec dignissim lacinia. Ut eget justo
            congue, aliquet tellus eget, consectetur metus.
            {'\n'} In hac habitasse platea dictumst. Aenean in congue orci.
            Nulla sollicitudin feugiat diam et tristique. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut
            ac turpis dolor. Donec eu arcu luctus, volutpat dolor et, dapibus
            libero. Curabitur porttitor lorem non felis porta, ut ultricies sem
            maximus. et, dapibus libero. Curabitur.
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
              marginBottom: 2,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            {menu.map((item, i) => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <item.image width={15} height={15} fill={colorsDefault} />
                  <Text style={{fontSize: 7}}>{item.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 20,
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
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: code_color.grey,
                  marginHorizontal: 10,
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
