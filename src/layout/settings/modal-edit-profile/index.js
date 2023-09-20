/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../../assets/icons/bottom/backLeft';
import {code_color} from '../../../utils/colors';
import IdCardSvg from '../../../assets/icons/idCard';
import GenderSvg from '../../../assets/icons/gender';
import ProfileSvg from '../../../assets/icons/profile';
import PartnerSvg from '../../../assets/icons/partner';
import FlagSvg from '../../../assets/icons/flag';
import {ava1, avam1} from '../../../assets/images';

function ModalEditProfile({isVisible, onClose, handleOpenModal}) {
  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleClick = tab => {
    if (typeof handleOpenModal === 'function') {
      handleOpenModal(tab);
    }
  };

  const header = () => (
    <View
      style={{
        backgroundColor: code_color.blueDark,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
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
            <BackLeft width={20} height={20} fill={code_color.blueDark} />
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
          Edit Profile
        </Text>
      </View>
    </View>
  );

  const menuEditList = [
    {
      title: 'Edit Name',
      icon: <IdCardSvg width={24} height={24} />,
      value: 'John Smith',
    },
    {
      title: 'Gender',
      icon: <GenderSvg width={24} height={24} fill={code_color.black} />,
      value: 'Male',
    },
    {
      title: 'Select your character',
      icon: <ProfileSvg width={22} height={22} />,
      value: ava1,
    },
    {
      title: 'Select partner character',
      icon: <PartnerSvg width={20} height={20} />,
      value: avam1,
    },
    {
      title: 'Select language',
      icon: <FlagSvg width={24} height={24} />,
      value: 'English',
    },
  ];

  const form = () => (
    <View
      style={{
        padding: 25,
        paddingTop: 10,
        height: '100%',
        backgroundColor: code_color.white,
      }}>
      {menuEditList.map((edit, i) => (
        <View key={i}>
          <TouchableOpacity
            onPress={() => handleClick(edit.title)}
            style={{flexDirection: 'row', alignItems: 'center', height: 70}}>
            {edit.icon}
            <Text
              style={{
                color: code_color.black,
                marginLeft: 10,
                fontSize: 16,
                fontWeight: '600',
              }}>
              {edit.title}
            </Text>
            {edit.title.includes('character') ? (
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 'auto',
                  backgroundColor: code_color.yellow,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                <Image
                  source={edit.value}
                  style={{
                    width: 40,
                    height: 150,
                    position: 'absolute',
                    top: 0,
                  }}
                />
              </View>
            ) : (
              <Text
                style={{
                  color: code_color.black,
                  marginLeft: 'auto',
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                {edit.value}
              </Text>
            )}
          </TouchableOpacity>
          {i !== menuEditList.length - 1 && (
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: code_color.greyDefault,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            height: '60%',
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

ModalEditProfile.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};

ModalEditProfile.defaultProps = {};

export default connect(states, dispatcher)(ModalEditProfile);
