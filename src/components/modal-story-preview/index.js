/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
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
import Close from '../../assets/icons/close';
import {addNewCollection, updateMyCollection} from '../../shared/request';
import {moderateScale} from 'react-native-size-matters';
import {navigate} from '../../shared/navigationRef';
import {BACKEND_URL} from '../../shared/static';

function ModalStoryPreview({
  isVisible,
  onClose,
  nextStory,
  handleRead,
  handleLater,
  dataStory,
  readLater = true,
}) {
  const handleClose = () => {
    onClose();
  };

  const story = dataStory ? dataStory : nextStory;

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
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
            <TouchableOpacity
              style={{
                marginLeft: 'auto',
                paddingHorizontal: 14,
                paddingTop: 14,
              }}
              onPress={handleClose}>
              <Close fill="#DDDEE3" height={18} width={18} />
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                borderRadius: moderateScale(24),
              }}>
              <View
                style={{
                  width: '90%',
                  paddingBottom: moderateScale(12),
                  borderBottomColor: '#DDDEE3',
                  borderBottomWidth: 1,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{
                      uri: `${BACKEND_URL}${story?.category?.cover?.url}`,
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
                      {story?.category?.name}
                    </Text>
                    <Text
                      style={{
                        color: code_color.blueDark,
                        marginTop: 10,
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {story?.title_en}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: code_color.blackDark,
                    fontSize: 12,
                    marginTop: moderateScale(16),
                  }}>
                  {story?.content_en?.slice(0, 130)}...
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleRead}
                style={{
                  backgroundColor: '#009A37',
                  marginTop: moderateScale(20),
                  padding: moderateScale(12),
                  alignItems: 'center',
                  borderRadius: 8,
                  width: '90%',
                  marginBottom: moderateScale(20),
                }}>
                <Text
                  style={{
                    color: code_color.white,
                    fontWeight: 500,
                    fontSize: moderateScale(14),
                  }}>
                  Start reading
                </Text>
              </TouchableOpacity>
              {readLater && (
                <TouchableOpacity
                  onPress={handleLater}
                  style={{
                    backgroundColor: '#ED5267',
                    padding: moderateScale(4),
                    alignItems: 'center',
                    borderRadius: 8,
                    width: '90%',
                    marginBottom: moderateScale(20),
                  }}>
                  <Text
                    style={{
                      color: code_color.white,
                      fontWeight: 500,
                      fontSize: moderateScale(14),
                    }}>
                    Read later
                  </Text>
                  <Text
                    style={{
                      color: code_color.white,
                      fontWeight: 400,
                      fontSize: moderateScale(12),
                    }}>
                    You can proceed reading your current story
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalStoryPreview.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dataStory: PropTypes.any,
};

ModalStoryPreview.defaultProps = {};

export default connect(states, dispatcher)(ModalStoryPreview);
