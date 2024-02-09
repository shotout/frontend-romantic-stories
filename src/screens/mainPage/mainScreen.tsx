/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
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
import messaging from '@react-native-firebase/messaging';
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
import {
  FINISH_LISTEN_10,
  FINISH_LISTEN_3,
  FINISH_LISTEN_7,
  FINISH_READ_10,
  FINISH_READ_3,
  FINISH_READ_7,
  eventTracking,
} from '../../helpers/eventTracking';
import ModalUnlockStory from '../../components/modal-unlock-story';
import ModalMedia from '../../components/modal-media';
import * as IAP from 'react-native-iap';
import ModalStoryPreview from '../../components/modal-story-preview';
import ModalStorySave from '../../components/modal-story-save';

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
  const [loadingStory, setLoadingStory] = useState(false);
  const [showStoryFree, setShowStoryFree] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAds, setLoadingAds] = useState(false);
  const [activeStep, setActiveStep] = useState(stepsTutorial);
  const [click, setClick] = useState(1);
  const [products, setProducts] = useState([]);
  const [isTutorial, setTutorial] = useState({
    visible: false,
    step: stepsTutorial,
  });
  const [price, setPrice] = useState('');
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('');
  const [showRating, setRating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);
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
  const [forceRender, setForceRender] = useState(0);
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
  const [textChunks, setTextChunks] = useState([]);

  useEffect(() => {
    async function getDataStory() {
      const res = await getStoryList();
      handleNextStory(res.data);
    }
    async function handleOpenNotif() {
      if (route?.params?.isFromNotif) {
        const value = await AsyncStorage.getItem('setToday');
        const stringifyDateNow = new Date();
        let strTanggalSekarang = stringifyDateNow.getDate().toString();
        AsyncStorage.setItem('setToday', strTanggalSekarang);

        if (userProfile?.data?.subscription?.plan?.id != 1) {
          await getDataStory();
          setShowModalDay(true); // ini yang ada read laternya
        } else if (value !== null) {
          // jika sudah ganti tanggal
          if (value != strTanggalSekarang) {
            // jika modal coundown open
            if (showModalNewStory) {
              setShowModalNewStory(false);
            }
            await getDataStory();
            // setShowModal(true); // ga ada read later
            setShowModalDay(true); // ini yang ada read laternya
          } else {
            // jika modal coundown close
            if (!showModalNewStory) {
              await getDataStory();
              setShowModalDay(true); // ini yang ada read laternya
            }
          }
        }
      }
    }
    handleOpenNotif();
  }, [route?.params]);

  const handleSuccessListen = async () => {
    const existingEntry = readStory
      ? readStory.find(
          (item: any) =>
            item?.id === dataBook.id && item?.page === textChunks?.length + 1,
        )
      : undefined;
    const uniqueData = [
      ...new Map(readStory.map((item: {id: any}) => [item.id, item])).values(),
    ];
    if (uniqueData?.length === 2) {
      eventTracking(FINISH_LISTEN_3);
    }
    if (uniqueData?.length === 6) {
      eventTracking(FINISH_LISTEN_7);
    }
    if (uniqueData?.length === 9) {
      eventTracking(FINISH_LISTEN_10);
    }
    if (typeof existingEntry === 'undefined') {
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
      checkingRead(textChunks?.length + 1);
    } else if (existingEntry && !(isPremiumStory || isPremiumAudio)) {
      //jika tidak premium maka akan terus menampilan modal setiap terakhir
      setShowModalNewStory(true);
    }
  };
  useEffect(() => {
    async function fetchFromParam() {
      if (route?.params?.successListen) {
        // pagerRef.current?.setPage(textChunks?.length - 1);
        checkingRead(textChunks?.length + 1);
        setScreenNumber(textChunks?.length + 1);
        handleSuccessListen();
      } else if (route?.params?.storyId) {
        setReadLater(true);
        if (isPremiumStory || isPremiumAudio) {
          // fecthNextStoryPremium(route?.params?.storyId);
          const resp = await getStoryDetail(route?.params?.storyId);
          handleNextStory(resp.data);
          setShowPreview(true);
        } else {
          handleFreeUserStory(route?.params?.storyId);
        }
      }
    }
    fetchFromParam();
  }, [route?.params]);

  // fetch premiun
  const fecthNextStoryPremium = async (id: any) => {
    const resp = await getStoryDetail(id);
    const data2 = await getExploreStory();
    handleStoriesRelate(data2);
    handleNextStory(resp.data);
    setShowModal(true);
  };

  const handleFreeUserStory = async (id: any) => {
    const resp = await getStoryDetail(id);
    handleNextStory(resp.data);
    setShowStoryFree(true);
  };
  const checkingRead = (pageNumber: number) => {
    const existingEntry = readStory
      ? readStory.find(
          (item: {id: any; page: any}) =>
            item?.id === dataBook.id && item?.page === pageNumber,
        )
      : undefined;
    const uniqueData = [
      ...new Map(readStory.map((item: {id: any}) => [item.id, item])).values(),
    ];
    if (uniqueData?.length === 2) {
      eventTracking(FINISH_READ_3);
    }
    if (uniqueData?.length === 6) {
      eventTracking(FINISH_READ_7);
    }
    if (uniqueData?.length === 9) {
      eventTracking(FINISH_READ_10);
    }
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
    }
  }, [userStory]);

  useEffect(() => {
    pagerRef.current?.setPage(0);
    setScreenNumber(0);
  }, [dataBook?.title_en]);

 
  const fetchCheckingDay = async () => {
    const value = await AsyncStorage.getItem('setToday');
    const stringifyDateNow = new Date();
    let strTanggalSekarang = stringifyDateNow.getDate().toString();
    if (value != null) {
      if (value != strTanggalSekarang) {
        if (!route?.params?.isFromNotif) {
          AsyncStorage.setItem('setToday', strTanggalSekarang);
        }
        if (userProfile?.data?.subscription?.plan?.id != 1) {
          const res = await getStoryList();
          handleNextStory(res.data);
          setShowModalDay(true);
        } else {
          const res = await getStoryList();
          handleNextStory(res.data);
          setShowModalDay(true);
          // setShowModalNewStory(true);
        }
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
    const pageNumber = e.nativeEvent.position;
    setScreenNumber(pageNumber);
    const timeoutLove = setTimeout(() => {
      if (pageNumber === textChunks?.length - 1) {
        setIsLoveAnimate(false);
      }
    }, 3000);

    checkingRead(pageNumber);
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
    // if (!existingEntry && pageNumber === textChunks?.length + 1 - 1) {
    //   await addPastStory(dataBook.id);
    //   const data = {
    //     value: textChunks?.length,
    //   };
    //   const resp = await addPastLevel(data);
    //   if (resp?.data) {
    //     handleLeveling(resp?.data);
    //     setTimeout(() => {
    //       setShowModalCongrats(true);
    //     }, 200);
    //   }
    // } else if (
    //   existingEntry &&
    //   pageNumber === textChunks?.length + 1 - 1 &&
    //   !(isPremiumStory || isPremiumAudio)
    // ) {
    //   //jika tidak premium maka akan terus menampilan modal setiap terakhir
    //   // setShowModalCongrats(true);
    // }
    if (pageNumber === textChunks?.length - 1) {
    }
    setActiveSlide(pageNumber - 1);

    startAnimation();
    handleLoadMore(pageNumber);

    if (pageNumber - 1 !== activeSlide && !isUserHasScroll) {
      setUserScrollQuotes(true);
    }
  };

  const handleTouchStart = (e: {nativeEvent: {locationX: any}}) => {
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
        setActiveStep((prevStep: number) => prevStep - 1);
        handleSetSteps(activeStep - 1);
      }
    } else {
      handleNext();
    }
  };

  const handlePrev = () => {
    setTutorial({
      ...isTutorial,
      step: isTutorial.step - 1,
    });
    setActiveStep((prevStep: number) => prevStep - 1);
    handleSetSteps(activeStep - 1);
  };

  const handleNext = () => {
    if (stepsTutorial <= 5) {
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
        handleSetSteps(5 + 1);
        // navigate('Share', {
        //   selectedContent:
        //     ' To be completely and shamelessly honest, I was against getting into a relationship for a number of reasons.',
        //   start: content?.substring(0, 30),
        //   end: content.substring(30, 30 + 30),
        // });
      }
    }
  };

  const startAnimation = () => {
    setFolded(!folded);

    Animated.timing(animationValue, {
      toValue: folded ? 0 : 1,
      duration: 1000,
      useNativeDriver: false, // Set this to true for better performance, but note that not all properties are supported with native driver
    }).start();
  };
  const handleLoadMore = async (value: number) => {};

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
    // const checkTutorial = async () => {
    //   const isFinishTutorial = await AsyncStorage.getItem('isTutorial');
    //   if (isFinishTutorial === 'yes' && isTutorial.step === 0) {
    //     setFinishTutorial(true);
    //     setVisible(true);
    //     setTimeout(() => {
    //       setVisible(false);
    //       setTutorial({
    //         ...isTutorial,
    //         step: isTutorial.step + 1,
    //       });
    //       setActiveStep(1);
    //       handleSetSteps(1);
    //     }, 3500);
    //   } else if (activeStep === 2 || activeStep === 3) {
    //     setFinishTutorial(false);
    //     setIsRippleAnimate(true);
    //     setTimeout(() => {
    //       setFinishTutorial(true);
    //       setIsRippleAnimate(false);
    //     }, 3000);
    //     if (route?.name == 'Main') {
    //       setTimeout(() => {
    //         navigate('Media');
    //       }, 2500);
    //     }
    //   } else if (activeStep === 4) {
    //     navigate('ExploreLibrary');
    //   } else if (
    //     activeStep === 6 ||
    //     activeStep === 7 ||
    //     activeStep === 8 ||
    //     activeStep === 9
    //   ) {
    //     const content =
    //       'Being the youngest one in my crew, and in my twenties, with a pretty much an old school mindset is kinda hard as I find difficulties to actually fit in. I’ve been there before: the loyal friend who has to be there for her girlfriends when they get dumped for the silliest and dumbest reasons. these days isn’t worth a single teardrop, and most importantly, having to hear them crying which deliberately forces me to come up with stories and jokes in order to cheer them up.';
    //     // navigate('Share', {
    //     //   selectedContent:
    //     //     ' To be completely and shamelessly honest, I was against getting into a relationship for a number of reasons.',
    //     //   start: content?.substring(0, 30),
    //     //   end: content.substring(30, 30 + 30),
    //     // });
    //   }
    // };
    // checkTutorial();
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
      if (dataBook?.audio_enable != null) {
        navigate('Media');
      } else {
        checkingListen();
      }
    }
  };

  const splitTextIntoArray = (text: string, chunkLength: number) => {
    const words = text?.split(' ');
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
  // const textChunks = splitTextIntoArray(
  //   dataBook?.content_en,
  //   Dimensions.get('window').height <= 667 ? 630 : 800,
  // );
  useEffect(() => {
    const newChunks = splitTextIntoArray(
      dataBook?.content_en,
      Dimensions.get('window').height <= 667 ? (fontSize === 14 ? 750 : 630) :   (fontSize === 14 ? 1000 : 800),
    );
    setTextChunks(newChunks);
  }, [dataBook, Dimensions.get('window').height, fontSize]);
  const renderFactItem = ({item, index, title, category, colorText, type}) => (
    <>
      <QuotesContent
        item={item}
        isActive={activeSlide === index}
        totalStory={textChunks?.length}
        pageActive={index}
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
        type={type}
        isRippleAnimate={isRippleAnimate}
        userProfile={userProfile}
        fontColor={
          backgroundColor === code_color.blackDark
            ? code_color.white
            : code_color.blackDark
        }
      />
    </>
  );
  useEffect(() => {
    setForceRender(prev => prev + 1);
  }, [colorText]);

  const renderFlatList = useCallback(
    type => {
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
                key={index} // Add a unique key for each view in the array
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
                  type: type,
                })}
              </View>
            );
          })}
        </PagerView>
      );
    },
    [
      textChunks,
      dataBook,
      backgroundColor,
      colorText,
      onScroll,
      isFocused,
      forceRender,
    ],
  );

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
  useEffect(() => {
    setBook(userStory);
  }, [isFocused]);

  const renderList = useMemo(
    (type: any) => {
      {
        textChunks?.map((dtb: any, index: number) => {
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
                type: type,
              })}
            </View>
          );
        });
      }
    },
    [textChunks, userStory],
  );

  const handleUnlock = async () => {
    setLoading(true);
    const res = await getStoryList();
    handleNextStory(res.data);
    const data = await handleNativePayment(
      'unlock_story_1_week_only',
      res?.data?.id,
    );
    if (data) {
      setShowModalCongrats(false);
      setShowModalNewStory(false);
      setLoading(false);
      setShowModalSuccessPurchase(true);
    } else {
      setLoading(false);
      // setShowModalNewStory(false);
    }
  };

  const showWatchAdsFree = async () => {
    setLoadingAds(true);
    const advert = await loadRewarded();
    advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward: any) => {
        setLoadingAds(false);
        setShowStoryFree(false);
        setTimeout(() => {
          fetchStoryFree();
        }, 200);
      },
    );
  };

  const fetchStoryFree = async () => {
    const resp = await getStoryDetail(route?.params?.storyId);
    handleNextStory(resp.data);
    setTimeout(() => {
      setShowModal(true);
    }, 500);
  };
  const handleUnlimited = async () => {
    //
    try {
      const paymentResult = await handlePayment('in_app');
      if (paymentResult.success) {
        setShowModalGetPremium(true);
        setShowModalNewStory(false);
        setShowModalCongrats(false);
        setShowStoryFree(false);
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
                    {`Hey, ${
                      userProfile?.data?.name === null
                        ? ''
                        : userProfile?.data?.name
                    }\nYou’re all set!`}
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

                  <Step5
                    handleNext={() => handleNext()}
                    handlePrev={handlePrev}
                  />
                </ImageBackground>
              </View>
            ) : (
              <Step2
                handleNext={() => handleNext()}
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
      async (reward: any) => {
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
  const handleRead = async () => {
    pagerRef.current?.setPage(0);
    const response = await addStory(nextStory.id);
    setScreenNumber(0);
    setTimeout(() => {
      handleSetStory(nextStory);
      setShowModalDay(false);
      setShowModal(false);
      setBook(nextStory);
    }, 200);
  };

  const handleReadAds = async (newStory?: any) => {
    const story = newStory?.content_en ? newStory : nextStory;
    setBook(story);
    setTimeout(() => {
      handleSetStory(story);
      setShowModalDay(false);
      setShowModal(false);
      setShowPreview(false);
      pagerRef.current?.setPage(0);
      setScreenNumber(0);
    }, 200);
  };

  useEffect(() => {
    if (!(isPremiumStory || isPremiumAudio)) {
      const userHasRead = readStory?.some(
        (entry: any) =>
          entry?.id === dataBook.id && entry?.page === textChunks?.length,
      );
      if (userHasRead && textChunks?.length > 0) {
        setShowModalNewStory(true);
      }
    }
  }, [dataBook, textChunks]);

  const userFinishedRead = readStory?.some(
    (entry: any) =>
      entry?.id === dataBook.id &&
      (entry?.page === textChunks?.length - 1 ||
        entry?.page > textChunks?.length - 1),
  );

  const touchEndStory = async (e: {nativeEvent: {locationX: any}}) => {
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const screenWidth = Dimensions.get('window').width / 1.5;
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
          
            // if(screenNumber ===  textChunks?.length){
            setShowModalNewStory(true);
            // }

            //jika tidak premium maka akan terus menampilan modal setiap terakhir
          } else if (existingEntry && (isPremiumStory || isPremiumAudio)) {
            await fecthNextStory();
          }
        }
      }, 700);
    }
  };
  useEffect(() => {
    async function getPrice() {
      const products = await IAP.getProducts({
        skus: ['unlock_story_1_week_only'],
      });
      console.log('Products:', products);
      setPrice(products[0].localizedPrice);
    }
    getPrice();
  }, []);
  const handleSuccessRating = async () => {
    setRating(false);
    if (isPremiumStory || isPremiumAudio) {
      const res = await getStoryDetail(userStory?.id);
      handleSetStory(res.data);
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
      const res = await getStoryDetail(userStory?.id);
      handleSetStory(res.data);
      setBook(res.data);
      setShowModalNewStory(true);
    }
  };
  const handleLater = async () => {
    const response = await addStory(nextStory.id);
    setShowModalDay(false);
    handleShowModalSave();
  };
  const handleNative = async () => {
    setLoadingStory(true);
    const data = await handleNativePayment(
      'unlock_story_1_week_only',
      route?.params?.storyId,
    );
    if (data) {
      setTimeout(async () => {
        setLoadingStory(false);
        setShowStoryFree(false);
      }, 100);
    } else {
      setLoadingStory(false);
      setShowStoryFree(false);
    }
  };

  const handleShowModalSave = () => {
    setShowModalSave(true);
    setTimeout(() => {
      setShowModalSave(false);
    }, 2000);
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
            marginTop: 20,
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
          <View
            style={{
              flexDirection: 'row',
              flex: 0,
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <View style={{flex: 1}}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'left',
                  fontSize: fixedFontSize(Number(fontSize) - 2),
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
                handleListening();
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
          {/* {renderTutorial()} */}
          {renderFlatList('view')}
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
              paddingTop: isIphoneXorAbove() ? 50 : 30,
            }}
          />
          <ModalStoryUnlockDay
            isVisible={showModalDay}
            onClose={() => setShowModalDay(false)}
            handleRead={() => handleReadAds()}
            handleLater={() => handleLater()}
          />
          <ModalStoryUnlock
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            data={undefined}
            restart={undefined}
            edit={undefined}
            readLater={!userFinishedRead}
            isPremium={readLater ? null : isPremiumStory || isPremiumAudio}
            handleRead={(data: any) => {
              handleReadAds(data);
            }}
            handleReadOther={async (storyId: number) => {
              pagerRef.current?.setPage(-1);
              setShowModal(false);
              const resp = await getStoryDetail(storyId);
              handleNextStory(resp.data);
              setShowModalDay(true);
            }}
            handleLater={async () => {
              await addStory(nextStory.id);
              setShowModal(false);
              setReadLater(false);
              handleShowModalSave();
            }}
          />
          <ModalStoryRating
            isVisible={showRating}
            onClose={() => {
              setRating(false);
              setScreenNumber(0);
              handleSuccessRating();
            }}
            handleSuccess={() => {
              setRating(false);
              setScreenNumber(0);
              handleSuccessRating();
            }}
          />
          <ModalNewStory
            loadingAds={loadingAds}
            isLoading={loading}
            isVisible={showModalNewStory}
            onClose={() => 
              {
                pagerRef.current?.setPage(textChunks.length - 1);
                setShowModalNewStory(false)
              }}
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
              addStory(nextStory.id);
              pagerRef.current?.setPage(0);
              setScreenNumber(0);
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
          <ModalStoryPreview
            isVisible={showPreview}
            onClose={() => setShowPreview(false)}
            handleRead={handleReadAds}
            readLater={!userFinishedRead}
            handleLater={async () => {
              await addStory(nextStory.id);
              setShowPreview(false);
              handleShowModalSave();
            }}
          />
          <ModalStorySave isVisible={showModalSave} />
          <View
            style={{
              flexDirection: 'row',
              flex: 0,
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <View style={{flex: 1}}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'left',
                  fontSize: fixedFontSize(Number(fontSize) - 2),
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
                handleListening();
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
          {/* {isRippleAnimate && (
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
          )} */}
          {renderFlatList('main')}
          {/* {renderTutorial()} */}
          <ModalMedia
            isVisible={showMedia}
            onClose={() => setShowMedia(false)}
          />
          <ModalUnlockStory
            isLoading={loadingStory}
            isVisible={showStoryFree}
            onClose={() => setShowStoryFree(false)}
            data={nextStory}
            onWatchAds={showWatchAdsFree}
            onUnlock={() => {
              handleNative();
            }}
            loadingOne={loadingAds}
            price={price}
            onGetUnlimit={() => handleUnlimited()}
          />
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
                if (userStory?.is_rating === null) {
                  setScreenNumber(0);
                  setRating(true);
                  // handleSuccessRating();
                } else {
                  setScreenNumber(0);
                  handleSuccessRating();
                }
              }}
              onGotIt={async () => {
                setShowModalCongrats(false);
                if (userStory?.is_rating === null) {
                  setScreenNumber(0);
                  setRating(true);
                  // handleSuccessRating();
                } else {
                  setScreenNumber(0);
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
