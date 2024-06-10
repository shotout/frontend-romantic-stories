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
import Close from '../../assets/icons/close.jsx';
import ChecklistSvg from '../../assets/icons/checklist';
function ModalGetPremium({isVisible, onClose, onGotIt, userProfile}) {
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
            height: moderateScale(320),
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
            {userProfile?.data?.subscription?.plan?.title}
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
          <View style={{marginTop: 30, width: '90%'}}>
            {userProfile?.data?.subscription?.plan?.notes.map(item => (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 5,
                  marginHorizontal: 10,
                  alignItems: 'center'
                }}>
                <View
                  style={{
                    backgroundColor: item.check
                      ? code_color.green
                      : code_color.red,
                    borderRadius: 30,
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item.check ? (
                    <ChecklistSvg width={13} />
                  ) : (
                    <Close width={13} fill={code_color.white} />
                  )}
                </View>

                <View style={{marginLeft: 10}}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 15}}>
                    {item?.title}
                  </Text>
                  {item?.description ? 
                  <Text style={{fontSize: 12}}>
                    {item?.description}
                  </Text> : null }
                </View>
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
