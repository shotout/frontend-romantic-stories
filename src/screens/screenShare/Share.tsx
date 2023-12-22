/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Animated,
  PanResponder,
  Dimensions,
  ImageBackground,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import RNFS from 'react-native-fs';
import CloseIcon from '../../assets/icons/close';
import DownChevron from '../../assets/icons/downChevron';
import Whatsapp from '../../assets/icons/whatsapp';
import InstagramStory from '../../assets/icons/instagramStory';
import Instagram from '../../assets/icons/instagram';
import FBStory from '../../assets/icons/facebookStory';
import FB from '../../assets/icons/facebook';
import UpChevron from '../../assets/icons/upChevron';
import Lock from './../../assets/icons/lock';
import Watch from './../../assets/icons/watch';
import LockFree from './../../assets/icons/lockFree';
import UnlockFontIcon from './../../assets/icons/unlockFont';
import UnlockBgShareIcon from './../../assets/icons/unlockBgShare';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import styles from './styles';
import {code_color} from '../../utils/colors';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {
  bg,
  story2,
  bgShare1,
  bgShare2,
  bgShare3,
  bgShare4,
  imgSticker,
  imgGift1,
  imgSticker1,
  imgSticker2,
  imgSticker3,
  imgSticker4,
  imgSticker5,
  imgFont,
  imgStep1,
  imgBgXp,
  imgStep6,
  imgStep7,
  imgStep8,
  imgSelectGift2,
  imgQuote,
} from '../../assets/images';
import Card from '../../components/card';
import {fontList} from '../../utils/constants';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ViewShot from 'react-native-view-shot';
import Share, {Social} from 'react-native-share';
import {moderateScale} from 'react-native-size-matters';
import {sizing} from '../../shared/styling';
import {isIphone} from '../../utils/devices';
import {goBack, navigate} from '../../shared/navigationRef';
import ModalStickers from '../../components/modal-stickers';
import Gestures from '../../components/Gestures/gestures';
import Slider from '@react-native-community/slider';
import StepHeader from '../../layout/step/stepHeader';
import i18n from '../../i18n';
import Button from '../../components/buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalUnlockPremium from '../../components/modal-unlock-premium';
import {Step6, Step7, Step8} from '../../layout/tutorial';
import {handlePayment} from '../../helpers/paywall';

