/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {moderateScale} from 'react-native-size-matters';
import BookUnlockIcon from '../../assets/icons/bookUnlock';
import PlayIcon from '../../assets/icons/play';
import CloseIcon from '../../assets/icons/close';
import {handlePayment} from '../../helpers/paywall';
import {hp} from '../../utils/screen';
import { fetch } from '@react-native-community/netinfo';
function ModalUnlockPremium({
  isLoadingAds,
  isVisible,
  onSuccess,
  onClose,
  title,
  Icon,
  desc,
}) {
  const handleClose = () => {
    onClose();
  };
  const fetchOnline = () => {
    fetch().then(async state => {
      if (state.isConnected) {
        handlePayment('in_app')
      } else {
          offline()
      }
    });
  }
  const offline = () => {

    Alert.alert(
      'YOU SEEM TO BE OFFLINE',
      'Please check your internet connection and try again.',
      [
        {
          text: 'OK',
          onPress: async () => ({}),
        },
      ],
    );
  }
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            width: '90%',
            backgroundColor: code_color.white,
            borderRadius: moderateScale(24),
            padding: hp(30),
            // alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => handleClose()}
            style={{
              alignItems: 'flex-end',
              marginRight: hp(-10),
              marginTop: hp(-10),
            }}>
            <CloseIcon width={hp(15)} height={hp(15)} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Icon />
          </View>

          <Text
            style={{
              color: code_color.black,
              fontWeight: '700',
              fontSize: moderateScale(18),
              textAlign: 'center',
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: code_color.black,
              fontWeight: '400',
              fontSize: moderateScale(16),
              textAlign: 'center',
              marginTop: hp(10),
            }}>
            {desc}
          </Text>
          <View style={{flexDirection: 'row', gap: hp(10), marginTop: hp(20)}}>
            <TouchableOpacity
              onPress={() => fetchOnline()}
              style={{
                backgroundColor: '#009A37',
                flex: 1,
                borderRadius: hp(8),
                paddingVertical: hp(6),
              }}>
              <BookUnlockIcon
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: hp(4),
                }}
                height={hp(23)}
                width={hp(23)}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: code_color.white,
                  fontWeight: 'bold',
                  fontSize: moderateScale(14),
                }}>
                {'GO\r\nUNLIMITED'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isLoadingAds}
              onPress={onSuccess}
              style={{
                backgroundColor: '#ED5267',
                flex: 1,
                borderRadius: hp(8),
                paddingVertical: hp(6),
                position: 'relative',
                overflow: 'hidden',
                justifyContent: 'center',
                opacity: isLoadingAds ? 0.6 : 1,
              }}>
              {isLoadingAds ? (
                <ActivityIndicator color={code_color.white} size={hp(25)} />
              ) : (
                <>
                  <PlayIcon
                    style={{position: 'absolute', top: '30%', left: hp(8)}}
                    height={hp(23)}
                    width={hp(23)}
                  />
                  <Text
                    style={{
                      backgroundColor: '#FFD12F',
                      position: 'absolute',
                      width: 100,
                      fontSize: moderateScale(12),
                      fontWeight: '600',
                      textAlign: 'center',
                      right: -35,
                      top: 8,
                      transform: 'rotate(45deg)',
                    }}>
                    FREE
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: code_color.white,
                      fontWeight: 'bold',
                      fontSize: moderateScale(14),
                    }}>
                    {'WATCH\r\nVIDEO'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalUnlockPremium.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  Icon: PropTypes.func.isRequired,
  isLoadingAds: PropTypes.bool,
};

ModalUnlockPremium.defaultProps = {};

export default connect(states, dispatcher)(ModalUnlockPremium);
