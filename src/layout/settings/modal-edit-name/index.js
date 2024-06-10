/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Modal, View, Text, Pressable, TextInput} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../../assets/icons/bottom/backLeft';
import {code_color} from '../../../utils/colors';
import Button from '../../../components/buttons/Button';
import {updateProfile} from '../../../shared/request';
import {reloadUserProfile} from '../../../utils/user';
import {isIphoneXorAbove} from '../../../utils/devices';
import {moderateScale} from 'react-native-size-matters';
import { hp } from '../../../utils/screen';

function ModalEditName({isVisible, onClose, userProfile, colorTheme, backgroundColor}) {
  const [name, setName] = useState(userProfile.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        name: name,
        _method: 'PATCH',
      };
      await updateProfile(payload);
      reloadUserProfile();
      setLoading(false);
      handleClose();
    } catch (err) {
      setLoading(false);
      console.log('Error select:', err);
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: hp(14),
          marginVertical: hp(20),
        }}>
        <Pressable
          onPress={() => onClose()}
          style={{
            backgroundColor: backgroundColor === '#2C3439' ? 'white' : 'white',
            width: hp(30),
            height: hp(30),
            borderRadius: hp(20),
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
            color: backgroundColor === '#2C3439' ? 'white' : 'white',
            marginLeft: 15,
            fontSize: moderateScale(18),
            fontWeight: 'bold',
          }}>
          Edit name
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
          color: code_color.blueDark,
          fontSize: moderateScale(36),
          textAlign: 'center',
          fontFamily: 'Comfortaa-SemiBold',
          marginTop: hp(40),
          lineHeight: 50,
        }}>
        What’s your name?
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: moderateScale(16),
          fontWeight: '400',
          lineHeight: 22,
          marginTop: hp(30),
          color: code_color.blackDark,
        }}>
        Using your real name creates a
        <Text style={{color: code_color.splash, fontWeight: 700}}>
          {' '}
          better experience{' '}
        </Text>
        with the story.
      </Text>
      <TextInput
        allowFontScaling={false}
        style={{
          borderColor: code_color.blueDark,
          color: code_color.blackDark,
          borderWidth: hp(2),
          borderRadius: hp(6),
          padding: hp(12),
          marginTop: hp(30),
          marginBottom: hp(40),
          fontSize: moderateScale(14)
        }}
        placeholderTextColor={code_color.blackDark}
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Your name"
      />
      <Button
        style={{
          backgroundColor: code_color.yellow,
          alignItems: 'center',
          justifyContent: 'center',
          height: hp(52),
          borderRadius: hp(10),
          width: '100%',
          marginTop: hp(10),
          marginBottom: hp(10),
          opacity: loading ? 0.5 : 1,
        }}
        onPress={handleSubmit}
        title={loading ? 'Loading...' : 'Save'}
      />
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

ModalEditName.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalEditName.defaultProps = {};

export default connect(states, dispatcher)(ModalEditName);
