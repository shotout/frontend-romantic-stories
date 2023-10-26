/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {bgGetUnlimit} from '../../assets/images';
import {moderateScale} from 'react-native-size-matters';
import GetUnlimitIcon from '../../assets/icons/getUnlimit';
import CheckIcon from '../../assets/icons/checklist';
import Button from '../buttons/Button';

function ModalGetPremium({isVisible, onClose, onGotIt}) {
  const textList = [
    'UNLIMITED Story to read again and again',
    'Access to Thousands of Stories in Library',
    'UNLIMITED Custom Themes, Fonts and more',
    'Change your character and your partner character anytime',
    'Change Story Genre any time',
    'No ads, no watermarks',
  ];

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: code_color.white,
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'relative',
            backgroundColor: code_color.blueDark,
            borderBottomLeftRadius: moderateScale(100),
            borderBottomRightRadius: moderateScale(100),
            height: moderateScale(350),
            width: '100%',
            overflow: 'hidden',
            alignItems: 'center',
          }}>
          <Image
            source={bgGetUnlimit}
            resizeMode="cover"
            style={{
              position: 'absolute',
              borderBottomLeftRadius: moderateScale(100),
              borderBottomRightRadius: moderateScale(100),
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <Text
            style={{
              marginTop: moderateScale(70),
              color: code_color.white,
              fontWeight: 500,
              fontSize: 20,
            }}>
            You are now part of
          </Text>
          <Text
            style={{
              // marginTop: moderateScale(70),
              color: code_color.white,
              fontWeight: 700,
              fontSize: 25,
            }}>
            EroTales UNLIMITED!
          </Text>
          <GetUnlimitIcon
            style={{position: 'absolute', bottom: 0, width: '100%'}}
          />
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{marginTop: moderateScale(30), width: '90%'}}>
            {textList.map((txt, idx) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: moderateScale(16),
                }}
                key={idx}>
                <View
                  style={{
                    height: 22,
                    width: 22,
                    backgroundColor: '#00B781',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: moderateScale(10),
                  }}>
                  <CheckIcon fill={code_color.white} height={16} width={16} />
                </View>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: moderateScale(14),
                    flex: 1,
                  }}>
                  {txt}
                </Text>
              </View>
            ))}
          </View>
          <Button title={'Got it'} onPress={onGotIt} />
        </View>
      </View>
    </Modal>
  );
}

ModalGetPremium.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onGotIt: PropTypes.func.isRequired,
};

ModalGetPremium.defaultProps = {};

export default connect(states, dispatcher)(ModalGetPremium);
