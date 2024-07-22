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
  TouchableNativeFeedback,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
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
  logo,
  icon,
  iconBlack,
  bgRelationReal,
  bgMissReal,
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
import {loadRewarded, loadRewardedImage} from '../../helpers/loadReward';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';
import PlayStore from '../../assets/icons/playStore';
import AppStore from '../../assets/icons/appStore';
import FastImage from 'react-native-fast-image';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {hp} from '../../utils/screen';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { STORY_SHARED, eventTracking } from '../../helpers/eventTracking';

function ScreenShare({
  route,
  stepsTutorial,
  handleSetSteps,
  isPremium,
  userProfile,
  id,
  title,
  handleSetBgShare,
  handleSetFontFamily,
  fontFamily,
  bgShare
}) {
  const [isVisibleModal, setVisible] = useState(false);
  const [isVisibleFont, setVisibleFont] = useState(false);
  const [modalUnlockFont, setModalUnlockFont] = useState(false);
  const [modalUnlockBg, setModalUnlockBg] = useState(false);
  const [loadingAds, setLoadingAds] = useState(false);
  const [selectBg, setSelectBg] = useState(bgShare);
  const [selectedBg, setSelectedBg] = useState<any>(null);
  const [show, setShow] = useState(true);
  const [captureUri, setCaptureUri] = useState(null);
  const [fontSizeDefault, setFontSize] = useState(18);
  const [fontSelect, setSelectFont] = useState({
    name: fontFamily,
    value: `${fontFamily}`,
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
  const [dinamicLink, setDinamicLink] = useState('');
  const captureRef = useRef();
  const base64CaptureImage = useRef(null);
  const [viewShotLayout, setViewShotLayout] = useState(null);
  const backgroundList = [ userProfile.data?.type === 'realistic' ? bgRelationReal : bg, userProfile.data?.type === 'realistic'? bgMissReal : story2, bgShare2, bgShare3, bgShare4];
  const downloadText = `The *EroTales App* has the best free Romantic Stories ever! I just found this one:\n*${route?.params?.title}*\nCheck out the Story here:\n${dinamicLink}\n\nCheck the EroTales App out now for free on https://EroTalesApp.com or Download the App directly *for free* on the AppStore or Google Play.`;
  const downloadTextFb = `The EroTales App has the best free Romantic Stories ever! I just found this one:\n*${route?.params?.title}*\nCheck out the Story here:\n${dinamicLink}\n\nCheck the EroTales App out now for free on https://EroTalesApp.com or Download the App directly for free on the AppStore or Google Play.`;
  // const downloadText = `The EroTales App has the best Romantic Stories ever! I just found this one:${route?.params?.title} Check the EroTales App out now on https://EroTalesApp.com or Download the App directly on the AppStore or Google Play.`;
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

  const isSameFont = (name: string) => {
    return fontSelect.name
      ?.toUpperCase()
      ?.replace(/ /g, '')
      .includes(name?.toUpperCase()?.replace(/ /g, ''));
  };
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
    setSelected(route?.params?.selectedContent);
  }, [route?.params?.selectedContent]);
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
                handleSetFontFamily(selectedFont.value);
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
    const advert = await loadRewardedImage();
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
                  handleSetBgShare(selectedBg)
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
    eventTracking(STORY_SHARED);
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

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: userProfile.data?.type === 'realistic' ? `https://erotalesapp.page.link/dhgB?storyId=${id}` :`https://erotalesapp.page.link/Tbeh?storyId=${id}`,
          domainUriPrefix: 'https://erotalesapp.page.link',
          android: {
            packageName: 'app.erotales',
          },
          ios: {
            appStoreId: '6463850368',
            bundleId: 'apps.romanticstory',
            fallbackUrl: 'https://apps.apple.com/app/id6463850368?efr=1',
          },
          navigation: {
            forcedRedirectEnabled: true
          },
          suffix: {
            option: 'SHORT',
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );
      return link;
    } catch (error) {
      console.error('Error generating link:', error);
      return ''; // return a default or error value
    }
  };
  useEffect(() => {
    async function setLinks() {
      setDinamicLink(await generateLink());
    }
    setLinks();
  }, []);
  const handleWAShare = async () => {
    await handleShare();
    Clipboard.setString(downloadText);
    Alert.alert(
      '',
      'Copied to your pasteboard\nText and hastags ready to be pasted\nin your caption. \r\n \r\nDon’t forget to tag us at\r\n@EroTalesApp',
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
    Clipboard.setString(downloadTextFb);
    Alert.alert(
      '',
      'Copied to your pasteboard\nText and hastags ready to be pasted\nin your caption. \r\n \r\nDon’t forget to tag us at\r\n@EroTalesApp',
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
    Clipboard.setString(downloadTextFb);
    Alert.alert(
      '',
      'Copied to your pasteboard\nText and hastags ready to be pasted\nin your caption. \r\n \r\nDon’t forget to tag us at\r\n@EroTalesApp',
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
            icon={<Whatsapp width={hp(29)} height={hp(29)} />}
            onPress={handleWAShare}
          />
          <Card
            label="Instagram Stories"
            icon={<InstagramStory width={hp(29)} height={hp(29)} />}
            onPress={handleIGStoryShare}
          />
          <Card
            label="Instagram"
            icon={<Instagram width={hp(29)} height={hp(29)} />}
            onPress={handleShareInstagramDefault}
          />
          <Card
            label="Facebook Stories"
            icon={<FBStory width={hp(29)} height={hp(29)} />}
            onPress={handleSharetoFBStory}
          />
          <Card
            label="Facebook"
            icon={<FB width={hp(29)} height={hp(29)} />}
            onPress={handleShareFBDefault}
          />
          <Card
            label="Save Image"
            icon={<Save width={hp(29)} height={hp(29)} />}
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
            <TouchableNativeFeedback
              onLongPress={() => {
                setVisibleFont(true);
                setUserText(el?.text);
                const updatedItems = draggableItems.filter(
                  (item, idx) => idx !== i,
                );
                setDraggableItems(updatedItems);
              }}>
              <View
                style={{
                  padding: 5,
                  paddingLeft: 0,
                  paddingRight: 0,
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
            </TouchableNativeFeedback>
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

  const renderImage = () => (
    <View
      style={{
        position: 'absolute',
        width: sizing.getDimensionWidth(0.75),
        height: 'auto',
        marginHorizontal: 'auto',
        top: -sizing.getDimensionHeight(1),
      }}>
      <ViewShot
        style={{
          ...styles.conQuote,
          width: '100%',
          borderRadius: 0,
        }}
        onLayout={(event: any) => {
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
          resizeMode="cover"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor:
              selectBg != null ? 'rgba(0, 0, 0, 0.3)' : undefined,
          }}
        />
        <TextFontComponent />
        <StickerComponent />
        <Text
          style={{
            ...styles.textQuote,
            fontFamily: fontSelect.value,
            fontSize: moderateScale(16),
            marginHorizontal: moderateScale(20),
            color:
              selectBg === story2 ||
              selectBg === bg ||
              selectBg === bgShare2 ||
              selectBg === bgShare3 ||
              selectBg === bgShare4 ||
              selectBg === bgMissReal ||
              selectBg === bgRelationReal 
                ? 'white'
                : 'black',
          }}>
          <Text style={[styles.blur, {fontSize: 16}]}>
            ...{route?.params?.start}
          </Text>{' '}
          {selected}{' '}
          <Text style={[styles.blur, {fontSize: 16}]}>
            {route?.params?.end}...
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color:
                selectBg === story2 ||
                selectBg === bg ||
                selectBg === bgShare2 ||
                selectBg === bgShare3 ||
                selectBg === bgShare4 ||
                selectBg === bgMissReal ||
                selectBg === bgRelationReal 
                  ? 'white'
                  : 'black',
              fontSize: moderateScale(16),
              fontWeight: '600',
              textAlign: 'center',
              bottom: moderateScale(20),
            }}>
            @EroTalesApp
          </Text>
          <Image
            source={
              selectBg === story2 ||
              selectBg === bg ||
              selectBg === bgShare2 ||
              selectBg === bgShare3 ||
              selectBg === bgShare4 ||
              selectBg === bgMissReal ||
              selectBg === bgRelationReal 
                ? icon
                : iconBlack
            }
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              marginLeft: 10,
              bottom: moderateScale(20),
            }}
          />
        </View>
      </ViewShot>
    </View>
  );

  const renderLayout = () => {
    return (
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: code_color.white,
          borderRadius: moderateScale(24),
          width: '94%',
          height: 'auto',
          marginHorizontal: 'auto',
          // marginBottom: 20
          // paddingTop: 40
        }}>
        <View style={styles.conQuote}>
          <FastImage
            source={selectBg}
            resizeMode="cover"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: 24,
            }}
          />
          <View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: selectBg != null ? 'rgba(0, 0, 0, 0.3)' : null,
              borderRadius: moderateScale(24),
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
                flex: 0,
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
              color:
                selectBg === story2 ||
                selectBg === bg ||
                selectBg === bgShare2 ||
                selectBg === bgShare3 ||
                selectBg === bgShare4 ||
                selectBg === bgMissReal ||
                selectBg === bgRelationReal 
                  ? 'white'
                  : 'black',
            }}>
            <Text style={[styles.blur, {fontSize: 16}]}>
              ...{route?.params?.start}
            </Text>{' '}
            {selected}{' '}
            <Text style={[styles.blur, {fontSize: 16}]}>
              {route?.params?.end}...
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color:
                  selectBg === story2 ||
                  selectBg === bg ||
                  selectBg === bgShare2 ||
                  selectBg === bgShare3 ||
                  selectBg === bgShare4 ||
                  selectBg === bgMissReal ||
                  selectBg === bgRelationReal 
                    ? 'white'
                    : 'black',
                fontSize: moderateScale(16),
                fontWeight: '600',
                textAlign: 'center',
                bottom: moderateScale(20),
              }}>
              @EroTalesApp
            </Text>
            <Image
              source={
                selectBg === story2 ||
                selectBg === bg ||
                selectBg === bgShare2 ||
                selectBg === bgShare3 ||
                selectBg === bgShare4 ||
                selectBg === bgMissReal ||
                selectBg === bgRelationReal 
                  ? icon
                  : iconBlack
              }
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                marginLeft: 10,
                bottom: moderateScale(20),
              }}
            />
          </View>
        </View>
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
              if (userText != '') {
                const value = {text: userText};
                setDraggableItems([...draggableItems, value]);
                setUserText('');
                setVisibleFont(false);
              } else {
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
        <TouchableOpacity
          onPress={() => {
            resetParams({selectedContent: null});
            goBack();
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
            {renderImage()}
          </View>

          <View style={styles.conFont}>
            <Text style={styles.title}>CHANGE FONT</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{...styles.title, fontFamily: fontSelect.value}}>
                {fontSelect.name}
              </Text>
              <Pressable onPress={() => setShow(!show)} style={styles.dropDown}>
                {show ? (
                  <UpChevron height={hp(10)} width={hp(10)} />
                ) : (
                  <DownChevron height={hp(10)} width={hp(10)} />
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
                    handleSetFontFamily(item.value);
                    setSelectFont(item);
                  } else if (!isSameFont(item.name)) {
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
                    paddingHorizontal: hp(20),
                    paddingVertical: 0,
                    fontFamily: item?.value,
                    fontSize: moderateScale(14),
                    color:
                    fontSelect.value === item.value
                        ? code_color.blackDark
                        : code_color.white,
                  }}>
                  {item.name}
                </Text>
                {userProfile?.data?.subscription?.plan_id === 1 &&
                !isSameFont(item.name) ? (
                  <>
                    <View
                      style={{
                        position: 'absolute',
                        top: hp(-2),
                        left: hp(-1),
                        backgroundColor: code_color.black,
                        height: hp(18),
                        width: hp(18),
                        borderRadius: hp(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Lock width={hp(9)} />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: hp(-6),
                        right: hp(-8),
                        backgroundColor: code_color.pink,
                        borderRadius: hp(8),
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: hp(5),
                        paddingVertical: hp(2),
                      }}>
                      <Watch
                        fill={code_color.white}
                        height={hp(12)}
                        width={hp(12)}
                      />
                      <Text
                        style={{
                          color: code_color.white,
                          fontSize: moderateScale(8),
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
          <SafeAreaView style={{width: '100%', height: hp(80), marginTop: 20}}>
            <ScrollView horizontal style={styles.horizontalScroll}>
              {backgroundList.map((bgl, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{
                    height: hp(75),
                    width: hp(75),
                    marginRight: hp(12),
                  }}
                  onPress={() => {
                    setSelectedBg(bgl);
                    if (userProfile?.data?.subscription?.plan_id != 1) {
                      setSelectBg(bgl);
                      handleSetBgShare(bgl)
                      setSelectedBg(null);
                    } else if(bgl !== selectBg) {
                      setModalUnlockBg(true);
                    }
                  }}>
                  <Image
                    source={bgl}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: hp(8),
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
                      height={hp(20)}
                      width={hp(70)}
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
