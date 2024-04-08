/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {
  imgAvaXp,
  imgGift1,
  imgGift2,
  imgInfo,
  imgLoveLeft,
  imgLoveRight,
  imgStar,
} from '../../assets/images';
import Button from '../buttons/Button';
import CloseSvg from '../../assets/icons/close';
import ProgressBar from '../progress';
import {BACKEND_URL} from '../../shared/static';
import {moderateScale} from 'react-native-size-matters';
import AnimatedLottieView from 'lottie-react-native';
import {getLeveling} from '../../shared/request';
import * as Progress from 'react-native-progress';
import {sizing} from '../../shared/styling';
import {fixedFontSize, hp, wp} from '../../utils/screen';
const badgeAnimate = require('../../assets/lottie/badge.json');
const starAnimate = require('../../assets/lottie/stars.json');
const confettiAnimate = require('../../assets/lottie/confetti.json');

function ModalCongrats({
  isVisible,
  onClose,
  onGotIt,
  userProfile,
  levelingUser,
  colorTheme,
  getAvatarMale,
  pastLevel,
}) {
  const [leveling, setLeveling] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const scrollViewRef = useRef(null);
  const scrollViewRefRight = useRef(null);
  const scrollViewRefPopup = useRef(null);
  const currentLevel = userProfile?.data?.user_level?.level?.id;
  const newLevel = levelingUser?.user_level?.level?.id;
  const currentXp = userProfile?.data?.user_level?.point;
  const newXp = levelingUser?.user_level?.point;
  const currentImgLvl = userProfile?.data?.user_level?.level?.image?.url;
  const newImgLvl = levelingUser?.user_level?.level?.image?.url;
  const [imgPopup, setImgPopup] = useState(currentImgLvl);
  const [lottieStart, setLottieStart] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const fetchLeveling = async () => {
    const resp = await getLeveling();
    setLeveling(resp?.data);
  };

  useEffect(() => {
    fetchLeveling();
  }, []);
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  };
  const scrollToBottomRight = () => {
    scrollViewRefRight.current?.scrollToEnd({animated: true});
  };
  const scrollToBottomPopup = () => {
    scrollViewRefPopup.current?.scrollToEnd({animated: true});
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        scrollToBottom();
      }, 2000);
      setTimeout(() => {
        scrollToBottomRight();
      }, 2500);
      setTimeout(() => {
        if (newLevel !== currentLevel) {
          setShowPopup(true);
        }
      }, 3000);
      setTimeout(() => {
        scrollToBottomPopup();
        setLottieStart(true);
        setImgPopup(newImgLvl);
      }, 5000);
      setTimeout(() => {
        setLottieStart(false);
      }, 5500);
    } else {
      setImgPopup(currentImgLvl);
    }
  }, [isVisible]);

  const renderIconTopCard = () => {
    return (
      <>
        <Image
          source={imgGift1}
          resizeMode="contain"
          style={{
            width: hp(90),
            height: hp(90),
            position: 'absolute',
            left: hp(70),
            bottom: hp(80),
          }}
        />
        <Image
          source={imgGift2}
          resizeMode="contain"
          style={{
            width: hp(75),
            height: hp(75),
            position: 'absolute',
            right: hp(73),
            bottom: hp(85),
          }}
        />
        <View
          style={{
            backgroundColor: code_color.blueDark,
            padding: hp(10),
            position: 'absolute',
            top: -15,
            left: sizing.getDimensionWidth(0.45) - hp(100),
            justifyContent: 'center',
            alignItems: 'center',
            width: hp(200),
            borderRadius: hp(15),
          }}>
          <Text
            style={{
              color: code_color.white,
              fontWeight: 'bold',
              fontSize: fixedFontSize(13),
            }}>
            {userProfile?.data?.name ? userProfile?.data?.name : ''}
          </Text>
        </View>
        <View
          style={{
            width: hp(80),
            height: hp(80),
            borderRadius: hp(100),
            // marginLeft: '20',
            backgroundColor: code_color.yellow,
            position: 'absolute',
            overflow: 'hidden',
            alignItems: 'center',
            right: '43%',
            bottom: hp(90),
            borderColor: code_color.blueDark,
            borderWidth: hp(5),
          }}>
          <Image
            source={{
              uri: BACKEND_URL + getAvatarMale,
            }}
            style={{
              width: hp(80),
              height: hp(
                getAvatarMale === '/assets/images/avatars/2.png'
                  ? 350
                  : getAvatarMale === '/assets/images/avatars/3.png' ||
                    getAvatarMale === '/assets/images/avatars/4.png'
                  ? 350
                  : getAvatarMale === '/assets/images/avatars/1.png'
                  ? 280
                  : 250,
              ),
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: hp(
                getAvatarMale === '/assets/images/avatars/1.png'
                  ? 5
                  : getAvatarMale === '/assets/images/avatars/6.png'
                  ? 5
                  : getAvatarMale === '/assets/images/avatars/4.png'
                  ? 5
                  : 0,
              ),
              right:
                getAvatarMale === '/assets/images/avatars/5.png'
                  ? -15
                  : getAvatarMale === '/assets/images/avatars/3.png'
                  ? -3
                  : getAvatarMale === '/assets/images/avatars/1.png'
                  ? 2
                  : getAvatarMale === '/assets/images/avatars/2.png'
                  ? -5
                  : getAvatarMale === '/assets/images/avatars/6.png'
                  ? -4
                  : 0,
            }}
          />
        </View>

        {/* <Image
          source={{ uri: BACKEND_URL + getAvatarMale}}
          resizeMode="contain"
          style={{
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: '0%',
            top: 3,
            bottom: 100,
            borderRadius: 100,
            borderColor: code_color.blueDark,
            borderWidth: 5,
            right: getAvatarMale === '/assets/images/avatars/5.png' ? -7 : 0,
          }}
          // style={{
          //   width: 80,
          //   height: 80,
          //   position: 'absolute',
          //   right: '49%',
          //   bottom: 100,
          //   borderRadius: 100,
          //   borderColor: code_color.blueDark,
          //   borderWidth: 5,
          // }}
        /> */}
      </>
    );
  };

  const renderPopup = () => (
    <Animatable.View
      animation="fadeIn"
      duration={500}
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.8)',
        height: sizing.getDimensionHeight(1),
        width: sizing.getDimensionWidth(1),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{position: 'relative', overflow: 'hidden'}}>
        <Animatable.Text
          animation="fadeInUp"
          style={{
            fontSize: fixedFontSize(24),
            fontWeight: '700',
            color: code_color.white,
            textAlign: 'center',
          }}>
          {'Congratulations,\r\nyou leveled up!'}
        </Animatable.Text>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
        <Animatable.Image
          duration={0}
          delay={0}
          animation="fadeInUpBig"
          source={{
            uri: `${BACKEND_URL}${imgPopup}`,
          }}
          resizeMode="contain"
          style={{
            width: sizing.getDimensionWidth(0.3),
            height: sizing.getDimensionWidth(0.3),
            marginVertical: moderateScale(50),
          }}
        />
        <Animatable.View
          duration={200}
          animation="fadeOut"
          delay={3000}
          style={{
            width: sizing.getDimensionWidth(1),
            height: hp(200),
            position: 'absolute',
          }}>
          <AnimatedLottieView
            source={confettiAnimate}
            style={{
              alignSelf: 'center',
            }}
            autoPlay={lottieStart}
            duration={1000}
            loop={false}
          />
        </Animatable.View>
      </View>
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          marginTop: wp(50),
        }}>
        <Animatable.View
          animation="fadeInUp"
          style={{
            width: sizing.getDimensionWidth(0.5),
            height: hp(60),
            borderRadius: wp(20),
            backgroundColor: code_color.yellow,
          }}>
          <ScrollView
            ref={scrollViewRefPopup}
            scrollEnabled={false}
            style={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              height: hp(60),
              maxWidth: '100%',
            }}>
            {leveling &&
              leveling
                .filter(
                  itm => itm?.id < newLevel + 1 && itm?.id + 1 > currentLevel,
                )
                .map((itm, idx) => (
                  <View
                    style={{
                      height: hp(60),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: moderateScale(18),
                        fontWeight: '700',
                        color: code_color.black,
                      }}>
                      {itm?.desc?.replace(' ', '\r\n')}
                    </Text>
                  </View>
                ))}
          </ScrollView>
        </Animatable.View>
      </View>
      <TouchableOpacity
        onPress={() => setShowPopup(false)}
        style={{
          backgroundColor: '#DDDEE3',
          marginTop: hp(150),
          width: sizing.getWindowWidth(0.8),
          justifyContent: 'center',
          alignItems: 'center',
          height: hp(40),
          borderRadius: hp(6),
        }}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: code_color.black,
            fontWeight: '600',
          }}>
          Close
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );

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
          <SafeAreaView
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
              borderRadius: wp(10),
              // padding: wp(10),
              height: '100%',
            }}>
            <View style={{backgroundColor: code_color.blueDark, flex: 1}}>
              <Pressable
                onPress={() => handleClose()}
                style={{
                  alignItems: 'flex-end',
                  paddingRight: wp(20),
                  paddingTop: wp(20),
                }}>
                <CloseSvg
                  width={wp(15)}
                  height={hp(15)}
                  fill={code_color.white}
                />
              </Pressable>
              <View style={{flex: 1, backgroundColor: code_color.blueDark}}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: code_color.white,
                      textAlign: 'center',
                      fontSize: fixedFontSize(20),
                      fontWeight: '700',
                    }}>
                    Congratulations!
                  </Text>
                  <Text
                    style={{
                      color: code_color.white,
                      textAlign: 'center',
                      fontSize: fixedFontSize(16),
                      fontWeight: '400',
                    }}>
                    You just earned
                  </Text>
                  <Animatable.View
                    delay={2000}
                    animation=""
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AnimatedLottieView
                      source={badgeAnimate}
                      style={{
                        width: hp(130),
                        height: hp(130),
                      }}
                      autoPlay={true}
                      duration={3000}
                      loop={false}
                    />
                    <AnimatedLottieView
                      source={starAnimate}
                      style={{
                        width: hp(200),
                        height: hp(200),
                        position: 'absolute',
                      }}
                      autoPlay={true}
                      duration={2000}
                      loop={false}
                    />
                    <View
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        marginTop:
                          Platform.OS === 'android' ? hp(-63) : hp(-60),
                        marginBottom: hp(40),
                      }}>
                      <Animatable.Text
                        delay={1000}
                        duration={500}
                        animation="slideInUp"
                        style={{
                          fontWeight: 'bold',
                          fontSize: moderateScale(18),
                          color: code_color.white,
                          textAlign: 'center',
                        }}>
                        {pastLevel} XP
                      </Animatable.Text>
                    </View>
                  </Animatable.View>
                  <Image
                    source={imgLoveLeft}
                    resizeMode="contain"
                    style={{
                      width: Platform.OS === 'android' ? hp(157) : hp(150),
                      height: hp(150),
                      position: 'absolute',
                      left: hp(-20),
                      bottom: Platform.OS === 'android' ? hp(-110) : hp(-100),
                    }}
                  />
                  <Image
                    source={imgLoveRight}
                    resizeMode="contain"
                    style={{
                      width: Platform.OS === 'android' ? hp(145) : hp(150),
                      height: hp(150),
                      position: 'absolute',
                      right: hp(-20),
                      bottom: Platform.OS === 'android' ? hp(-110) : hp(-100),
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: code_color.white,
                borderTopLeftRadius: hp(70),
                borderTopRightRadius: hp(70),
                position: 'absolute',
                top: Platform.OS === 'android' ? '32%' : '37%',
                left: 0,
                width: Dimensions.get('window').width,
                flex: 1,
                height: '100%',
                alignItems: 'center',
              }}>
              <View style={{marginTop: hp(100)}}>
                <View
                  style={{
                    backgroundColor: '#FFD12F',
                    flexDirection: 'row',
                    marginHorizontal: wp(20),
                    marginBottom: wp(20),
                    padding: wp(20),
                    paddingTop: wp(25),
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
                  {renderIconTopCard()}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    <Image
                      source={imgStar}
                      resizeMode="contain"
                      style={{
                        width: hp(26),
                        height: hp(26),
                      }}
                    />
                    <ScrollView
                      ref={scrollViewRef}
                      scrollEnabled={false}
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        height: hp(36),
                        left: -4,
                        bottom: -2,
                        width: 'auto',
                      }}>
                      {Array.from(
                        {length: newXp - currentXp + 1},
                        (_, index) => currentXp + index,
                      ).map(itm => (
                        <Text
                          key={itm}
                          style={{
                            fontWeight: 'bold',
                            fontSize:
                              itm > 999 ? moderateScale(26) : moderateScale(30),
                            height: hp(36),
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            width: 'auto',
                            bottom: itm > 999 ? -3 : 0,
                            color: code_color.black,
                          }}>
                          {itm}
                        </Text>
                      ))}
                    </ScrollView>
                    <Text
                      style={{
                        flex: 1,
                        fontWeight: 'bold',
                        fontSize: moderateScale(18),
                        color: code_color.black,
                        left:
                          newXp > 999
                            ? -14
                            : newXp > 99
                            ? -16
                            : newXp > 9
                            ? -20
                            : -26,
                        bottom: newXp > 999 ? -5 : -5,
                      }}>
                      XP
                    </Text>
                  </View>
                  <ScrollView
                    scrollEnabled={false}
                    ref={scrollViewRefRight}
                    style={{
                      flex: 1,
                      position: 'relative',
                      overflow: 'hidden',
                      height: hp(38),
                    }}>
                    {leveling &&
                      leveling
                        .filter(
                          itm =>
                            itm?.id < newLevel + 1 &&
                            itm?.id + 1 > currentLevel,
                        )
                        .map((itm, idx) => (
                          <View
                            key={idx}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              height: hp(38),
                              width: '100%',
                            }}>
                            <Image
                              source={{
                                uri: `${BACKEND_URL}${itm.image?.url}`,
                              }}
                              resizeMode="contain"
                              style={{
                                width: hp(30),
                                height: hp(30),
                                marginRight: hp(10),
                              }}
                            />
                            <View
                              style={{width: hp(100), alignItems: 'center'}}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: moderateScale(15),
                                  textAlign: 'center',
                                  color: code_color.black,
                                }}>
                                {itm.desc}
                              </Text>
                            </View>
                          </View>
                        ))}
                  </ScrollView>
                </View>

                <View style={{height: 150}}>
                  <ProgressBar
                    levelingUser={levelingUser}
                    bgTheme={colorTheme}
                    currentXp={currentXp}
                  />
                </View>
                <ScrollView style={{flex: 0, paddingBottom: 300}}>
                  <Text
                    style={{
                      color: code_color.grey,
                      marginTop: hp(10),
                      fontSize: moderateScale(14),
                      marginHorizontal: hp(25),
                      lineHeight: moderateScale(22),
                      textAlign: 'center',
                    }}>
                    Earn more XP by reading stories and to level up. The higher
                    your rank, the more exciting stories are coming up for you!
                    Stay tuned for more exclusive features for our Experienced
                    Members!
                  </Text>

                  <Button
                    title={'Got it'}
                    style={{
                      backgroundColor: code_color.yellow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // height: 52,
                      padding: wp(10),
                      borderRadius: wp(8),
                      // width: '90%',
                      marginTop: wp(20),
                      marginHorizontal: hp(20),
                      marginBottom: wp(300),
                    }}
                    onPress={() => onGotIt()}
                  />
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>

      {showPopup && renderPopup()}
    </Modal>
  );
}

ModalCongrats.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onGotIt: PropTypes.func.isRequired,
};

ModalCongrats.defaultProps = {};

export default connect(states, dispatcher)(ModalCongrats);
