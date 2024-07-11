/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {cover1, imgLoveLeft, imgLoveRight} from '../../assets/images';
import {moderateScale} from 'react-native-size-matters';
import {successPurchase, successPurchaseReal} from '../../assets/icons';
import ReadingIcon from '../../assets/icons/reading';
import ListenIcon from '../../assets/icons/listen';
import LoveIcon from '../../assets/icons/loveOutline';

function ModalSuccessPurchaseAudio({isVisible, onClose, title, handleListen, type}) {
  const handleClose = () => {
    onClose();
  };
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: code_color.blueDark,
            width: '90%',
            borderRadius: moderateScale(24),
          }}>
          <Image
            source={type === 'realistic' ? successPurchaseReal : successPurchase}
            style={{
              height: 150,
              aspectRatio: '1.15/1',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(18),
              color: code_color.white,
              fontWeight: 700,
              textAlign: 'center',
              marginTop: moderateScale(10),
              marginBottom: moderateScale(20),
            }}>
            {'Your Purchase\nwas Successful!'}
          </Text>
          <Image
            source={imgLoveLeft}
            resizeMode="contain"
            style={{
              width: 100,
              height: 150,
              position: 'absolute',
              left: 0,
              top: 150,
            }}
          />

          <Image
            source={imgLoveRight}
            resizeMode="contain"
            style={{
              width: 100,
              height: 150,
              position: 'absolute',
              right: 0,
              top: 150,
            }}
          />
          <View
            style={{
              alignItems: 'center',
              backgroundColor: code_color.white,
              borderRadius: moderateScale(24),
              padding: moderateScale(20),
            }}>
            <View style={{flexDirection: 'row'}}>
             
              <View style={{flex: 1}}>
             
                <Text
                allowFontScaling={false}
                  style={{
                    color: code_color.blueDark,
                    fontWeight: 'bold',
                    fontSize: 18,
                    textAlign: 'center'
                  }}>
                  Listen to the Story
                </Text>
               
              </View>
            </View>
            <Text
              style={{
                color: '#1A1D30',
                fontSize: 16,
                fontWeight: 400,
                lineHeight: moderateScale(20),
                width: '100%',
                marginTop: 20
              }}>
              You can still listen to{' '}
              <Text style={{color: '#00B781', fontWeight: 700}}>
                {' '}
                {title ? title : '10/10 Audio Stories '}
              </Text>
              {`\nin your current package. 
Do you want to listen to this story now?`}
            </Text>
            <TouchableOpacity
              onPress={handleListen}
              style={{
                backgroundColor: '#009A37',
                marginTop: moderateScale(20),
                padding: moderateScale(12),
                alignItems: 'center',
                borderRadius: 8,
                width: '100%',
              }}>
              <ListenIcon
                style={{position: 'absolute', left: '15%', top: '40%'}}
              />
              <Text
                style={{
                  color: code_color.white,
                  fontWeight: 500,
                  fontSize: moderateScale(14),
                }}>
                Start Listening
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: '#ED5267',
                marginTop: moderateScale(20),
                padding: moderateScale(12),
                alignItems: 'center',
                borderRadius: 8,
                width: '100%',
              }}>
              <ReadingIcon
                style={{position: 'absolute', left: '15%', top: '40%'}}
              />
              <Text
                style={{
                  color: code_color.white,
                  fontWeight: 500,
                  fontSize: moderateScale(14),
                }}>
                Keep Reading
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalSuccessPurchaseAudio.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalSuccessPurchaseAudio.defaultProps = {};

export default connect(states, dispatcher)(ModalSuccessPurchaseAudio);
