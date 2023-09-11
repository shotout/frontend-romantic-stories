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
      alert(JSON.stringify(error));
    }
  };
  return (
    <>
      <FlatList
        style={{flex: 1, marginTop: 20}}
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
                marginVertical: 3,
                backgroundColor:
                  selectStory === item.name ? code_color.splash : 'white',
                padding: 2,
                borderRadius: 10,
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
                  width: Dimensions.get('window').width - 30,
                  height: 95,
                  // backgroundColor:
                  //   selectStory === item.name ? code_color.splash : 'white',
                }}
              />
              <Text
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
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
                  borderRadius: 30,
                  width: 25,
                  height: 25,
                  position: 'absolute',
                  top: 35,
                  left: 20,
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
