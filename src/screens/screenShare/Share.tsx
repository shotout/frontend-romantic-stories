/* eslint-disable react-hooks/exhaustive-deps */
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

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import styles from './styles';
import {code_color} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
import Share from 'react-native-share';
import {moderateScale} from 'react-native-size-matters';
import {sizing} from '../../shared/styling';
import {isIphone} from '../../utils/devices';
import {goBack, navigate} from '../../shared/navigationRef';
import ModalStickers from '../../components/modal-stickers';
import Gestures from '../../components/Gestures/gestures';
import Slider from '@react-native-community/slider';

function ScreenShare({route}) {
  const [isVisibleModal, setVisible] = useState(false);
  const [isVisibleFont, setVisibleFont] = useState(false);
  const [selectedBg, setSetselectedBg] = useState(null);
  const [show, setShow] = useState(true);
  const [captureUri, setCaptureUri] = useState(null);
  const [fontSizeDefault, setFontSize] = useState(18);
  const [fontSelect, setSelectFont] = useState({
    name: 'Georgia',
    value: 'GeorgiaEstate-w15Mn',
  });
  const [sticker, setSticker] = useState([]);
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
  //   const panResponder = PanResponder.create({
  //     onStartShouldSetPanResponder: (evt, gestureState) => {
  //       console.log('onStartShouldSetPanResponder');
  //       return true;
  //     },
  //     onMoveShouldSetPanResponder: (evt, gestureState) => {
  //       console.log('onMoveShouldSetPanResponder');
  //       return true;
  //     },
  //     onPanResponderMove: Animated.event(
  //       [null, {dx: stickerConfig.x, dy: stickerConfig.y}],
  //       {useNativeDriver: false},
  //   ),
  //     // Add other callbacks as needed
  //   });
  //   const resizePanResponder = PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderMove: (e, gestureState) => {
  //       setSize(prevSize => ({
  //         width: prevSize.width + gestureState.dx,
  //         height: prevSize.height + gestureState.dy,
  //     }));
  //     },
  // });

  const handleShare = () => {
    handleScreenshot();
  };

  // useEffect(() => {
  //   if (!isVisible) {
  //     base64CaptureImage.current = null;
  //   }
  // }, [isVisible]);

  useEffect(() => {
    setTimeout(async () => {
      handleShare();
    }, 1000);
  }, [route.params.selectedContent]);

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
    try {
      // await Share.shareSingle(shareOptions);
      await Share.open({
        url: base64CaptureImage.current,
        title: 'Shared-Short-Story',
      });
    } catch (err) {
      console.log('Error share whatsapp:', err);
    }
  };

  const handleIGStoryShare = async () => {
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
  };

  const handleShareInstagramDefault = async () => {
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
  };

  const handleSharetoFBStory = async () => {
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
  };

  const handleShareFBDefault = async () => {
    try {
      const contentURL = isIphone ? base64CaptureImage.current : captureUri;
      await Share.shareSingle({
        url: contentURL,
        appId: '637815961525510', // facebook appId
        backgroundBottomColor: '#fff',
        backgroundTopColor: '#fff',
        type: 'image/*',
        social: Share.Social.FACEBOOK,
      });
    } catch (err) {
      console.log('Err fb default:', err);
    }
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
  function StickerComponent(props: any) {
    console.log(JSON.stringify(sticker));
    return (
      <View>
        {sticker.map((el: any, i: any) => (
          <Gestures
            key={i}
            style={el.styles}
            onChange={(_event: any, styles: any) => {
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

    // Ambil x, y, dan properti lain dari props
    // Gunakan x dan y untuk mengatur posisi gambar/stiker
    // return (
    //   // Asumsi Sticker adalah gambar
    //   <Animated.View
    //     style={{
    //       transform: [
    //         {translateX: pan.x},
    //         {translateY: pan.y},
    //         {scaleX: size.width / 100}, // asumsi ukuran awal sticker 100x100
    //         {scaleY: size.height / 100},
    //       ],
    //       width: 100,
    //       height: 100,
    //       position: 'absolute',
    //     }}
    //     {...panResponder.panHandlers}>
    //     <Image source={imgGift1} style={{flex: 1}} resizeMode="cover" />
    //     <View
    //       style={{
    //         position: 'absolute',
    //         right: 0,
    //         bottom: 0,
    //         width: 30,
    //         height: 30,
    //         backgroundColor: 'blue',
    //       }}
    //       {...resizePanResponder.panHandlers}
    //     />
    //   </Animated.View>
    // );
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
      <View style={styles.row}>
        <Text style={styles.textTitle}>Share Quote</Text>
        <TouchableOpacity onPress={() => goBack()}>
          <CloseIcon fill={code_color.white} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, width: '100%'}}>
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
                  marginLeft: -40
                }}>
                <Text
                  allowFontScaling={false}
                  style={{color: code_color.white, marginBottom: 40}}>
                  A-
                </Text>

                <Slider
                  step={1}
                  style={{
                    width: 100,
                    height: 100,
                    transform: [{rotate: '90deg'}],
                    // marginLeft: -90,
                  }}
                  minimumValue={0}
                  maximumValue={2}
                  value={
                    fontSizeDefault === 18 ? 1 : fontSizeDefault === 16 ? 0 : 2
                  }
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#FFFFFF"
                  onValueChange={value => handleFont(value)}
                  thumbTintColor="#ffd500"
                />
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
            <ViewShot
              style={styles.conQuote}
              ref={captureRef}
              options={{
                fileName: `Shortstory${Date.now()}`,
                format: 'png',
                quality: 1.0,
              }}>
              <Image
                source={selectedBg}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 24,
                  resizeMode: 'cover',
                }}
              />
              <View style={styles.overlay} />

              <StickerComponent
              // {...panResponder.panHandlers}
              // {...resizePanResponder.panHandlers}
              />
              {isVisibleFont ? null : 
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
              </Pressable> }
              {isVisibleFont ? <Pressable onPress={() => 
                setVisibleFont(false)
                }>
                <Text allowFontScaling={false} style={{color: code_color.black,  position: 'absolute',
                    right: 10,
                    fontSize: 18,
                    top: 5,}}>Done</Text>
                </Pressable> : 
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
              </Pressable> }

              <Text style={{...styles.textQuote, fontFamily: fontSelect.value, fontSize: fontSizeDefault}}>
                <Text style={[styles.blur, { fontSize: fontSizeDefault}]}>{route?.params?.start}</Text>{' '}
                {route?.params?.selectedContent}{' '}
                <Text  style={[styles.blur, { fontSize: fontSizeDefault}]}>{route?.params?.end}</Text>
              </Text>
              <Text style={styles.textMarker}>@EroTales</Text>
            </ViewShot>
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
                  setSelectFont(item);
                }}
                style={{
                  ...styles.btnFont,
                  backgroundColor:
                    fontSelect.value === item.value ? code_color.white : null,
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
                  onPress={() => setSetselectedBg(bgl)}>
                  <Image
                    source={bgl}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: 8,
                      borderColor: code_color.yellow,
                      borderWidth: bgl === selectedBg ? 2 : 0,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
          <View style={styles.hr} />
        </View>
        {renderCard()}
      </View>
    </View>
  );
}

export default connect(states, dispatcher)(ScreenShare);