function ScreenShare({
  route,
  stepsTutorial,
  handleSetSteps,
  isPremium,
  userProfile,
}) {
  const [isVisibleModal, setVisible] = useState(false);
  const [isVisibleFont, setVisibleFont] = useState(false);
  const [modalUnlockFont, setModalUnlockFont] = useState(false);
  const [modalUnlockBg, setModalUnlockBg] = useState(false);
  const [selectBg, setSelectBg] = useState(null);
  const [selectedBg, setSelectedBg] = useState<any>(null);
  const [show, setShow] = useState(true);
  const [captureUri, setCaptureUri] = useState(null);
  const [fontSizeDefault, setFontSize] = useState(18);
  const [fontSelect, setSelectFont] = useState({
    name: 'Georgia',
    value: 'GeorgiaEstate-w15Mn',
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const [selectedFont, setSelectedFont] = useState<any>(null);
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [sticker, setSticker] = useState([]);
  const [userText, setUserText] = useState('');
  const [draggableItems, setDraggableItems] = useState([]);
  const [stickers, setStickers] = useState([
    {
      image: imgSticker1,
    },
    {
      image: imgSticker2,
    },
    {
      image: imgSticker3,
    },
    {
      image: imgSticker4,
    },
    {
      image: imgSticker5,
    },
  ]);
  const [size, setSize] = useState({width: 100, height: 100});

  // Konfigurasi Animated
  const pan = useRef(new Animated.ValueXY()).current;

  const captureRef = useRef();
  const base64CaptureImage = useRef(null);
  const [viewShotLayout, setViewShotLayout] = useState(null);
  const backgroundList = [bg, story2, bgShare1, bgShare2, bgShare3, bgShare4];
  const downloadText = 'I found this fact on the ShortStory App';
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      // Mengatur posisi akhir setelah selesai dragging
      pan.flattenOffset();
    },
  });

  // PanResponder untuk resizing
  const resizePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      setSize(prevSize => ({
        width: prevSize.width + gestureState.dx,
        height: prevSize.height + gestureState.dy,
      }));
      pan.setValue({
        x: pan.x._value + gestureState.dx / 2,
        y: pan.y._value + gestureState.dy / 2,
      });
    },
    onPanResponderRelease: (_, gestureState) => {
      pan.setOffset({
        x: pan.x._value + gestureState.dx / 2,
        y: pan.y._value + gestureState.dy / 2,
      });
      pan.setValue({x: 0, y: 0});
    },
  });

  const handleShare = async () => {
    base64CaptureImage.current = null;
    handleScreenshot();
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  const handleSaveImage = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version?.toString() < 30) {
        if (await hasAndroidPermission()) {
          await CameraRoll.save(captureUri);
        } else {
          return;
        }
      } else {
        await CameraRoll.save(captureUri);
      }
    } catch (err) {
      console.log('Err save:', err);
    }
  };

  const handleScreenshot = async () => {};

  const handleWAShare = async () => {
    await handleShare();
    setTimeout(async () => {
      try {
        await Share.open({
          url: base64CaptureImage.current!,
          title: 'Shared-Short-Story',
        });
      } catch (err) {
        console.log('Error share whatsapp:', err);
      }
    }, 200);
  };

  const handleIGStoryShare = async () => {
    handleShare();
    setTimeout(async () => {
      try {
        const contentURL = isIphone ? base64CaptureImage.current : captureUri;
        await Share.shareSingle({
          backgroundImage: contentURL, // url or an base64 string
          social: Share.Social.INSTAGRAM_STORIES,
          appId: '637815961525510', // facebook appId
        });
      } catch (err) {
        console.log('Error share ig story:', err);
      }
    }, 200);
  };

  const handleShareInstagramDefault = async () => {
    handleShare();
    setTimeout(async () => {
      try {
        const contentURL = isIphone ? base64CaptureImage.current : captureUri;
        await Share.shareSingle({
          title: 'Share image to instagram',
          type: 'image/jpeg',
          url: contentURL,
          social: Share.Social.INSTAGRAM,
        });
      } catch (err) {
        console.log('Err share default ig:', err);
      }
    }, 200);
  };

  const handleSharetoFBStory = async () => {
    handleShare();
    setTimeout(async () => {
      try {
        const contentURL = isIphone ? base64CaptureImage.current : captureUri;
        await Share.shareSingle({
          backgroundImage: contentURL,
          appId: '637815961525510', // facebook appId
          social: Share.Social.FACEBOOK_STORIES,
        });
      } catch (err) {
        console.log('Error post to story:', err);
      }
    }, 200);
  };

  const handleShareFBDefault = async () => {
    handleShare();
    setTimeout(async () => {
      try {
        const contentURL = isIphone ? base64CaptureImage.current : captureUri;
        await Share.shareSingle({
          url: contentURL!,
          // title: 'Share file',
          // message: 'Simple share with message',
          // appId: '637815961525510', // facebook appId
          // backgroundBottomColor: '#fff',
          // backgroundTopColor: '#fff',
          // type: 'image/*',
          social: Social.Facebook,
        });
      } catch (err) {
        console.log('Err fb default:', err);
      }
    }, 200);
  };

  function renderCard() {
    return (
      <View style={styles.rowCard}>
        <ScrollView horizontal>
          <Card
            label="WhatsApp"
            icon={<Whatsapp width="100%" height="100%" />}
            onPress={handleWAShare}
          />
          <Card
            label="Instagram Stories"
            icon={<InstagramStory width="100%" height="100%" />}
            onPress={handleIGStoryShare}
          />
          <Card
            label="Instagram"
            icon={<Instagram width="100%" height="100%" />}
            onPress={handleShareInstagramDefault}
          />
          <Card
            label="Facebook Stories"
            icon={<FBStory width="100%" height="100%" />}
            onPress={handleSharetoFBStory}
          />
          <Card
            label="Facebook"
            icon={<FB width="100%" height="100%" />}
            onPress={handleShareFBDefault}
          />
        </ScrollView>
      </View>
    );
  }

  function TextFontComponent(props: any) {
    const fontsRef = useRef(draggableItems);
    return (
      <View style={{zIndex: 1}}>
        {fontsRef.current.map((el: any, i: any) => (
          <Gestures
            bounds={{
              minX: viewShotLayout.x,
              minY: viewShotLayout.y,
              maxX: viewShotLayout.x + viewShotLayout.width - 100,
              maxY: viewShotLayout.y + viewShotLayout.height - 100,
            }}
            key={i}
            style={el.styles}
            onChange={(_event: any, styles: any) => {
              fontsRef.current[i] = {
                ...fontsRef.current[i],
                styles: styles,
              };

              el = {...el, ...{styles: styles}};

              // dispatch(saveItemSticker(el));
              if (styles.top > windowHeight - 200) {
                // setReadyToDeleteSticker(true);
              } else {
                // setReadyToDeleteSticker(false);
              }
            }}
            onEnd={(_event: any, styles: any) => {
              // setShowBottomMenu(true);
              if (styles.top > windowHeight - 200) {
                // dispatch(removeSticker(el));
                console.log('Deleted');
              }
            }}>
            <Text style={{fontSize: fontSizeDefault}}>{el}</Text>
          </Gestures>
        ))}
      </View>
    );
  }
  function StickerComponent(props: any) {
    const stickersRef = useRef(sticker);
    return (
      <View style={{zIndex: 1}}>
        {stickersRef.current.map((el: any, i: any) => (
          <Gestures
            bounds={{
              minX: viewShotLayout.x,
              minY: viewShotLayout.y,
              maxX: viewShotLayout.x + viewShotLayout.width - 150,
              maxY: viewShotLayout.y + viewShotLayout.height - 200,
            }}
            key={i}
            style={el.styles}
            onChange={(_event: any, styles: any) => {
              stickersRef.current[i] = {
                ...stickersRef.current[i],
                styles: styles,
              };

              el = {...el, ...{styles: styles}};

              // dispatch(saveItemSticker(el));
              if (styles.top > windowHeight - 200) {
                // setReadyToDeleteSticker(true);
              } else {
                // setReadyToDeleteSticker(false);
              }
            }}
            onEnd={(_event: any, styles: any) => {
              // setShowBottomMenu(true);
              if (styles.top > windowHeight - 200) {
                // dispatch(removeSticker(el));
                console.log('Deleted');
              }
            }}>
            <Image
              source={el.image}
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                width: 150,
                height: 150,
              }}
            />
          </Gestures>
        ))}
      </View>
    );
  }
  const handleFont = value => {
    if (value === 0) {
      setFontSize(Number(fontSizeDefault) - 2);
    } else if (value === 1) {
      setFontSize(18);
    } else {
      setFontSize(Number(fontSizeDefault) + 2);
    }
    // setFontSize(fontSizeDefault)
  };
  const renderFont = () => {
    return (
      <Slider
        step={1}
        style={{
          width: '50%',
          height: 100,
          transform: [{rotate: '90deg'}],
          marginRight: -50,
          marginLeft: -90,
        }}
        minimumValue={0}
        maximumValue={2}
        value={fontSizeDefault === 12 ? 1 : fontSizeDefault === 10 ? 0 : 2}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
        onValueChange={value => handleFont(value)}
        thumbTintColor="#ffd500"
      />
    );
  };
  const windowHeight = Dimensions.get('window').height;
  const handleTouchStart = e => {
    // Mendapatkan posisi sentuhan
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const halfScreenWidth = Dimensions.get('window').width / 2.5;
    // Jika sentuhan terjadi di sebelah kiri, set isSwipingLeft ke true
    if (touchX < halfScreenWidth) {
      handleSetSteps(stepsTutorial - 1);
      if (stepsTutorial === 6) {
        navigate('Main');
      }

      setIsSwipingLeft(true);
    }
    // Jika sentuhan terjadi di sebelah kanan, set isSwipingRight ke true
    else {
      handleSetSteps(stepsTutorial + 1);
      {
        stepsTutorial === 9 ? AsyncStorage.removeItem('isTutorial') : null;
      }
      {
        stepsTutorial === 9 ? handleSetSteps(0) : null;
      }
      {
        stepsTutorial === 9 ? goBack() : null;
      }
      setIsSwipingRight(true);
    }
  };
  const handleTouchEnd = () => {
    // Reset status swipe saat sentuhan selesai
    setIsSwipingLeft(false);
    setIsSwipingRight(false);
  };
  const renderProgress = () => <StepHeader currentStep={stepsTutorial} />;
  const renderTutorial = () => {
    if (stepsTutorial === 6 || stepsTutorial === 7) {
      setTimeout(() => {
        setShowModal(true);
      }, 4000);
      if(stepsTutorial === 7){
        setTimeout(() => {
          setShowModalTwo(true);
        }, 3000);
      }
      return (
        <SafeAreaView
          onTouchStart={handleTouchStart}
          // onTouchEnd={handleTouchEnd}
          pointerEvents="box-only"
          style={{
            position: 'absolute',

            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,

            backgroundColor: 'rgba(0,0,0,0.3)',
            paddingTop: 40,
          }}>
          {stepsTutorial != 6 || stepsTutorial != 7 ? renderProgress() : null}
          {stepsTutorial === 6 ? (
            <ImageBackground
              source={imgQuote}
              resizeMode="contain"
              style={{
                position: 'absolute',
                top: '0',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,

                backgroundColor: 'rgba(0,0,0,0.3)',
              }}>
              {renderProgress()}
              {showModal ? (
                <Step6
                  handleNext={() => {
                    handleSetSteps(stepsTutorial + 1);
                    setVisible(false);
                  }}
                  handlePrev={() => {
                    handleSetSteps(stepsTutorial - 2);
                    navigate('ExploreLibrary');
                  }}
                />
              ) : null}
            </ImageBackground>
          ) : (
            <ImageBackground
              source={imgQuote}
              resizeMode="contain"
              style={{
                position: 'absolute',
                top: '0',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,

                backgroundColor: 'rgba(0,0,0,0.3)',
              }}>
              {renderProgress()}
              {showModalTwo ? (
                <Step7
                  handleNext={() => {
                    handleSetSteps(stepsTutorial + 1);
                    setVisible(false);
                  }}
                  handlePrev={() => {
                    handleSetSteps(stepsTutorial - 1);
                  }}
                />
              ) : null}
            </ImageBackground>
          )}
        </SafeAreaView>
      );
    } else if (stepsTutorial === 8 || stepsTutorial === 9) {
      return (
        <SafeAreaView
          // onTouchStart={handleTouchStart}
          // onTouchEnd={handleTouchEnd}
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            backgroundColor: 'rgba(0,0,0,0.3)',
            paddingTop: 40,
          }}>
          <ImageBackground
            source={imgBgXp}
            resizeMode="contain"
            style={{
              position: 'absolute',
              top: '-5%',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,

              backgroundColor: 'rgba(0,0,0,0.3)',
              paddingTop: 30,
            }}>
            {renderProgress()}
            <Step8
              handlePrev={() => {
                handleSetSteps(stepsTutorial - 1);
                setShowModal(false);
              }}
              handleNext={() => {
                handleSetSteps(stepsTutorial + 1);
                setVisible(false);
                if (stepsTutorial === 8) {
                  AsyncStorage.removeItem('isTutorial');
                  handleSetSteps(0);
                  goBack();
                  handlePayment('onboarding');
                }
              }}
            />
          </ImageBackground>
        </SafeAreaView>
      );
    }
  };


  const renderScreenShot = () => {
    return (
      <ViewShot
        style={styles.conQuote}
        onLayout={event => {
          setViewShotLayout(event.nativeEvent.layout);
        }}
        ref={captureRef}
        options={{
          fileName: `Shortstory${Date.now()}`,
          format: 'png',
          quality: 1.0,
        }}>
        <Image
          source={selectBg}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 24,
            resizeMode: 'cover',
          }}
        />
        <View style={styles.overlay} />
        {isVisibleFont ? (
          <TextInput
            style={{padding: 10, marginTop: 30}}
            placeholder="Masukkan teks"
            value={userText}
            onChangeText={text => setUserText(text)}
          />
        ) : null}
        <TextFontComponent />
        <StickerComponent />
        <Text
          style={{
            ...styles.textQuote,
            fontFamily: fontSelect.value,
            fontSize: fontSizeDefault,
          }}>
          <Text style={[styles.blur, {fontSize: fontSizeDefault}]}>
            {route?.params?.start}
          </Text>{' '}
          {route?.params?.selectedContent}{' '}
          <Text style={[styles.blur, {fontSize: fontSizeDefault}]}>
            {route?.params?.end}
          </Text>
        </Text>
        <Text style={styles.textMarker}>@EroTales</Text>
      </ViewShot>
    );
  };

  const renderHeaderScreenShot = () => {
    return (
      <View>
        {isVisibleFont ? null : (
          <Pressable onPress={() => setVisible(true)}>
            <Image
              source={imgSticker}
              style={{
                width: 30,
                height: 30,
                position: 'absolute',
                right: 50,
                top: 10,
                resizeMode: 'contain',
              }}
            />
          </Pressable>
        )}
        {isVisibleFont ? (
          <Pressable
            onPress={() => {
              setDraggableItems([...draggableItems, userText]);
              setUserText('');
              setVisibleFont(false);
            }}>
            <Text
              allowFontScaling={false}
              style={{
                color: code_color.black,
                position: 'absolute',
                right: 10,
                fontSize: 18,
                top: 5,
              }}>
              Done
            </Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => setVisibleFont(true)}>
            <Image
              source={imgFont}
              style={{
                width: 30,
                height: 35,
                position: 'absolute',
                right: 10,
                top: 5,
                resizeMode: 'contain',
              }}
            />
          </Pressable>
        )}
      </View>
    );
  };
  return (
    <View style={styles.ctnContent}>
      <ModalStickers
        visible={isVisibleModal}
        onClose={() => setVisible(false)}
        selectSticker={selectedStickerImage => {
          setSticker(prevStickers => [
            ...prevStickers,
            {
              image: selectedStickerImage?.image,
              name: selectedStickerImage?.name,
              x: 0, // example initial position
              y: 0, // example initial position
            },
          ]);
          setVisible(false);
        }}
      />
      <ModalUnlockPremium
        isVisible={modalUnlockFont}
        onClose={() => {
          setModalUnlockFont(false);
          setSelectedFont(null);
        }}
        title={'Unlock this Font\r\nfor Free now'}
        desc={
          'Watch a Video to unlock this new Font for Free or go UNLIMITED to unlock everything!'
        }
        Icon={() => <UnlockFontIcon style={{marginBottom: 20}} width={'50%'} />}
        onSuccess={() => {
          setModalUnlockFont(false);
          setSelectFont(selectedFont);
          Alert.alert('Congrats! You have unlocked the selected Font.', '', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
        }}
      />
      <ModalUnlockPremium
        isVisible={modalUnlockBg}
        onClose={() => {
          setModalUnlockBg(false);
          setSelectedBg(null);
        }}
        title={'Unlock this Background\r\nfor Free now'}
        desc={
          'Watch a Video to unlock this Background for Free or go UNLIMITED to unlock everything!'
        }
        Icon={() => (
          <UnlockBgShareIcon style={{marginBottom: 20}} width={'50%'} />
        )}
        onSuccess={() => {
          setSelectBg(selectedBg);
          setModalUnlockBg(false);
          Alert.alert(
            'Congrats! You have unlocked the selected Background.',
            '',
            [
              {
                text: 'OK',
                onPress: () => {},
              },
            ],
          );
        }}
      />
      <View style={styles.row}>
        <Text style={styles.textTitle}>Share Quote</Text>
        <TouchableOpacity onPress={() => goBack()}>
          <CloseIcon fill={code_color.white} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              flexDirection: isVisibleFont ? 'row' : 'column',
              alignItems: 'center',
            }}>
            {isVisibleFont ? (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: -20,
                  marginLeft: -40,
                }}>
                <Text
                  allowFontScaling={false}
                  style={{color: code_color.white, marginBottom: 40}}>
                  A-
                </Text>
                <View
                  style={{
                    transform: [{rotate: '90deg'}],
                  }}>
                  <Slider
                    step={1}
                    style={{
                      width: 100,
                      height: 100,
                      // transform: [{rotate: '90'}],
                      // marginLeft: -90,
                    }}
                    minimumValue={0}
                    maximumValue={2}
                    value={
                      fontSizeDefault === 18
                        ? 1
                        : fontSizeDefault === 16
                        ? 0
                        : 2
                    }
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#FFFFFF"
                    onValueChange={value => handleFont(value)}
                    thumbTintColor="#ffd500"
                  />
                </View>

                <Text
                  allowFontScaling={false}
                  style={{
                    textAlign: 'right',
                    color: code_color.white,
                    fontSize: 18,
                    marginTop: 40,
                  }}>
                  A+
                </Text>
              </View>
            ) : null}
            {renderScreenShot()}
          </View>

          <View style={styles.conFont}>
            <Text style={styles.title}>CHANGE FONT</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{...styles.title, fontFamily: fontSelect.value}}>
                {fontSelect.name}
              </Text>
              <Pressable onPress={() => setShow(!show)} style={styles.dropDown}>
                {show ? (
                  <UpChevron height={10} width={10} />
                ) : (
                  <DownChevron height={10} width={10} />
                )}
              </Pressable>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[
              styles.conListFont,
              {
                display: show ? undefined : 'none',
              },
            ]}>
            {fontList.map((item, index) => (
              <Pressable
                onPress={() => {
                  setSelectedFont(item);
                  if (userProfile?.data?.subscription?.plan_id != 1) {
                    setSelectFont(item);
                  } else {
                    setModalUnlockFont(true);
                  }
                }}
                key={index}
                style={{
                  ...styles.btnFont,
                  backgroundColor:
                    fontSelect.value === item.value
                      ? code_color.white
                      : undefined,
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 0,
                    color:
                      fontSelect.value === item.value
                        ? code_color.blackDark
                        : code_color.white,
                  }}>
                  {item.name}
                </Text>
                {userProfile?.data?.subscription?.plan_id === 1 &&
                fontSelect.name !== item.name ? (
                  <>
                    <View
                      style={{
                        position: 'absolute',
                        top: -2,
                        left: -1,
                        backgroundColor: code_color.black,
                        height: 18,
                        width: 18,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Lock width={9} />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: -6,
                        right: -8,
                        backgroundColor: code_color.pink,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                      }}>
                      <Watch fill={code_color.white} height={12} width={12} />
                      <Text
                        style={{
                          color: code_color.white,
                          fontSize: 8,
                          fontWeight: '700',
                          marginLeft: 2,
                        }}>
                        Free
                      </Text>
                    </View>
                  </>
                ) : null}
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.hr} />
          <Text style={{...styles.title, textAlign: 'center'}}>
            Choose Background
          </Text>
          <SafeAreaView style={{width: '100%', height: 80, marginTop: 20}}>
            <ScrollView horizontal style={styles.horizontalScroll}>
              {backgroundList.map((bgl, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{
                    height: 75,
                    width: 75,
                    marginRight: 12,
                  }}
                  onPress={() => {
                    setSelectedBg(bgl);
                    if (userProfile?.data?.subscription?.plan_id != 1) {
                      setSelectBg(bgl);
                      setSelectedBg(null);
                    } else {
                      setModalUnlockBg(true);
                    }
                  }}>
                  <Image
                    source={bgl}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: 8,
                      borderColor: code_color.yellow,
                      borderWidth: bgl === selectBg ? 2 : 0,
                    }}
                  />
                  {userProfile?.data?.subscription?.plan_id != 1 &&
                  bgl !== selectBg ? (
                    <LockFree
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 4,
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
          <View style={styles.hr} />
        </View>
        {renderCard()}
      </ScrollView>
      {renderTutorial()}
    </View>
  );
}

export default connect(states, dispatcher)(ScreenShare);