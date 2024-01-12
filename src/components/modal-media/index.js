/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import BookLockIcon from '../../assets/icons/bookLock';
import LockFree from '../../assets/icons/lockFree';
import CloseSvg from '../../assets/icons/close';
import {BACKEND_URL} from '../../shared/static';
import {ActivityIndicator} from 'react-native-paper';
import Media from '../../screens/media';

function ModalUnlockStory({
  isVisible,
  onClose,
  data,
  onWatchAds,
  onUnlock,
  onGetUnlimit,
  price,
  isLoading,
  loadingOne,
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
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Media />
      </View>
    </Modal>
  );
}

ModalUnlockStory.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalUnlockStory.defaultProps = {};

export default connect(states, dispatcher)(ModalUnlockStory);
