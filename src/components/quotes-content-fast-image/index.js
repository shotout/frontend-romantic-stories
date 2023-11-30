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
import {moderateScale} from 'react-native-size-matters';
import {handleNativePayment} from '../../helpers/paywall';
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
  isPremium,
}) {
  const [isRepeat, setRepeat] = useState(
    item?.repeat?.time != undefined || item?.isRepeat ? true : false,
  );
  const [show, setShow] = useState(false);

  const [me, setMe] = useState(null);
  const [partner, setPartner] = useState(null);
  const [playLoveAnimate, setPlayLoveAnimate] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const counter = useRef(0);
  const activeStatus = useRef(false);
  const contentData = [
    'Supporting myself during summer was actually pretty easy. As people started to\r\nromanticize Brazil once again, they started to like the language and aim to learn it, and\r\nbeing a good English speaker and native Portuguese speaker, I decided to offer private\r\nlessons. To my delight, I have always had genuine clients who paid me really well, and\r\nmost of them were old people too. My latest client, however, a long term, was my age\r\nand she was just... my type.\r\nShe had a beautiful smile and her body was to die for, which she often used to\r\nher advantage to distract me, which worked more often than not. She was tall, had long\r\nbrown hair, and had the most wonderful pair of breasts I have ever seen. It wasn\'t fair\r\nthat someone had such a nice rack, but hey, I wasn\'t complaining.\r\nThe lesson went well, and as per usual, we started to talk.\r\n"You know, you\'re the best teacher I\'ve ever had," she told me with a smile.\r\n"You\'re also cute. Do you want to grab something to eat? My treat!"\r\nI was, going to say yes, because, well, free food, but I then thought of it again and\r\nI remembered seeing her the other day in town with someone, and the thought itself\r\nwas like fuel. I\'m not gonna go out with someone who already has someone else, but\r\ndeep inside I want to, and I also wanted her to tell me about him.\r\n"I would do anything for a swim on the beach now. You do realize I need to learn\r\nsome beach-related vocabulary, right?" she teased and sipped on her wine.\r\n"Oh yeah? You mean... you’d do anything for that?" I got comfortable in my seat.\r\nShe looked ethereal that day, "I\'ll think about it." I finally said.\r\n"Oh, please, come on, come one. You\'re the only one I wanna tour Rio with," she\r\nsaid, pleading. She probably knew it was impossible to resist the looks she was giving\r\nme.\r\n"And do you take out everyone?" I asked.\r\nShe shook her head, the smile never leaving her beautiful face, "why do you\r\nask?" she said.\r\n"Well, I saw you in town the other day and it seemed you were ',
    'having a lot of fun.\r\nI didn’t wanna bump into you and ruin the moment though... whatever type of fun you\r\nwere having." I must have sounded like a possessive freak.\r\n\r\n"Oh, you saw me?" she asked and scoffed, "why didn’t you say anything, then?\r\nOr you didn’t wanna ruin the spark? "\r\n"You looked happy. And I gotta admit..." I chuckled, "It was nice seeing you\r\nhappy. It made me feel good, you know?"\r\n"You\'re so dorky. A dorky teacher." she rolled her eyes. She possibly did not\r\nknow that I don\'t like girls roll their eyes on me.\r\n"So, who was he?" I spread my legs and asked.\r\n"Just a friend?" she shrugged and looked away. I knew she was hiding something\r\nand she didn\'t do it in the best way too.\r\n"You’re making friends, already? I mean- did you get lucky?" I asked.\r\nShe shook her head, eyeing me up and down, confused.\r\nI cringed at myself... and my poor knowledge of English proverbs so I tried to\r\ncorrect it, "That’s not what I meant, Beleza. Or maybe I did but- I-" I stutte',
    'red... as\r\nusual... and I laughed. It was awkward but it was nice to see her joyful, "I know you’ve\r\nbeen wanting to have some friends here, but maybe I am just over-questioning things\r\nthat are none of my business. You looked happy regardless of who took you out. Even if\r\nit wasn’t me. "\r\n"Even if it wasn\'t you, huh?" she tilted her head and asked.\r\nI couldn\'t help but scoff. She was seriously testing my patience, "Oh, I don’t really\r\nmean anything. Just the fact that you picked him over me- I mean you picked going out\r\nwith him over doing that with... me. I’m definitely a lot more fun and you know that.\r\nPlus, I could teach you a lot of things." I said.\r\n"Perhaps I didn\'t think of it that way," she said and poured herself some more\r\nwine. She loved it.\r\n"There’s much to do in Rio than being indoors anyways. I would’ve taken you to\r\nthe beach, had a nice walk, had some good food, and tried out beach bars where we\r\ncould dance the night away. That would be a typical night i',
    'n Rio, and I bet you’d love it.\r\nBet you’d also learn a lot of words in just one day. " I said, this time trying to keep it\r\nprofessional. After all, I was getting paid hourly, and wasting time talking nonsense\r\n\r\nwould look bad on my reviews, even though she did not seem like the type who would\r\nleave a bad review.\r\n"Okay, okay, fine," she said throwing her hands in the air, "next time be the\r\ngentleman who takes me out instead."\r\n"It sounds like a challenge, beleza." I raised an eyebrow.\r\n"No," she shook her head and chuckled, "unless you want it to be."\r\n"No, really, I am going to prove myself, because I\'m the best," I said.\r\nShe rolled her eyes.\r\n"Don\'t roll your eyes on me," I said, slightly warning her.\r\n"You didn\'t really say that." She scoffed and did it again and again. She was\r\ntesting my limits.\r\n"I just did." She did it again and smirked.\r\n"Why did you have to be the type that tends to be so bratty?" I asked.\r\n"I didn\'t." She shrugged and took another sip of her wine, "',
    'I am just your favorite\r\nclient," she giggled. It was too cute.\r\n"That you are." I chuckled and leaned back on my chair.\r\n"So, when are you going to teach me all those beach words?" she asked.\r\n"I am available anytime, beleza."\r\n"Okay, how about Saturday?" she asked, "I have already bought a really beautiful\r\nswimsuit and I can\'t wait to put it on."\r\nI smiled at her and nodded. I was definitely excited to take her out and show her\r\naround the city and the beach, especially the nightlife.\r\n"You are going to love it."\r\n"I will, especially if I\'m with you," she smiled and blushed. I wondered whether\r\nshe was just being flirty or she meant it\r\n"And who says you can\'t have your fun while learning? " I raised an eyebrow.',
  ];

  useEffect(() => {
    handleThemeAvatar(pageActive);
  }, [pageActive]);

  const handleAudio = () => {
    setShow(false);
    handleNativePayment();
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
        onGetAudio={() => handleAudio()}
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
          <View style={{flex: 1}}>
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'left',
                fontSize: Number(fontSize),
                fontFamily: fontFamily,
                marginBottom: 5,
                color:
                  bg === '#2C3439' ? code_color.white : code_color.blackDark,
              }}>
              {themeUser?.category?.name}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: moderateScale(Number(fontSize) + 2),
                fontFamily: fontFamily,
                color:
                  bg === '#2C3439' ? code_color.white : code_color.blackDark,
              }}>
              {themeUser?.language_id === '2' ? item?.title_id : item?.title_en}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (isPremium) {
                navigate('Media');
              } else {
                setShow(true);
              }
            }}
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
                    start:
                      themeUser?.language_id === '2'
                        ? item?.content_id?.substring(
                            selectionStart - 50,
                            selectionStart,
                          )
                        : item?.content_en?.substring(
                            selectionStart - 50,
                            selectionStart,
                          ),
                    end:
                      themeUser?.language_id === '2'
                        ? item?.content_id?.substring(
                            selectionEnd - 50,
                            selectionEnd,
                          )
                        : item?.content_en?.substring(
                            selectionEnd - 50,
                            selectionEnd,
                          ),
                  });
                  eventTracking(QUOTE_SHARED);
                }}
                value={
                  themeUser?.language_id === '2'
                    ? item?.content_id
                    : item?.content_en
                }
              />
            </View>
          </View>
          {pageActive === 0 ||
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
          ) : pageActive === 1 ||
            pageActive === 4 ||
            pageActive === 7 ||
            pageActive === 10 ||
            pageActive === 13 ? (
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

              <View>
                <ImageBackground
                  source={{
                    uri: `${BACKEND_URL}/${themeUser?.category?.image?.url}`,
                  }}
                  resizeMode="contain"
                  style={{
                    borderRadius: 100,
                    height: 100,
                    marginBottom: 15,
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
                    <Text style={{color: bgTheme, fontWeight: 'bold'}}>
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
                    marginLeft: 20,
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
