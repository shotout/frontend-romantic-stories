/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {
  cover1,
  imgLoveLeft,
  imgLoveRight,
  imgUnlockPremium,
} from '../../assets/images';
import LibrarySvg from '../../assets/icons/libraryAdd';
import Reading from '../../assets/icons/reading.jsx';
import {addNewCollection, updateMyCollection} from '../../shared/request';
import {moderateScale} from 'react-native-size-matters';
import {navigate} from '../../shared/navigationRef';
import {BACKEND_URL} from '../../shared/static';

function ModalUnlockStoryDay({
  isVisible,
  onClose,
  nextStory,
  handleRead,
  handleLater,
}) {
  const handleClose = () => {
    onClose();
  };

  const renderPremium = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: code_color.white,
            width: '90%',
            borderRadius: moderateScale(24),
          }}>
          <Image
            source={imgUnlockPremium}
            style={{
              height: 120,
              aspectRatio: '1.7/1',
              alignSelf: 'center',
              marginTop: moderateScale(20),
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(18),
              color: code_color.black,
              fontWeight: 700,
              textAlign: 'center',
              marginTop: moderateScale(25),
              marginBottom: moderateScale(20),
            }}>
            {'New Story unlocked'}
          </Text>

          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#F0F2FF',
              borderRadius: moderateScale(24),
              margin: moderateScale(10),
            }}>
            <View
              style={{
                width: '100%',
                padding: moderateScale(14),
                paddingHorizontal: moderateScale(20),
                borderRadius: moderateScale(8),
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: `${BACKEND_URL}${nextStory?.category?.cover?.url}`,
                  }}
                  resizeMode="contain"
                  style={{
                    width: 65,
                    height: 87,
                    marginRight: moderateScale(10),
                  }}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: '#3F58DD',
                      marginTop: 10,
                      fontWeight: 400,
                      fontSize: 14,
                    }}>
                    {nextStory?.category.name}
                  </Text>
                  <Text
                    style={{
                      color: code_color.blueDark,
                      marginTop: 10,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {nextStory?.title_en}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  color: code_color.blackDark,
                  fontSize: 12,
                  marginTop: moderateScale(16),
                }}>
                {nextStory?.content_en?.substring(0, 100)}...
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(20),
              marginBottom: moderateScale(20),
            }}>
            <TouchableOpacity
              onPress={handleRead}
              style={{
                backgroundColor: '#009A37',
                marginTop: moderateScale(20),
                padding: moderateScale(12),
                alignItems: 'center',
                borderRadius: 8,
                width: '100%',
              }}>
              <Text
                style={{
                  color: code_color.white,
                  fontWeight: 600,
                  fontSize: moderateScale(14),
                }}>
                Start reading
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLater}
              style={{
                backgroundColor: '#ED5267',
                marginTop: moderateScale(20),
                padding: moderateScale(5),
                alignItems: 'center',
                borderRadius: 8,
                width: '100%',
              }}>
              <Text
                style={{
                  color: code_color.white,
                  fontWeight: 600,
                  fontSize: moderateScale(14),
                }}>
                Read Later
              </Text>
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(12),
                }}>
                You can proceed reading your current story
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        {renderPremium()}
      </View>
    </Modal>
  );
}

ModalUnlockStoryDay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalUnlockStoryDay.defaultProps = {};

export default connect(states, dispatcher)(ModalUnlockStoryDay);
