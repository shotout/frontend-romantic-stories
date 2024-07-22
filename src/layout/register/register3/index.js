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
import DeviceInfo from 'react-native-device-info';
export default function Register3({setCategoryId, value, dataCategory, setType}) {
// alert(setType)
  const [dataStory, setDataStory] = useState([
    {
        "id": 1,
        "name": "Relationship",
        "status": 2,
        "created_at": "2023-12-06T07:45:21.000000Z",
        "updated_at": null,
        "image": {
            "id": 12,
            "owner_id": 1,
            "type": "category",
            "name": "relationship.png",
            "url": setType === 'realistic' ?  "/assets/images/categories/realistic/relationship.png" : "/assets/images/categories/anime/relationship.png",
            //  "url": "/assets/images/categories/relationship.png",
            "audio_en": null,
            "audio_id": null,
            "created_at": "2023-12-06T14:45:21.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 2,
        "name": "I Miss You",
        "status": 2,
        "created_at": "2023-12-06T07:45:21.000000Z",
        "updated_at": null,
        "image": {
            "id": 13,
            "owner_id": 2,
            "type": "category",
            "name": "i_miss_u.png",
            "url":setType === 'realistic' ? "/assets/images/categories/realistic/i_miss_u.png" :  "/assets/images/categories/anime/i_miss_u.png",
            // "url": "/assets/images/categories/i_miss_u.png",
            "audio_en": null,
            "audio_id": null,
            "created_at": "2023-12-06T14:45:21.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 3,
        "name": "Dirty Mind",
        "status": 2,
        "created_at": "2023-12-06T07:45:21.000000Z",
        "updated_at": null,
        "image": {
            "id": 14,
            "owner_id": 3,
            "type": "category",
            "name": "dirty_mind.png",
            "url": setType === 'realistic' ?  "/assets/images/categories/realistic/dirty_mind.png" :  "/assets/images/categories/anime/dirty_mind.png",
            // "url": "/assets/images/categories/dirty_mind.png",
            "audio_en": null,
            "audio_id": null,
            "created_at": "2023-12-06T14:45:21.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 4,
        "name": "Suprise Me",
        "status": 2,
        "created_at": "2023-12-06T07:45:21.000000Z",
        "updated_at": null,
        "image": {
            "id": 15,
            "owner_id": 4,
            "type": "category",
            "name": "suprise_me.png",
            "url": setType === 'realistic' ? "/assets/images/categories/realistic/suprise_me.png" : "/assets/images/categories/anime/suprise_me.png",
            //  "url": "/assets/images/categories/suprise_me.png",
            "audio_en": null,
            "audio_id": null,
            "created_at": "2023-12-06T14:45:21.000000Z",
            "updated_at": null
        }
    }
]);
  const [loading, setLoading] = useState(false);
  const [selectStory, setSelectStory] = useState(value);
  // alert(JSON.stringify(dataCategory))
  // useEffect(() => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 200);
  
  //   }, [dataCategory])

  const [isIPad, setIsIPad] = useState(false);
  useEffect(() => {
    const checkIfIPad = async () => {
      const isTablet = DeviceInfo.isTablet();
      setIsIPad(isTablet);
    };

    checkIfIPad();
  }, []);
 
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
                marginVertical: hp(2),
                backgroundColor:
                  selectStory === item.id ? code_color.splash : 'white',
                padding: hp(5),
                borderRadius: hp(10),
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
                    width: hp(isIPad ? 500 :320),
                    height: hp(isIPad ? 100 : 80),
                    borderRadius: hp(6),
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
                  width: hp(25),
                  height: hp(25),
                  position: 'absolute',
                  top: hp(isIPad ? 50 : 35),
                  left: hp(25),
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
