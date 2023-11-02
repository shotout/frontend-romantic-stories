/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {moderateScale} from 'react-native-size-matters';
import CopyIcon from '../../assets/icons/copy';
import MessageIcon from '../../assets/icons/message';
import WAIcon from '../../assets/icons/whatsapp';
import CloseIcon from '../../assets/icons/close';
import IgStoryIcon from '../../assets/icons/instagramStory';
import IgIcon from '../../assets/icons/instagram';
import FbStoryIcon from '../../assets/icons/facebookStory';
import FbIcon from '../../assets/icons/facebook';

function ModalShareStory({isVisible, onClose, isPremium}) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            // flex: 1,
            height: 'auto',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTopEndRadius: moderateScale(24),
            borderTopStartRadius: moderateScale(24),
            paddingBottom: moderateScale(26),
            paddingTop: moderateScale(20),
            backgroundColor: code_color.headerBlack,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: code_color.white,
              fontSize: moderateScale(16),
              fontWeight: '400',
              marginBottom: moderateScale(20),
            }}>
            Share via
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: 'absolute',
              right: moderateScale(20),
              top: moderateScale(20),
            }}>
            <CloseIcon fill={code_color.white} height={14} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              gap: moderateScale(20),
            }}>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <CopyIcon height={40} />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                }}>
                Copy Link
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MessageIcon height={40} />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                }}>
                Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <WAIcon height={36} bg="#00F356" />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                }}>
                WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '80%',
              backgroundColor: 'rgba(255, 255, 255, 0.20)',
              marginVertical: moderateScale(20),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              gap: moderateScale(20),
            }}>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <IgStoryIcon height={40} />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                  textAlign: 'center',
                }}>
                {'Instagram\r\nStories'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <IgIcon height={38} />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                  textAlign: 'center',
                }}>
                {'Instagram'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <FbStoryIcon height={38} bg="#1877F2" />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                  textAlign: 'center',
                }}>
                {'Facebook\r\nStories'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <FbIcon height={38} bg="#1877F2" />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                  textAlign: 'center',
                }}>
                {'Facebook'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalShareStory.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalShareStory.defaultProps = {};

export default connect(states, dispatcher)(ModalShareStory);
