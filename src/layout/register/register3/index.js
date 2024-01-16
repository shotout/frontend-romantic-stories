/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {female, male} from '../../../assets/icons';
import {code_color} from '../../../utils/colors';
import i18n from '../../../i18n/index';
import {story1, story2, story3, story4} from '../../../assets/images';
import ChecklistSvg from './../../../assets/icons/checklist';
import {getListCategory} from '../../../shared/request';
import {API_URL, BACKEND_URL} from '../../../shared/static';
import {moderateScale} from 'react-native-size-matters';
import { fixedFontSize, hp, wp } from '../../../utils/screen';
import Loading from '../../../components/loading';
import FastImage from 'react-native-fast-image';
export default function Register3({setCategoryId, value, dataCategory}) {
  const [dataStory, setDataStory] = useState(dataCategory);
  const [loading, setLoading] = useState(false);
  const [selectStory, setSelectStory] = useState(value);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 200);
  
    }, [dataCategory])
 
  return (
    <>
      <FlatList
        style={{flex: 1, marginTop: moderateScale(20)}}
        data={dataStory}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectStory(item.id);
                setCategoryId(item.id);
              }}
              style={{
                alignItems: 'center',
                marginVertical: wp(2),
                backgroundColor:
                  selectStory === item.id ? code_color.splash : 'white',
                padding: wp(5),
                borderRadius: wp(10),
                justifyContent: 'center',
              }}>
                <FastImage
                 key={index}
                  source={{
                    uri: `${BACKEND_URL}${item.image?.url}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    width: wp(320),
                    height: hp(80),
                    borderRadius: wp(10),
                  }}
                />
              <Text
                allowFontScaling={false}
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: fixedFontSize(16),
                  fontWeight: 'bold',
                  color: code_color.white,
                }}>
                {item?.name}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectStory(item.id)}
                style={{
                  backgroundColor:
                    selectStory === item.id ? code_color.splash : 'white',
                  borderRadius: wp(30),
                  width: wp(25),
                  height: hp(25),
                  position: 'absolute',
                  top: wp(35),
                  left: wp(25),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ChecklistSvg />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
