/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {Modal, View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import CloseIcon from '../../assets/icons/close';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import styles from './styles';
import {code_color} from '../../utils/colors';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {bgGetUnlimit} from '../../assets/images';
import {goBack, navigate} from '../../shared/navigationRef';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
function ScreenMedia({route, stepsTutorial, handleSetSteps}) {
  const [colors, setColors] = useState(null);

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.ctnContent}>
      <View style={styles.row}>
        <Text style={styles.textTitle} />
        <TouchableOpacity onPress={() => goBack()}>
          <CloseIcon fill={code_color.white} />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={bgGetUnlimit}
          resizeMode="contain"
          style={{width: 300, height: 300}}
        />
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.white,
            marginBottom: 10,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          [Story this user currently reading]
        </Text>
        <Text
          allowFontScaling={false}
          style={{color: code_color.white, marginBottom: 40, fontSize: 14}}>
          [Story category]
        </Text>
        <Slider
          step={1}
          minimumValue={0}
          maximumValue={100}
          value={50}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#FFFFFF"
          // onValueChange={value => handleFont(value)}
          thumbTintColor="#fff"
        />
        <View style={{flexDirection: 'row'}}>
        <Text
          allowFontScaling={false}
          style={{color: code_color.white, marginBottom: 40, fontSize: 14, flex: 1}}>
          1:25
        </Text>
        <Text
          allowFontScaling={false}
          style={{color: code_color.white, marginBottom: 40, fontSize: 14, flex: 1, textAlign: 'right'}}>
          -1:25
        </Text>
        </View>
        
      </View>
    </LinearGradient>
  );
}

export default connect(states, dispatcher)(ScreenMedia);
