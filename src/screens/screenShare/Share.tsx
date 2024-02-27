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
  Clipboard,
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
import Save from '../../assets/icons/save';
import UpChevron from '../../assets/icons/upChevron';
import Lock from './../../assets/icons/lock';
import Watch from './../../assets/icons/watch';
import LockFree from './../../assets/icons/lockFree';
import UnlockFontIcon from './../../assets/icons/unlockFont';
import UnlockBgShareIcon from './../../assets/icons/unlockBgShare';
import IconChecklistColor from './../../assets/icons/iconChecklistTosca';

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
} from '../../assets/images';
import Card from '../../components/card';
import {fontList} from '../../utils/constants';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ViewShot from 'react-native-view-shot';
import Share, {Social} from 'react-native-share';
import {moderateScale} from 'react-native-size-matters';
import {sizing} from '../../shared/styling';
import {isIphone} from '../../utils/devices';
import {goBack, navigate, reset, resetParams} from '../../shared/navigationRef';
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
import {loadRewarded} from '../../helpers/loadReward';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';
import PlayStore from '../../assets/icons/playStore';
import AppStore from '../../assets/icons/appStore';
import FastImage from 'react-native-fast-image';

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
  const [loadingAds, setLoadingAds] = useState(false);
  const [selectBg, setSelectBg] = useState(null);
  const [selectedBg, setSelectedBg] = useState<any>(null);
  const [show, setShow] = useState(true);
  const [captureUri, setCaptureUri] = useState(null);
  const [fontSizeDefault, setFontSize] = useState(18);
  const [fontSelect, setSelectFont] = useState({
    name: 'Roboto',
    value: 'Roboto-Regular',
  });
  const [selectedFont, setSelectedFont] = useState({
    name: '',
    value: '',
  });
  const [showModalSave, setShowModalSave] = useState(false);
  const [sticker, setSticker] = useState([]);
  const [userText, setUserText] = useState('');
  const [draggableItems, setDraggableItems] = useState([]);
  const [selected, setSelected] = useState('');
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
  const backgroundList = [bg, story2, bgShare2, bgShare3, bgShare4];
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

  useEffect(() => {
    setSelected(route?.params?.selectedContent)
  }, [route?.params?.selectedContent])
  const showInterStialFont = async () => {
    setLoadingAds(true);
    const advert = await loadRewarded();
    const pageCountDownReward = advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('Earn page countdown reward:', reward);
        if (reward) {
          Alert.alert('Congrats! You have unlocked the selected Font.', '', [
            {
              text: 'OK',
              onPress: () => {
                setSelectFont(selectedFont);
                setModalUnlockFont(false);
              },
            },
          ]);
        }
        setLoadingAds(false);
      },
    );
  };

  const showInterStialBg = async () => {
    setLoadingAds(true);
    const advert = await loadRewarded();
    const pageCountDownReward = advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('Earn page countdown reward:', reward);
        if (reward) {
          Alert.alert(
            'Congrats! You have unlocked the selected Background.',
            '',
            [
              {
                text: 'OK',
                onPress: () => {
                  setSelectBg(selectedBg);
                  setModalUnlockBg(false);
                },
              },
            ],
          );
        }
        setLoadingAds(false);
      },
    );
  };
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

  const [isSaveImage, setIsSaveImage] = useState(false);
  useEffect(() => {
    async function saveImage() {
      const contentURL = isIphone ? base64CaptureImage.current : captureUri;
      if (Platform.OS === 'android' && Platform.Version?.toString() < 30) {
        if (await hasAndroidPermission()) {
          await CameraRoll.save(contentURL);
          setShowModalSave(true);
          setTimeout(() => {
            setShowModalSave(false);
          }, 1000);
        } else {
          return;
        }
      } else {
        await CameraRoll.save(contentURL);
        setShowModalSave(true);
        setTimeout(() => {
          setShowModalSave(false);
        }, 1000);
      }
      setIsSaveImage(false);
    }

    if (isSaveImage) {
      saveImage();
    }
  }, [isSaveImage]);

  const handleSaveImage = async () => {
    try {
      await handleShare();
      setTimeout(() => {
        setIsSaveImage(true);
      }, 500);
    } catch (err) {
      console.log('Err save:', err);
      setIsSaveImage(false);
    }
  };

  const handleScreenshot = async () => {
    await captureRef.current
      .capture()
      .then((uri: string) => {
        const uriArray = uri.split('/');
        const nameToChange = uriArray[uriArray.length - 1];
        const renamedURI = uri.replace(
          nameToChange,
          `EroTales - ${route?.params?.selectedContent.substring(
            0,
            10,
          )} ${Date.now()}.png`,
        );

        RNFS.copyFile(uri, renamedURI)
          .then(async () => {
            setCaptureUri(renamedURI);
            RNFS.readFile(renamedURI, 'base64').then(res => {
              const base64File = `data:image/png;base64,${res}`;
              base64CaptureImage.current = base64File;
            });
          })
          .catch(err => {
            console.log('Error:', err.message);
          });
      })
      .catch((err: {message: any}) => {
        console.log('Capture Error:', err.message);
      });
  };
  const handleWAShare = async () => {
    await handleShare();
    Clipboard.setString(downloadText);
    Alert.alert(
      '',
      'Copied to your pasteboard Text and hastags ready to be pasted in your caption. \r\n \r\nDon’t forget to tag us at\r\n@EroTalesApp',
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              await Share.open({
                url: base64CaptureImage.current!,
                title: 'Shared-Short-Story',
              });
            } catch (err) {
              console.log('Error share whatsapp:', err);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleIGStoryShare = async () => {
    await handleShare();
    setTimeout(async () => {
      try {
        const contentURL = isIphone ? base64CaptureImage.current : captureUri;
        await Share.shareSingle({
          backgroundImage: contentURL!, // url or an base64 string
          social: Share.Social.INSTAGRAM_STORIES,
          appId: '637815961525510', // facebook appId
        });
      } catch (err) {
        console.log('Error share ig story:', err);
      }
    }, 200);
  };
  const handleShareInstagramDefault = async () => {
    await handleShare();
    Clipboard.setString(downloadText);
    Alert.alert(
      '',
      'Copied to your pasteboard Text and hastags ready to be pasted in your caption. \r\n \r\nDon’t forget to tag us at\r\n@EroTalesApp',
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              const contentURL = isIphone
                ? base64CaptureImage.current
                : captureUri;
              await Share.shareSingle({
                title: 'Share image to instagram',
                type: 'image/jpeg',
                url: contentURL,
                social: Share.Social.INSTAGRAM,
              });
            } catch (err) {
              console.log('Err share default ig:', err);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleSharetoFBStory = async () => {
    await handleShare();
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
    await handleShare();
    Clipboard.setString(downloadText);
    Alert.alert(
      '',
      'Copied to your pasteboard Text and hastags ready to be pasted in your caption. \r\n \r\nDon’t forget to tag us at\r\n@EroTalesApp',
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              const contentURL = isIphone
                ? base64CaptureImage.current
                : captureUri;
              await Share.shareSingle({
                url: contentURL!,
                social: Social.Facebook,
              });
            } catch (err) {
              console.log('Err fb default:', err);
            }
          },
        },
      ],
      {cancelable: false},
    );
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
          <Card
            label="Save Image"
            icon={<Save width="100%" height="100%" />}
            onPress={handleSaveImage}
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
            <View
              style={{
                padding: 5,
                paddingLeft: 0, paddingRight: 0,
                borderRadius: 10,
                minWidth: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <Text
                key={i}
                style={{
                  fontSize: fontSizeDefault,
                  color: 'white',
                  textAlign: 'center',
                }}>
                {el?.text}
              </Text>
            </View>
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
                width: 50,
                height: 50,
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

  function renderModalSave() {
    if (showModalSave === true) {
      return (
        <Modal
          visible={showModalSave}
          animationType="fade"
          transparent
          onDismiss={() => {
            setShowModalSave(false);
          }}>
          <View
            style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: '#000000',
                paddingHorizontal: moderateScale(40),
                borderRadius: moderateScale(20 / 2),
                paddingVertical: moderateScale(10),
              }}>
              <View
                style={{
                  width: moderateScale(30),
                  height: moderateScale(30),
                  // resizeMode: 'contain',
                  alignSelf: 'center',
                }}>
                <IconChecklistColor width="100%" height="100%" />
              </View>
              <Text
                style={{
                  fontSize: moderateScale(10),
                  color: '#ffffff',
                  textAlign: 'center',
                  marginTop: 8,
                }}>
                Image Saved
              </Text>
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }

  const windowHeight = Dimensions.get('window').height;

  const renderLayout = () => {
    return (
      <View
        style={{
          position: 'relative',
          backgroundColor: code_color.white,
          borderRadius: moderateScale(24),
          width: '90%',
          height: 'auto',
          // marginBottom: 20
          // paddingTop: 40
        }}>
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
          <FastImage
            source={selectBg}
            resizeMode='cover'
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: 24,
             
            }}
          />
          {isVisibleFont ? (
            <TextInput
              style={{
                padding: 10,
                marginTop: 30,
                color: 'white',
                fontSize: fontSizeDefault,
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                width: 'auto',
                flex: 0
              }}
              autoFocus={true}
              placeholder=""
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
              fontSize: moderateScale(16),
              marginHorizontal: moderateScale(20),
              color: selectBg === story2 || selectBg === bg || selectBg === bgShare3 ? 'white' : 'black'
            }}>
            <Text style={[styles.blur, {fontSize: 16, }]}>
              {route?.params?.start}
            </Text>{' '}
            {selected}{' '}
            <Text style={[styles.blur, {fontSize: 16}]}>
              {route?.params?.end}
            </Text>
          </Text>
          <Text
            style={{
              color: code_color.black,
              fontSize: moderateScale(18),
              fontWeight: '600',
              textAlign: 'center',
              bottom: moderateScale(20),
            }}>
            @EroTales
          </Text>
        </ViewShot>
        {renderHeaderScreenShot()}
        {renderModalSave()}
        {/* <View style={styles.overlay} /> */}
      </View>
    );
  };
  const renderHeaderScreenShot = () => {
    return (
      <View
        style={{flexDirection: 'row', position: 'absolute', top: 0, right: 0}}>
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
                marginBottom: 10,
              }}
            />
          </Pressable>
        )}
        {isVisibleFont ? (
          <Pressable
            style={{
              position: 'absolute',
              right: 10,
              top: 5,
            }}
            onPress={() => {
              if(userText != ''){
                const value = {text: userText};
                setDraggableItems([...draggableItems, value]);
                setUserText('');
                setVisibleFont(false);
              }else{
                setVisibleFont(false);
              }
             
            }}>
            <Text
              allowFontScaling={false}
              style={{
                color: code_color.black,
                position: 'absolute',
                right: 0,
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
        Icon={() => (
          <UnlockFontIcon
            style={{marginBottom: 20}}
            width={'50%'}
            fontBefore={fontSelect.value}
            fontAfter={selectedFont.value}
          />
        )}
        isLoadingAds={loadingAds}
        onSuccess={() => {
          showInterStialFont();
          // setModalUnlockFont(false);
          // setSelectFont(selectedFont);
          // Alert.alert('Congrats! You have unlocked the selected Font.', '', [
          //   {
          //     text: 'OK',
          //     onPress: () => {},
          //   },
          // ]);
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
        isLoadingAds={loadingAds}
        onSuccess={showInterStialBg}
      />
      <View style={styles.row}>
        <Text style={styles.textTitle}>Share Quote</Text>
        <TouchableOpacity onPress={() => {
          resetParams({ selectedContent: null }); 
          goBack()
        }}>
          <CloseIcon fill={code_color.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex: 1, width: '100%', marginBottom: 50}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              alignItems: 'center',
            }}>
            {isVisibleFont ? (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: moderateScale(50),
                  left: -80,
                  zIndex: 1,
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
            {/* {renderScreenShot()} */}
            {renderLayout()}
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
          <SafeAreaView style={{width: '100%', height: 80, marginTop: 20,}}>
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
                  {userProfile?.data?.subscription?.plan_id === 1 &&
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
    </View>
  );
}

export default connect(states, dispatcher)(ScreenShare);
