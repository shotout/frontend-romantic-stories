/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SelectableText} from '@astrocoders/react-native-selectable-text';
import AnimatedLottieView from 'lottie-react-native';
import styles from './styles';
import {sizing} from '../../utils/styling';
import {ava1, imgLove} from '../../assets/images';
import {code_color} from '../../utils/colors';
import {BACKEND_URL} from '../../shared/static';
import {QUOTE_SHARED, eventTracking} from '../../helpers/eventTracking';
import {navigate, navigationRef} from '../../shared/navigationRef';
import Speaker from '../../assets/icons/speaker';
import {getListAvatarTheme} from '../../shared/request';
import ModalAudioUnlock from '../modal-audio-unlock';
import { moderateScale } from 'react-native-size-matters';
const loveAnimate = require('../../assets/lottie/love.json');

export default function QuotesContent({
  item,
  themeUser,
  source,
  isActive,
  isAnimationStart,
  fontSize,
  bgTheme,
  bg,
  fontFamily,
  totalStory,
  pageActive,
}) {
  console.log(fontSize)
  console.log(JSON.stringify(item))
  const [isRepeat, setRepeat] = useState(
    item?.repeat?.time != undefined || item?.isRepeat ? true : false,
  );
  const [show, setShow] = useState(false)

  const [me, setMe] = useState(null);
  const [partner, setPartner] = useState(null);
  const [playLoveAnimate, setPlayLoveAnimate] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const counter = useRef(0);
  const activeStatus = useRef(false);
  const contentData = `Matahari bersinar terik di Lampung. Sinarnya terhalang rimbunnya pepohonan, sehingga hanya menyisakan berkas tipis. Burung-burung berkicau seolah sedang menyanyikan lagu untuk alam. Bunyi riak jernih sungai beradu dengan batu kali berpadu dengan sahutan dari beberapa penghuni hutan yang lainnya. Ya, inilah tempat tinggal Bora, si anak gajah Lampung yang sekarang tengah asyik bermain bersama teman-temannya di sebuah sungai.
  Ketika Bora menyemprotkan air ke arah Dodo—anak gajah lainnya—dengan belalainya, ia pun memekik nyaring. Sampai akhirnya, kegembiraan mereka terpecah oleh bunyi bising dari sebelah utara hutan. Bunyi bising itu bercampur dengan deru sesuatu yang sama sekali tidak Bora kenal.
  “Hei, lihat itu!”
  Semua serentak menghentikan kegiatan mereka dan menengok ke langit yang ditunjuk Dodo. Asap hitam tebal yang membumbung tinggi dari sana. Asap itu semakin tebal dan terus menebal. Itu merupakan fenomena aneh yang baru pertama kali mereka saksikan. Selama ini yang mereka .
`;

  useEffect(() => {
    handleThemeAvatar(pageActive);
  }, [pageActive]);

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
        setMe(data?.data?.me);
        setPartner(data?.data?.partner);
      }
    } catch (error) {}
  };

  function renderBackgroundImage() {
    if (isActive) {
      return (
        <Image
          source={ava1}
          // style={[styles.ctnAbsolute]}
        />
      );
    }
    return null;
  }
  return (
    <View
      style={{
        position: 'relative',
        paddingHorizontal: 2,
        paddingTop: 30,
        flex: 1,
      }}>
      <ModalAudioUnlock
        isVisible={show}
        onClose={() => setShow(false)}
      />
      <Animated.View
        style={{
          height: '100%',
          width: sizing.getDimensionWidth(0.89),
          transform: [{translateY: translateX}],
        }}>
        {pageActive === 0 ||
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
            <Image
              source={{uri: `${BACKEND_URL}/${me}`}}
              resizeMode="contain"
              style={{
                width: 100,
                height: 300,
                opacity: 0.6,
              }}
            />
            <Image
              source={{uri: `${BACKEND_URL}/${partner}`}}
              resizeMode="contain"
              style={{
                width: 100,
                height: 300,
                opacity: 0.6,
              }}
            />
          </View>
        ) : null}
        <View style={{flexDirection: 'row', flex: 0, alignItems: 'center'}}>
          <Text
            allowFontScaling={false}
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: Number(fontSize),
              fontFamily: fontFamily,
              flex: 1,
              color: bg === '#2C3439' ? code_color.white : code_color.blackDark,
            }}>
            {themeUser?.language_id === '2' ? item?.title_id : item?.title_en}
          </Text>
          <TouchableOpacity
            onPress={() => 
              
             setShow(true)}
            style={{
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 20,
              backgroundColor: bgTheme,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Speaker />
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: Number(fontSize),
                fontFamily: fontFamily,
                color: code_color.white,
                marginLeft: 5,
              }}>
              Listen
            </Text>
          </TouchableOpacity>
        </View>

        <View />
        <View style={{borderWidth: 1, borderColor: bgTheme, marginTop: 10}} />
        <View style={styles.ctnIcon}>
          <View style={styles.quotesWrapper}>
            <View style={styles.txtQuotesWrapper}>
              <SelectableText
                
                style={[
                  styles.ctnQuotes,
                  {
                    marginBottom: pageActive != 0 ? -100 : 0,
                    fontFamily: fontFamily,
                    fontSize: Number(fontSize),
                    color:
                      bg === '#2C3439'
                        ? code_color.white
                        : code_color.blackDark,
                  },
                ]}
                menuItems={['Share']}
                onSelection={({
                  eventType,
                  content,
                  selectionStart,
                  selectionEnd,
                }) => {
                  navigate('Share', {
                    selectedContent: content,
                    start: themeUser?.language_id === '2' ? item?.content_id?.substring(
                      selectionStart - 50,
                      selectionStart) : item?.content_en?.substring(
                      selectionStart - 50,
                      selectionStart,
                    ),
                    end: themeUser?.language_id === '2' ? item?.content_id?.substring(
                      selectionEnd - 50,
                      selectionEnd) : item?.content_en?.substring(
                        selectionEnd - 50,
                        selectionEnd,
                    )
                  });
                  eventTracking(QUOTE_SHARED);
                }}
                value={themeUser?.language_id === '2' ? item?.content_id : item?.content_en}
              />
            </View>
          </View>
          {pageActive === 0 || pageActive === 3 || pageActive === 6 || pageActive === 9 || pageActive === 12 ? (
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: bgTheme,
                  flex: 0,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  borderRadius: 20,
                  padding: 5,
                  marginBottom: 25,
                }}>
                <Text style={{color: code_color.white, fontWeight: 'bold'}}>
                  Page {pageActive + 1} of {totalStory}
                </Text>
              </View>
            </View>
          ) : pageActive === 1 || pageActive === 4 || pageActive === 7 || pageActive === 10 || pageActive === 13? (
            <>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: -100,
                  height: 110,
                  width: 100,
                  left: '0%',
                  zIndex: 1,
                  bottom: -10,
                }}>
                <Image
                  source={{uri: `${BACKEND_URL}/${me}`}}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 400,
                  }}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: -100,
                  width: 100,
                  height: 110,
                  left: '40%',
                  zIndex: 1,
                }}>
                <Image
                  source={{uri: `${BACKEND_URL}/${partner}`}}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 400,
                  }}
                />
              </View>

              <View >
                <ImageBackground
                  source={{
                    uri: `${BACKEND_URL}/${themeUser?.category?.image?.url}`,
                  }}
                  resizeMode="contain"
                  style={{
                    borderRadius: 100,
                    height: 100,
                    marginBottom: 15
                  }}>
                  <View
                    style={{
                      backgroundColor: code_color.white,
                      flex: 0,
                      alignItems: 'center',
                      borderRadius: 20,
                      padding: 5,
                      paddingHorizontal: 12,
                      marginBottom: 30,
                      position: 'absolute',
                      marginRight: 5,
                      bottom: 0,
                      right: 5,
                    }}>
                    <Text
                      style={{color: bgTheme, fontWeight: 'bold'}}>
                      Page {pageActive + 1} of {totalStory}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: -150,
                  width: 100,
                  height: 150,
                  left: '10%',
                  zIndex: 1,
                }}>
                <Image
                  source={{uri: `${BACKEND_URL}/${me}`}}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 420,
                  }}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: -130,
                  width: 100,
                  height: 150,
                  left: '35%',
                  zIndex: 1,
                }}>
                <Image
                  source={{uri: `${BACKEND_URL}/${partner}`}}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 420,
                  }}
                />
              </View>

              <AnimatedLottieView
                source={loveAnimate}
                style={{
                  width: 500,
                  height: 500,
                  bottom: 20,
                  left: -40,
                  position: 'absolute',
                  zIndex: 2,
                  display: isAnimationStart === true ? 'flex' : 'none',
                }}
                autoPlay={isAnimationStart === true}
                duration={3000}
                loop={false}
              />
              <View>
                <ImageBackground
                  source={imgLove}
                  resizeMode="contain"
                  style={{
                    width: '75%',
                    height: 130,
                    marginLeft: 20
                  }}>
                  <View
                    style={{
                      backgroundColor: bgTheme,
                      flex: 0,
                      alignItems: 'center',
                      width: 130,
                      borderRadius: 20,
                      padding: 5,
                      paddingHorizontal: 5,
                      position: 'absolute',
                      marginRight: 5,
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
          )}
        </View>
      </Animated.View>
    </View>
  );
}
