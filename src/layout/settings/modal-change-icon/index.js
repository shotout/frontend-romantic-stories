/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {changeIcon} from 'react-native-change-icon';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../../assets/icons/bottom/backLeft';
import LockFree from '../../../assets/icons/lockFree';
import Checklist from '../../../assets/icons/checklistBG';
import UnlockIcon from '../../../assets/icons/unlockIcon';
import {code_color} from '../../../utils/colors';
import {isIphoneXorAbove} from '../../../utils/devices';
import {moderateScale} from 'react-native-size-matters';
import {
  appIcon1,
  appIcon2,
  appIcon3,
  appIcon4,
  appIcon5,
  appIcon6,
  appIcon7,
  appIcon8,
} from '../../../assets/icons/app-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalUnlockPremium from '../../../components/modal-unlock-premium';

function ModalChangeIcon({isVisible, onClose, isPremium, colorTheme}) {
  const [selectedIcon, setSelectedIcon] = useState(1);
  const [showModalUnlock, setShowModalUnlock] = useState(false);

  const listIcon = [
    {
      id: 1,
      name: 'first',
      icon: appIcon1,
    },
    {
      id: 2,
      name: 'second',
      icon: appIcon2,
    },
    {
      id: 3,
      name: 'third',
      icon: appIcon3,
    },
    {
      id: 4,
      name: 'fourth',
      icon: appIcon4,
    },
    {
      id: 5,
      name: 'first',
      icon: appIcon5,
    },
    {
      id: 6,
      name: 'second',
      icon: appIcon6,
    },
    {
      id: 7,
      name: 'third',
      icon: appIcon7,
    },
    {
      id: 8,
      name: 'fourth',
      icon: appIcon8,
    },
  ];

  const handleChangeIcon = async icon => {
    if (isPremium) {
      changeIcon(icon.name)
        .then(async () => {
          setSelectedIcon(icon.id);
          await AsyncStorage.setItem('customIcon', icon.name);
          // handleSubmit(icon.id);
          // selectModal();
          Alert.alert('Success change icon');
        })
        .catch(e => {
          Alert.alert("Sorry, can't change icon at this time.");
          console.log('Error change icon:', e.message);
        });
    } else {
      setShowModalUnlock(true);
    }
  };

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const header = () => (
    <View
      style={{
        backgroundColor: colorTheme,
        paddingTop: isIphoneXorAbove() ? moderateScale(40) : moderateScale(25),
      }}>
      <ModalUnlockPremium
        isVisible={showModalUnlock}
        onClose={() => setShowModalUnlock(false)}
        title={'Unlock this App Icon\r\nfor free now'}
        desc={
          'Watch a Video to unlock this App Icon for Free or go UNLIMITED to\r\nunlock everything!'
        }
        Icon={() => <UnlockIcon style={{marginBottom: 20}} />}
        onSuccess={() => {
          setShowModalUnlock(false);
          Alert.alert('success');
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 14,
          marginVertical: 20,
        }}>
        <Pressable
          onPress={() => onClose()}
          style={{
            backgroundColor: code_color.white,
            width: 30,
            height: 30,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackLeft width={20} height={20} fill={colorTheme} />
          </View>
        </Pressable>
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.white,
            marginLeft: 15,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Change App Icon
        </Text>
      </View>
    </View>
  );

  const form = () => (
    <View
      style={{
        padding: 25,
        paddingTop: 10,
        height: '100%',
        backgroundColor: code_color.white,
      }}>
      <Text
        style={{
          color: code_color.black,
          fontSize: 17,
          marginTop: 10,
          lineHeight: 24,
          fontWeight: '500',
        }}>
        Select your favorite App Icon for your Home Screen.
      </Text>
      <View
        style={{
          width: '100%',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {listIcon.map((icon, idx) => (
          <Pressable
            style={{width: '24%', aspectRatio: '1/1'}}
            key={idx}
            onPress={() => {
              if (selectedIcon !== icon.id) {
                handleChangeIcon(icon);
              }
            }}>
            <Image
              source={icon.icon}
              style={{
                width: '100%',
                height: '100%',
                margin: 'auto',
              }}
              resizeMode="contain"
            />
            {!isPremium && selectedIcon !== icon.id ? (
              <LockFree
                style={{position: 'absolute', alignSelf: 'center', top: 6}}
              />
            ) : null}
            {selectedIcon === icon.id && (
              <View
                style={{
                  position: 'absolute',
                  height: '97%',
                  width: '100%',
                  borderWidth: 2,
                  borderColor: code_color.splash,
                  borderRadius: 15,
                }}>
                <Checklist
                  height={18}
                  style={{position: 'absolute', top: 5, left: -2}}
                />
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            height: '100%',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          {header()}
          {form()}
        </View>
      </View>
    </Modal>
  );
}

ModalChangeIcon.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalChangeIcon.defaultProps = {};

export default connect(states, dispatcher)(ModalChangeIcon);
