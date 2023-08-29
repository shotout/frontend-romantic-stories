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
import {ava1, ava2, ava3} from '../../../assets/images';
import Carousel from 'react-native-reanimated-carousel';
import {opacity, useSharedValue} from 'react-native-reanimated';

export default function Register4({gender}) {
  const [progressValue, setProgress] = useState(0);
  const [dataAva, setDataAva] = useState([
    {
      image: ava1,
    },
    {
      image: ava2,
    },
    {
      image: ava3,
    },
  ]);
  return (
    <>
      <View
        style={{
          backgroundColor: code_color.yellow,
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
            color: 'black',
            fontSize: 32,
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: 20,
          }}>
          What should your character look like?
        </Text>
        <View style={{flex: 0, alignItems: 'center'}}>
          <Carousel
            loop={false}
            width={Dimensions.get('window').width / 1.5}
            height={Dimensions.get('window').height / 2}
            // autoPlay={true}
            data={dataAva}
            // scrollAnimationDuration={1000}
            // onScrollBegin={(_, absoluteProgress) =>
            //   (progressValue.value = absoluteProgress)
            
            // }
            onSnapToItem={(index) => setProgress(index)}
            modeConfig={{
              parallaxScrollingScale: 0.8,
              parallaxScrollingOffset: 160,
            }}
            mode="parallax"
            // style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}
            renderItem={({item, index}) => (
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 1,
                }}>
                <Image
                  blurRadius={progressValue != index ? 2 : null}
                  source={item.image}
                  resizeMode="contain"
                  style={[
                    // progressValue ? StyleSheet.absoluteFill : null,
                    {
                      height: '100%',
                      width: '10000%',
                      // backgroundColor: 'rgba( 0, 0, 0, 0.1 )',
                    },
                  ]}
                />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}
