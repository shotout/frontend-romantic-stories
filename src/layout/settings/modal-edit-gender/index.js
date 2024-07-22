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
import {isIphoneXorAbove} from '../../../utils/devices';
import {moderateScale} from 'react-native-size-matters';
import { hp } from '../../../utils/screen';

function ModalEditGender({isVisible, onClose, colorTheme, userProfile, backgroundColor}) {
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
            backgroundColor: 'white',
            width: hp(30),
            height: hp(30),
            borderRadius: hp(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackLeft width={hp(20)} height={hp(20)}  />
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
          Select Gender
        </Text>
      </View>
    </View>
  );

  const form = () => (
    <View
      style={{
        padding: hp(25),
        paddingTop: moderateScale(5),
        height: '100%',
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          color: code_color.blueDark,
          fontSize: moderateScale(30),
          textAlign: 'center',
          fontFamily: 'Comfortaa-SemiBold',
          marginTop: moderateScale(20),
          lineHeight: 50,
        }}>
        What’s your gender?
      </Text>
      <View style={{alignItems: 'center', marginTop: moderateScale(25)}}>
        <Register1
          setGender={data => setGender(data)}
          selectedGender={gender}
          setType={userProfile?.type}
        />
      </View>
      <TouchableOpacity onPress={() => setGender(null)}>
        <Text
          style={{
            color: backgroundColor != '#2C3439' && gender === null ?  '#5873FF' : backgroundColor != '#2C3439' && gender != null ?  code_color.blackDark :  backgroundColor === '#2C3439' && gender != null ?  'white' :  backgroundColor === '#2C3439' && gender === null ?  '#5873FF' : code_color.blackDark,
            fontWeight: '400',
            fontSize: moderateScale(17),
            textAlign: 'center',
            textDecorationLine: gender === null ? 'underline' : null,
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
          height: moderateScale(45),
          borderRadius: 10,
          width: '100%',
          marginTop: moderateScale(7),
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
