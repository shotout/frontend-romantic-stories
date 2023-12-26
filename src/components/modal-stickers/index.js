/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {
  bgNewStory,
  imgGift1,
  imgGift2,
  imgLoveLeft,
  imgLoveRight,
  imgStar,
  imgSticker1,
  imgSticker2,
  imgSticker3,
  imgSticker4,
  imgSticker5,
  sticker1,
  sticker2,
  sticker10,
  sticker11,
  sticker12,
  sticker13,
  sticker14,
  sticker15,
  sticker16,
  sticker17,
  sticker18,
  sticker19,
  sticker20,
  sticker21,
  sticker22,
  sticker23,
  sticker24,
  sticker25,
  sticker26,
  sticker28,
  sticker29,
  sticker3,
  sticker30,
  sticker31,
  sticker33,
  sticker34,
  sticker35,
  sticker36,
  sticker37,
  sticker38,
  sticker39,
  sticker4,
  sticker40,
  sticker41,
  sticker43,
  sticker44,
  sticker45,
  sticker46,
  sticker47,
  sticker48,
  sticker49,
  sticker5,
  sticker50,
  sticker51,
  sticker52,
  sticker53,
  sticker54,
  sticker55,
  sticker56,
  sticker57,
  sticker58,
  sticker59,
  sticker6,
  sticker60,
  sticker7,
  sticker8,
  sticker9,
} from '../../assets/images';
import Button from '../buttons/Button';
import {moderateScale} from 'react-native-size-matters';
import {book} from '../../assets/icons';
import WatchIcon from '../../assets/icons/watch';
import BookLockIcon from '../../assets/icons/bookLock';

const window = Dimensions.get('window');
const COLS = 2;
const tileWidth = window.width / COLS;
const tileHeight = 125;
function ModalSticker({visible, onClose, selectSticker}) {
  const [stickers, setSticker] = useState([
    {
      name: '1',
      image: sticker1,
    },
    {
      name: '2',
      image: sticker2,
    },
    {
      name: '3',
      image: sticker3,
    },
    {
      name: '4',
      image: sticker4,
    },
    {
      name: '5',
      image: sticker5,
    },
    {
      name: '6',
      image: sticker6,
    },
    {
      name: '7',
      image: sticker7,
    },
    {
      name: '8',
      image: sticker8,
    },
    {
      name: '9',
      image: sticker9,
    },
    {
      name: '10',
      image: sticker10,
    },
    {
      name: '11',
      image: sticker11,
    },
    {
      name: '12',
      image: sticker12,
    },
    {
      name: '13',
      image: sticker13,
    },
    {
      name: '14',
      image: sticker14,
    },
    {
      name: '15',
      image: sticker15,
    },
    {
      name: '16',
      image: sticker16,
    },
    {
      name: '17',
      image: sticker17,
    },
    {
      name: '18',
      image: sticker18,
    },
    {
      name: '19',
      image: sticker19,
    },
    {
      name: '20',
      image: sticker20,
    },
    {
      name: '21',
      image: sticker21,
    },
    {
      name: '22',
      image: sticker22,
    },
    {
      name: '23',
      image: sticker23,
    },
    {
      name: '24',
      image: sticker24,
    },
    {
      name: '25',
      image: sticker25,
    },
    {
      name: '26',
      image: sticker26,
    },
    {
      name: '28',
      image: sticker28,
    },
    {
      name: '29',
      image: sticker29,
    },
    {
      name: '30',
      image: sticker30,
    },
    {
      name: '31',
      image: sticker31,
    },
    {
      name: '33',
      image: sticker33,
    },
    {
      name: '34',
      image: sticker34,
    },
    {
      name: '35',
      image: sticker35,
    },
    {
      name: '36',
      image: sticker36,
    },
    {
      name: '37',
      image: sticker37,
    },
    {
      name: '38',
      image: sticker38,
    },
    {
      name: '39',
      image: sticker39,
    },
    {
      name: '40',
      image: sticker40,
    },
    {
      name: '41',
      image: sticker41,
    },
    {
      name: '43',
      image: sticker43,
    },
    {
      name: '44',
      image: sticker44,
    },
    {
      name: '45',
      image: sticker45,
    },
    {
      name: '46',
      image: sticker46,
    },
    {
      name: '47',
      image: sticker47,
    },
    {
      name: '48',
      image: sticker48,
    },
    {
      name: '49',
      image: sticker49,
    },
    {
      name: '50',
      image: sticker50,
    },
    {
      name: '51',
      image: sticker51,
    },
    {
      name: '52',
      image: sticker52,
    },
    {
      name: '53',
      image: sticker53,
    },
    {
      name: '54',
      image: sticker54,
    },
    {
      name: '55',
      image: sticker55,
    },
    {
      name: '56',
      image: sticker56,
    },
    {
      name: '57',
      image: sticker57,
    },
    {
      name: '58',
      image: sticker58,
    },
    {
      name: '59',
      image: sticker59,
    },
    {
      name: '60',
      image: sticker60,
    },
  ]);

  const handleClose = () => {
    onClose();
  };
  const sizeReal = size => {
    return (window.width / 375) * size;
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'rgb(34, 33, 33)',
        }}>
        <FlatList
          data={stickers}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable
                onPress={() => selectSticker(item)}
                style={{
                  marginHorizontal: sizeReal(10),
                  marginVertical: sizeReal(10),
                  alignItems: 'center',
                }}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={{width: sizeReal(50), height: sizeReal(50)}}
                />
              </Pressable>
            );
          }}
        />
        {/* <ScrollView style={{ }}>
          {stickers.map((item, index) => {
          return 
        })}
          </ScrollView> */}
      </SafeAreaView>
    </Modal>
  );
}

ModalSticker.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectSticker: PropTypes.func.isRequired,
};

ModalSticker.defaultProps = {};

export default connect(states, dispatcher)(ModalSticker);
