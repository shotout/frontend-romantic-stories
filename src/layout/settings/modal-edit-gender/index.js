/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Modal, TouchableOpacity, View, Text, Pressable} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../../assets/icons/bottom/backLeft';
import {code_color} from '../../../utils/colors';
import Button from '../../../components/buttons/Button';
import Register1 from '../../../layout/register/register1';
import {updateProfile} from '../../../shared/request';
import {reloadUserProfile} from '../../../utils/user';

function ModalEditGender({isVisible, onClose, colorTheme, userProfile}) {
  const [gender, setGender] = useState(userProfile.gender);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        gender: gender,
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
      }}>
      <View style={{height: 30}} />
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
          Select Gender
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
          color: code_color.blueDark,
          fontSize: 36,
          textAlign: 'center',
          fontFamily: 'Comfortaa-SemiBold',
          marginTop: 40,
          lineHeight: 50,
        }}>
        What’s your gender?
      </Text>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <Register1
          setGender={data => setGender(data)}
          selectedGender={gender}
        />
      </View>
      <TouchableOpacity onPress={onClose}>
        <Text
          style={{
            color: code_color.grey,
            fontWeight: 400,
            fontSize: 18,
            textAlign: 'center',
            marginVertical: 20,
          }}>
          Prefer not to say
        </Text>
      </TouchableOpacity>
      <Button
        style={{
          backgroundColor: code_color.yellow,
          alignItems: 'center',
          justifyContent: 'center',
          height: 52,
          borderRadius: 10,
          width: '100%',
          marginTop: 10,
          marginBottom: 10,
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

ModalEditGender.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalEditGender.defaultProps = {};

export default connect(states, dispatcher)(ModalEditGender);
