/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, View, Text, Pressable, Image, Dimensions, SafeAreaView, Alert} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {bgNewStory, imgLoveLeft, imgLoveRight} from '../../assets/images';
import Button from '../buttons/Button';
import {moderateScale} from 'react-native-size-matters';
import {book} from '../../assets/icons';
import WatchIcon from '../../assets/icons/watch';
import BookLockIcon from '../../assets/icons/bookLock';
import { stickers } from '../stickers';
import {
  Canvas,
  Group,
  Skia,
  fitbox,
  rect,
  processTransform2d,
} from "@shopify/react-native-skia";
import { deflate } from '../Geometry';
const window = Dimensions.get("window");
const COLS = 2;
const tileWidth = window.width / COLS;
const tileHeight = 125;
function ModalSticker({
  visible,
  onClose,
}) {
 
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "rgb(34, 33, 33)",
        flexDirection: "row",
        flexWrap: "wrap",}}>
      {stickers.map(({ Sticker, size }, index) => {
        const { width, height } = size;
        const src = rect(0, 0, width, height);
        const dst = deflate(rect(0, 0, tileWidth, tileHeight), 12);
        const transform = fitbox("contain", src, dst);
        return (
          <Pressable key={index} onPress={handleClose}>
            <Canvas style={{ width: tileWidth, height: tileHeight }}>
              <Group transform={transform}>
                <Sticker matrix={Skia.Matrix()} />
              </Group>
            </Canvas>
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
};

ModalSticker.defaultProps = {};

export default connect(states, dispatcher)(ModalSticker);
