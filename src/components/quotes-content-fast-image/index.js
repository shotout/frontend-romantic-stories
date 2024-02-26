/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
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
  Modal,
  TextInput
} from 'react-native';
import {SelectableText} from '@astrocoders/react-native-selectable-text';
import AnimatedLottieView from 'lottie-react-native';
import styles from './styles';
import {sizing} from '../../utils/styling';
import {ava1, bgStory1, bgStory2, bgStory3, imgLove} from '../../assets/images';
import {code_color} from '../../utils/colors';
import {BACKEND_URL} from '../../shared/static';
import {STORY_SHARED, eventTracking} from '../../helpers/eventTracking';
import {
  navigate,
  navigationRef,
  reset,
  resetParams,
} from '../../shared/navigationRef';
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
// import {TextInput} from 'react-native-paper';
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
  price,
  price2,
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
  const manipulatedResponse = item?.replace(/<\/?p>/g, '');
  // const manipulatedResponse = item.replace(/<\/?p>/g, '');
  const formattedText = manipulatedResponse?.replace(/\r\n/g, ' ');
  const [trimmedText, setTrimmedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const longText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum felis at semper iaculis. Integer auctor justo in purus suscipit, et dapibus lectus maximus. Nam consectetur lectus in lectus vulputate, sit amet congue urna fermentum. Sed a eros et ex vestibulum sodales. Phasellus vulputate velit sed est vulputate, ut tempor elit eleifend. Sed commodo enim vel ex bibendum, quis euismod sapien vestibulum. Integer nec nisi nulla. Maecenas id volutpat risus. Fusce sed mi vitae arcu tristique sodales. Duis quis fermentum lectus. Sed sollicitudin odio eu felis vestibulum, at malesuada lectus cursus. Phasellus sit amet metus ac risus sodales tempus. Sed nec libero a ante convallis ullamcorper eu et nibh. Nulla facilisi. Mauris aliquet erat sit amet dui lobortis laoreet. lobortis laoreet lobortis laoreet';

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
        pageActive === 0 ||
        pageActive === 4 ||
        pageActive === 8 ||
        pageActive === 12
          ? 'friendly'
          : pageActive === 1 ||
            pageActive === 5 ||
            pageActive === 9 ||
            pageActive === 13
          ? 'think'
          : pageActive === 2 ||
            pageActive === 6 ||
            pageActive === 10 ||
            pageActive === 14
          ? 'inlove'
          : pageActive === 3 ||
            pageActive === 7 ||
            pageActive === 11 ||
            pageActive === 15
          ? 'positive'
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

  useEffect(() => {
    const calculateTrimmedText = () => {
      const maxWidth = Dimensions.get('window').width - 40; // Assuming 20 padding on each side
      const fontSize = Dimensions.get('window').width * 0.04; // Adjust as needed
      const maxLines = Math.floor(
        (Dimensions.get('window').height * 0.8) / fontSize,
      ); // Adjust as needed

      let lines = 0;
      let textArray = [];

      for (let charIndex = 0; charIndex < longText.length; charIndex++) {
        if (longText[charIndex] === '\n') {
          lines++;
          if (lines >= maxLines) {
            break;
          }
        }
        textArray.push(longText[charIndex]);
      }

      setTrimmedText(textArray.join(''));
    };

    calculateTrimmedText();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setColor(true);
      setTimeout(() => {
        setColor(false);
      }, 200);
    }, 200);
    setSize(fontSize);
  }, [pageActive, fontColor, isActive, fontSize, fontFamily]);
  const [selectedText, setSelectedText] = useState('');

  const handleTextSelection = event => {
    const {selection} = event.nativeEvent;

    if (selection) {
      const {start, end} = selection;
      const selected = item?.slice(start, end);
      if (selected != '' && selected.length != 0) {
        setEnd(end)
        setStart(start)
        setSelectedText(selected)
        setModalVisible(true);

        eventTracking(STORY_SHARED);
      }
    }
  };

  const renderSelect = useCallback(() => {
    // if (isActive) {
    //   return (
    //     <TextInput
    //     multiline={true}
    //     value={item}
    //     editable={false}
    //     onSelectionChange={e => handleTextSelection(e)}
    //     underlineColorAndroid="transparent"
    //     underlineColor="transparent"
    //     // Gaya tambahan untuk membuatnya terlihat seperti teks biasa
    //     style={[
    //       styles.ctnQuotes,
    //       {
    //         // marginBottom: pageActive != 0 ? -100 : 0,
    //         fontFamily: fontFamily,
    //         fontSize: Number(size),
    //         borderColor: null,
    //         backgroundColor: 'transparent',
    //         borderBottomColor: bg,
    //         borderColor: bg,
    //         borderBottomWidth: 0,
    //         padding: -5,
    //         color:
    //           bg === code_color.blackDark
    //             ? code_color.white
    //             : code_color.blackDark,
    //       },
    //     ]}
    //   />
    //   );
    // } else {
    return (
      <TextInput
        multiline={true}
        value={item}
        scrollEnabled={false}
        editable={false}
        contextMenuHidden={true}
        onSelectionChange={e => handleTextSelection(e)}
        underlineColorAndroid="transparent"
        underlineColor="transparent"
        backgroundColor="transparent"
        allowFontScaling={false}
        // contentStyle={{
        //   fontFamily: fontFamily,
        //   textAlign: 'justify',
        //   lineHeight: 24,
        //   margin: 0,
        // }}
       
        // Gaya tambahan untuk membuatnya terlihat seperti teks biasa
        style={{
          fontSize: Number(size),
          fontWeight: 'normal',
          fontFamily: fontFamily,
          textAlign: 'justify',
          lineHeight: 24,
          color: bg === code_color.blackDark ? code_color.white : code_color.blackDark,
          backgroundColor: 'transparent',
          // margin: -15,

          // lineHeight: 22
          // bg === code_color.blackDark
          //   ? code_color.white
          //   : code_color.blackDark,
        }}
      />

      // <SelectableText
      //   menuItems={['Share']}
      //   onSelection={({eventType, content, selectionStart, selectionEnd}) => {
      //     navigate('Share', {
      //       selectedContent: content,
      //       start:
      //         themeUser?.language_id === '2'
      //           ? item?.substring(selectionStart - 50, selectionStart)
      //           : item?.substring(selectionStart - 50, selectionStart),
      //       end:
      //         themeUser?.content_en === '2'
      //           ? item?.substring(selectionEnd - 50, selectionEnd)
      //           : item?.substring(selectionEnd - 50, selectionEnd),
      //       title:
      //         themeUser?.content_en === '2' ? item?.title_id : item?.title_en,
      //     });
      //     eventTracking(STORY_SHARED);
      //   }}
      //   TextComponent={() => {
      //     return (
      //       <Text
      //         style={[
      //           styles.ctnQuotes,
      //           {
      //             // marginBottom: pageActive != 0 ? -100 : 0,
      //             fontFamily: fontFamily,
      //             fontSize: Number(size),
      //             color: fontColor,
      //             lineHeight: 25,
      //           },
      //         ]}>
      //         {item}
      //       </Text>
      //     );
      //   }}
      //   value={item}
      // />
    );
    // }
  }, [color, isActive, fontColor, item]);

  function customSplit(text, maxLength) {
    const words = text.split(' ');
    let result = '';
    let count = 0;

    for (let i = 0; i < words.length; i++) {
      // Tambahkan spasi sebelum kata kecuali untuk kata pertama
      if (i !== 0) {
        result += ' ';
      }
      const word = words[i];
      // Jika panjang kata lebih dari sisa karakter yang diperbolehkan,
      // tambahkan \n dan reset count
      if (count + word.length > maxLength) {
        result += '\n';
        count = 0;
      }
      result += word;
      count += word.length;
    }
    return result;
  }
  return (
    <SafeAreaView
      style={{
        position: 'relative',
        paddingHorizontal: wp(2),
        paddingTop: wp(30),
        flex: 1,
      }}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false)
                  navigate('Share', {
                    selectedContent: selectedText,
                    start:
                      themeUser?.language_id === '2'
                        ? item?.substring(start - 50, start)
                        : item?.substring(start - 50, start),
                    end:
                      themeUser?.content_en === '2'
                        ? item?.substring(end - 50, end)
                        : item?.substring(end - 50, end),
                    title:
                      themeUser?.content_en === '2'
                        ? item?.title_id
                        : item?.title_en,
                  });
                  setSelectedText('');
                }}>
                <Text>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
        price={price}
        price2={price2}
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
          {type != 'main' ? null : pageActive === 0 ||
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
                  position: 'absolute',
                  bottom: 0,
                }}>
                <Text style={{color: code_color.white, fontWeight: 'bold'}}>
                  Page {pageActive + 1} of {totalStory}
                </Text>
              </View>
            </View>
          ) : pageActive === 1 ||
            pageActive === 4 ||
            pageActive === 7 ||
            pageActive === 10 ||
            pageActive === 13 ? (
            <>
              <View>
                <ImageBackground
                  source={getBackgroundStory(pageActive)}
                  resizeMode="contain"
                  style={{
                    borderRadius: wp(100),
                    height: hp(100),
                    marginBottom:
                      Dimensions.get('window').height <= 667 ? wp(-10) : wp(5),
                    marginTop: wp(4),
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      // bottom: 0,
                      overflow: 'hidden',
                      marginBottom:
                        me === '/assets/images/avatars/1/think.png' ||
                        me === '/assets/images/avatars/3/think.png' ||
                        me === '/assets/images/avatars/4/think.png'
                          ? -83.3
                          : -83.3,

                      // marginBottom: Dimensions.get('window').height <= 667 && me === '/assets/images/avatars/2/think.png' ?  wp(-190) :  Dimensions.get('window').height === 844 && partner === '/assets/images/avatars/5/think.png' ? wp(-185) : Dimensions.get('window').height <= 667 ?  wp(-210) : Dimensions.get('window').height === 844 &&  me === '/assets/images/avatars/2/think.png' ? wp(-200) : me === '/assets/images/avatars/2/think.png' ? wp(-185) :  me === '/assets/images/avatars/3/think.png'  ? wp( Dimensions.get('window').height > 812 ? -200 : -185) : me === '/assets/images/avatars/4/think.png' ? wp(-180) : me === '/assets/images/avatars/1/think.png' ? wp(-185) :  wp(-200),
                      height:
                        Dimensions.get('window').height <= 667 &&
                        me === '/assets/images/avatars/2/think.png'
                          ? hp(170)
                          : hp(
                              Dimensions.get('window').height === 844 &&
                                me === '/assets/images/avatars/2/think.png'
                                ? 180
                                : Dimensions.get('window').height === 812 &&
                                  me === '/assets/images/avatars/2/think.png'
                                ? 180
                                : me === '/assets/images/avatars/2/think.png'
                                ? 150
                                : me === '/assets/images/avatars/4/think.png'
                                ? 110
                                : me === '/assets/images/avatars/3/think.png' &&
                                  Dimensions.get('window').height <= 667
                                ? 130
                                : me === '/assets/images/avatars/3/think.png'
                                ? 120
                                : me != '/assets/images/avatars/2/think.png' &&
                                  me?.includes('think')
                                ? 100
                                : me === '/assets/images/avatars/2/positive.png'
                                ? 150
                                : me?.includes('positive')
                                ? 120
                                : me === '/assets/images/avatars/3/friendly.png'
                                ? 110
                                : 150,
                            ),
                      width: wp(100),
                      left: 20,
                      zIndex: 1,
                      bottom: 90,
                    }}>
                    <FastImage
                      source={{
                        uri: `${BACKEND_URL}/${me}`,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        width: wp(100),
                        height: hp(
                          me === '/assets/images/avatars/3/positive.png' ||
                            me === '/assets/images/avatars/1/positive.png'
                            ? 350
                            : me === '/assets/images/avatars/2/positive.png'
                            ? 450
                            : me != '/assets/images/avatars/2/positive.png'
                            ? 400
                            : 360,
                        ),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      overflow: 'hidden',
                      marginBottom:
                        partner === '/assets/images/avatars/5/think.png'
                          ? 12
                          : 21.7,
                      // marginBottom: wp(
                      //   partner === '/assets/images/avatars/5/think.png'
                      //     ? -90
                      //     : -85,
                      // ),
                      width: wp(100),
                      height: hp(
                        partner === '/assets/images/avatars/5/think.png'
                          ? 90
                          : partner === '/assets/images/avatars/2/think.png'
                          ? 135
                          : 100,
                      ),
                      left: '40%',
                      zIndex: 1,
                      bottom:
                        partner === '/assets/images/avatars/5/think.png' &&
                        Platform.OS === 'ios'
                          ? -5
                          : partner === '/assets/images/avatars/5/think.png' &&
                            Platform.OS === 'android'
                          ? 0
                          : -15,
                    }}>
                    <FastImage
                      source={{
                        uri: `${BACKEND_URL}/${partner}`,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        width: wp(100),
                        height: hp(
                          partner === '/assets/images/avatars/4/positive.png' ||
                            partner === '/assets/images/avatars/6/positive.png'
                            ? 330
                            : 340,
                        ),
                      }}
                    />
                  </View>
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

              {/* <View>
                <ImageBackground
                  source={getBackgroundStory(pageActive)}
                  resizeMode="contain"
                  style={{
                    borderRadius: wp(100),
                    height: hp(100),
                    marginBottom:   Dimensions.get('window').height <= 667 ? wp(-10) : wp(5),
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
              </View> */}
            </>
          ) : type === 'main' ? (
            <>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: wp(
                    me === '/assets/images/avatars/2/inlove.png' ? -160 : -190,
                  ),
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
                  marginBottom: wp(-100),
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
                    height: hp(100),
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
