/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import CloseIcon from '../../assets/icons/close';
import DownChevron from '../../assets/icons/downChevron';
import UpChevron from '../../assets/icons/upChevron';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import styles from './styles';
import {code_color} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {bg_splash, bg, bgSettings, story2, story3} from '../../assets/images';

function ModalSorting({isVisible, onClose, fullContent, selectedContent}) {
  const [selectedBg, setSetselectedBg] = useState(null);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const backgroundList = [bg, bg_splash, bgSettings, story2, story3];

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onDismiss={handleClose}>
      <View style={styles.ctnContent}>
        <View style={styles.row}>
          <Text style={styles.textTitle}>Share Quote</Text>
          <TouchableOpacity onPress={handleClose}>
            <CloseIcon fill={code_color.white} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1, width: '100%'}} horizontal={false}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.conQuote}>
              <Image
                source={selectedBg}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 24,
                  objectFit: 'cover',
                }}
              />
              <Text style={styles.textQuote}>{selectedContent}</Text>
              <Text style={styles.textMarker}>@EroTales</Text>
            </View>
            <View style={styles.conFont}>
              <Text style={styles.title}>CHANGE FONT</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{...styles.title, fontFamily: 'Comfortaa-SemiBold'}}>
                  Comfortaa
                </Text>
                <Pressable
                  // onPress={() => setShow(!show)}
                  style={styles.dropDown}>
                  <DownChevron height={10} width={10} />
                </Pressable>
              </View>
            </View>
            <View style={styles.hr} />
            <Text style={{...styles.title, textAlign: 'center'}}>
              Choose Background
            </Text>
            <SafeAreaView style={{width: '100%', height: 80, marginTop: 20}}>
              <ScrollView horizontal style={styles.horizontalScroll}>
                {backgroundList.map((bgl, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={{
                      height: 75,
                      width: 75,
                      marginRight: 12,
                    }}
                    onPress={() => setSetselectedBg(bgl)}>
                    <Image
                      source={bgl}
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: 8,
                        borderColor: code_color.yellow,
                        borderWidth: bgl === selectedBg ? 2 : 0,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </SafeAreaView>
            <View style={styles.hr} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

ModalSorting.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullContent: PropTypes.string.isRequired,
  selectedContent: PropTypes.string.isRequired,
};

ModalSorting.defaultProps = {};

export default connect(states, dispatcher)(ModalSorting);
