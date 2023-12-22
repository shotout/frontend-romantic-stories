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
import ProgressBar from '../ProgressBar';
import {BACKEND_URL} from '../../shared/static';
import {moderateScale} from 'react-native-size-matters';
import AnimatedLottieView from 'lottie-react-native';
import {getLeveling} from '../../shared/request';
import * as Progress from 'react-native-progress';
import {sizing} from '../../shared/styling';
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
}) {
  const [leveling, setLeveling] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const scrollViewRef = useRef(null);
  const scrollViewRefRight = useRef(null);
  const scrollViewRefPopup = useRef(null);
  const currentLevel = userProfile?.data?.user_level?.level?.id;
  const newLevel = levelingUser?.user_level?.level?.id;
  const currentXp = userProfile?.data?.user_level?.level?.value;
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
        setShowPopup(true);
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
            width: 100,
            height: 100,
            position: 'absolute',
            left: 50,
            bottom: 70,
          }}
        />
        <Image
          source={imgGift2}
          resizeMode="contain"
          style={{
            width: 80,
            height: 80,
            position: 'absolute',
            right: 70,
            bottom: 80,
          }}
        />
        <View
          style={{
            backgroundColor: code_color.blueDark,
            padding: 10,
            position: 'absolute',
            top: -15,
            left: '25%',
            right: 0,
            width: 200,
            alignItems: 'center',
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: code_color.white,
              fontWeight: 'bold',
            }}>
            {userProfile?.data?.name ? userProfile?.data?.name : ''}
          </Text>
        </View>
        <Image
          source={imgAvaXp}
          resizeMode="contain"
          style={{
            width: 80,
            height: 80,
            position: 'absolute',
            right: '49%',
            bottom: 100,
            borderRadius: 100,
            borderColor: code_color.blueDark,
            borderWidth: 5,
          }}
        />
        <Image
          source={imgInfo}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
            position: 'absolute',
            top: 10,
            right: 0,
          }}
        />
      </>
    );
  };
