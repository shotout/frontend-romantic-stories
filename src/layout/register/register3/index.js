/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
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

export default function Register3({currentStep}) {
  const [dataStory, setDataStory] = useState([
    {
      name: 'Relationship',
      image: story1,
    },
    {
      name: 'I miss you',
      image: story2,
    },
    {
      name: 'Dirty Mind',
      image: story3,
    },
    {
      name: 'Surprise Me',
      image: story4,
    },
  ]);
  const [selectStory, setSelectStory] = useState('');
  return (
    <>
      {dataStory.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => setSelectStory(item.name)}
            style={{
              alignItems: 'center',
              marginVertical: 5,
              backgroundColor:
                selectStory === item.name ? code_color.splash : 'white',
              padding: 5,
              borderRadius: 10,
            }}>
            <Image
              key={index}
              source={item.image}
              style={{
                backgroundColor:
                  selectStory === item.name ? code_color.splash : 'white',
              }}
            />
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
              }}
            />
          </TouchableOpacity>
        );
      })}
    </>
  );
}
