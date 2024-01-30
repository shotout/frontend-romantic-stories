/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {
  cover1,
  imgHearts,
  imgLoveLeft,
  imgLoveRight,
  imgUnlockPremium,
} from '../../assets/images';
import {fixedFontSize, hp, wp} from '../../utils/screen';

function ModalStorySave({isVisible}) {
  const positionX = useRef(new Animated.Value(0)).current;
  const positionY = useRef(new Animated.Value(0)).current;

  const handleFetchSaveAnim = async () => {
    // Start the downward animation when the image is saved
    const jumpAndFallAnimation = Animated.parallel([
      // Animasi lompatan ke kiri
      Animated.timing(positionX, {
        toValue: -50,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      // Animasi jatuh ke bawah
      Animated.timing(positionY, {
        toValue: 400, // Ganti nilai ini sesuai kebutuhan tinggi jatuh
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]);

    jumpAndFallAnimation.start(() => {
      setTimeout(() => {
        positionX.setValue(0);
        positionY.setValue(0);
      }, 1000);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      handleFetchSaveAnim();
    }, 1000);
  },[isVisible]);

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'black',
            padding: wp(20),
            borderRadius: wp(20),
            alignItems: 'center',
          }}>
          <Animated.View
            style={{
              transform: [{translateY: positionY}, {translateX: positionX}],
            }}>
            <Image
              source={imgHearts}
              resizeMode="contain"
              style={{width: wp(50), height: hp(50)}}
            />
          </Animated.View>
          <Text
            allowFontScaling={false}
            style={{
              color: code_color.white,
              textAlign: 'center',
              fontSize: fixedFontSize(15),
            }}>
            {'Story saved &\nadded to library'}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

ModalStorySave.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

ModalStorySave.defaultProps = {};

export default connect(states, dispatcher)(ModalStorySave);
