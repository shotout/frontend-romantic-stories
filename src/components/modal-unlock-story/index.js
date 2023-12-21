/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import BookLockIcon from '../../assets/icons/bookLock';
import LockFree from '../../assets/icons/lockFree';
import CloseSvg from '../../assets/icons/close';
import {BACKEND_URL} from '../../shared/static';
import { ActivityIndicator } from 'react-native-paper';

function ModalUnlockStory({
  isVisible,
  onClose,
  data,
  onWatchAds,
  onUnlock,
  onGetUnlimit,
  price,
  isLoading
}) {
  const handleClose = () => {
    onClose();
  };
 
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
              paddingHorizontal: moderateScale(12),
              paddingBottom: moderateScale(14),
            }}>
            <Pressable
              onPress={() => handleClose()}
              style={{alignItems: 'flex-end', marginTop: 20}}>
              <CloseSvg width={15} height={15} fill={code_color.black} />
            </Pressable>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 80,
                  marginRight: 16,
                  marginLeft: moderateScale(10),
                }}>
                {data?.is_free === 0 && (
                  <LockFree
                    height={20}
                    width={60}
                    style={{
                      marginBottom: -24,
                      marginTop: 8,
                      marginLeft: 4,
                      zIndex: 1,
                    }}
                  />
                )}
                <Image
                  source={{
                    uri: `${BACKEND_URL}${data?.category?.cover?.url}`,
                  }}
                  resizeMode="cover"
                  style={{height: 130, width: 95, borderRadius: 6}}
                />
              </View>
              <View
                style={{
                  marginLeft: moderateScale(10),
                  width: 200
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: '#3F58DD',
                    marginBottom: moderateScale(10),
                    marginTop: moderateScale(6),
                  }}>
                  {data?.category?.name}
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: '700', color: '#5873FF'}}>
                  {data?.title_en}
                </Text>
              </View>
            </View>
            <Text
              style={{
                marginHorizontal: moderateScale(10),
                color: '#505962',
                marginTop: moderateScale(20),
              }}>
              { data?.content_en[0].length  === 1 ? data?.content_en?.slice(0, 180) + '...' : data?.content_en[0]?.slice(0, 180) + '...'  }
            </Text>
            <View
              style={{
                height: 1,
                marginVertical: moderateScale(16),
                marginHorizontal: moderateScale(10),
                backgroundColor: '#DDDEE3',
              }}
            />
            <Text
              allowFontScaling={false}
              style={{
                fontSize: moderateScale(14),
                color: code_color.black,
                marginBottom: moderateScale(24),
                marginLeft: moderateScale(10),
              }}>
              {'To unlock this story, choose one of the\r\nfollowing options:'}
            </Text>
            {Platform.OS === 'android' ? null :
            <Pressable
              disabled={isLoading}
              onPress={onUnlock}
              style={{
                backgroundColor: code_color.green,
                marginHorizontal: moderateScale(10),
                marginBottom: moderateScale(6),
                paddingVertical: moderateScale(14),
                borderRadius: moderateScale(6),
              }}>
              <View
                style={{
                  position: 'absolute',
                  marginHorizontal: 'auto',
                  backgroundColor: '#FFD12F',
                  alignSelf: 'center',
                  paddingVertical: moderateScale(0),
                  paddingHorizontal: moderateScale(24),
                  borderRadius: moderateScale(10),
                  zIndex: 1,
                  top: -moderateScale(8),
                }}>
                <Text style={{color: code_color.black, fontWeight: 600}}>
                  MOST SELECTED
                </Text>
              </View>
              {isLoading ? <ActivityIndicator color={code_color.blueDark} /> :
              <Text style={{color: code_color.white, textAlign: 'center'}}>
                {price} for 1 week access
              </Text> }
            </Pressable> }
            <Pressable
              onPress={onWatchAds}
              style={{
                backgroundColor: code_color.red,
                marginHorizontal: moderateScale(10),
                paddingVertical: moderateScale(14),
                borderRadius: moderateScale(6),
                marginBottom: 0,
                marginTop: moderateVerticalScale(20),
              }}>
              <View
                style={{
                  position: 'absolute',
                  marginHorizontal: 'auto',
                  backgroundColor: '#FFD12F',
                  alignSelf: 'center',
                  paddingVertical: moderateScale(0),
                  paddingHorizontal: moderateScale(24),
                  borderRadius: moderateScale(10),
                  zIndex: 1,
                  top: -moderateScale(8),
                }}>
                <Text style={{color: code_color.black, fontWeight: 600}}>
                  FREE
                </Text>
              </View>
              <Text style={{color: code_color.white, textAlign: 'center'}}>
                Watch Ad for 12 hours Access
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: moderateScale(10),
                alignItems: 'center',
                marginVertical: moderateScale(20),
                opacity: 0.2,
              }}>
              <View
                style={{
                  backgroundColor: code_color.black,
                  flex: 1,
                  height: 1,
                }}
              />
              <Text style={{marginHorizontal: moderateScale(8)}}>OR</Text>
              <View
                style={{
                  backgroundColor: code_color.black,
                  flex: 1,
                  height: 1,
                }}
              />
            </View>
            <Pressable
              onPress={onGetUnlimit}
              style={{
                backgroundColor: '#ADC3D2',
                // width: '90%',
                marginHorizontal: moderateScale(10),
                marginBottom: moderateScale(10),
                paddingVertical: moderateScale(14),
                borderRadius: moderateScale(6),
              }}>
              <View
                style={{
                  position: 'absolute',
                  marginHorizontal: 'auto',
                  backgroundColor: '#FFD12F',
                  alignSelf: 'center',
                  paddingVertical: moderateScale(0),
                  paddingHorizontal: moderateScale(24),
                  borderRadius: moderateScale(10),
                  zIndex: 1,
                  top: -moderateScale(8),
                }}>
                <Text style={{color: code_color.black, fontWeight: 600}}>
                  UNLOCK EVERYTHING
                </Text>
              </View>
              <BookLockIcon
                style={{position: 'absolute', top: '70%', left: '12%'}}
              />
              <Text style={{color: code_color.white, textAlign: 'center'}}>
                Get EroTales UNLIMITED
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalUnlockStory.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalUnlockStory.defaultProps = {};

export default connect(states, dispatcher)(ModalUnlockStory);
