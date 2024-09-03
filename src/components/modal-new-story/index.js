/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {bgNewStory, bgNewStoryReal, imgLoveLeft, imgLoveRight} from '../../assets/images';
import Button from '../buttons/Button';
import {moderateScale} from 'react-native-size-matters';
import {book} from '../../assets/icons';
import WatchIcon from '../../assets/icons/watch';
import BookLockIcon from '../../assets/icons/bookLock';
import * as IAP from 'react-native-iap';
import {ActivityIndicator} from 'react-native-paper';
import {fixedFontSize, hp, wp} from '../../utils/screen';
import {sizing} from '../../shared/styling';
import Close from '../../assets/icons/close';
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
  useEffect(() => {
    if (!__DEV__) {
      async function getProductPrice() {
        const products = await IAP.getProducts({
          skus: [ Platform.OS === 'ios' ? 'unlock_story_1_week_only' : 'unlock_stories_1week'],
        });

        setPrice(products[0].localizedPrice);
      }
      getProductPrice();
    }
  }, []);
  const touchStartXRef = useRef(null);
  const touchStart = e => {
    touchStartXRef.current = e.nativeEvent.pageX;
  };

  const touchEnd = e => {
    const touchEndX = e.nativeEvent.pageX;
    const distanceX = touchEndX - touchStartXRef.current;
    const minSwipeDistance = 50; // Misalnya, minimal 50 piksel untuk dianggap sebagai swipe

    if (Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        onClose(); // Swipe ke kanan, menutup modal
      }
    }
  };
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View
        //  onTouchStart={touchEndStory}
        //  pointerEvents="box-only"
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScrollView
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
            style={{
              width: sizing.getDimensionWidth(1),
              flex: 1,
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
            }}>
            <View
              style={{
                width: Dimensions.get('screen').width,
                height: hp(
                  Dimensions.get('screen').width > 380
                    ? sizing.getDimensionHeight(0.9)
                    : sizing.getDimensionHeight(1.25),
                ),
              }}>
              <Image
                source={userProfile?.data?.type === 'realistic' ? bgNewStoryReal : bgNewStory}
                resizeMode="contain"
                style={{
                  width: '100%',
                  top: hp(userProfile?.data?.type === 'realistic' ? -30 : -150),
                  maxHeight: sizing.getDimensionHeight(1),
                  // position: 'absolute',
                }}
              />
            </View>
            <Image
              source={imgLoveLeft}
              resizeMode="contain"
              style={{
                width: hp(150),
                height: hp(150),
                position: 'absolute',
                left: hp(-16),
                top: hp(140),
              }}
            />

            <Image
              source={imgLoveRight}
              resizeMode="contain"
              style={{
                width: hp(150),
                height: hp(150),
                position: 'absolute',
                right: hp(-24),
                top: hp(140),
              }}
            />
            {/* <TouchableOpacity
              style={{marginLeft: 'auto', right: 14, top: 50, position: 'absolute'}}
              onPress={handleClose}>
              <Close fill="white" height={18} width={18} />
            </TouchableOpacity> */}
            <View
              style={{
                backgroundColor: code_color.white,
                borderTopLeftRadius: hp(70),
                borderTopRightRadius: hp(70),
                position: 'absolute',
                top: hp(200),
                left: 0,
                width: sizing.getDimensionWidth(1),
                flex: 1,
                height: 'auto',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginTop: hp(30),
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#FFD12F',
                    paddingHorizontal: hp(30),
                    paddingVertical: hp(20),
                    width: '80%',
                    borderRadius: hp(10),
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
                      padding: hp(10),
                      top: hp(-35),
                      alignItems: 'center',
                      borderRadius: hp(15),
                    }}>
                    <Text
                      style={{
                        color: code_color.white,
                        fontSize: moderateScale(12),
                      }}>
                      New Story in...
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: hp(-30)}}>
                    <Image
                      source={book}
                      style={{
                        height: hp(59),
                        width: hp(45),
                        position: 'absolute',
                        left: hp(-48),
                        top: hp(-10),
                      }}
                    />
                    <Text
                      style={{
                        fontSize: moderateScale(40),
                        fontWeight: '700',
                        marginBottom: 0,
                        color: code_color.black,
                        marginLeft: hp(30),
                      }}>
                      {`${timeLeft.hour}h ${timeLeft.minutes}m`}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(20),
                        fontWeight: '700',
                        marginTop: 'auto',
                        color: code_color.black,
                        marginBottom: hp(5),
                        marginLeft: hp(10),
                      }}>
                      {`${timeLeft.second}s`}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: moderateScale(19),
                    marginVertical: hp(15),
                    color: code_color.black,
                  }}>
                  UNLOCK MORE STORIES NOW
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: moderateScale(16),
                    lineHeight: moderateScale(24),
                    textAlign: 'center',
                    maxWidth: '80%',
                    color: code_color.black,
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
                    height: hp(50),
                    paddingVertical: hp(14),
                    borderRadius: hp(6),
                    marginTop: hp(30),
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      marginHorizontal: 'auto',
                      backgroundColor: '#FFD12F',
                      alignSelf: 'center',
                      paddingVertical: hp(0),
                      paddingHorizontal: hp(20),
                      borderRadius: hp(10),
                      zIndex: 1,
                      top: hp(-8),
                    }}>
                    <Text
                      style={{
                        color: code_color.black,
                        fontWeight: 600,
                        fontSize: moderateScale(12),
                      }}>
                      FREE
                    </Text>
                  </View>
                  {loadingAds ? (
                    <ActivityIndicator
                      color={code_color.blueDark}
                      size={hp(16)}
                    />
                  ) : (
                    <>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <WatchIcon
                          style={{
                            position: 'absolute',
                            top: -2,
                            bottom: 0,
                            left: -100,
                            right: 100,
                          }}
                          height={hp(25)}
                          width={hp(25)}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: code_color.white,
                            textAlign: 'center',
                            marginBottom: 0,
                            fontSize: moderateScale(14),
                          }}>
                          Watch 2 Ads
                        </Text>
                      </View>
                    </>
                  )}
                </Pressable>
              
                  <Pressable
                    disabled={isLoading}
                    onPress={() => onUnlock()}
                    style={{
                      backgroundColor: '#009A37',
                      width: '90%',
                      height: hp(45),
                      paddingVertical: hp(14),
                      borderRadius: hp(6),
                      marginTop: hp(30),
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        marginHorizontal: 'auto',
                        backgroundColor: '#FFD12F',
                        alignSelf: 'center',
                        paddingVertical: hp(0),
                        paddingHorizontal: hp(24),
                        borderRadius: hp(10),
                        zIndex: 1,
                        top: -hp(8),
                      }}>
                      <Text
                        style={{
                          color: code_color.black,
                          fontWeight: 600,
                          fontSize: moderateScale(12),
                        }}>
                        MOST SELECTED
                      </Text>
                    </View>
                    {isLoading ? (
                      <ActivityIndicator
                        color={code_color.blueDark}
                        size={hp(16)}
                      />
                    ) : (
                      <Text
                        style={{
                          color: code_color.white,
                          textAlign: 'center',
                          fontSize: moderateScale(14),
                        }}>
                        Unlock 1 more Story directly for {price}
                      </Text>
                    )}
                  </Pressable>
             
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    marginVertical: hp(30),
                    opacity: 0.2,
                  }}>
                  <View
                    style={{
                      backgroundColor: code_color.black,
                      flex: 1,
                      height: 1,
                    }}
                  />
                  <Text
                    style={{
                      marginHorizontal: wp(8),
                      fontSize: moderateScale(14),
                      color: code_color.black,
                    }}>
                    OR
                  </Text>
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
                    paddingVertical: hp(14),
                    borderRadius: hp(6),
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      marginHorizontal: 'auto',
                      backgroundColor: '#FFD12F',
                      alignSelf: 'center',
                      paddingVertical: hp(0),
                      paddingHorizontal: hp(24),
                      borderRadius: hp(10),
                      zIndex: 1,
                      top: -hp(8),
                    }}>
                    <Text
                      style={{
                        color: code_color.black,
                        fontWeight: 600,
                        fontSize: moderateScale(12),
                      }}>
                      UNLOCK EVERYTHING
                    </Text>
                  </View>
                  <BookLockIcon
                    style={{position: 'absolute', top: '70%', left: '12%'}}
                    height={hp(25)}
                    width={hp(25)}
                  />
                  <Text
                    style={{
                      color: code_color.white,
                      textAlign: 'center',
                      fontSize: moderateScale(14),
                    }}>
                    Get EroTales UNLIMITED
                  </Text>
                </Pressable>
              </View>

              {/* <Button
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
              /> */}
            </View>
          </ScrollView>
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
