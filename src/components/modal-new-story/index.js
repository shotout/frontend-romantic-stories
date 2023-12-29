/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {bgNewStory, imgLoveLeft, imgLoveRight} from '../../assets/images';
import Button from '../buttons/Button';
import {moderateScale} from 'react-native-size-matters';
import {book} from '../../assets/icons';
import WatchIcon from '../../assets/icons/watch';
import BookLockIcon from '../../assets/icons/bookLock';
import * as IAP from 'react-native-iap';
import {ActivityIndicator} from 'react-native-paper';
import { fixedFontSize, hp, wp } from '../../utils/screen';
function ModalNewStory({
  isVisible,
  onClose,
  onWatchAds,
  onUnlock,
  onGetUnlimit,
  userProfile,
  isLoading,
  loadingAds,
}) {
  const [price, setPrice] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    hour: 0,
    minutes: 0,
    second: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );
      const timeUntilTomorrow = tomorrow - now;
      const hours = Math.floor(timeUntilTomorrow / (1000 * 60 * 60));
      const minutes = Math.floor((timeUntilTomorrow / (1000 * 60)) % 60);
      const seconds = Math.floor((timeUntilTomorrow / 1000) % 60);
      setTimeLeft({
        hour: hours,
        minutes,
        second: seconds,
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    onClose();
  };
  useEffect(async () => {
    const products = await IAP.getProducts({
      skus: ['unlock_story_1_week_only'],
    });
    console.log('Products:', products);
    setPrice(products[0].localizedPrice);
  }, []);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: code_color.white,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              borderRadius: 10,
              height: '100%',
            }}>
            <View style={{backgroundColor: code_color.blueDark, flex: 1}}>
              <View style={{flex: 1, backgroundColor: code_color.blueDark}}>
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      width: Dimensions.get('screen').width,
                    }}>
                    <Image
                      source={bgNewStory}
                      resizeMode="contain"
                      style={{
                        width: '100%',
                        top: wp(-300),
                        position: 'absolute',
                      }}
                    />
                  </View>
                  <Image
                    source={imgLoveLeft}
                    resizeMode="contain"
                    style={{
                      width: wp(150),
                      height: hp(150),
                      position: 'absolute',
                      left: -20,
                      top: wp(150),
                    }}
                  />

                  <Image
                    source={imgLoveRight}
                    resizeMode="contain"
                    style={{
                      width: wp(150),
                      height: hp(150),
                      position: 'absolute',
                      right: -20,
                      top: wp(150),
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: code_color.white,
                borderTopLeftRadius: wp(70),
                borderTopRightRadius: wp(70),
                position: 'absolute',
                top: '25%',
                left: 0,
                width: '100%',
                flex: 1,
                height: '100%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginTop: wp(30),
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#FFD12F',
                    paddingHorizontal: wp(30),
                    paddingVertical: wp(20),
                    width: '80%',
                    borderRadius: wp(10),
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                  }}>
                  <View
                    style={{
                      backgroundColor: code_color.blueDark,
                      padding: wp(10),
                      top: wp(-35),
                      alignItems: 'center',
                      borderRadius: wp(15),
                    }}>
                    <Text style={{color: code_color.white}}>
                      New Story in...
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: wp(-30)}}>
                    <Image
                      source={book}
                      style={{
                        height: hp(59),
                        width: wp(45),
                        position: 'absolute',
                        left: -48,
                        top: -10,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: fixedFontSize(40),
                        fontWeight: "700",
                        marginBottom: 0,
                        marginLeft: wp(30),
                      }}>
                      {`${timeLeft.hour}h ${timeLeft.minutes}m`}
                    </Text>
                    <Text
                      style={{
                        fontSize: fixedFontSize(20),
                        fontWeight: "700",
                        marginTop: 'auto',
                        marginBottom: wp(5),
                        marginLeft: wp(10),
                      }}>
                      {`${timeLeft.second}s`}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: fixedFontSize(19),
                    marginVertical: wp(15),
                  }}>
                  UNLOCK MORE STORIES NOW
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: fixedFontSize(16),
                    lineHeight: moderateScale(24),
                    textAlign: 'center',
                    maxWidth: '80%',
                    opacity: 0.8,
                  }}>
                  Don’t stop there. Watch 2 short Videos to read another Story
                  directly for free and without waiting or get EroTales
                  UNLIMITED to unlock everything.
                </Text>
             
                <Pressable
                  disabled={loadingAds}
                  onPress={onWatchAds}
                  style={{
                    backgroundColor: '#ED5267',
                    width: '90%',
                    height: 50,
                    paddingVertical: wp(14),
                    borderRadius: wp(6),
                    marginTop: wp(30),
                    alignItems: 'center'
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      marginHorizontal: 'auto',
                      backgroundColor: '#FFD12F',
                      alignSelf: 'center',
                      paddingVertical: wp(0),
                      paddingHorizontal: wp(20),
                      borderRadius: wp(10),
                      zIndex: 1,
                      top: wp(-8),
                    }}>
                    <Text style={{color: code_color.black, fontWeight: 600}}>
                      FREE
                    </Text>
                  </View>
                  {loadingAds ? (
                    <ActivityIndicator color={code_color.blueDark} size={14} />
                  ) : (
                    <>
                      <WatchIcon
                        style={{position: 'absolute', top: '80%', left: '22%'}}
                      />
                      <Text
                        style={{color: code_color.white, textAlign: 'center'}}>
                        Watch 2 Ads
                      </Text>
                    </>
                  )}
                </Pressable>
                {Platform.OS === 'android' ? null : (
                  <Pressable
                    disabled={isLoading}
                    onPress={() => onUnlock()}
                    style={{
                      backgroundColor: '#009A37',
                      width: '90%',
                      height: hp(50),
                      paddingVertical: wp(14),
                      borderRadius: wp(6),
                      marginTop: wp(30),
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        marginHorizontal: 'auto',
                        backgroundColor: '#FFD12F',
                        alignSelf: 'center',
                        paddingVertical: wp(0),
                        paddingHorizontal: wp(24),
                        borderRadius: wp(10),
                        zIndex: 1,
                        top: -wp(8),
                      }}>
                      <Text style={{color: code_color.black, fontWeight: 600}}>
                        MOST SELECTED
                      </Text>
                    </View>
                    {isLoading ? (
                      <ActivityIndicator color={code_color.blueDark} size={14} />
                    ) : (
                      <Text
                        style={{color: code_color.white, textAlign: 'center'}}>
                        Unlock 1 more Story directly for {price}
                      </Text>
                    )}
                  </Pressable>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    marginVertical: wp(30),
                    opacity: 0.2,
                  }}>
                  <View
                    style={{
                      backgroundColor: code_color.black,
                      flex: 1,
                      height: 1,
                    }}
                  />
                  <Text style={{marginHorizontal: wp(8)}}>OR</Text>
                  <View
                    style={{
                      backgroundColor: code_color.black,
                      flex: 1,
                      height: 1,
                    }}
                  />
                </View>
                <Pressable
                  onPress={() => onGetUnlimit()}
                  style={{
                    backgroundColor: '#ADC3D2',
                    width: '90%',
                    paddingVertical: wp(14),
                    borderRadius: wp(6),
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      marginHorizontal: 'auto',
                      backgroundColor: '#FFD12F',
                      alignSelf: 'center',
                      paddingVertical: wp(0),
                      paddingHorizontal: wp(24),
                      borderRadius: wp(10),
                      zIndex: 1,
                      top: -wp(8),
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

              <Button
                title={'Got it'}
                style={{
                  backgroundColor: code_color.yellow,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // height: 52,
                  padding: wp(10),
                  borderRadius: 8,
                  width: '90%',
                  marginTop: wp(20),
                }}
                onPress={() => onClose()}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalNewStory.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onWatchAds: PropTypes.func,
  onUnlock: PropTypes.func,
  onGetUnlimit: PropTypes.func.isRequired,
};

ModalNewStory.defaultProps = {};

export default connect(states, dispatcher)(ModalNewStory);
