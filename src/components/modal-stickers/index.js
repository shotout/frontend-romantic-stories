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
      image: imgSticker1,
    },
    {
      name: '2',
      image: imgSticker2,
    },
    {
      name: '3',
      image: imgSticker3,
    },
    {
      name: '4',
      image: imgSticker4,
    },
    {
      name: '5',
      image: imgSticker5,
    },
  ]);

  const handleClose = () => {
    onClose();
  };
  const sizeReal = (size) => {
    return (window.width / 375) * size;
  }


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
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        {stickers.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => selectSticker(item)}
              style={{
                marginHorizontal: sizeReal(10),
                marginVertical: sizeReal(10),
                alignItems: 'center',
              }}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={{width: sizeReal(150), height: sizeReal(150)}}
              />
            </Pressable>
          );
        })}
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
