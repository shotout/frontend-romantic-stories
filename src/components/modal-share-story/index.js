/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  Clipboard,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {moderateScale} from 'react-native-size-matters';
import CopyIcon from '../../assets/icons/copy';
import MessageIcon from '../../assets/icons/message';
import WAIcon from '../../assets/icons/whatsapp';
import CloseIcon from '../../assets/icons/close';
import IgStoryIcon from '../../assets/icons/instagramStory';
import IgIcon from '../../assets/icons/instagram';
import FbStoryIcon from '../../assets/icons/facebookStory';
import FbIcon from '../../assets/icons/facebook';
import CheckBgIcon from '../../assets/icons/checklistBG';
import PlayStore from '../../assets/icons/playStore';
import AppStore from '../../assets/icons/appStore';
import {isIphone} from '../../utils/devices';
import {BACKEND_URL} from '../../shared/static';
import styles from './styles';
import {imgShare, logo} from '../../assets/images';

function ModalShareStory({isVisible, onClose, storyData}) {
  const [viewShotLayout, setViewShotLayout] = useState(null);
  const [captureUri, setCaptureUri] = useState(null);
  const [dinamicLink, setDinamicLink] = useState('');
  const [showSuccessCopy, setShowSuccessCopy] = useState(false);

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://romanticstory.page.link/HNyL?storyId=${storyData?.item?.id || storyData?.id}`,
          domainUriPrefix: 'https://romanticstory.page.link',
          android: {
            packageName: 'com.romanticstory',
          },
          ios: {
            appStoreId: '6463850368',
            bundleId: 'apps.romanticstory',
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
    if (isVisible) {
      setLinks();
    }
  }, [isVisible]);

  const captureRef = useRef();
  const captureRefPost = useRef();
  const base64CaptureImage = useRef(null);
  const sharedMessageWa = `The *EroTales App* has the best Romantic Stories ever! I just found this once: *${storyData?.item?.title_en || storyData?.title_en}* Check out the Story here: ${dinamicLink} Check the EroTales App out now on https://EroTalesApp.com or Download the App directly on the AppStore or Google Play.`;
  const sharedMessage = `The EroTales App has the best Romantic Stories ever! I just found this once: ${storyData?.item?.title_en || storyData?.title_en} Check out the Story here: ${dinamicLink} Check the EroTales App out now on https://EroTalesApp.com or Download the App directly on the AppStore or Google Play.`;

  const handleClose = () => {
    onClose();
  };

  const handleCopyLink = async () => {
    Clipboard.setString(await generateLink());
    setShowSuccessCopy(true);
    setTimeout(() => {
      setShowSuccessCopy(false);
    }, 1500);
  };

  const handleShareOpen = async () => {
    try {
      await Share.open({
        message: sharedMessage,
        title: 'Shared-Short-Story',
      });
    } catch (err) {
      console.log('Error share whatsapp:', err);
    }
  };

  const handleShareOpenWA = async () => {
    try {
      await Share.open({
        message: sharedMessageWa,
        title: 'Shared-Short-Story',
      });
    } catch (err) {
      console.log('Error share whatsapp:', err);
    }
  };

  const handleIGStoryShare = async () => {
    handleShare('story');
    Alert.alert(
      '',
      'Don’t forget to tag us!\r\n@EroTalesApp',
      [
        {
          text: 'OK',
          onPress: async () => {
            try {
              const contentURL = isIphone
                ? base64CaptureImage.current
                : captureUri;
              await Share.shareSingle({
                backgroundImage: contentURL, // url or an base64 string
                social: Share.Social.INSTAGRAM_STORIES,
                appId: '637815961525510', // facebook appId
              });
            } catch (err) {
              console.log('Error share ig story:', err);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleShareInstagramDefault = async () => {
    handleShare('post');
    Clipboard.setString(
      `The EroTales App has the best Romantic Stories ever! I just found this once: ${storyData?.item?.title_en || storyData?.title_en}. Check the EroTales App out now for iPhone and Android Phones and discover the best Romantic Stories.`,
    );
    Alert.alert(
      '',
      'Copied to your pasteboard Text and hastags ready to be pasted in your caption. \r\n \r\nDon’t forget to tag us at\r\n@EroTalesApp',
      [
        {
          text: 'OK',
          onPress: async () => {
            // setTimeout(async () => {
            try {
              const contentURL = isIphone
                ? base64CaptureImage.current
                : captureUri;
              await Share.shareSingle({
                title: 'Share image to instagram',
                url: contentURL,
                social: Share.Social.INSTAGRAM,
              });
            } catch (err) {
              console.log('Err share default ig:', err);
            }
            // }, 200);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleFbStoryShare = async () => {
    handleShare('story');
    setTimeout(async () => {
      try {
        const contentURL = isIphone ? base64CaptureImage.current : captureUri;
        await Share.shareSingle({
          backgroundImage: contentURL, // url or an base64 string
          social: Share.Social.FACEBOOK_STORIES,
          appId: '637815961525510', // facebook appId
        });
      } catch (err) {
        console.log('Error share fb story:', err);
      }
    }, 200);
  };

  const handleShareFacebookDefault = async () => {
    handleShare('post');
    Clipboard.setString(
      `The EroTales App has the best Romantic Stories ever! I just found this once: ${storyData?.item?.title_en || storyData?.title_en}. Check the EroTales App out now for iPhone and Android Phones and discover the best Romantic Stories.`,
    );
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
                title: 'Share image to facebook',
                url: contentURL,
                social: Share.Social.FACEBOOK,
              });
            } catch (err) {
              console.log('Err share default fb:', err);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleScreenshot = async share => {
    await (share === 'story' ? captureRef : captureRefPost).current
      .capture()
      .then(uri => {
        const uriArray = uri.split('/');
        const nameToChange = uriArray[uriArray.length - 1];
        const renamedURI = uri.replace(
          nameToChange,
          `EroTales - ${storyData?.item?.title_en?.substring(
            0,
            10,
          ) || storyData?.title_en?.substring(
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
      .catch(err => {
        console.log('Capture Error:', err.message);
      });
  };

  const handleShare = async share => {
    base64CaptureImage.current = null;
    handleScreenshot(share);
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
          source={imgShare}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: '#000',
            opacity: 0.3,
          }}
        />
        <View style={{height: 'auto', width: '80%', alignItems: 'center'}}>
          <View
            style={{
              borderColor: code_color.white,
              borderWidth: 2,
              height: '100%',
              width: '35%',
              position: 'absolute',
              top: 0,
              left: 0,
              borderTopStartRadius: moderateScale(24),
              borderBottomStartRadius: moderateScale(24),
              borderRightWidth: 0,
            }}
          />
          <View
            style={{
              borderColor: code_color.white,
              borderWidth: 2,
              height: '100%',
              width: '35%',
              position: 'absolute',
              top: 0,
              right: 0,
              borderTopEndRadius: moderateScale(24),
              borderBottomEndRadius: moderateScale(24),
              borderLeftWidth: 0,
            }}
          />
          <Image
            source={logo}
            style={{
              resizeMode: 'contain',
              width: 65,
              height: 65,
              position: 'absolute',
              top: -30,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: code_color.white,
              marginTop: moderateScale(70),
              marginHorizontal: '10%',
              fontSize: moderateScale(20),
              textAlign: 'center',
              lineHeight: moderateScale(35),
              fontWeight: '400',
            }}>
            The <Text style={{fontWeight: '700'}}>EroTales App</Text> has the
            best Romantic Stories ever! I just found this once:
          </Text>
          <Text
            style={{
              color: code_color.white,
              marginBottom: moderateScale(30),
              marginHorizontal: '10%',
              fontSize: moderateScale(20),
              textAlign: 'center',
              lineHeight: moderateScale(35),
              fontWeight: '700',
            }}>
            {storyData?.item?.title_en || storyData?.title_en}
          </Text>
          <Text
            style={{
              color: code_color.white,
              marginHorizontal: '10%',
              marginBottom: moderateScale(50),
              fontSize: moderateScale(17),
              textAlign: 'center',
              lineHeight: moderateScale(35),
              fontWeight: '400',
            }}>
            Check out the <Text style={{fontWeight: '700'}}>EroTales App</Text>{' '}
            now and discover the best Romantic Stories.
          </Text>
          <View
            style={{
              height: moderateScale(34),
              backgroundColor: '#000',
              borderRadius: 17,
              paddingHorizontal: moderateScale(20),
              justifyContent: 'center',
              position: 'absolute',
              bottom: -17,
            }}>
            <Text
              style={{
                color: code_color.white,
                fontSize: 14,
                fontWeight: '400',
                letterSpacing: 0.28,
              }}>
              https://EroTalesApp.com
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(60),
            gap: moderateScale(10),
          }}>
          <AppStore />
          <PlayStore />
        </View>
      </ViewShot>
    );
  };

  const renderScreenShotPost = () => {
    return (
      <ViewShot
        style={styles.conQuotePost}
        onLayout={event => {
          setViewShotLayout(event.nativeEvent.layout);
        }}
        ref={captureRefPost}
        options={{
          fileName: `Shortstory${Date.now()}`,
          format: 'png',
          quality: 1.0,
        }}>
        <Image
          source={imgShare}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: '#000',
            opacity: 0.3,
          }}
        />
        <View style={{height: 'auto', width: '80%', alignItems: 'center'}}>
          <View
            style={{
              borderColor: code_color.white,
              borderWidth: 2,
              height: '100%',
              width: '35%',
              position: 'absolute',
              top: 0,
              left: 0,
              borderTopStartRadius: moderateScale(24),
              borderBottomStartRadius: moderateScale(24),
              borderRightWidth: 0,
            }}
          />
          <View
            style={{
              borderColor: code_color.white,
              borderWidth: 2,
              height: '100%',
              width: '35%',
              position: 'absolute',
              top: 0,
              right: 0,
              borderTopEndRadius: moderateScale(24),
              borderBottomEndRadius: moderateScale(24),
              borderLeftWidth: 0,
            }}
          />
          <Image
            source={logo}
            style={{
              resizeMode: 'contain',
              width: 65,
              height: 65,
              position: 'absolute',
              top: -30,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: code_color.white,
              marginTop: moderateScale(50),
              marginHorizontal: '10%',
              fontSize: moderateScale(20),
              textAlign: 'center',
              lineHeight: moderateScale(35),
              fontWeight: '400',
              marginBottom: moderateScale(20),
            }}>
            The <Text style={{fontWeight: '700'}}>EroTales App</Text> has the
            best Romantic Stories ever! I just found this once:
            <Text style={{fontWeight: '700'}}>{storyData?.item?.title_en || storyData?.title_en}</Text>
          </Text>

          <View
            style={{
              height: moderateScale(34),
              backgroundColor: '#000',
              borderRadius: 17,
              paddingHorizontal: moderateScale(20),
              justifyContent: 'center',
              position: 'absolute',
              bottom: -17,
            }}>
            <Text
              style={{
                color: code_color.white,
                fontSize: 14,
                fontWeight: '400',
                letterSpacing: 0.28,
              }}>
              https://EroTalesApp.com
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(50),
            gap: moderateScale(10),
          }}>
          <AppStore />
          <PlayStore />
        </View>
      </ViewShot>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <Modal visible={showSuccessCopy} animationType="fade" transparent>
        <View
          style={{
            position: 'absolute',
            top: '30%',
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: '#262628',
            paddingVertical: moderateScale(16),
            paddingHorizontal: moderateScale(33),
            borderRadius: moderateScale(16),
          }}>
          <CheckBgIcon />
          <Text
            style={{
              fontSize: moderateScale(15),
              color: code_color.white,
              fontWeight: 500,
              marginTop: moderateScale(10),
            }}>
            Link copied
          </Text>
        </View>
      </Modal>
      {renderScreenShot()}
      {renderScreenShotPost()}
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            // flex: 1,
            height: 'auto',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTopEndRadius: moderateScale(24),
            borderTopStartRadius: moderateScale(24),
            paddingBottom: moderateScale(26),
            paddingTop: moderateScale(20),
            backgroundColor: code_color.headerBlack,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: code_color.white,
              fontSize: moderateScale(16),
              fontWeight: '400',
              marginBottom: moderateScale(20),
            }}>
            Share via
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: 'absolute',
              right: moderateScale(20),
              top: moderateScale(20),
            }}>
            <CloseIcon fill={code_color.white} height={14} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              gap: moderateScale(20),
            }}>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={handleCopyLink}>
              <CopyIcon height={40} />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                }}>
                Copy Link
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShareOpen}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MessageIcon height={40} />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                }}>
                Message
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={handleShareOpenWA}>
              <WAIcon height={36} bg="#00F356" />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                }}>
                WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '80%',
              backgroundColor: 'rgba(255, 255, 255, 0.20)',
              marginVertical: moderateScale(20),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              gap: moderateScale(20),
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={handleIGStoryShare}>
              <IgStoryIcon height={40} />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                  textAlign: 'center',
                }}>
                {'Instagram\r\nStories'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={handleShareInstagramDefault}>
              <IgIcon height={38} />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                  textAlign: 'center',
                }}>
                {'Instagram'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={handleFbStoryShare}>
              <FbStoryIcon height={38} bg="#1877F2" />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                  textAlign: 'center',
                }}>
                {'Facebook\r\nStories'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={handleShareFacebookDefault}>
              <FbIcon height={38} bg="#1877F2" />
              <Text
                style={{
                  color: code_color.white,
                  fontSize: moderateScale(13),
                  fontWeight: '400',
                  marginTop: moderateScale(5),
                  textAlign: 'center',
                }}>
                {'Facebook'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalShareStory.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalShareStory.defaultProps = {};

export default connect(states, dispatcher)(ModalShareStory);
