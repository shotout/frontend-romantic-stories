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
} from '../../assets/images';
import Card from '../card';
import {fontList} from '../../utils/constants';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {moderateScale} from 'react-native-size-matters';
import {sizing} from '../../shared/styling';
import {isIphone} from '../../utils/devices';

function ModalShare({isVisible, onClose, selectedContent, start, end}) {
  const [selectedBg, setSetselectedBg] = useState(null);
  const [show, setShow] = useState(true);
  const [captureUri, setCaptureUri] = useState(null);
  const [fontSelect, setSelectFont] = useState({
    name: 'Georgia',
    value: 'GeorgiaEstate-w15Mn',
  });

  const captureRef = useRef();
  const base64CaptureImage = useRef(null);

  const backgroundList = [bg, story2, bgShare1, bgShare2, bgShare3, bgShare4];
  const downloadText = 'I found this fact on the ShortStory App';

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleShare = () => {
    handleScreenshot();
  };

  useEffect(() => {
    if (captureUri) {
      RNFS.readFile(captureUri, 'base64').then(res => {
        const base64File = `data:image/png;base64,${res}`;
        base64CaptureImage.current = base64File;
      });
    }
  }, [captureUri]);

  useEffect(() => {
    if (isVisible) {
      handleShare();
    }
  }, [isVisible]);

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

  const handleScreenshot = () => {
    captureRef.current
      .capture()
      .then(uri => {
        const uriArray = uri.split('/');
        const nameToChange = uriArray[uriArray.length - 1];
        const renamedURI = uri.replace(
          nameToChange,
          `EroTales - ${selectedContent.substring(0, 10)} ${Date.now()}.png`,
        );

        RNFS.copyFile(uri, renamedURI)
          .then(async () => {
            setCaptureUri(renamedURI);
          })
          .catch(err => {
            console.log('Error:', err.message);
          });
      })
      .catch(err => {
        console.log('Capture Error:', err.message);
      });
  };

  const shareOptions = {
    url: base64CaptureImage.current,
    // message: downloadText,
    social: Share.Social.WHATSAPP,
    filename: 'Shared-Short-Story.png',
    title: 'Shared-Short-Story',
  };
  const handleWAShare = async () => {
    try {
      console.log('OKEOKE START', shareOptions.url.substring(0, 100));
      await Share.shareSingle(shareOptions);
      // await Share.open(shareOptions);
      console.log('OKEOKE SUCCESS');
    } catch (err) {
      console.log('OKEOKE ERROR', err);
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

  function renderScreenshot() {
    return (
      <ViewShot
        // style={styles.ctnViewShot}
        style={{
          position: 'absolute',
          top: sizing.getDimensionHeight(-100),
          backgroundColor: code_color.white,
          height: 'auto',
        }}
        ref={captureRef}
        options={{
          fileName: `Shortstory${Date.now()}`,
          format: 'png',
          quality: 1.0,
        }}>
        {renderShareContent()}
      </ViewShot>
    );
  }

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

  const renderShareContent = () => {
    return (
      <>
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
        <Text style={{...styles.textQuote, fontFamily: fontSelect.value}}>
          <Text style={styles.blur}>{start}</Text> {selectedContent}{' '}
          <Text style={styles.blur}>{end}</Text>
        </Text>
        <Text style={styles.textMarker}>@EroTales</Text>
      </>
    );
  };

  return (
    <>
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent
        onDismiss={handleClose}>
        {renderScreenshot()}
        <View style={styles.ctnContent}>
          <View style={styles.row}>
            <Text style={styles.textTitle}>Share Quote</Text>
            <TouchableOpacity onPress={handleClose}>
              <CloseIcon fill={code_color.white} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleShare}>
              <CloseIcon fill={code_color.white} />
            </TouchableOpacity> */}
          </View>
          <ScrollView style={{flex: 1, width: '100%'}} horizontal={false}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={styles.conQuote}>
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
                <Text
                  style={{...styles.textQuote, fontFamily: fontSelect.value}}>
                  <Text style={styles.blur}>{start}</Text> {selectedContent}{' '}
                  <Text style={styles.blur}>{end}</Text>
                </Text>
                <Text style={styles.textMarker}>@EroTales</Text>
              </View>
              <View style={styles.conFont}>
                <Text style={styles.title}>CHANGE FONT</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{...styles.title, fontFamily: fontSelect.value}}>
                    {fontSelect.name}
                  </Text>
                  <Pressable
                    onPress={() => setShow(!show)}
                    style={styles.dropDown}>
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
                        fontSelect.value === item.value
                          ? code_color.white
                          : null,
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
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

ModalShare.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedContent: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

ModalShare.defaultProps = {};

export default connect(states, dispatcher)(ModalShare);
