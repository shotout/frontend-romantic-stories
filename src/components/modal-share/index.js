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
import Whatsapp from '../../assets/icons/whatsapp';
import InstagramStory from '../../assets/icons/instagramStory';
import Instagram from '../../assets/icons/instagram';
import FBStory from '../../assets/icons/facebookStory';
import FB from '../../assets/icons/facebook';
import UpChevron from '../../assets/icons/upChevron';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import styles from './styles';
import {code_color} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  bg,
  story2,
  bgShare1,
  bgShare2,
  bgShare3,
  bgShare4,
} from '../../assets/images';
import Card from '../card';

function ModalSorting({isVisible, onClose, selectedContent, start, end}) {
  const [selectedBg, setSetselectedBg] = useState(null);
  const backgroundList = [bg, story2, bgShare1, bgShare2, bgShare3, bgShare4];

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  function renderCard() {
    return (
      <View style={styles.rowCard}>
        <ScrollView horizontal>
          <Card
            label="WhatsApp"
            icon={<Whatsapp width="100%" height="100%" />}
            // onPress={handleWAShare}
          />
          <Card
            label="Instagram Stories"
            icon={<InstagramStory width="100%" height="100%" />}
            // onPress={() => {
            //   Alert.alert('Don’t forget to tag us!\n@MootiApp', '', [
            //     // {text: 'OK', onPress: handleIGStoryShare},
            //   ]);
            // }}
          />
          <Card
            label="Instagram"
            icon={<Instagram width="100%" height="100%" />}
            // onPress={() => {
            //   handleCopyText();
            //   Alert.alert('Don’t forget to tag us!\n@MootiApp', '', [
            //     {text: 'OK', onPress: handleShareInstagramDefault},
            //   ]);
            // }}
          />
          <Card
            label="Facebook Stories"
            icon={<FBStory width="100%" height="100%" />}
            // onPress={() => {
            //   Alert.alert('“Mooti”\nWould Like to open “Facebook”', '', [
            //     {text: 'Cancel', onPress: () => {}},
            //     {text: 'OK', onPress: handleSharetoFBStory},
            //   ]);
            // }}
          />
          <Card
            label="Facebook"
            icon={<FB width="100%" height="100%" />}
            // onPress={handleShareFBDefault}
          />
        </ScrollView>
      </View>
    );
  }

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
              <View style={styles.overlay} />
              <Text style={styles.textQuote}>
                <Text style={styles.blur}>{start}</Text> {selectedContent}{' '}
                <Text style={styles.blur}>{end}</Text>
              </Text>
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
          {renderCard()}
        </ScrollView>
      </View>
    </Modal>
  );
}

ModalSorting.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedContent: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

ModalSorting.defaultProps = {};

export default connect(states, dispatcher)(ModalSorting);
