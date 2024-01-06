/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  useColorScheme,
  StatusBar,
  FlatList,
  Animated,
  Dimensions,
  Pressable,
  Modal,
  SafeAreaView,
  Alert,
  Platform,
  TouchableOpacity,
  AppState,
} from 'react-native';
import {
  imgBgAvaTips,
  imgBgTips,
  imgLoveLeft,
  imgLoveRight,
  imgSelect,
} from '../../assets/images';
import {navigate} from '../../shared/navigationRef';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {State} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import AnimatedLottieView from 'lottie-react-native';
import notifee, {EventType} from '@notifee/react-native';
import {sizing} from '../../utils/styling';
import QuotesContent from '../../components/quotes-content-fast-image';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import {
  addPastLevel,
  addPastStory,
  addStory,
  getExploreStory,
  getListAvatarTheme,
  getStoryDetail,
  getStoryList,
  updateProfile,
} from '../../shared/request';
import ModalStoryUnlock from '../../components/modal-story-unlock';
import ModalStoryUnlockDay from '../../components/modal-story-unlock-day';
import ModalCongrats from '../../components/modal-congrats';
import ModalNewStory from '../../components/modal-new-story';
import ModalSuccessPurchase from '../../components/modal-success-purchase';
import ModalGetPremium from '../../components/modal-get-premium';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StepHeader from '../../layout/step/stepHeader';
import {useIsFocused} from '@react-navigation/native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {handleNativePayment, handlePayment} from '../../helpers/paywall';
import {loadRewarded, loadRewarded2} from '../../helpers/loadReward';
import {AdEventType, RewardedAdEventType} from 'react-native-google-mobile-ads';
import {Step1, Step2, Step3, Step5} from '../../layout/tutorial';
import store from '../../store/configure-store';
import {reloadUserProfile} from '../../utils/user';
import ModalStoryRating from '../../components/modal-story-rating';
import {fixedFontSize, wp} from '../../utils/screen';
import Speaker from '../../assets/icons/speaker';
import {code_color} from '../../utils/colors';
import {isIphoneXorAbove} from '../../utils/devices';
import { FINISH_LISTEN_10, FINISH_LISTEN_3, eventTracking } from '../../helpers/eventTracking';

const confettiAnimate = require('../../assets/lottie/confetti.json');
const rippleAnimate = require('../../assets/lottie/ripple.json');

const {width, height} = Dimensions.get('window');

