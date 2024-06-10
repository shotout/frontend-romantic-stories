/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Modal, View, Text, Pressable, Image, Alert} from 'react-native';
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
  appIconFirst,
  appIconSecond,
  appIconThird,
  appIconFourth,
  appIconFifth,
  appIconSixth,
  appIconSeventh,
  appIconDefault,
} from '../../../assets/icons/app-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalUnlockPremium from '../../../components/modal-unlock-premium';
import {loadRewardedAppIcon} from '../../../helpers/loadReward';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';
import { hp } from '../../../utils/screen';

function ModalChangeIcon({
  isVisible,
  onClose,
  isPremium,
  colorTheme,
  backgroundColor,
}) {
  const [selectIcon, setSelectIcon] = useState('first');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [showModalUnlock, setShowModalUnlock] = useState(false);
  const [loadingAds, setLoadingAds] = useState(false);

  useEffect(() => {
    const getCustomIcon = async () => {
      const icon = await AsyncStorage.getItem('customIcon');
      return icon;
    };
    getCustomIcon().then(icon => {
      if (icon) {
        setSelectIcon(icon);
      }
    });
  }, [isVisible]);

  const listIcon = [
    {
      id: 1,
      name: 'first',
      icon: appIconFirst,
    },
    {
      id: 2,
      name: 'second',
      icon: appIconSecond,
    },
    {
      id: 3,
      name: 'third',
      icon: appIconThird,
    },
    {
      id: 4,
      name: 'fourth',
      icon: appIconFourth,
    },
    {
      id: 5,
      name: 'fifth',
      icon: appIconFifth,
    },
    {
      id: 6,
      name: 'sixth',
      icon: appIconSixth,
    },
    {
      id: 7,
      name: 'seventh',
      icon: appIconSeventh,
    },
    {
      id: 8,
      name: 'default',
      icon: appIconDefault,
    },
  ];

  const handleChangeIcon = async icon => {
    const iconName = icon?.name ? icon.name : selectedIcon;
    console.log(iconName)
    changeIcon(iconName)
      .then(async () => {
        setSelectIcon(iconName);
        await AsyncStorage.setItem('customIcon', iconName);
        // handleSubmit(icon.id);
        // selectModal();
        // Alert.alert('Success change icon');
      })
      .catch(e => {
        Alert.alert("Sorry, can't change icon at this time.");
        console.log('Error change icon:', e.message);
      });
    setSelectedIcon('');
    setTimeout(() => {
      setShowModalUnlock(false);
    }, 1000);
  };

  const showIntersialAppIcon = async () => {
    setLoadingAds(true);
    const advert = await loadRewardedAppIcon();
    const pageCountDownReward = advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('Earn page countdown reward:', reward);
        if (reward) {
          setShowModalUnlock(false);
          setTimeout(() => {
            handleChangeIcon(null);
          }, 500);
        }
        setLoadingAds(false);
      },
    );
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
        // onSuccess={() => handleChangeIcon(null)}
        onSuccess={() => showIntersialAppIcon()}
        isLoadingAds={loadingAds}
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
            backgroundColor: 'white',
            width: hp(30),
            height: hp(30),
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackLeft width={hp(20)} height={hp(20)} fill={colorTheme} />
          </View>
        </Pressable>
        <Text
          allowFontScaling={false}
          style={{
            color: 'white',
            marginLeft: 15,
            fontSize: moderateScale(18),
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
        padding: hp(25),
        paddingTop: hp(10),
        height: '100%',
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          color: code_color.blackDark,
          fontSize: moderateScale(17),
          marginTop: hp(10),
          lineHeight: 24,
          fontWeight: '500',
          marginBottom: hp(10),
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
            style={{
              width: '25%',
              aspectRatio: '1/1',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 1,
            }}
            key={idx}
            onPress={() => {
              if (selectIcon !== icon.name) {
                if (isPremium) {
                  handleChangeIcon(icon);
                } else {
                  setSelectedIcon(icon.name);
                  setShowModalUnlock(true);
                }
              }
            }}>
            <Image
              source={icon.icon}
              style={{
                width: '90%',
                height: '90%',
                margin: '10%',
              }}
              resizeMode="contain"
            />
            {!isPremium && selectIcon !== icon.name ? (
              <LockFree
                width={hp(60)}
                height={hp(20)}
                style={{position: 'absolute', alignSelf: 'center', top: hp(8)}}
              />
            ) : null}
            {selectIcon === icon.name && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  borderWidth: hp(2),
                  borderColor: code_color.splash,
                  borderRadius: hp(15),
                }}>
                <Checklist
                  height={hp(18)}
                  style={{position: 'absolute', top: 7, left: -2}}
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
