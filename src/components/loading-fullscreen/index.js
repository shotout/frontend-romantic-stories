import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {View} from 'react-native';
import styles from './styles';
import LoadingIndicator from '../loading-indicator';

const LoadingFullScreen = ({isLoading, modalContainer, testID}) => (
  <Portal>
    <Modal
      contentContainerStyle={[styles.modal, modalContainer]}
      visible={isLoading}
      // visible
      dismissable={false}>
      <View style={styles.ctnRoot}>
        <View style={[styles.modalBody, styles.modalBodyContainer]}>
          <LoadingIndicator />
        </View>
      </View>
    </Modal>
  </Portal>
);

export default LoadingFullScreen;
