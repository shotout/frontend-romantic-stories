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
import {ava1, ava2, ava3} from '../../../assets/images';
import Carousel from 'react-native-reanimated-carousel';
import {BACKEND_URL} from '../../../shared/static';
import {moderateScale} from 'react-native-size-matters';
import {fixedFontSize, hp, wp} from '../../../utils/screen';
import FastImage from 'react-native-fast-image';
import Loading from '../../../components/loading';

export default function Register4({gender, setAvatar, dataAvatar}) {
  const [progressValue, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataAva, setDataAva] = useState(dataAvatar ? dataAvatar : [{"id":1,"name":"avatar1","gender":"male","status":2,"created_at":"2023-12-06T07:45:22.000000Z","updated_at":null,"image":{"id":19,"owner_id":1,"type":"avatar","name":"1.png","url":"\/assets\/images\/avatars\/1.png","audio_en":null,"audio_id":null,"created_at":"2023-12-06T14:45:22.000000Z","updated_at":null}},{"id":2,"name":"avatar2","gender":"male","status":2,"created_at":"2023-12-06T07:45:22.000000Z","updated_at":null,"image":{"id":20,"owner_id":2,"type":"avatar","name":"2.png","url":"\/assets\/images\/avatars\/2.png","audio_en":null,"audio_id":null,"created_at":"2023-12-06T14:45:22.000000Z","updated_at":null}},{"id":3,"name":"avatar3","gender":"male","status":2,"created_at":"2023-12-06T07:45:22.000000Z","updated_at":null,"image":{"id":21,"owner_id":3,"type":"avatar","name":"3.png","url":"\/assets\/images\/avatars\/3.png","audio_en":null,"audio_id":null,"created_at":"2023-12-06T14:45:22.000000Z","updated_at":null}}]);

  useEffect(() => {
    setProgress(1);
  }, []);

  // useEffect(() => {
  // setLoading(true)
  // setTimeout(() => {
  //   setLoading(false)
  // }, 500);

  // }, [])
  // const fetchCategory = async () => {
  //   try {
  //     const params = {
  //       gender,
  //     };
  //     const avatar = await getListAvatar(params);
  //     setDataAva(avatar?.data);
  //     setProgress(1);
  //   } catch (error) {
  //     // alert(JSON.stringify(error));
  //   }
  // };
  const handleChange = index => {
    setAvatar(dataAva[index].id);
  };

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
          borderBottomRightRadius: wp(50),
          borderBottomLeftRadius: wp(50),
        }}>

        <Text
          allowFontScaling={false}
          style={{
            color: 'black',
            fontSize: fixedFontSize(28),
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: hp(20),
          }}>
          {`What should your \ncharacter look like?`}
        </Text>
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
