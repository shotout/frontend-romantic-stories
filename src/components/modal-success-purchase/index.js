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
import {successPurchase} from '../../assets/icons';
import ReadingIcon from '../../assets/icons/reading';
import LoveIcon from '../../assets/icons/loveOutline';
import { BACKEND_URL } from '../../shared/static';

function ModalSuccessPurchase({isVisible, onClose, nextStory}) {
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
            source={successPurchase}
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
              <Image
                source={{
                  uri: `${BACKEND_URL}/${nextStory?.category.cover?.url}`,
                }}
                resizeMode="contain"
                style={{
                  width: 65,
                  height: 87,
                  marginRight: moderateScale(10),
                }}
              />
              <View style={{flex: 1}}>
              <Text
                  style={{
                    color: '#3F58DD',
                    marginTop: 10,
                    fontWeight: 400,
                    fontSize: 14,
                  }}>
  {nextStory?.category.name}
                </Text>
                <Text
                  style={{
                    color: code_color.blueDark,
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                    {nextStory?.title_en}
                </Text>
               
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#DDDEE3',
                marginTop: moderateScale(20),
                marginBottom: moderateScale(10),
              }}
            />
            <Text
              style={{
                color: '#1A1D30',
                fontSize: 16,
                fontWeight: 400,
                lineHeight: moderateScale(20),
                width: '100%',
              }}>
              You have{' '}
              <Text style={{color: '#00B781', fontWeight: 700}}>
                {' '}
                unlocked this story for 7 days
              </Text>
              . You can start reading it now or save it in the library to read
              it later.
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: '#009A37',
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
                Start reading
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalSuccessPurchase.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalSuccessPurchase.defaultProps = {};

export default connect(states, dispatcher)(ModalSuccessPurchase);
