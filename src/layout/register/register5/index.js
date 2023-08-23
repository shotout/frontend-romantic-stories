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
import {female, male} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';
import i18n from '../../../i18n/index';
import {ava1, ava2, ava3, imgBottom} from '../../../assets/images';
import Carousel from 'react-native-reanimated-carousel';
import {opacity, useSharedValue} from 'react-native-reanimated';

export default function Register5({gender}) {
  const [colorsDefault, setColorsDefault] = useState(code_color.white);

  const [colorsBg, setColorsBg] = useState([
    {
      code: code_color.white,
    },
    {
      code: code_color.blueDark,
    },
    {
      code: code_color.yellow,
    },
    {
      code: code_color.splash,
    },
  ]);

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
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            backgroundColor: colorsDefault,
          }}>
          <Text style={{fontSize: 9}}>
            Fistful of Reefer: A Pulpy Action Series from Schism 8
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: code_color.blueDark,
              marginVertical: 10,
            }}
          />
          <Text style={{fontSize: 9, textAlign: 'justify'}}>
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
            style={{width: '100%', height: '20%'}}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 20 }}>
          {colorsBg.map((item, i) => {
            return (
              <TouchableOpacity
              onPress={() => setColorsDefault(item.code)}
                style={{
                  backgroundColor: item.code,
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: code_color.grey,
                  marginHorizontal: 10
                }}
              />
            );
          })}
        </View>
      </View>
    </>
  );
}
