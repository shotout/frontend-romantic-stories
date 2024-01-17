/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {QUOTE_SHARED, eventTracking} from '../../helpers/eventTracking';
import {navigate, navigationRef} from '../../shared/navigationRef';
import Speaker from '../../assets/icons/speaker';
import {getListAvatarTheme, updateProfile} from '../../shared/request';
import ModalAudioUnlock from '../modal-audio-unlock';
import {moderateScale} from 'react-native-size-matters';
import {handleNativePayment} from '../../helpers/paywall';
import FastImage from 'react-native-fast-image';
import ModalSuccessPurchaseAudio from '../modal-success-purchase-audio';
import {reloadUserProfile} from '../../utils/user';
import {useFocusEffect} from '@react-navigation/native';
import { fixedFontSize, hp, wp } from '../../utils/screen';
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
  titleStory,
  titleCategory,
  colorText,
  handleListen,
  show,
  setShow,
  type,
  isRippleAnimate
}) {
  const [isRepeat, setRepeat] = useState(
    item?.repeat?.time != undefined || item?.isRepeat ? true : false,
  );
  const [color, setSolor] = useState(code_color.blackDark);
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
  const contentData = [
    'Supporting myself during summer was actually pretty easy. As people started to\r\nromanticize Brazil once again, they started to like the language and aim to learn it, and\r\nbeing a good English speaker and native Portuguese speaker, I decided to offer private\r\nlessons. To my delight, I have always had genuine clients who paid me really well, and\r\nmost of them were old people too. My latest client, however, a long term, was my age\r\nand she was just... my type.\r\nShe had a beautiful smile and her body was to die for, which she often used to\r\nher advantage to distract me, which worked more often than not. She was tall, had long\r\nbrown hair, and had the most wonderful pair of breasts I have ever seen. It wasn\'t fair\r\nthat someone had such a nice rack, but hey, I wasn\'t complaining.\r\nThe lesson went well, and as per usual, we started to talk.\r\n"You know, you\'re the best teacher I\'ve ever had," she told me with a smile.\r\n"You\'re also cute. Do you want to grab something to eat? My treat!"\r\nI was, going to say yes, because, well, free food, but I then thought of it again and\r\nI remembered seeing her the other day in town with someone, and the thought itself\r\nwas like fuel. I\'m not gonna go out with someone who already has someone else, but\r\ndeep inside I want to, and I also wanted her to tell me about him.\r\n"I would do anything for a swim on the beach now. You do realize I need to learn\r\nsome beach-related vocabulary, right?" she teased and sipped on her wine.\r\n"Oh yeah? You mean... you’d do anything for that?" I got comfortable in my seat.\r\nShe looked ethereal that day, "I\'ll think about it." I finally said.\r\n"Oh, please, come on, come one. You\'re the only one I wanna tour Rio with," she\r\nsaid, pleading. She probably knew it was impossible to resist the looks she was giving\r\nme.\r\n"And do you take out everyone?" I asked.\r\nShe shook her head, the smile never leaving her beautiful face, "why do you\r\nask?" she said.\r\n"Well, I saw you in town the other day and it seemed you were ',
    'having a lot of fun.\r\nI didn’t wanna bump into you and ruin the moment though... whatever type of fun you\r\nwere having." I must have sounded like a possessive freak.\r\n\r\n"Oh, you saw me?" she asked and scoffed, "why didn’t you say anything, then?\r\nOr you didn’t wanna ruin the spark? "\r\n"You looked happy. And I gotta admit..." I chuckled, "It was nice seeing you\r\nhappy. It made me feel good, you know?"\r\n"You\'re so dorky. A dorky teacher." she rolled her eyes. She possibly did not\r\nknow that I don\'t like girls roll their eyes on me.\r\n"So, who was he?" I spread my legs and asked.\r\n"Just a friend?" she shrugged and looked away. I knew she was hiding something\r\nand she didn\'t do it in the best way too.\r\n"You’re making friends, already? I mean- did you get lucky?" I asked.\r\nShe shook her head, eyeing me up and down, confused.\r\nI cringed at myself... and my poor knowledge of English proverbs so I tried to\r\ncorrect it, "That’s not what I meant, Beleza. Or maybe I did but- I-" I stutte',
    'red... as\r\nusual... and I laughed. It was awkward but it was nice to see her joyful, "I know you’ve\r\nbeen wanting to have some friends here, but maybe I am just over-questioning things\r\nthat are none of my business. You looked happy regardless of who took you out. Even if\r\nit wasn’t me. "\r\n"Even if it wasn\'t you, huh?" she tilted her head and asked.\r\nI couldn\'t help but scoff. She was seriously testing my patience, "Oh, I don’t really\r\nmean anything. Just the fact that you picked him over me- I mean you picked going out\r\nwith him over doing that with... me. I’m definitely a lot more fun and you know that.\r\nPlus, I could teach you a lot of things." I said.\r\n"Perhaps I didn\'t think of it that way," she said and poured herself some more\r\nwine. She loved it.\r\n"There’s much to do in Rio than being indoors anyways. I would’ve taken you to\r\nthe beach, had a nice walk, had some good food, and tried out beach bars where we\r\ncould dance the night away. That would be a typical night i',
    'n Rio, and I bet you’d love it.\r\nBet you’d also learn a lot of words in just one day. " I said, this time trying to keep it\r\nprofessional. After all, I was getting paid hourly, and wasting time talking nonsense\r\n\r\nwould look bad on my reviews, even though she did not seem like the type who would\r\nleave a bad review.\r\n"Okay, okay, fine," she said throwing her hands in the air, "next time be the\r\ngentleman who takes me out instead."\r\n"It sounds like a challenge, beleza." I raised an eyebrow.\r\n"No," she shook her head and chuckled, "unless you want it to be."\r\n"No, really, I am going to prove myself, because I\'m the best," I said.\r\nShe rolled her eyes.\r\n"Don\'t roll your eyes on me," I said, slightly warning her.\r\n"You didn\'t really say that." She scoffed and did it again and again. She was\r\ntesting my limits.\r\n"I just did." She did it again and smirked.\r\n"Why did you have to be the type that tends to be so bratty?" I asked.\r\n"I didn\'t." She shrugged and took another sip of her wine, "',
    'I am just your favorite\r\nclient," she giggled. It was too cute.\r\n"That you are." I chuckled and leaned back on my chair.\r\n"So, when are you going to teach me all those beach words?" she asked.\r\n"I am available anytime, beleza."\r\n"Okay, how about Saturday?" she asked, "I have already bought a really beautiful\r\nswimsuit and I can\'t wait to put it on."\r\nI smiled at her and nodded. I was definitely excited to take her out and show her\r\naround the city and the beach, especially the nightlife.\r\n"You are going to love it."\r\n"I will, especially if I\'m with you," she smiled and blushed. I wondered whether\r\nshe was just being flirty or she meant it\r\n"And who says you can\'t have your fun while learning? " I raised an eyebrow.',
  ];
const content_en = [
    "Supporting myself during summer was actually",
    "pretty easy. As people started to\r",
    "romanticize Brazil once again, they started to",
    "like the language and aim to learn it, and\r",
    "being a good English speaker and native Portuguese",
    "speaker, I decided to offer private\r",
    "lessons. To my delight, I have always had genuine",
    "clients who paid me really well, and\r",
    "most of them were old people too. My latest",
    "client, however, a long term, was my age\r",
    "and she was just... my type.\r",
    "She had a beautiful smile and her body was to die",
    "for, which she often used to\r",
    "her advantage to distract me, which worked more",
    "often than not. She was tall, had long\r",
    "brown hair, and had the most wonderful pair of",
    "breasts I have ever seen. It wasn't fair\r",
    "that someone had such a nice rack, but hey, I",
    "wasn't complaining.\r",
    "The lesson went well, and as per usual, we started",
    "to talk.\r",
    "\"You know, you're the best teacher I've ever had,\"",
    "she told me with a smile.\r",
    "\"You're also cute. Do you want to grab something",
    "to eat? My treat!\"\r",
    "I was going to say yes, because, well, free food,",
    "but I then thought of it again and\r",
    "I remembered seeing her the other day in town with",
    "someone, and the thought itself\r",
    "was like fuel. I'm not gonna go out with someone",
    "who already has someone else, but\r",
    "deep inside I want to, and I also wanted her to",
    "tell me about him.\r",
    "\"I would do anything for a swim on the beach now.",
    "You do realize I need to learn\r",
    "some beach-related vocabulary, right?\" she teased",
    "and sipped on her wine.\r",
    "\"Oh yeah? You mean... you’d do anything for",
    "that?\" I got comfortable in my seat.\r",
    "She looked ethereal that day, \"I'll think about",
    "it.\" I finally said.\r",
    "\"Oh, please, come on, come one. You're the only",
    "one I wanna tour Rio with,\" she\r",
    "said, pleading. She probably knew it was",
    "impossible to resist the looks she was giving\r",
    "me.\r",
    "\"And do you take out everyone?\" I asked.\r",
    "She shook her head, the smile never leaving her",
    "beautiful face, \"why do you\r",
    "ask?\" she said.\r",
    "\"Well, I saw you in town the other day and it",
    "seemed you were having a lot of fun.\r",
    "I didn’t wanna bump into you and ruin the moment",
    "though... whatever type of fun you\r",
    "were having.\" I must have sounded like a",
    "possessive freak.\r",
    "\r",
    "\"Oh, you saw me?\" she asked and scoffed, \"why",
    "didn’t you say anything, then?\r",
    "Or you didn’t wanna ruin the spark? \"\r",
    "\"You looked happy. And I gotta admit...\" I",
    "chuckled, \"It was nice seeing you\r",
    "happy. It made me feel good, you know?\"\r",
    "\"You're so dorky. A dorky teacher.\" she rolled her",
    "eyes. She possibly did not\r",
    "know that I don't like girls roll their eyes on",
    "me.\r",
    "\"So, who was he?\" I spread my legs and asked.\r",
    "\"Just a friend?\" she shrugged and looked away. I",
    "knew she was hiding something\r",
    "and she didn't do it in the best way too.\r",
    "\"You’re making friends, already? I mean- did you",
    "get lucky?\" I asked.\r",
    "She shook her head, eyeing me up and down,",
    "confused.\r",
    "I cringed at myself... and my poor knowledge of",
    "English proverbs so I tried to\r",
    "correct it, \"That’s not what I meant, Beleza. Or",
    "maybe I did but- I-\" I stuttered... as\r",
    "usual... and I laughed. It was awkward but it was",
    "nice to see her joyful, \"I know you’ve\r",
    "been wanting to have some friends here, but maybe",
    "I am just over-questioning things\r",
    "that are none of my business. You looked happy",
    "regardless of who took you out. Even if\r",
    "it wasn’t me. \"\r",
    "\"Even if it wasn't you, huh?\" she tilted her head",
    "and asked.\r",
    "I couldn't help but scoff. She was seriously",
    "testing my patience, \"Oh, I don’t really\r",
    "mean anything. Just the fact that you picked him",
    "over me- I mean you picked going out\r",
    "with him over doing that with... me. I’m",
    "definitely a lot more fun and you know that.\r",
    "Plus, I could teach you a lot of things.\" I said.\r",
    "\"Perhaps I didn't think of it that way,\" she said",
    "and poured herself some more\r",
    "wine. She loved it.\r",
    "\"There’s much to do in Rio than being indoors",
    "anyways. I would’ve taken you to\r",
    "the beach, had a nice walk, had some good food,",
    "and tried out beach bars where we\r",
    "could dance the night away. That would be a",
    "typical night in Rio, and I bet you’d love it.\r",
    "Bet you’d also learn a lot of words in just one",
    "day. \" I said, this time trying to keep it\r",
    "professional. After all, I was getting paid",
    "hourly, and wasting time talking nonsense\r",
    "\r",
    "would look bad on my reviews, even though she did",
    "not seem like the type who would\r",
    "leave a bad review.\r",
    "\"Okay, okay, fine,\" she said throwing her hands in",
    "the air, \"next time be the\r",
    "gentleman who takes me out instead.\"\r",
    "\"It sounds like a challenge, beleza.\" I raised an",
    "eyebrow.\r",
    "\"No,\" she shook her head and chuckled, \"unless you",
    "want it to be.\"\r",
    "\"No, really, I am going to prove myself, because",
    "I'm the best,\" I said.\r",
    "She rolled her eyes.\r",
    "\"Don't roll your eyes on me,\" I said, slightly",
    "warning her.\r",
    "\"You didn't really say that.\" She scoffed and did",
    "it again and again. She was\r",
    "testing my limits.\r",
    "\"I just did.\" She did it again and smirked.\r",
    "\"Why did you have to be the type that tends to be",
    "so bratty?\" I asked.\r",
    "\"I didn't.\" She shrugged and took another sip of",
    "her wine, \"I am just your favorite\r",
    "client,\" she giggled. It was too cute.\r",
    "\"That you are.\" I chuckled and leaned back on my",
    "chair.\r",
    "\"So, when are you going to teach me all those",
    "beach words?\" she asked.\r",
    "\"I am available anytime, beleza.\"\r",
    "\"Okay, how about Saturday?\" she asked, \"I have",
    "already bought a really beautiful\r",
    "swimsuit and I can't wait to put it on.\"\r",
    "I smiled at her and nodded. I was definitely",
    "excited to take her out and show her\r",
    "around the city and the beach, especially the",
    "nightlife.\r",
    "\"You are going to love it.\"\r",
    "\"I will, especially if I'm with you,\" she smiled",
    "and blushed. I wondered whether\r",
    "she was just being flirty or she meant it\r",
    "\"And who says you can't have your fun while",
    "learning? \" I raised an eyebrow."
]
  // Menghapus spasi dan baris baru (enter)

  // Remove <p> and </p> tags from the modified text
  const manipulatedResponse = item.replace(/<\/?p>/g, '');
  // const manipulatedResponse = item.replace(/<\/?p>/g, '');
  const formattedText = manipulatedResponse.replace(/\r\n/g, ' ');

  useEffect(() => {
    handleThemeAvatar(pageActive)
  }, [pageActive]);

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
        setMe(data?.data?.me);
        setPartner(data?.data?.partner);
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

  const renderValue = value => {
    return (
      <Text
        style={[
          styles.ctnQuotes,
          {
            // marginBottom: pageActive != 0 ? -100 : 0,
            fontFamily: fontFamily,
            fontSize: Number(fontSize),
            color: colorText,
          },
        ]}>
        {value?.children}
      </Text>
    );
  };

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
        {type === 'main' && pageActive === 0 ||
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
        <View style={{borderWidth: 1, borderColor: bgTheme, marginTop: wp(10)}} />
        <View style={[styles.ctnIcon]}>
          <View style={styles.quotesWrapper}>
            <View style={styles.txtQuotesWrapper}>
              {isRippleAnimate ? <Text style={[
                  styles.ctnQuotes,
                  {
                    // marginBottom: pageActive != 0 ? -100 : 0,
                    fontFamily: fontFamily,
                    fontSize: fixedFontSize(Number(fontSize)),
                    color:  bg === code_color.blackDark ? code_color.white : code_color.blackDark,
                  },
                ]}>
{item}
              </Text> :
              <SelectableText
                
                style={[
                  styles.ctnQuotes,
                  {
                    // marginBottom: pageActive != 0 ? -100 : 0,
                    fontFamily: fontFamily,
                    fontSize: fixedFontSize(Number(fontSize)),
                    color:  bg === code_color.blackDark ? code_color.white : code_color.blackDark,
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
                        ? item?.substring(selectionStart - 50, selectionStart)
                        : item?.substring(selectionStart - 50, selectionStart),
                    end:
                      themeUser?.content_en === '2'
                        ? item?.substring(selectionEnd - 50, selectionEnd)
                        : item?.substring(selectionEnd - 50, selectionEnd),
                    title:
                      themeUser?.content_en === '2'
                        ? item?.title_id
                        : item?.title_en,
                  });
                  eventTracking(QUOTE_SHARED);
                }}
                value={
                  themeUser?.language_id === '2' ? item : item
                }
              /> }
            </View>
          </View>
          {type === 'main' && pageActive === 0 ||
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
          ) : type === 'main' && pageActive === 1 ||
            pageActive === 4 ||
            pageActive === 7 ||
            pageActive === 10 ||
            pageActive === 13 ? (
            <>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: wp(-100),
                  height: hp(110),
                  width: wp(100),
                  left: 20,
                  zIndex: 1,
                  bottom: -10,
                }}>
                <FastImage
                  source={{
                    uri: `${BACKEND_URL}/${me}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: wp(100),
                    height: hp(400),
                  }}
                />
              </View>
              <View
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: wp(-100),
                  width: wp(100),
                  height: Platform.OS === 'android' ? hp(110) : hp(110),
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
                    height: hp(300),
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
          ) : type === 'main'  ? (
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