console.log(`${BACKEND_URL}${imgPopup}`)
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
            fontSize: moderateScale(24),
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
            height: 200,
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
          marginTop: moderateScale(50),
        }}>
        <Animatable.View
          animation="fadeInUp"
          style={{
            width: sizing.getDimensionWidth(0.5),
            height: moderateScale(60),
            borderRadius: moderateScale(20),
            backgroundColor: code_color.yellow,
          }}>
          <ScrollView
            ref={scrollViewRefPopup}
            scrollEnabled={false}
            style={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              height: moderateScale(60),
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
                      height: moderateScale(60),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: moderateScale(18),
                        fontWeight: '700',
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
          marginTop: moderateScale(150),
          width: sizing.getWindowWidth(0.8),
          justifyContent: 'center',
          alignItems: 'center',
          height: moderateScale(40),
          borderRadius: moderateScale(6),
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
            fontSize: moderateScale(24),
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
            height: 200,
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
          marginTop: moderateScale(50),
        }}>
        <Animatable.View
          animation="fadeInUp"
          style={{
            width: sizing.getDimensionWidth(0.5),
            height: moderateScale(60),
            borderRadius: moderateScale(20),
            backgroundColor: code_color.yellow,
          }}>
          <ScrollView
            ref={scrollViewRefPopup}
            scrollEnabled={false}
            style={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              height: moderateScale(60),
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
                      height: moderateScale(60),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: moderateScale(18),
                        fontWeight: '700',
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
          marginTop: moderateScale(150),
          width: sizing.getWindowWidth(0.8),
          justifyContent: 'center',
          alignItems: 'center',
          height: moderateScale(40),
          borderRadius: moderateScale(6),
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
              borderRadius: 10,
              padding: 10,
              height: '100%',
            }}>
            <View style={{backgroundColor: code_color.blueDark, flex: 1}}>
              <Pressable
                onPress={() => handleClose()}
                style={{
                  alignItems: 'flex-end',
                  paddingRight: 20,
                  paddingTop: 20,
                }}>
                <CloseSvg width={15} height={15} fill={code_color.white} />
              </Pressable>
              <View style={{flex: 1, backgroundColor: code_color.blueDark}}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: code_color.white,
                      textAlign: 'center',
                      fontSize: moderateScale(20),
                      fontWeight: '700',
                    }}>
                    Congratulations!
                  </Text>
                  <Text
                    style={{
                      color: code_color.white,
                      textAlign: 'center',
                      fontSize: moderateScale(16),
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
                        width: 140,
                        height: 140,
                      }}
                      autoPlay={true}
                      duration={3000}
                      loop={false}
                    />
                    <AnimatedLottieView
                      source={starAnimate}
                      style={{
                        width: 270,
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
                        marginTop: moderateScale(-60),
                        marginBottom: moderateScale(40),
                      }}>
                      <Animatable.Text
                        delay={1000}
                        duration={500}
                        animation="slideInUp"
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: code_color.white,
                          textAlign: 'center',
                        }}>
                          {newXp ? newXp : 0} XP
                      </Animatable.Text>
                    </View>
                  </Animatable.View>
                  <Image
                    source={imgLoveLeft}
                    resizeMode="contain"
                    style={{
                      width:  Platform.OS === 'android' ? 157 :  150,
                      height: 150,
                      position: 'absolute',
                      left: -20,
                      bottom:  Platform.OS === 'android' ? -90 : -100,
                    }}
                  />
                  <Image
                    source={imgLoveRight}
                    resizeMode="contain"
                    style={{
                      width:  Platform.OS === 'android' ? 145 :150,
                      height: 150,
                      position: 'absolute',
                      right: -20,
                      bottom:  Platform.OS === 'android' ? -90 : -100,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: code_color.white,
                borderTopLeftRadius: 70,
                borderTopRightRadius: 70,
                position: 'absolute',
                top: Platform.OS === 'android' ? '32%':'37%',
                left: 0,
                width: Dimensions.get('window').width,
                flex: 1,
                height: '100%',
                alignItems: 'center',
              }}>
              <View style={{marginTop: 100}}>
                <View
                  style={{
                    backgroundColor: '#FFD12F',
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    marginBottom: 20,
                    padding: 30,
                    borderRadius: 10,
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
                      flex: 1,
                      height: moderateScale(36),
                    }}>
                    <Image
                      source={imgStar}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                    <ScrollView
                      ref={scrollViewRef}
                      scrollEnabled={false}
                      style={{
                        flex: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        height: moderateScale(36),
                        maxWidth: moderateScale(70),
                      }}>
                      {Array.from(
                        {length: newXp - currentXp + 1},
                        (_, index) => currentXp + index,
                      ).map(itm => (
                        <Text
                          key={itm}
                          style={{
                            fontWeight: 'bold',
                            fontSize: moderateScale(30),
                            textAlign: 'center',
                          }}>
                          {itm}
                        </Text>
                      ))}
                    </ScrollView>
                    <Text
                      style={{
                        flex: 1,
                        fontWeight: 'bold',
                        fontSize: moderateScale(22),
                        left: -10,
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
                      height: moderateScale(38),
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
                              flex: 1,
                              alignItems: 'center',
                              height: moderateScale(38),
                            }}>
                            <Image
                              source={{
                                uri: `${BACKEND_URL}${itm.image?.url}`,
                              }}
                              resizeMode="contain"
                              style={{
                                width: 30,
                                height: 30,
                                marginRight: 10,
                              }}
                            />
                            <View style={{width: 100, alignItems: 'center'}}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  fontSize: 16,
                                  textAlign: 'center',
                                }}>
                                {itm.desc}
                              </Text>
                            </View>
                          </View>
                        ))}
                  </ScrollView>
                </View>

                <View style={{marginLeft: '20%', marginTop: 20}}>
                  <ProgressBar
                    bgTheme={colorTheme}
                    levelingUser={levelingUser}
                  />
                </View>

                <Text
                  style={{
                    color: code_color.grey,
                    marginTop: 40,
                    fontSize: 14,
                    marginHorizontal: 30,
                    lineHeight: 24,
                    textAlign: 'center',
                  }}>
                  Earn more XP by reading stories and to level up. The higher
                  your rank, the more exciting stories are coming up for you!
                  Stay tuned for more exclusive features for our Experienced
                  Members!
                </Text>
              </View>

              <Button
                title={'Got it'}
                style={{
                  backgroundColor: code_color.yellow,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // height: 52,
                  padding: 10,
                  borderRadius: 8,
                  width: '90%',
                  marginTop: 20,
                }}
                onPress={() => onGotIt()}
              />
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
