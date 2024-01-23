import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {ActivityIndicator, Text, View} from 'react-native';
import { code_color } from '../../utils/colors';

const Loading = ({loading}) => (
  <Modal visible={loading} animationType="fade" transparent>
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          padding: 20,
          borderRadius: 20,
        }}>
        <Text style={{fontSize: 16, color: code_color.blackDark}}>Loading</Text>
        <ActivityIndicator color={code_color.blueDark} size={20} />
      </View>
    </View>
  </Modal>
);

export default Loading;