const MainScreen = ({
  userProfile,
  levelingUser,
  userStory,
  handleSetStory,
  fontSize,
  backgroundColor,
  colorTheme,
  fontFamily,
  pressScreen,
  route,
  handleSetSteps,
  stepsTutorial,
  readStory,
  handleReadStory,
  handleNextStory,
  nextStory,
  handleStoriesRelate,
  handleLeveling,
  colorText,
  listenStory,
  handleListenStory,
}) => {
  const [loadingOne, setLoadingOne] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAds, setLoadingAds] = useState(false);
  const [activeStep, setActiveStep] = useState(stepsTutorial);
  const [click, setClick] = useState(1);
  const [products, setProducts] = useState([]);
  const [isTutorial, setTutorial] = useState({
    visible: false,
    step: stepsTutorial,
  });
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('');
  const [showRating, setRating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDay, setShowModalDay] = useState(false);
  const [showModalCongrats, setShowModalCongrats] = useState(false);
  const [showModalNewStory, setShowModalNewStory] = useState(false);
  const [showModalSuccessPurchase, setShowModalSuccessPurchase] =
    useState(false);
  const [showModalGetPremium, setShowModalGetPremium] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const pagerRef = useRef<PagerView>(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const animationValue = useRef(new Animated.Value(0)).current;
  const [folded, setFolded] = useState(false);
  const initialIndexContent = 0;
  const [showModalSubscribe, setShowModalSubscribe] = useState(false);
  const [activeSlide, setActiveSlide] = useState(initialIndexContent);
  const [isUserHasScroll, setUserScrollQuotes] = useState(false);
  // const [dataBook, setBook] = useState(userStory);
  const [me, setMe] = useState(null);
  const [partner, setPartner] = useState(null);
  const [screenNumber, setScreenNumber] = useState(0);
  const [readLater, setReadLater] = useState(false);
  const [isLoveAnimate, setIsLoveAnimate] = useState<boolean | string>(false);
  const [isRippleAnimate, setIsRippleAnimate] = useState<boolean>(false);
  const [isStartConfetti, setIsStartConfetti] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const isFocused = useIsFocused();
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [isFinishTutorial, setFinishTutorial] = useState(false);
  const [dataBook, setBook] = useState(userStory);
  const [readBook, setReadBook] = useState([]);
  const [dataRead, setData] = useState(readStory);
  const [data, setRead] = useState([]);
  const isPremiumStory = userProfile?.data?.subscription?.plan?.id === 2;
  const isPremiumAudio = userProfile?.data?.subscription?.plan?.id === 3;
  const currentXp = userProfile?.data?.user_level?.point;
  const newXp = levelingUser?.user_level?.point;
  //   const [trial, setTrial] = useState([
  //     "Supporting myself during summer was actually pretty easy. As people started to\r\nromanticize Brazil once again, they started to like the language and aim to learn it, and\r\nbeing a good English speaker and native Portuguese speaker, I decided to offer private\r\nlessons. To my delight, I have always had genuine clients who paid me really well, and\r\nmost of them were old people too. My latest client, however, a long term, was my age\r\nand she was just... my type.\r\nShe had a beautiful smile and her body was to die for, which she often used to\r\nher advantage to distract me, which worked more often than not. She was tall, had long\r\nbrown hair, and had the most wonderful pair of breasts I have ever seen. It wasn't fair\r\nthat someone had such a nice rack, but hey, I wasn't complaining.\r\nThe lesson went well, and as per usual, we started to talk.\r\n\"You know, you're the best teacher I've ever had,\" she told me with a smile.\r\n\"You're also cute. Do you want to grab something to eat? My treat!\"\r\nI was, going to say yes, because, well, free food, but I then thought of it again and\r\nI remembered seeing her the other day in town with someone, and the thought itself\r\nwas like fuel. I'm not gonna go out with someone who already has someone else, but\r\ndeep inside I want to, and I also wanted her to tell me about him.\r\n\"I would do anything for a swim on the beach now. You do realize I need to learn\r\nsome beach-related vocabulary, right?\" she teased and sipped on her wine.\r\n\"Oh yeah? You mean... you’d do anything for that?\" I got comfortable in my seat.\r\nShe looked ethereal that day, \"I'll think about it.\" I finally said.\r\n\"Oh, please, come on, come one. You're the only one I wanna tour Rio with,\" she\r\nsaid, pleading. She probably knew it was impossible to resist the looks she was giving\r\nme.\r\n\"And do you take out everyone?\" I asked.\r\nShe shook her head, the smile never leaving her beautiful face, \"why do you\r\nask?\" she said.\r\n\"Well, I saw you in town the other day and it seemed you were ",
  //     "having a lot of fun.\r\nI didn’t wanna bump into you and ruin the moment though... whatever type of fun you\r\nwere having.\" I must have sounded like a possessive freak.\r\n\r\n\"Oh, you saw me?\" she asked and scoffed, \"why didn’t you say anything, then?\r\nOr you didn’t wanna ruin the spark? \"\r\n\"You looked happy. And I gotta admit...\" I chuckled, \"It was nice seeing you\r\nhappy. It made me feel good, you know?\"\r\n\"You're so dorky. A dorky teacher.\" she rolled her eyes. She possibly did not\r\nknow that I don't like girls roll their eyes on me.\r\n\"So, who was he?\" I spread my legs and asked.\r\n\"Just a friend?\" she shrugged and looked away. I knew she was hiding something\r\nand she didn't do it in the best way too.\r\n\"You’re making friends, already? I mean- did you get lucky?\" I asked.\r\nShe shook her head, eyeing me up and down, confused.\r\nI cringed at myself... and my poor knowledge of English proverbs so I tried to\r\ncorrect it, \"That’s not what I meant, Beleza. Or maybe I did but- I-\" I stutte",
  //     "red... as\r\nusual... and I laughed. It was awkward but it was nice to see her joyful, \"I know you’ve\r\nbeen wanting to have some friends here, but maybe I am just over-questioning things\r\nthat are none of my business. You looked happy regardless of who took you out. Even if\r\nit wasn’t me. \"\r\n\"Even if it wasn't you, huh?\" she tilted her head and asked.\r\nI couldn't help but scoff. She was seriously testing my patience, \"Oh, I don’t really\r\nmean anything. Just the fact that you picked him over me- I mean you picked going out\r\nwith him over doing that with... me. I’m definitely a lot more fun and you know that.\r\nPlus, I could teach you a lot of things.\" I said.\r\n\"Perhaps I didn't think of it that way,\" she said and poured herself some more\r\nwine. She loved it.\r\n\"There’s much to do in Rio than being indoors anyways. I would’ve taken you to\r\nthe beach, had a nice walk, had some good food, and tried out beach bars where we\r\ncould dance the night away. That would be a typical night i",
  //     "n Rio, and I bet you’d love it.\r\nBet you’d also learn a lot of words in just one day. \" I said, this time trying to keep it\r\nprofessional. After all, I was getting paid hourly, and wasting time talking nonsense\r\n\r\nwould look bad on my reviews, even though she did not seem like the type who would\r\nleave a bad review.\r\n\"Okay, okay, fine,\" she said throwing her hands in the air, \"next time be the\r\ngentleman who takes me out instead.\"\r\n\"It sounds like a challenge, beleza.\" I raised an eyebrow.\r\n\"No,\" she shook her head and chuckled, \"unless you want it to be.\"\r\n\"No, really, I am going to prove myself, because I'm the best,\" I said.\r\nShe rolled her eyes.\r\n\"Don't roll your eyes on me,\" I said, slightly warning her.\r\n\"You didn't really say that.\" She scoffed and did it again and again. She was\r\ntesting my limits.\r\n\"I just did.\" She did it again and smirked.\r\n\"Why did you have to be the type that tends to be so bratty?\" I asked.\r\n\"I didn't.\" She shrugged and took another sip of her wine, \"",
  //     "I am just your favorite\r\nclient,\" she giggled. It was too cute.\r\n\"That you are.\" I chuckled and leaned back on my chair.\r\n\"So, when are you going to teach me all those beach words?\" she asked.\r\n\"I am available anytime, beleza.\"\r\n\"Okay, how about Saturday?\" she asked, \"I have already bought a really beautiful\r\nswimsuit and I can't wait to put it on.\"\r\nI smiled at her and nodded. I was definitely excited to take her out and show her\r\naround the city and the beach, especially the nightlife.\r\n\"You are going to love it.\"\r\n\"I will, especially if I'm with you,\" she smiled and blushed. I wondered whether\r\nshe was just being flirty or she meant it\r\n\"And who says you can't have your fun while learning? \" I raised an eyebrow."
  // ])
  // const [content, setContent] = useState({
  //   content_id: "",
  //   content_en: "",
  // });
  // useEffect(() => {
  //   const charactersPerPage = 1000;
  //   let content_id = "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n        \n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>";
  //   let content_en = "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n        \n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>";
  //   // Membagi konten HTML menjadi blok-blok teks dengan panjang karakter tertentu
  //   const removeHtmlTags = (html) => {
  //     const text = he.decode(html.replace(/<[^>]+>/g, '')); // Use he library for HTML entity decoding
  //     return text || '';
  //   };
  //   content_id = removeHtmlTags(content_id);
  //   content_en = removeHtmlTags(content_en);

  //   // Membuat halaman dengan blok-blok teks
  //   // const blocks_id = content_id.match(new RegExp(`.{1,${charactersPerPage}}`, 'g'));
  //   // const blocks_en = content_en.match(new RegExp(`.{1,${charactersPerPage}}`, 'g'));
  //   const splitContent = (text) => {
  //     const regex = new RegExp(`.{1,${charactersPerPage}}`, 'g');
  //     return text.match(regex) || [];
  //   };
  //   const blocks_id = splitContent(content_id);
  //   const blocks_en = splitContent(content_en);

  //   const pagesArray_id = blocks_id.map((block, index) => ({
  //     id: index,
  //     content: block,
  //   }));

  //   const pagesArray_en = blocks_en.map((block, index) => ({
  //     id: index,
  //     content: block,
  //   }));
  //  alert('data content'+JSON.stringify(pagesArray_en))
  //   console.log('data content'+JSON.stringify(pagesArray_en))
  //   setContent({
  //     content_id: pagesArray_id,
  //     content_en: pagesArray_en,
  //   });

  // }, []);
  // const [dataBook, setBook] = useState([
  //   {
  //     title: 'Fistful of Reefer: Test 1',
  //     detail:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, arcu in imperdiet auctor, metus sem cursus tortor, sed fringilla orci metus ac ex. Nunc pharetra, lacus in egestas vulputate, nisi erat auctor lectus, vitae pulvinar metus metus et ligula. Etiam porttitor urna nec dignissim lacinia. Ut eget justo congue, aliquet tellus eget, consectetur metus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut ac turpis dolor. Donec eu arcu luctus, volutpat dolor et, dapibus libero. Curabitur porttitor lorem non felis porta, ut ultricies sem maximus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum',
  //   },
  //   {
  //     title: 'Fistful of Reefer: Test 2',
  //     detail: 'hemmm',
  //   },
  //   {
  //     title: 'Fistful of Reefer: Test 3',
  //     detail:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, arcu in imperdiet auctor, metus sem cursus tortor, sed fringilla orci metus ac ex. Nunc pharetra, lacus in egestas vulputate, nisi erat auctor lectus, vitae pulvinar metus metus et ligula. Etiam porttitor urna nec dignissim lacinia. Ut eget justo congue, aliquet tellus eget, consectetur metus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut ac turpis dolor. Donec eu arcu luctus, volutpat dolor et, dapibus libero. Curabitur porttitor lorem non felis porta, ut ultricies sem maximus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum',
  //   },
  // ]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/background/) && nextAppState === 'active') {
        notifee.onForegroundEvent(async ({type, detail}) => {
          if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
            if (detail?.notification?.data?.type === 'story') {
              console.log('okeoke JALAN', nextAppState);
              setTimeout(async () => {
                // handleNativePayment(detail.notification.data?.placement);
                // if (isPremiumStory || isPremiumAudio) {
                console.log('okeoke', detail?.notification?.data?.id);
                const res = await getStoryDetail(
                  detail?.notification?.data?.id,
                );
                // setBook(res.data);
                // const response = await getStoryList();
                handleNextStory(res.data);
                navigate('Main');
                setShowModalDay(true);
                // let params = {
                //   search: '',
                //   column: 'title_en',
                //   dir: 'asc',
                // };
                // const resp = await getExploreStory(params);
                // handleStoriesRelate(resp);
                // setShowModal(true);
                // } else {
                //   setShowModalNewStory(true);
                // }
              }, 100);
              // eventTracking(OPEN_OFFER_NOTIFICATION);
            }
          }
        });
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    if (route?.params?.successListen) {
      if (userStory?.is_rating === null) {
        setRating(true);
      } else {
        handleSuccessRating();
      }
      pagerRef.current?.setPage(textChunks?.length - 1);
    }
  }, [route?.params]);
  const checkingRead = pageNumber => {
    const existingEntry = readStory
      ? readStory.find(
          item => item?.id === dataBook.id && item?.page === pageNumber,
        )
      : undefined;

    if (!existingEntry) {
      const newData = {
        id: dataBook.id,
        page: pageNumber,
      };

      // Dispatch action to update readStory in the Redux store
      handleReadStory([...readStory, newData]);
    }
  };
  const fetchStory = async () => {
    const resp = await getStoryList();
    handleSetStory(resp.data);
  };

  useEffect(() => {
    console.log(JSON.stringify(listenStory));
  }, [listenStory]);

  useEffect(() => {
    // fetchStory()
    if (readStory === null && dataBook) {
      let data = [
        {
          id: dataBook.id,
          page: activeSlide,
        },
      ];
      handleReadStory(data);
    }
  }, [dataBook]);

  useEffect(() => {
    if (userStory) {
      setBook(userStory);
      pagerRef.current?.setPage(0);
      setScreenNumber(0);
    }
  }, [userStory]);

  const fetchCheckingDay = async () => {
    const value = await AsyncStorage.getItem('setToday');
    const stringifyDateNow = new Date();
    let strTanggalSekarang = stringifyDateNow.getDate().toString();
    if (value != null) {
      if (value != strTanggalSekarang) {
        AsyncStorage.setItem('setToday', strTanggalSekarang);
        try {
          if (userProfile?.data?.subscription?.plan?.id != 1) {
            const res = await getStoryList();
            handleNextStory(res.data);
            setShowModalDay(true);
          } else {
            setShowModalNewStory(true);
          }
        } catch (error) {}
      }
    } else if (value === null) {
      AsyncStorage.setItem('setToday', strTanggalSekarang);
    }
  };
  const fecthNextStory = async () => {
    const res = await getStoryList();
    handleNextStory(res.data);
    setShowModal(true);
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      const payload = {
        _method: 'PATCH',
        is_member: 3,
      };
      updateProfile(payload);
      reloadUserProfile();
    }
    fetchCheckingDay();
  }, []);

  const onScroll = async (e: PagerViewOnPageSelectedEvent) => {
    // const offsetY = e.nativeEvent.contentOffset.x;
    // const height = sizing.getDimensionWidth(0.89);
    // const pageNumber = Math.min(
    //   Math.max(Math.floor(offsetY / height + 0.5), 0),
    //   dataBook?.length || 0,
    // );
    // setShowModalCongrats(true)
    const pageNumber = e.nativeEvent.position;
    setScreenNumber(pageNumber);
    const timeoutLove = setTimeout(() => {
      if (pageNumber === textChunks?.length - 1) {
        setIsLoveAnimate(false);
      }
    }, 3000);

    checkingRead(pageNumber);
    // handleReadStory(pageNumber)
    // setReadBook(prevReadBook => {
    //   // Use Set to store unique page numbers
    //   const updatedReadBook = new Set([...prevReadBook, pageNumber]);
    //   return Array.from(updatedReadBook);
    // });
    // if (pageNumber === dataBook?.length - 1 && readBook.includes(pageNumber)) {
    //   // Show alert or perform other actions
    //   alert('You reached the last page and it is marked as read!');
    // }
    if (pageNumber === 2 || pageNumber === 5 || pageNumber === 8) {
      setIsLoveAnimate(true);
      if (isLoveAnimate !== 'stop') {
        setTimeout(() => {
          setIsLoveAnimate(true);
        }, 200);
      }
      setTimeout(() => {
        if (isLoveAnimate) {
          setIsLoveAnimate('false');
        }
      }, 3200);
      setTimeout(() => {}, 3400);
    }
    const existingEntry = readStory
      ? readStory.find(
          (item: any) => item?.id === dataBook.id && item?.page === pageNumber,
        )
      : undefined;
    if (!existingEntry && pageNumber === textChunks?.length + 1 - 1) {
      // jika nanti pertama kali melakukan update data terakhir
      await addPastStory(dataBook.id);
      const data = {
        value: textChunks?.length,
      };
      const resp = await addPastLevel(data);
      if (resp?.data) {
        handleLeveling(resp?.data);
        setTimeout(() => {
          setShowModalCongrats(true);
        }, 200);
      }
    } else if (
      existingEntry &&
      pageNumber === textChunks?.length + 1 - 1 &&
      !(isPremiumStory || isPremiumAudio)
    ) {
      //jika tidak premium maka akan terus menampilan modal setiap terakhir
      // setShowModalCongrats(true);
    }
    if (pageNumber === textChunks?.length - 1) {
      //   if(isPremium){
      //     const data = await AsyncStorage.getItem('isFirstTime');
      //     // AsyncStorage.removeItem('isFirstTime');
      //     // alert(data)
      //     if (data === 'yes') {
      //     } else {
      //       setShowModalCongrats(true);
      //       AsyncStorage.setItem('isFirstTime', 'yes');
      //     }
      //   }else{
      //     setShowModalCongrats(true);
      //   }
      // } else {
      //   clearTimeout(timeoutLove);
      //   setIsLoveAnimate(false);
    }
    // purchaseSubscription()
    setActiveSlide(pageNumber - 1);

    startAnimation();
    handleLoadMore(pageNumber);

    if (pageNumber - 1 !== activeSlide && !isUserHasScroll) {
      setUserScrollQuotes(true);
    }
  };

  const handleGesture = evt => {
    const {nativeEvent} = evt;
    if (nativeEvent.velocityX < -614) {
    }
  };
  const onDoubleTap = event => {
    if (!isUserHasScroll && event.nativeEvent.state === State.BEGAN) {
      setUserScrollQuotes(true);
    }
    if (event.nativeEvent.state === State.ACTIVE) {
      // handleLike();
    }
  };
  const handleTouchStart = e => {
    // Mendapatkan posisi sentuhan
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const screenWidth = Dimensions.get('window').width / 2.5;
    0;

    // Jika sentuhan terjadi di sebelah kiri, set isSwipingLeft ke true
    if (touchX < screenWidth) {
      if (activeStep === 1) {
      } else {
        setTutorial({
          ...isTutorial,
          step: isTutorial.step - 1,
        });
        setActiveStep(prevStep => prevStep - 1);
        handleSetSteps(activeStep - 1);
      }
    } else {
      handleNext();
    }
    // setIsSwipingLeft(true);
    // if (activeStep === 1) {
    // } else {
    //   setTutorial({
    //     ...isTutorial,
    //     step: isTutorial.step - 1,
    //   });
    //   setActiveStep(prevStep => prevStep - 1);
    //   handleSetSteps(activeStep - 1);
    // }
    // } else if (touchX < halfScreenWidth){
    //   alert('okeee kiri')
    // }
    // // Jika sentuhan terjadi di sebelah kanan, set isSwipingRight ke true
    // else {
    //   alert('okeee KANAN')
    //   // handleNext();
    //   // setIsSwipingRight(true);
    // }
  };

  const handlePrev = () => {
    setTutorial({
      ...isTutorial,
      step: isTutorial.step - 1,
    });
    setActiveStep(prevStep => prevStep - 1);
    handleSetSteps(activeStep - 1);
  };

  const handleNext = () => {
    const content =
      'Being the youngest one in my crew, and in my twenties, with a pretty much an old school mindset is kinda hard as I find difficulties to actually fit in. I’ve been there before: the loyal friend who has to be there for her girlfriends when they get dumped for the silliest and dumbest reasons. these days isn’t worth a single teardrop, and most importantly, having to hear them crying which deliberately forces me to come up with stories and jokes in order to cheer them up.';
    setActiveStep(prevStep => prevStep + 1); // Menambahkan 1 ke langkah saat mengklik "Next"
    handleSetSteps(stepsTutorial + 1);
    if (stepsTutorial === 2) {
      setFinishTutorial(false);
      setIsRippleAnimate(true);
      setTimeout(() => {
        setFinishTutorial(true);
        setIsRippleAnimate(false);
      }, 3000);
      setTimeout(() => {
        navigate('Media');
      }, 2500);
    } else if (stepsTutorial === 5) {
      handleSetSteps(stepsTutorial + 1);
      navigate('Share', {
        selectedContent:
          ' To be completely and shamelessly honest, I was against getting into a relationship for a number of reasons.',
        start: content?.substring(0, 30),
        end: content.substring(30, 30 + 30),
      });
    }
  };

  const handleTouchEnd = () => {
    // Reset status swipe saat sentuhan selesai
    setIsSwipingLeft(false);
    setIsSwipingRight(false);
  };
  const startAnimation = () => {
    setFolded(!folded);

    Animated.timing(animationValue, {
      toValue: folded ? 0 : 1,
      duration: 1000,
      useNativeDriver: false, // Set this to true for better performance, but note that not all properties are supported with native driver
    }).start();
  };
  const handleLoadMore = async value => {
    // const params = {
    //   page: userStory?.current_page + 1,
    // };
    // try {
    //   const res = await getStoryList(params);
    //   // alert(JSON.stringify(res))
    //   setBook(res.data);
    //   handleSetStory(res.data);
    // } catch (error) {
    //   // alert(error)
    // }
  };
  const rotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleThemeAvatar = async () => {
    // (angry,confused,cry,dizzy,excited,friendly,inlove,positive.scare,think)
    let params = {
      flag: 'friendly',
    };
    try {
      const data = await getListAvatarTheme(params);
      if (data?.data) {
        setMe(data?.data?.me);
        setPartner(data?.data?.partner);
      }
    } catch (error) {}
  };

  useEffect(() => {
    // handleSetSteps(0);
    // AsyncStorage.setItem('isTutorial', 'yes');
    handleThemeAvatar();
    // AsyncStorage.removeItem('isTutorial');
    const checkTutorial = async () => {
      const isFinishTutorial = await AsyncStorage.getItem('isTutorial');
      if (isFinishTutorial === 'yes' && isTutorial.step === 0) {
        setFinishTutorial(true);
        // setTutorial({
        //   visible: true,
        //   step: 1,
        // });
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setTutorial({
            ...isTutorial,
            step: isTutorial.step + 1,
          });
          setActiveStep(1);
          handleSetSteps(1);
        }, 3500);
      } else if (activeStep === 2 || activeStep === 3) {
        setFinishTutorial(false);
        setIsRippleAnimate(true);
        setTimeout(() => {
          setFinishTutorial(true);
          setIsRippleAnimate(false);
        }, 3000);
        if (route?.name == 'Main') {
          setTimeout(() => {
            navigate('Media');
          }, 2500);
        }
        // navigate('Media');
      // } else if (activeStep === 3) {
      //   navigate('Library');
      } else if (activeStep === 4) {
        navigate('ExploreLibrary');
      } else if (
        activeStep === 6 ||
        activeStep === 7 ||
        activeStep === 8 ||
        activeStep === 9
      ) {
        const content =
          'Being the youngest one in my crew, and in my twenties, with a pretty much an old school mindset is kinda hard as I find difficulties to actually fit in. I’ve been there before: the loyal friend who has to be there for her girlfriends when they get dumped for the silliest and dumbest reasons. these days isn’t worth a single teardrop, and most importantly, having to hear them crying which deliberately forces me to come up with stories and jokes in order to cheer them up.';
        navigate('Share', {
          selectedContent:
            ' To be completely and shamelessly honest, I was against getting into a relationship for a number of reasons.',
          start: content?.substring(0, 30),
          end: content.substring(30, 30 + 30),
        });
      }
    };
    checkTutorial();
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setIsStartConfetti(true);
        setTimeout(() => {
          setIsStartConfetti(false);
        }, 1000);
      }, 1000);
    }
  }, [visible]);

  const checkingListen = async () => {
    if (listenStory === null) {
      if (
        userProfile?.data?.subscription?.plan?.id === 2 &&
        userProfile?.data?.subscription?.audio_limit != 0
      ) {
        const payload = {
          _method: 'PATCH',
          audio_take: 1,
        };
        await updateProfile(payload);
        reloadUserProfile();
        navigate('Media');
      } else if (
        userProfile?.data?.subscription?.plan?.id === 1 &&
        userProfile?.data?.subscription?.audio_limit != 0
      ) {
        const payload = {
          _method: 'PATCH',
          audio_take: 1,
        };
        await updateProfile(payload);
        reloadUserProfile();
        navigate('Media');
      } else {
        setShow(true);
      }
      let data = [
        {
          id: dataBook.id,
        },
      ];
      handleListenStory(data);
    } else {
      const existingEntry = listenStory
        ? listenStory.find((item: any) => item?.id === dataBook.id)
        : undefined;
      if (!existingEntry) {
        const newData = {
          id: dataBook.id,
        };

        // Dispatch action to update readStory in the Redux store
        handleListenStory([...listenStory, newData]);
        if (
          userProfile?.data?.subscription?.plan?.id === 2 &&
          userProfile?.data?.subscription?.audio_limit != 0
        ) {
          const payload = {
            _method: 'PATCH',
            audio_take: 1,
          };
          await updateProfile(payload);
          reloadUserProfile();
          navigate('Media');
        } else if (
          userProfile?.data?.subscription?.plan?.id === 1 &&
          userProfile?.data?.subscription?.audio_limit != 0
        ) {
          const payload = {
            _method: 'PATCH',
            audio_take: 1,
          };
          await updateProfile(payload);
          reloadUserProfile();
          navigate('Media');
        } else {
          setShow(true);
        }
      } else {
        if (
          userProfile?.data?.subscription?.plan?.id === 2 &&
          userProfile?.data?.subscription?.audio_limit != 0
        ) {
          navigate('Media');
        } else if (
          userProfile?.data?.subscription?.plan?.id === 1 &&
          userProfile?.data?.subscription?.audio_limit != 0
        ) {
          navigate('Media');
        } else {
          setShow(true);
        }
      }
    }
  };
  const handleListening = async () => {
    if (userProfile?.data?.subscription?.plan?.id === 3) {
      navigate('Media');
    } else {
      checkingListen();
    }
  };
  const splitTextIntoArray = (text, chunkLength) => {
    const words = text.split(' ');
    const resultArray = [];
    let currentChunk = '';
  
    for (const word of words) {
      if ((currentChunk + word).length <= chunkLength) {
        currentChunk += word + ' ';
      } else {
        resultArray.push(currentChunk.trim());
        currentChunk = word + ' ';
      }
    }
  
    if (currentChunk.trim() !== '') {
      resultArray.push(currentChunk.trim());
    }
  
    return resultArray;
  };
  const text ="Supporting myself during summer was actually pretty easy. As people started to\r\nromanticize Brazil once again, they started to like the language and aim to learn it, and\r\nbeing a good English speaker and native Portuguese speaker, I decided to offer private\r\nlessons. To my delight, I have always had genuine clients who paid me really well, and\r\nmost of them were old people too. My latest client, however, a long term, was my age\r\nand she was just... my type.\r\nShe had a beautiful smile and her body was to die for, which she often used to\r\nher advantage to distract me, which worked more often than not. She was tall, had long\r\nbrown hair, and had the most wonderful pair of breasts I have ever seen. It wasn't fair\r\nthat someone had such a nice rack, but hey, I wasn't complaining.\r\nThe lesson went well, and as per usual, we started to talk.\r\n\"You know, you're the best teacher I've ever had,\" she told me with a smile.\r\n\"You're also cute. Do you want to grab something to eat? My treat!\"\r\nI was going to say yes, because, well, free food, but I then thought of it again and\r\nI remembered seeing her the other day in town with someone, and the thought itself\r\nwas like fuel. I'm not gonna go out with someone who already has someone else, but\r\ndeep inside I want to, and I also wanted her to tell me about him.\r\n\"I would do anything for a swim on the beach now. You do realize I need to learn\r\nsome beach-related vocabulary, right?\" she teased and sipped on her wine.\r\n\"Oh yeah? You mean... you’d do anything for that?\" I got comfortable in my seat.\r\nShe looked ethereal that day, \"I'll think about it.\" I finally said.\r\n\"Oh, please, come on, come one. You're the only one I wanna tour Rio with,\" she\r\nsaid, pleading. She probably knew it was impossible to resist the looks she was giving\r\nme.\r\n\"And do you take out everyone?\" I asked.\r\nShe shook her head, the smile never leaving her beautiful face, \"why do you\r\nask?\" she said.\r\n\"Well, I saw you in town the other day and it seemed you were having a lot of fun.\r\nI didn’t wanna bump into you and ruin the moment though... whatever type of fun you\r\nwere having.\" I must have sounded like a possessive freak.\r\n\r\n\"Oh, you saw me?\" she asked and scoffed, \"why didn’t you say anything, then?\r\nOr you didn’t wanna ruin the spark? \"\r\n\"You looked happy. And I gotta admit...\" I chuckled, \"It was nice seeing you\r\nhappy. It made me feel good, you know?\"\r\n\"You're so dorky. A dorky teacher.\" she rolled her eyes. She possibly did not\r\nknow that I don't like girls roll their eyes on me.\r\n\"So, who was he?\" I spread my legs and asked.\r\n\"Just a friend?\" she shrugged and looked away. I knew she was hiding something\r\nand she didn't do it in the best way too.\r\n\"You’re making friends, already? I mean- did you get lucky?\" I asked.\r\nShe shook her head, eyeing me up and down, confused.\r\nI cringed at myself... and my poor knowledge of English proverbs so I tried to\r\ncorrect it, \"That’s not what I meant, Beleza. Or maybe I did but- I-\" I stuttered... as\r\nusual... and I laughed. It was awkward but it was nice to see her joyful, \"I know you’ve\r\nbeen wanting to have some friends here, but maybe I am just over-questioning things\r\nthat are none of my business. You looked happy regardless of who took you out. Even if\r\nit wasn’t me. \"\r\n\"Even if it wasn't you, huh?\" she tilted her head and asked.\r\nI couldn't help but scoff. She was seriously testing my patience, \"Oh, I don’t really\r\nmean anything. Just the fact that you picked him over me- I mean you picked going out\r\nwith him over doing that with... me. I’m definitely a lot more fun and you know that.\r\nPlus, I could teach you a lot of things.\" I said.\r\n\"Perhaps I didn't think of it that way,\" she said and poured herself some more\r\nwine. She loved it.\r\n\"There’s much to do in Rio than being indoors anyways. I would’ve taken you to\r\nthe beach, had a nice walk, had some good food, and tried out beach bars where we\r\ncould dance the night away. That would be a typical night in Rio, and I bet you’d love it.\r\nBet you’d also learn a lot of words in just one day. \" I said, this time trying to keep it\r\nprofessional. After all, I was getting paid hourly, and wasting time talking nonsense\r\n\r\nwould look bad on my reviews, even though she did not seem like the type who would\r\nleave a bad review.\r\n\"Okay, okay, fine,\" she said throwing her hands in the air, \"next time be the\r\ngentleman who takes me out instead.\"\r\n\"It sounds like a challenge, beleza.\" I raised an eyebrow.\r\n\"No,\" she shook her head and chuckled, \"unless you want it to be.\"\r\n\"No, really, I am going to prove myself, because I'm the best,\" I said.\r\nShe rolled her eyes.\r\n\"Don't roll your eyes on me,\" I said, slightly warning her.\r\n\"You didn't really say that.\" She scoffed and did it again and again. She was\r\ntesting my limits.\r\n\"I just did.\" She did it again and smirked.\r\n\"Why did you have to be the type that tends to be so bratty?\" I asked.\r\n\"I didn't.\" She shrugged and took another sip of her wine, \"I am just your favorite\r\nclient,\" she giggled. It was too cute.\r\n\"That you are.\" I chuckled and leaned back on my chair.\r\n\"So, when are you going to teach me all those beach words?\" she asked.\r\n\"I am available anytime, beleza.\"\r\n\"Okay, how about Saturday?\" she asked, \"I have already bought a really beautiful\r\nswimsuit and I can't wait to put it on.\"\r\nI smiled at her and nodded. I was definitely excited to take her out and show her\r\naround the city and the beach, especially the nightlife.\r\n\"You are going to love it.\"\r\n\"I will, especially if I'm with you,\" she smiled and blushed. I wondered whether\r\nshe was just being flirty or she meant it\r\n\"And who says you can't have your fun while learning? \" I raised an eyebrow."
  const textChunks = splitTextIntoArray(text, Dimensions.get('window').height <= 667 ? 600 : 750);
  const renderFactItem = ({item, index, title, category, colorText}) => {
   
    return (
      <>
        <QuotesContent
          item={item}
         
          isActive={activeSlide === index}
          totalStory={textChunks?.length}
          pageActive={index}
          colorText={colorText}
          isAnimationStart={isLoveAnimate}
          themeUser={userProfile?.data}
          fontSize={fontSize}
          bgTheme={colorTheme}
          bg={backgroundColor}
          fontFamily={fontFamily}
          partner={partner}
          source={undefined}
          titleStory={title}
          titleCategory={category}
          show={show}
          setShow={() => setShow(false)}
          handleListen={() => handleListening()}
        />
        
      </>
    );
  };

  // function renderFlatList() {
  //   return (
  //     <PanGestureHandler
  //       onGestureEvent={handleGesture}
  //       activeOffsetX={[-40, 40]}>
  //       <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={3}>
  //         <FlatList
  //           // ref={flatListRef}
  //           style={{
  //             flex: 1,
  //             backgroundColor: backgroundColor,
  //           }}
  //           data={dataBook}
  //           pagingEnabled
  //           onMomentumScrollEnd={onMomentoumScrollEnd}
  //           scrollsToTop={false}
  //           horizontal
  //           showsVerticalScrollIndicator={false}
  //           showsHorizontalScrollIndicator={false}
  //           // onEndReached={handleEndReach}
  //           onEndReachedThreshold={0.9}
  //           renderItem={renderFactItem}
  //           keyExtractor={(_item, index) => `${index}`}
  //           initialScrollIndex={0}
  //           getItemLayout={(_data, index) => ({
  //             length: sizing.getDimensionWidth(0.5),
  //             offset: sizing.getDimensionWidth(0.5) * index,
  //             index,
  //           })}
  //           onScrollToIndexFailed={() => {
  //             console.log('FAILED SCROLL TO INDEX', 5);
  //           }}
  //         />
  //       </TapGestureHandler>
  //     </PanGestureHandler>
  //   );
  // }
  function renderFlatList() {
    if (textChunks?.length > 0) {
      const jumlahDataKosong = 1; // Ganti dengan jumlah yang diinginkan

      // Menghitung panjang array setelah ditambahkan data kosong
      const panjangArrayBaru = dataBook.content_en.length + jumlahDataKosong;

   
      const dataBaru = dataBook.content_en;
    
      return (
        <PagerView
          style={{flex: 1}}
          initialPage={0}
          ref={pagerRef}
          transitionStyle="curl"
          overdrag={false}
          onPageScroll={e => onScroll(e)}>
          {textChunks?.map((dtb: any, index: number) => {
            return (
              <View
                style={{
                  flex: 0,
                  alignItems: 'center',
                  backgroundColor: backgroundColor,
                  paddingTop: wp(20),
                  paddingHorizontal: wp(20),
                }}>
                {renderFactItem({
                  item: dtb,
                  index,
                  title: dataBook.title_en,
                  category: dataBook?.category?.name,
                  colorText: colorText,
                })}
              </View>
            );
          })}
        </PagerView>
      );
    } else {
      return null;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const isFinishTutorial = await AsyncStorage.getItem('isTutorial');
      if (isFinishTutorial === 'yes') {
        setFinishTutorial(true);
      } else {
        setFinishTutorial(false);
      }
    }
    fetchData();
  }, [isFocused]);

  const handleUnlock = async () => {
    setLoading(true);
    const data = await handleNativePayment('unlock_story_1_week_only');
    if (data) {
      setShowModalCongrats(false);
      setShowModalNewStory(false);
      const res = await getStoryList();
      handleNextStory(res.data);
      setLoading(false);
      setShowModalSuccessPurchase(true);
    } else {
      setLoading(false);
      // setShowModalNewStory(false);
    }
  };
  const handleUnlimited = async () => {
    //
    try {
      const paymentResult = await handlePayment('in_app');
      if (paymentResult.success) {
        setShowModalGetPremium(true);
        setShowModalNewStory(false);
        setShowModalCongrats(false);
        console.log('Pembayaran berhasil:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran berhasil
      } else {
        // setShowModalNewStory(false);
        console.log('Pembayaran gagal:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran gagal
      }
    } catch (error) {
      // setShowModalNewStory(false);
      console.error('Terjadi kesalahan:', error);
      // Tangani kesalahan yang mungkin terjadi
    }
    // setShowModalGetPremium(true);
  };

  const renderProgress = () => (
    <StepHeader
      currentStep={stepsTutorial === 5 ? stepsTutorial + 2 : stepsTutorial + 1}
    />
  );
  const renderTutorial = () => {
    if (isFinishTutorial) {
      if (activeStep === 0) {
        return (
          <Modal
            visible={visible}
            animationType="fade"
            transparent
            onDismiss={() => setVisible(false)}>
            <ImageBackground
              source={imgBgTips}
              resizeMode="cover"
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                flex: 1,
                alignItems: 'center',
              }}>
              <Animatable.Image
                animation={{
                  from: {
                    bottom: '-50%',
                  },
                  to: {
                    bottom: '0%',
                  },
                  easing: 'ease-out-back',
                }}
                delay={200}
                duration={800}
                source={imgBgAvaTips}
                resizeMode="contain"
                style={{width: '80%', height: '100%'}}
              />
              <Image
                source={imgLoveLeft}
                resizeMode="contain"
                style={{
                  width: '30%',
                  height: '100%',
                  position: 'absolute',
                  top: -70,
                  left: 0,
                }}
              />
              <Image
                source={imgLoveRight}
                resizeMode="contain"
                style={{
                  width: '30%',
                  height: '100%',
                  position: 'absolute',
                  top: -70,
                  right: 0,
                }}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  bottom: 0,
                  width: Dimensions.get('window').width,
                  height: '58%',
                  borderTopRightRadius: wp(60),
                  borderTopLeftRadius: wp(60),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    height: wp(250),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {isStartConfetti && (
                    <AnimatedLottieView
                      source={confettiAnimate}
                      style={{
                        width: '80%',
                        // height: 500,
                        // bottom: 20,
                        // left: -40,
                        top: '-8%',
                        left: '7%',
                        position: 'absolute',
                        zIndex: 2,
                      }}
                      autoPlay
                      duration={1000}
                      loop={false}
                    />
                  )}
                  <Animatable.Text
                    delay={0}
                    animation={'fadeInUp'}
                    duration={1000}
                    style={{
                      color: '#5873FF',
                      fontSize: 30,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: 'Comfortaa-SemiBold',
                      marginBottom: wp(50),
                    }}>
                    {`Hey, ${userProfile?.data?.name === null ? '' : userProfile?.data?.name}\nYou’re all set!`}
                  </Animatable.Text>
                  <Animatable.Text
                    delay={2000}
                    animation={'fadeIn'}
                    duration={800}
                    style={{
                      fontSize: fixedFontSize(24),
                      textAlign: 'center',
                      fontWeight: '100',
                      marginTop: wp(10),
                    }}>
                    {"Let's show you how \nEroTales works..."}
                  </Animatable.Text>
                </View>
              </View>
            </ImageBackground>
          </Modal>
        );
      } else if (activeStep <= 3 || activeStep <= 5 || stepsTutorial <= 5) {
        const content = `Being the youngest one in my crew, and in my twenties, with a pretty much an old school mindset is kinda hard as I find difficulties to actually fit in.
      I’ve been there before: the loyal friend who has to be there for her girlfriends when they get dumped for the silliest and dumbest reasons. these days isn’t worth a single teardrop, and most importantly, having to hear them crying which deliberately forces me to come up with stories and jokes in order to cheer them up.`;
        if (activeStep === 5 || stepsTutorial == 5) {
          setTimeout(() => {
            handleNext();
          }, 5000);
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
            }}>
            {activeStep != 5 && stepsTutorial != 5 && stepsTutorial != 3
              ? renderProgress()
              : null}
            {activeStep === 1 ? (
              <Step1 handleNext={handleNext} />
            ) : activeStep === 5 || stepsTutorial == 5 ? (
              <View style={{alignItems: 'center'}}>
                <ImageBackground
                  source={imgSelect}
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    marginTop: '-10%',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      opacity: 1,
                      marginTop: wp(40),
                    }}>
                    {renderProgress()}
                  </View>

                  <Step5 handleNext={handleNext} handlePrev={handlePrev} />
                  <View style={{position: 'absolute', bottom: 30}}>
                    <AnimatedLottieView
                      source={rippleAnimate}
                      style={{
                        width: wp(100),
                      }}
                      autoPlay
                      duration={1500}
                      loop={true}
                    />
                  </View>
                </ImageBackground>
              </View>
            ) : (
              <Step2
                handleNext={handleNext}
                handlePrev={() => {
                  setActiveStep(1);
                  handleSetSteps(1);
                }}
              />
            )}
          </SafeAreaView>
        );
      }
    }
  };

  const reloadWatch = async () => {
    const advert = await loadRewarded2();
    setShowModalCongrats(false);
    advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      async reward => {
        setShowModalNewStory(false);
        setLoadingAds(false);
        if (reward) {
          const res = await getStoryList();
          handleNextStory(res.data);

          let params = {
            search: '',
            column: 'title_en',
            dir: 'asc',
          };
          const resp = await getExploreStory(params);
          handleStoriesRelate(resp);
          setLoadingAds(false);
          setTimeout(() => {
            setShowModal(true);
          }, 300);
          setClick(1);
        }

        // setLoadingAds(false);
      },
    );
  };

  const showWatchAds = async () => {
    setLoadingAds(true);
    const advert = await loadRewarded();
    advert.addAdEventListener(AdEventType.CLOSED, () => {
      reloadWatch();

      // setLoadingAds(false);
    });
  };
  const handleRead = () => {
    handleSetStory(nextStory);
    setShowModalDay(false);
    setShowModal(false);
    setBook(nextStory);
    pagerRef.current?.setPage(0);
    setScreenNumber(0);
  };

  const touchEndStory = async e => {
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const screenWidth = Dimensions.get('window').width / 2.5;
    // Jika sentuhan terjadi di sebelah kanan
    if (touchX > screenWidth && !showModalCongrats) {
      setTimeout(async () => {
        if (screenNumber === textChunks?.length - 1) {
          const existingEntry = readStory
            ? readStory.find(
                (item: any) =>
                  item?.id === dataBook.id && item?.page === screenNumber + 1,
              )
            : undefined;
          if (readStory?.length === 2) {
            eventTracking(FINISH_LISTEN_3);
          }
          if (readStory?.length === 9) {
            eventTracking(FINISH_LISTEN_10);
          }
          if (
            typeof existingEntry === 'undefined' &&
            screenNumber === textChunks?.length - 1
          ) {
            // jika nanti pertama kali melakukan update data terakhir

            await addPastStory(dataBook.id);
            const data = {
              value: textChunks?.length,
            };
            const resp = await addPastLevel(data);
            if (resp?.data) {
              handleLeveling(resp?.data);
              setTimeout(() => {
                setShowModalCongrats(true);
              }, 200);
            }
            checkingRead(screenNumber + 1);
          } else if (existingEntry && !(isPremiumStory || isPremiumAudio)) {
            //jika tidak premium maka akan terus menampilan modal setiap terakhir
            setShowModalCongrats(true);
          }
        }
      }, 700);
    }
  };

  const handleSuccessRating = async () => {
    setRating(false);
    if (isPremiumStory || isPremiumAudio) {
      const res = await getStoryDetail(userStory?.id);
      setBook(res.data);
      const response = await getStoryList();
      handleNextStory(response.data);
      let params = {
        search: '',
        column: 'title_en',
        dir: 'asc',
      };
      const resp = await getExploreStory(params);
      handleStoriesRelate(resp);
      setShowModal(true);
    } else {
      setShowModalNewStory(true);
    }
  };
  const handleLater = async () => {
    const response = await addStory(nextStory.id);
    setShowModalDay(false);
  };
  const renderView = () => {
    if (route?.name != 'Main') {
      return (
        <Pressable
          onPress={() => (route?.name != 'Main' ? pressScreen() : null)}
          style={{
            backgroundColor: backgroundColor,
            flex: 1,
            // paddingHorizontal: wp(20),
            marginTop: wp(20),
          }}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />

<View
            style={{
              backgroundColor: backgroundColor,
              paddingTop: isIphoneXorAbove() ? 40 : 25,
            }}
          />
             <View style={{flexDirection: 'row', flex: 0, alignItems: 'center', marginHorizontal: 20}}>
            <View style={{flex: 1}}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'left',
                  fontSize: fixedFontSize(Number(fontSize)),
                  fontFamily: fontFamily,
                  marginBottom: wp(5),
                  color:
                    backgroundColor === '#2C3439'
                      ? code_color.white
                      : code_color.blackDark,
                }}>
                {dataBook?.category?.name}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: fixedFontSize(Number(fontSize) + 2),
                  fontFamily: fontFamily,
                  color:
                    backgroundColor === '#2C3439'
                      ? code_color.white
                      : code_color.blackDark,
                }}>
                {dataBook?.title_en}
              </Text>
            </View>

            <TouchableOpacity
              onPress={async () => {
                handleListening()
              }}
              style={{
                padding: wp(5),
                paddingHorizontal: wp(10),
                borderRadius: wp(20),
                backgroundColor: colorTheme,
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
                  fontSize: fixedFontSize(Number(fontSize)),
                  fontFamily: fontFamily,
                  color: code_color.white,
                  marginLeft: wp(5),
                }}>
                Listen
              </Text>
            </TouchableOpacity>
          </View>
          {renderTutorial()}
          {renderFlatList()}
         
        </Pressable>
      );
    } else {
      return (
        <View
          onTouchStart={touchEndStory}
          style={{
            backgroundColor: backgroundColor,
            flex: 1,
            // paddingHorizontal: 20,
            // paddingTop: 20,
          }}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />

          <View
            style={{
              backgroundColor: backgroundColor,
              paddingTop: isIphoneXorAbove() ? 40 : 25,
            }}
          />
          <ModalStoryUnlockDay
            isVisible={showModalDay}
            onClose={() => setShowModalDay(false)}
            handleRead={() => handleRead()}
            handleLater={() => handleLater()}
          />
          <ModalStoryUnlock
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            data={undefined}
            restart={undefined}
            edit={undefined}
            readLater={readLater}
            isPremium={isPremiumStory || isPremiumAudio}
            handleRead={() => handleRead()}
          />
          <ModalStoryRating
            isVisible={showRating}
            onClose={() => 
              {
                setRating(false)
                setScreenNumber(0)
                handleSuccessRating()
              }}
            handleSuccess={() => {
              setRating(false)
              setScreenNumber(0)
              handleSuccessRating()
            }}
          />
          <ModalNewStory
            loadingAds={loadingAds}
            isLoading={loading}
            isVisible={showModalNewStory}
            onClose={() => setShowModalNewStory(false)}
            onWatchAds={() => {
              showWatchAds();
            }}
            onUnlock={() => {
              handleUnlock();
            }}
            onGetUnlimit={() => {
              handleUnlimited();
            }}
          />
          <ModalSuccessPurchase
            isVisible={showModalSuccessPurchase}
            onClose={() => {
              setBook(nextStory);
              setShowModalSuccessPurchase(false);
            }}
          />
          <ModalGetPremium
            isVisible={showModalGetPremium}
            onGotIt={() => {
              setShowModalGetPremium(false);
              fecthNextStory();
            }}
            onClose={() => setShowModalGetPremium(false)}
          />
          <View style={{flexDirection: 'row', flex: 0, alignItems: 'center', marginHorizontal: 20}}>
            <View style={{flex: 1}}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'left',
                  fontSize: fixedFontSize(Number(fontSize)),
                  fontFamily: fontFamily,
                  marginBottom: wp(5),
                  color:
                    backgroundColor === '#2C3439'
                      ? code_color.white
                      : code_color.blackDark,
                }}>
                {dataBook?.category?.name}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: fixedFontSize(Number(fontSize) + 2),
                  fontFamily: fontFamily,
                  color:
                    backgroundColor === '#2C3439'
                      ? code_color.white
                      : code_color.blackDark,
                }}>
                {dataBook?.title_en}
              </Text>
            </View>

            <TouchableOpacity
              onPress={async () => {
                handleListening()
              }}
              style={{
                padding: wp(5),
                paddingHorizontal: wp(10),
                borderRadius: wp(20),
                backgroundColor: colorTheme,
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
                  fontSize: fixedFontSize(Number(fontSize)),
                  fontFamily: fontFamily,
                  color: code_color.white,
                  marginLeft: wp(5),
                }}>
                Listen
              </Text>
            </TouchableOpacity>
          </View>
          {isRippleAnimate && (
          <Animatable.View
            duration={200}
            animation={'fadeIn'}
            style={{top: -80, right: -100, position: 'absolute', zIndex: 2}}>
            <AnimatedLottieView
              source={rippleAnimate}
              style={{
                width: sizing.getDimensionWidth(0.8),
              }}
              autoPlay
              duration={4000}
            />
          </Animatable.View>
        )}
          {renderFlatList()}
          {renderTutorial()}
          {showModalCongrats && (
            <ModalCongrats
              pastLevel={textChunks?.length}
              isVisible={showModalCongrats}
              onClose={async () => {
                // pagerRef.current?.setPage(dataBook.content_en?.length - 1);
                if (currentXp !== newXp) {
                  reloadUserProfile();
                }
                setShowModalCongrats(false);
              }}
              onGotIt={async () => {
                setShowModalCongrats(false);
                if (userStory?.is_rating === null) {
                  setScreenNumber(0)
                  setRating(true)
                  // handleSuccessRating();
                } else {
                  handleSuccessRating();
                }
                // pagerRef.current?.setPage(dataBook.content_en?.length - 1);
              }}
            />
          )}
        </View>
      );
    }
  };
  return renderView();
};

const styles = StyleSheet.create({});

MainScreen.propTypes = {
  activeVersion: PropTypes.any,
  pressScreen: PropTypes.any,
  colorText: PropTypes.any,
};

MainScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(MainScreen);
