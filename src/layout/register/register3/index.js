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
import { moderateScale } from 'react-native-size-matters';

export default function Register3({setCategoryId}) {
  const [dataStory, setDataStory] = useState([]);

  const [selectStory, setSelectStory] = useState('');

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const category = await getListCategory();
      setDataStory(category?.data);
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  };
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
                setSelectStory(item.name);
                setCategoryId(item.id);
              }}
              style={{
                alignItems: 'center',
                marginVertical: moderateScale(2),
                backgroundColor:
                  selectStory === item.name ? code_color.splash : 'white',
                padding: moderateScale(2),
                borderRadius: moderateScale(10),
                justifyContent: 'center',
              }}>
              <Image
                key={index}
                source={{uri: `${BACKEND_URL}${item.image?.url}`}}
                resizeMode="contain"
                // source={{
                //   uri: 'https://backend-dev-erotales.mooti.app/assets/images/categories/i_miss_u.png',
                // }}
                style={{
                  width: moderateScale(320),
                  height: moderateScale(80),
                  // backgroundColor:
                  //   selectStory === item.name ? code_color.splash : 'white',
                }}
              />
              <Text
              allowFontScaling={false}
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: moderateScale(16),
                  fontWeight: 'bold',
                  color: code_color.white,
                }}>
                {item?.name}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectStory(item.name)}
                style={{
                  backgroundColor:
                    selectStory === item.name ? code_color.splash : 'white',
                  borderRadius: moderateScale(30),
                  width: moderateScale(25),
                  height: moderateScale(25),
                  position: 'absolute',
                  top: moderateScale(35),
                  left: moderateScale(25),
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
