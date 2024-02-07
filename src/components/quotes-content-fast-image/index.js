/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SelectableText} from '@astrocoders/react-native-selectable-text';
import AnimatedLottieView from 'lottie-react-native';
import styles from './styles';
import {sizing} from '../../utils/styling';
import {ava1, bgStory1, bgStory2, bgStory3, imgLove} from '../../assets/images';
import {code_color} from '../../utils/colors';
import {BACKEND_URL} from '../../shared/static';
import {STORY_SHARED, eventTracking} from '../../helpers/eventTracking';
import {navigate, navigationRef} from '../../shared/navigationRef';
import Speaker from '../../assets/icons/speaker';
import {getListAvatarTheme, updateProfile} from '../../shared/request';
import ModalAudioUnlock from '../modal-audio-unlock';
import {moderateScale} from 'react-native-size-matters';
import {handleNativePayment} from '../../helpers/paywall';
import FastImage from 'react-native-fast-image';
import ModalSuccessPurchaseAudio from '../modal-success-purchase-audio';
import {reloadUserProfile} from '../../utils/user';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {fixedFontSize, hp, wp} from '../../utils/screen';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import states from './states';
import dispatcher from './dispatcher';
const loveAnimate = require('../../assets/lottie/love.json');

function QuotesContent({
  item,
  themeUser,
  isActive,
  isAnimationStart,
  fontSize,
  bgTheme,
  bg,
  fontFamily,
  totalStory,
  pageActive,
  show,
  setShow,
  type,
  isRippleAnimate,
  userProfile,
  fontColor,
  colorText,
}) {
  const [isRepeat, setRepeat] = useState(
    item?.repeat?.time != undefined || item?.isRepeat ? true : false,
  );
  const isFocused = useIsFocused();
  const [color, setColor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [title, setTitle] = useState('10/10 Audio Stories');
  const [showAudio, setShowAudio] = useState(false);
  const [me, setMe] = useState(null);
  const [partner, setPartner] = useState(null);
  const [playLoveAnimate, setPlayLoveAnimate] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const counter = useRef(0);
  const activeStatus = useRef(false);
  const [size, setSize] = useState(fontSize);
  const manipulatedResponse = item.replace(/<\/?p>/g, '');
  // const manipulatedResponse = item.replace(/<\/?p>/g, '');
  const formattedText = manipulatedResponse.replace(/\r\n/g, ' ');

  useEffect(() => {
    handleThemeAvatar(pageActive);
  }, [pageActive, userProfile]);

  useEffect(() => {
    setSize(fontSize);
  }, [fontSize]);

  const handleAudio = async () => {
    setTitle('50/50 Audio Stories');
    setLoading2(true);
    const data = await handleNativePayment('unlock_5_audio_stories');
    if (data) {
      setShow();
      setTimeout(async () => {
        setShowAudio(true);
        setLoading2(false);
      }, 100);
    } else {
      setShow();
      setLoading2(false);
    }
  };
  const handleAudioOne = async () => {
    setTitle('10/10 Audio Stories');
    setLoading(true);
    const data = await handleNativePayment('unlock_10_audio_stories');
    if (data) {
      setShow();
      setTimeout(async () => {
        setShowAudio(true);
        setLoading(false);
      }, 100);
    } else {
      setShow();
      setLoading(false);
    }
  };

  const handleThemeAvatar = async () => {
    // (angry,confused,cry,dizzy,excited,friendly,inlove,positive.scare,think)
    let params = {
      flag:
        pageActive === 0
          ? 'friendly'
          : pageActive === 1
          ? 'think'
          : pageActive === 2
          ? 'inlove'
          : 'positive',
    };
    try {
      const data = await getListAvatarTheme(params);
      if (data?.data) {
        if (userProfile?.data?.gender === 'Female') {
          setMe(data?.data?.partner);
          setPartner(data?.data?.me);
        } else {
          setMe(data?.data?.me);
          setPartner(data?.data?.partner);
        }
      }
    } catch (error) {}
  };

  const handleSuccessAudio = async () => {
    const payload = {
      _method: 'PATCH',
      audio_take: 1,
    };
    await updateProfile(payload);
    reloadUserProfile();
    setShowAudio(false);
    navigate('Media');
  };

  const getBackgroundStory = pac => {
    switch (pac) {
      case 1:
        return bgStory1;
      case 4:
        return bgStory2;
      case 7:
        return bgStory3;
      default:
        return bgStory1;
    }
  };

  const checkingColor = value => {
    return value === code_color.blackDark
      ? code_color.white
      : code_color.blackDark;
  };

  useEffect(() => {
    setTimeout(() => {
      setColor(true);
      setTimeout(() => {
        setColor(false);
      }, 200);
    }, 200);
    setSize(fontSize);
  }, [pageActive, fontColor, isActive, fontSize, fontFamily]);
  const renderSelect = useCallback(() => {
    if (color) {
      return (
        <Text
          style={[
            styles.ctnQuotes,
            {
              // marginBottom: pageActive != 0 ? -100 : 0,
              fontFamily: fontFamily,
              fontSize: Number(size),
              color: fontColor,
              marginTop: 1
            },
          ]}>
          {item}
        </Text>
      );
    } else {
      return (
        <SelectableText
          menuItems={['Share']}
          onSelection={({eventType, content, selectionStart, selectionEnd}) => {
            navigate('Share', {
              selectedContent: content,
              start:
                themeUser?.language_id === '2'
                  ? item?.substring(selectionStart - 50, selectionStart)
                  : item?.substring(selectionStart - 50, selectionStart),
              end:
                themeUser?.content_en === '2'
                  ? item?.substring(selectionEnd - 50, selectionEnd)
                  : item?.substring(selectionEnd - 50, selectionEnd),
              title:
                themeUser?.content_en === '2' ? item?.title_id : item?.title_en,
            });
            eventTracking(STORY_SHARED);
          }}
          TextComponent={() => {
            return (
              <Text
                style={[
                  styles.ctnQuotes,
                  {
                    // marginBottom: pageActive != 0 ? -100 : 0,
                    fontFamily: fontFamily,
                    fontSize: Number(size),
                    color: fontColor,
                  },
                ]}>
                {item}
              </Text>
            );
          }}
          value={item}
        />
      );
    }
  }, [color, isActive, fontColor, item]);
  return (
    <SafeAreaView
      style={{
        position: 'relative',
        paddingHorizontal: wp(2),
        paddingTop: wp(30),
        flex: 1,
      }}>
      <ModalSuccessPurchaseAudio
        isVisible={showAudio}
        onClose={() => setShowAudio(false)}
        title={title}
        handleListen={() => {
          handleSuccessAudio();
        }}
      />
      <ModalAudioUnlock
        isVisible={show}
        isLoading={loading}
        isLoading2={loading2}
        onClose={() => setShow(false)}
        onGetAudio={() => handleAudio()}
        onGetAudio1={() => handleAudioOne()}
      />
      <Animated.View
        style={{
          height: '100%',
          width: sizing.getDimensionWidth(0.89),
          transform: [{translateY: translateX}],
        }}>
        {(type === 'main' && pageActive === 0) ||
        pageActive === 3 ||
        pageActive === 6 ||
        pageActive === 9 ? (
          <View
            style={{
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              left: '15%',
              // left: 0,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <FastImage
              source={{
                uri: `${BACKEND_URL}/${me}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: wp(100),
                height: hp(300),
                opacity: 0.3,
              }}
            />
            <FastImage
              source={{
                uri: `${BACKEND_URL}/${partner}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: wp(100),
                height: hp(300),
                opacity: 0.3,
              }}
            />
          </View>
        ) : null}

        <View />
        <View
          style={{borderWidth: 1, borderColor: bgTheme, marginTop: wp(10)}}
        />
        <View style={[styles.ctnIcon]}>
          <View style={styles.quotesWrapper}>
            <View style={styles.txtQuotesWrapper}>
              {isRippleAnimate ? (
                <Text
                  style={[
                    styles.ctnQuotes,
                    {
                      // marginBottom: pageActive != 0 ? -100 : 0,
                      fontFamily: fontFamily,
                      fontSize: Number(size),
                      color:
                        bg === code_color.blackDark
                          ? code_color.white
                          : code_color.blackDark,
                    },
                  ]}>
                  {item}
                </Text>
              ) : (
                renderSelect()
              )}
            </View>
          </View>
          {(type === 'main' && pageActive === 0) ||
          pageActive === 3 ||
          pageActive === 6 ||
          pageActive === 9 ||
          pageActive === 12 ? (
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: bgTheme,
                  flex: 0,
                  alignItems: 'center',
                  paddingHorizontal: wp(10),
                  borderRadius: wp(20),
                  padding: wp(5),
                  marginBottom: wp(25),
                }}>
                <Text style={{color: code_color.white, fontWeight: 'bold'}}>
                  Page {pageActive + 1} of {totalStory}
                </Text>
              </View>
            </View>
          ) : (type === 'main' && pageActive === 1) ||
            pageActive === 4 ||
            pageActive === 7 ||
            pageActive === 10 ||
            pageActive === 13 ? (
            <>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: wp(-200),
                  height: hp(150),
                  width: wp(100),
                  left: 20,
                  zIndex: 1,
                  bottom: 100,
                }}>
                <FastImage
                  source={{
                    uri: `${BACKEND_URL}/${me}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: wp(100),
                    height: hp(300),
                  }}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: wp(-100),
                  width: wp(100),
                  height: hp(110),
                  left: '40%',
                  zIndex: 1,
                  bottom:
                    partner === '/assets/images/avatars/5/think.png' &&
                    Platform.OS === 'ios'
                      ? -5
                      : partner === '/assets/images/avatars/5/think.png' &&
                        Platform.OS === 'android'
                      ? 0
                      : null,
                }}>
                <FastImage
                  source={{
                    uri: `${BACKEND_URL}/${partner}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: wp(100),
                    height: hp(310),
                  }}
                />
              </View>

              <View>
                <ImageBackground
                  source={getBackgroundStory(pageActive)}
                  resizeMode="contain"
                  style={{
                    borderRadius: wp(100),
                    height: hp(100),
                    marginBottom: wp(15),
                    marginTop: wp(4),
                  }}>
                  <View
                    style={{
                      backgroundColor: code_color.white,
                      flex: 0,
                      alignItems: 'center',
                      borderRadius: wp(20),
                      padding: wp(5),
                      paddingHorizontal: wp(12),
                      marginBottom: wp(30),
                      position: 'absolute',
                      marginRight: wp(5),
                      bottom: 0,
                      right: 5,
                    }}>
                    <Text style={{color: bgTheme, fontWeight: 'bold'}}>
                      Page {pageActive + 1} of {totalStory}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </>
          ) : type === 'main' ? (
            <>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: wp(-150),
                  width: wp(100),
                  height: hp(180),
                  left: '10%',
                  zIndex: -1,
                }}>
                <FastImage
                  source={{
                    uri: `${BACKEND_URL}/${me}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: wp(100),
                    height: hp(300),
                    backgroundColor: 'Transparent',
                  }}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: wp(-130),
                  width: wp(100),
                  height: hp(100),
                  left: '35%',
                  zIndex: -1,
                }}>
                <FastImage
                  source={{
                    uri: `${BACKEND_URL}/${partner}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: wp(100),
                    height: hp(300),
                    backgroundColor: 'Transparent',
                  }}
                />
              </View>

              <AnimatedLottieView
                source={loveAnimate}
                style={{
                  width: wp(500),
                  height: hp(500),
                  bottom: wp(20),
                  left: -40,
                  position: 'absolute',
                  zIndex: -1,
                  display: isAnimationStart === true ? 'flex' : 'none',
                }}
                autoPlay={isAnimationStart === true}
                duration={3000}
                loop={false}
              />
              <View style={{zIndex: -2, backgroundColor: 'Transparent'}}>
                <ImageBackground
                  source={imgLove}
                  resizeMode="contain"
                  style={{
                    width: '75%',
                    height: hp(130),
                    marginLeft: wp(20),
                    zIndex: -1,
                    backgroundColor: 'Transparent',
                  }}>
                  <View
                    style={{
                      backgroundColor: bgTheme,
                      flex: 0,
                      alignItems: 'center',
                      width: wp(130),
                      borderRadius: wp(20),
                      padding: wp(5),
                      paddingHorizontal: wp(5),
                      position: 'absolute',
                      marginRight: wp(5),
                      bottom: '30%',
                      right: -80,
                    }}>
                    <Text style={{color: code_color.white, fontWeight: 'bold'}}>
                      Page {pageActive + 1} of {totalStory}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </>
          ) : null}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

QuotesContent.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

QuotesContent.defaultProps = {};

export default connect(states, dispatcher)(QuotesContent);
