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
import {female, male} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';
import i18n from '../../../i18n/index';
import {avam1, avam2, avam3, avam4} from '../../../assets/images';
import Carousel from 'react-native-reanimated-carousel';
import {opacity, useSharedValue} from 'react-native-reanimated';
import {getListAvatar} from '../../../shared/request';
import {BACKEND_URL} from '../../../shared/static';
import {moderateScale} from 'react-native-size-matters';
import {fixedFontSize, hp, wp} from '../../../utils/screen';
import FastImage from 'react-native-fast-image';
import Loading from '../../../components/loading';

export default function Register4({gender, setAvatar, dataAvatar, setType}) {
  const [progressValue, setProgress] = useState(0);
  const [dataAva, setDataAva] = useState(dataAvatar);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setProgress(1);
  }, []);

 
  const handleChange = index => {
    setAvatar(dataAva[index].id);
  };
  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 500);
  
  //   }, [])
  return (
    <>
      <View
        style={{
          backgroundColor: code_color.splash,
          flex: 1,
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '70%',
          borderBottomRightRadius: hp(50),
          borderBottomLeftRadius: hp(50),
        }}>
        <Text
          allowFontScaling={false}
          style={{
            color: 'white',
            fontSize: fixedFontSize(28),
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: hp(20),
          }}>{`What should your \npartner look like?`}</Text>
        <View style={{flex: 0, alignItems: 'center'}}>
          <Carousel
            loop={false}
            width={Dimensions.get('window').width / 1.2}
            height={Dimensions.get('window').height / 2}
            defaultIndex={1}
            data={dataAva}
            // scrollAnimationDuration={1000}
            // onScrollBegin={(_, absoluteProgress) =>
            //   (progressValue.value = absoluteProgress)

            // }
            onSnapToItem={index => {
              setProgress(index);
              handleChange(index);
            }}
            modeConfig={{
              parallaxScrollingScale: 0.78,
              parallaxScrollingOffset: moderateScale(210),
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
                {/* <Image
                  // blurRadius={progressValue != index ? 2 : null}
                  source={{uri: `${BACKEND_URL}${item?.image?.url}`}}
                  resizeMode="contain"
                  style={[
                    // progressValue ? StyleSheet.absoluteFill : null,
                    {
                      height: '100%',
                      width: '10000%',
                      opacity: progressValue != index ? 0.7 : null
                      // backgroundColor: 'rgba( 0, 0, 0, 0.1 )',
                    },
                  ]}
                /> */}
                <FastImage
                  source={{
                    uri: `${BACKEND_URL}${item?.image?.url}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    height: '100%',
                    width: '10000%',
                    opacity: progressValue != index ? 0.7 : null,
                  }}
                />
              </Pressable>
            )}
          />
        </View>
      </View>
      <Loading loading={loading} />
    </>
  );
}
