import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function Card(props) {
  const {label, onPress, icon} = props;
  return (
    <View style={styles.ctnRowSection}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.ctnBox}>
          <View style={styles.ctnIcon}>{icon}</View>
          <Text style={styles.ctnLabel}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
