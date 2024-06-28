/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {code_color} from '../../../utils/colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {fixedFontSize, hp, wp} from '../../../utils/screen';
import {anime, anime_bw, real, real_bw} from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';

export default function Register0({setType, selectedType}) {
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width / 2.1;
  return (
    <View>
      <LinearGradient
        colors={['black', 'black']}
        start={{x: 3, y: 0.2}}
        end={{x: 3, y: 0.6}}
        style={{
          width: Dimensions.get('window').width,

          flexDirection: 'row',
          // marginBottom: 50,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => setType('realistic')}>
          <ImageBackground
            source={
              selectedType === 'realistic' || selectedType == ''
                ? real
                : real_bw
            }
            style={[
              {
                width: width,
                height: height,
                resizeMode: 'contain',
                opacity: 0.6,
              },
              styles.filter,
            ]}></ImageBackground>
          <Text
            style={{
              color: code_color.white,
              fontFamily: 'Comfortaa-SemiBold',
              fontSize: fixedFontSize(20),
              position: 'absolute',
              bottom: '25%',
              left: '25%',
            }}>
            Realistic
          </Text>
        </TouchableOpacity>
        <LinearGradient
          colors={['#000000', '#FF0000', '#5873FF', '#000000']}
          style={{
            height: height,
            width: 15,
          }}></LinearGradient>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => setType('anime')}>
          <ImageBackground
            source={
              selectedType === 'anime' || selectedType == '' ? anime : anime_bw
            }
            style={{
              width: width,
              height: height,
              resizeMode: 'contain',
              opacity: 0.6,
            }}></ImageBackground>
          <Text
            style={{
              color: code_color.white,
              fontFamily: 'Comfortaa-SemiBold',
              fontSize: fixedFontSize(20),
              position: 'absolute',
              bottom: '25%',
              left: '35%',
            }}>
            Anime
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* <Text
        allowFontScaling={false}
        style={{
          color: code_color.white,
          fontSize: fixedFontSize(26),
          fontFamily: 'Comfortaa-SemiBold',
          textAlign: 'center',
          // marginTop: wp(40),
          position: 'absolute',
          left: '25%',
          top: '-%',
        }}>
        {'Which style do\nyou prefer?'}
      </Text> */}
    </View>
  );
}
