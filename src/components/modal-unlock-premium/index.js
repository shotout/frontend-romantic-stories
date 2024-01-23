/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
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
import { handlePayment } from '../../helpers/paywall';
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
            padding: 30,
            // alignItems: 'center',
          }}>
          <TouchableOpacity
          onPress={handleClose}
            style={{alignItems: 'flex-end', marginRight: -10, marginTop: -10}}>
            <CloseIcon width={15} height={15} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Icon />
          </View>

          <Text
            style={{
              color: code_color.black,
              fontWeight: '700',
              fontSize: 18,
              textAlign: 'center',
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: code_color.black,
              fontWeight: '400',
              fontSize: 16,
              textAlign: 'center',
              marginTop: moderateScale(10),
            }}>
            {desc}
          </Text>
          <View style={{flexDirection: 'row', gap: 10, marginTop: 20}}>
            <TouchableOpacity
            onPress={() => handlePayment('in_app')}
              style={{
                backgroundColor: '#009A37',
                flex: 1,
                borderRadius: 8,
                paddingVertical: 6,
              }}>
              <BookUnlockIcon
                style={{
                  position: 'absolute',
                  top: 9,
                  left: 6,
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: code_color.white,
                  fontSize: 12,
                }}>
                {'GO\rUNLIMITED'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isLoadingAds}
              onPress={onSuccess}
              style={{
                backgroundColor: '#ED5267',
                flex: 1,
                borderRadius: 8,
                paddingVertical: 6,
                position: 'relative',
                overflow: 'hidden',
                justifyContent: 'center',
                opacity: isLoadingAds ? 0.6 : 1,
              }}>
              {isLoadingAds ? (
                <ActivityIndicator color={code_color.white} />
              ) : (
                <>
                  <PlayIcon style={{position: 'absolute', top: 8, left: 8}} />
                  <Text
                    style={{
                      backgroundColor: '#FFD12F',
                      position: 'absolute',
                      width: 100,
                      fontSize: 12,
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
                      fontSize: 12,
                    }}>
                    {'WATCH\rVIDEO'}
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
