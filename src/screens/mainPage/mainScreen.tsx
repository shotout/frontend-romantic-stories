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
  Platform,
  TouchableOpacity,
  AppState,
  BackHandler,
} from 'react-native';
import {navigate} from '../../shared/navigationRef';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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
import ModalAppRating from '../../components/modal-app-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StepHeader from '../../layout/step/stepHeader';
import {useIsFocused} from '@react-navigation/native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {handleNativePayment, handlePayment} from '../../helpers/paywall';
import {loadRewarded, loadRewarded2} from '../../helpers/loadReward';
import {AdEventType, RewardedAdEventType} from 'react-native-google-mobile-ads';
import {reloadUserProfile} from '../../utils/user';
import ModalStoryRating from '../../components/modal-story-rating';
import {hp, wp} from '../../utils/screen';
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
import {moderateScale} from 'react-native-size-matters';
import TrackPlayer from 'react-native-track-player';

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
  handleSetPage,
  page,
}) => {

  const [loadingStory, setLoadingStory] = useState(false);
  const [showStoryFree, setShowStoryFree] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAds, setLoadingAds] = useState(false);
  const [activeStep, setActiveStep] = useState(stepsTutorial);
  const [click, setClick] = useState(1);
  const [load, setLoad] = useState(false);
  const [isTutorial, setTutorial] = useState({
    visible: false,
    step: stepsTutorial,
  });
  const [price, setPrice] = useState('');
  const [priceAudio1, setPriceAudio1] = useState('');
  const [priceAudio2, setPriceAudio2] = useState('');
  const [show, setShow] = useState(false);
  const [color, setColor] = useState('');
  const [showRating, setRating] = useState(false);
  const [showRatingApp, setRatingApp] = useState(false);
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
  const [activeSlide, setActiveSlide] = useState(page ? page : 0);
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
  const isPremiumMonthly = userProfile?.data?.subscription?.plan?.id === 4;
  const currentXp = userProfile?.data?.user_level?.point;
  const newXp = levelingUser?.user_level?.point;
  const [textChunks, setTextChunks] = useState([]);
  
  useEffect(() => {
    // if (!__DEV__) {
    async function getPrice() {
      const products = await IAP.getProducts({
        skus: ['unlock_10_audio_stories'],
      });
      const products1 = await IAP.getProducts({
        skus: ['unlock_5_audio_stories'],
      });

      setPriceAudio1(products1[0].localizedPrice);
      setPriceAudio2(products[0].localizedPrice);
    }
    getPrice();
    // }
  }, []);
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

  useEffect(() => {
    if (!showModalCongrats && currentXp !== newXp) {
      reloadUserProfile(null);
    }
  }, [showModalCongrats]);

  const handleSuccessListen = async () => {
    const existingEntry = listenStory
      ? listenStory.find(
          (item: any) =>
            item?.id === dataBook.id && item?.page === textChunks?.length,
        )
      : undefined;
      let uniqueData = []
     if(listenStory === null){
      let data = [
        {
          id: dataBook.id,
        },
      ];
      uniqueData = data
      handleListenStory(data);
     }else{
      const existingEntry = listenStory
        ? listenStory.find((item: any) => item?.id === dataBook.id)
        : undefined;
      if (!existingEntry) {
        const newData = {
          id: dataBook.id,
        };
        uniqueData = [...listenStory, newData]
        // Dispatch action to update readStory in the Redux store
        handleListenStory([...listenStory, newData]);
     
     }
    }
   
    const value = await AsyncStorage.getItem('FINISH_LISTEN_3');
    const value1 = await AsyncStorage.getItem('FINISH_LISTEN_7');
    const value2 = await AsyncStorage.getItem('FINISH_LISTEN_10');
   
    if(value != 'true'){
      if (uniqueData?.length === 3) {
        eventTracking(FINISH_LISTEN_3);
        AsyncStorage.setItem('FINISH_LISTEN_3', 'true');
      }
    }
    if(value1 != 'true'){
    if (uniqueData?.length === 7) {
      eventTracking(FINISH_LISTEN_7);
      AsyncStorage.setItem('FINISH_LISTEN_7', 'true');
    }
  }
  if(value2 != 'true'){
    if (uniqueData?.length === 10) {
      eventTracking(FINISH_LISTEN_10);
      AsyncStorage.setItem('FINISH_LISTEN_10', 'true');
    }
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
        // setTimeout(() => {
          setShowModalCongrats(true);
        // }, 50);
      }
      // checkingRead(textChunks?.length);
    } else if (existingEntry && !(isPremiumStory || isPremiumAudio || isPremiumMonthly)) {
      //jika tidak premium maka akan terus menampilan modal setiap terakhir
      setTimeout(() => {
        setShowModalNewStory(true);
      }, 50);
    }
  };
  useEffect(() => {
    async function fetchFromParam() {
      if (route?.params?.successListen) {
        // pagerRef.current?.setPage(textChunks?.length - 1);
        // checkingRead(textChunks?.length + 1);
        setScreenNumber(textChunks?.length + 1);
        handleSuccessListen();
      } else if (route?.params?.storyId) {
        setReadLater(true);
        if (isPremiumStory || isPremiumAudio || isPremiumMonthly) {
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
  const checkingRead = async (pageNumber: number) => {
    const existingEntry = readStory
      ? readStory.find(
          (item: {id: any; page: any}) =>
            item?.id === dataBook.id && item?.page === pageNumber,
        )
      : undefined;
    const uniqueData = [
      ...new Map(readStory.map((item: {id: any}) => [item.id, item])).values(),
    ];
    const value = await AsyncStorage.getItem('FINISH_READ_3');
    const value2 = await AsyncStorage.getItem('FINISH_READ_7');
    const value3 = await AsyncStorage.getItem('FINISH_READ_10');

    if (value != 'true') {
      if (uniqueData?.length === 3) {
        eventTracking(FINISH_READ_3);
        AsyncStorage.setItem('FINISH_READ_3', 'true');
      }
    }
    if (value2 != 'true') {
      if (uniqueData?.length === 7) {
        eventTracking(FINISH_READ_7);
        AsyncStorage.setItem('FINISH_READ_7', 'true');
      }
    }
    if (value3 != 'true') {
      if (uniqueData?.length === 10) {
        eventTracking(FINISH_READ_10);
        AsyncStorage.setItem('FINISH_READ_10', 'true');
      }
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
    if(page === 0){

      async function setToFirstPage() {
        setScreenNumber(0);
        pagerRef.current?.setPage(0);
      }
      setTimeout(() => {
        setToFirstPage();
      }, 300);
    }
  }, [dataBook?.title_en]);

  // useEffect(() => {
  //   pagerRef.current?.setPage(page);
  //   setScreenNumber(page);
  // }, [page, isFocused]);

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
          
          setShowModalNewStory(false)
          const res = await getStoryList();
          handleNextStory(res.data);
          setShowModalDay(true);
        } else {
         
          setShowModalNewStory(false)
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
      setShowModalNewStory(false)
      if (Platform.OS === 'android') {
        const payload = {
          _method: 'PATCH',
          is_member: 3,
        }
        updateProfile(payload);
      }
      reloadUserProfile();
      fetchCheckingDay();
  }, []);
 

  const onScroll = async (e: PagerViewOnPageSelectedEvent) => {
    const pageNumber = e.nativeEvent.position;
    handleSetPage(pageNumber);
    setScreenNumber(pageNumber);
    // const timeoutLove = setTimeout(() => {
    //   if (pageNumber === textChunks?.length - 1) {
    //     setIsLoveAnimate(false);
    //   }
    // }, 3000);

    checkingRead(pageNumber);
    // checkingLast()
    if (pageNumber === 2 || pageNumber === 5 || pageNumber === 8 ||  pageNumber === 11 ||  pageNumber === 14 ||  pageNumber === 17) {
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
    // const existingEntry = readStory
    //   ? readStory.find(
    //       (item: any) => item?.id === dataBook.id && item?.page === pageNumber,
    //     )
    //   : undefined;
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
    // if (pageNumber === textChunks?.length - 1) {
    // }

    setActiveSlide(pageNumber - 1);
    startAnimation();
    // handleLoadMore(pageNumber);

    if (pageNumber - 1 !== activeSlide && !isUserHasScroll) {
      setUserScrollQuotes(true);
    }
  };
  const checkingLast = async() => {
    if(Platform.OS === 'android' && !showModalCongrats){
   
      if (page === textChunks?.length - 1) {
    
        const existingEntry = readStory
          ? readStory.find(
              (item: any) =>
                item?.id === dataBook.id && item?.page === screenNumber + 1,
            )
          : undefined;
        if (
          typeof existingEntry === 'undefined' &&
          screenNumber === textChunks?.length - 1
        ) {
          // jika nanti pertama kali melakukan update data terakhir
          try {
            const res = await addPastStory(dataBook.id);
            // console.log(JSON.stringify(res))
            try {
              const data = {
                value: textChunks?.length,
              };
              const resp = await addPastLevel(data);
              // console.log(JSON.stringify(resp))
              if (resp?.data) {
                handleLeveling(resp?.data);
                // setTimeout(() => {
                  setLoad(false)
                  setShowModalCongrats(true);
                // }, 50);
              }
              checkingRead(screenNumber + 1);
            } catch (error) {
              console.log('ERROR PAS LEVEL', JSON.stringify(error));
            }
          } catch (error) {
            console.log('ERROR PAS STORY', JSON.stringify(error));
          }
        } else if (existingEntry && !(isPremiumStory || isPremiumAudio || isPremiumMonthly)) {
          // setTimeout(() => {
            setLoad(false)
            setShowModalNewStory(true);
          // }, 50);

          //jika tidak premium maka akan terus menampilan modal setiap terakhir
        } else if (existingEntry && (isPremiumStory || isPremiumAudio || isPremiumMonthly)) {
          // setTimeout(() => {
            setLoad(false)
            setShowModalCongrats(true);
          // }, 50);
          // await fecthNextStory();
        }
      }
    }
  }
  const startAnimation = () => {
    setFolded(!folded);

    Animated.timing(animationValue, {
      toValue: folded ? 0 : 1,
      duration: 1000,
      useNativeDriver: false, // Set this to true for better performance, but note that not all properties are supported with native driver
    }).start();
  };
  // const handleLoadMore = async (value: number) => {};

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
    handleThemeAvatar();
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
        userProfile?.data?.subscription?.plan?.id === 2 || userProfile?.data?.subscription?.plan?.id === 4 &&
        userProfile?.data?.subscription?.audio_limit != 0
      ) {
        const payload = {
          _method: 'PATCH',
          audio_take: 1,
        };
        await updateProfile(payload);
        reloadUserProfile();

        Platform.OS === 'android' ? await TrackPlayer.setupPlayer() : null;

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
        Platform.OS === 'android' ? await TrackPlayer.setupPlayer() : null;
        navigate('Media');
      } else {
        eventTracking('OPEN_LISTEN_PAYWALL')
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
          userProfile?.data?.subscription?.plan?.id === 2 || userProfile?.data?.subscription?.plan?.id === 4 &&
          userProfile?.data?.subscription?.audio_limit != 0
        ) {
          const payload = {
            _method: 'PATCH',
            audio_take: 1,
          };
          await updateProfile(payload);
          reloadUserProfile();
          Platform.OS === 'android' ? await TrackPlayer.setupPlayer() : null;
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
          Platform.OS === 'android' ? await TrackPlayer.setupPlayer() : null;
          navigate('Media');
        } else {
          eventTracking('OPEN_LISTEN_PAYWALL')
          setShow(true);
        }
      } else {
        if (
          userProfile?.data?.subscription?.plan?.id === 2 || userProfile?.data?.subscription?.plan?.id === 4 &&
          userProfile?.data?.subscription?.audio_limit != 0
        ) {
          Platform.OS === 'android' ? await TrackPlayer.setupPlayer() : null;
          navigate('Media');
        } else if (
          userProfile?.data?.subscription?.plan?.id === 1 &&
          userProfile?.data?.subscription?.audio_limit != 0
        ) {
          Platform.OS === 'android' ? await TrackPlayer.setupPlayer() : null;
          navigate('Media');
        } else {
          eventTracking('OPEN_LISTEN_PAYWALL')
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
  const height = Dimensions.get('window').height;
  useEffect(() => {
    // height iphone 13 = 844
    // iphone xr = 896

    const {height, fontScale} = Dimensions.get('window');

   
    const size = Number(fontSize) - 1;
    const charactersPerLine = Math.floor(
      height / (size * (fontScale + (height > 840 ? -0.147 : 0))),
    );
    const linesPerPage = Math.floor(height / size);
    // console.log(fontFamily === 'Montserrat-Regular' &&  Number(fontSize) === 16 ? 4.7 : fontFamily === 'Montserrat-Regular' &&  Number(fontSize) === 18 ? 4.7 : fontFamily === 'Montserrat-Regular' &&  Number(fontSize) === 14 ? 5.3 : fontFamily === 'Merriweather-Regular' &&  Number(fontSize) === 14 ? 5.3 : fontFamily === 'Merriweather-Regular' &&  Number(fontSize) === 16 ? 4.7 :
    // fontFamily === 'Poppins-Regular' && Number(fontSize) === 14 && height >= 844 && height < 850
    // ? 5.8 :fontFamily === 'Poppins-Regular' && Number(fontSize) === 14 && height >= 850  ? 5.3 : fontFamily === 'Poppins-Regular' && Number(fontSize) === 16  && height >= 844 && height < 850  ? 4.9 : fontFamily === 'Poppins-Regular' && Number(fontSize) === 16  && height >=  850  ? 5.1 : fontFamily === 'Poppins-Regular' && Number(fontSize) === 18  && height >= 844 && height < 850 ? 4.5 : fontFamily === 'Poppins-Regular' && Number(fontSize) === 18 && height >= 850  ? 4.9 :
    // Number(fontSize) === 14
    //   ? 4.8
    //   : height >= 890 && Number(fontSize) === 18
    //   ? 3.5
    //   : Platform.OS === 'android' && height >= 840 || Platform.OS === 'android' && height < 840 && Number(fontSize) === 16 ? 3.5
    //   : Platform.OS === 'android' && height >= 840 || Platform.OS === 'android' && height < 840 && Number(fontSize) === 20 ? 3 : 4.1)
    const totalCharacters =
      (charactersPerLine * linesPerPage) /
      (fontFamily === 'Montserrat-Regular' && Number(fontSize) === 16
        ? 4.7
        : fontFamily === 'Montserrat-Regular' && Number(fontSize) === 18
        ? 4.7
        : fontFamily === 'Montserrat-Regular' && Number(fontSize) === 14
        ? 5.3
        : fontFamily === 'Merriweather-Regular' && Number(fontSize) === 14
        ? 5.3
        : fontFamily === 'Merriweather-Regular' && Number(fontSize) === 16
        ? 4.7
        : fontFamily === 'Poppins-Regular' &&
          Number(fontSize) === 14 &&
          height >= 844 &&
          height < 850
        ? 5.8
        : fontFamily === 'Poppins-Regular' &&
          Number(fontSize) === 14 &&
          height >= 850
        ? 5.3
        : fontFamily === 'Poppins-Regular' &&
          Number(fontSize) === 16 &&
          height >= 844 &&
          height < 850
        ? 5.2
        : fontFamily === 'Poppins-Regular' &&
          Number(fontSize) === 16 &&
          height >= 850
        ? 5.1
        : fontFamily === 'Poppins-Regular' &&
          Number(fontSize) === 18 &&
          height >= 844 &&
          height < 850
        ? 4.5
        : fontFamily === 'Poppins-Regular' &&
          Number(fontSize) === 18 &&
          height >= 850
        ? 4.9
        : Number(fontSize) === 14
        ? 4.8
        : height >= 890 && Number(fontSize) === 18
        ? 3.5
        : (Platform.OS === 'android' && height >= 840) ||
          (Platform.OS === 'android' && height < 840 && Number(fontSize) === 16)
        ? 3.7
        : (Platform.OS === 'android' && height >= 840) ||
          (Platform.OS === 'android' && height < 840 && Number(fontSize) === 20)
        ? 3
        : 4.1);
        // alert(      (fontFamily === 'Montserrat-Regular' && Number(fontSize) === 16
        // ? 4.7
        // : fontFamily === 'Montserrat-Regular' && Number(fontSize) === 18
        // ? 4.7
        // : fontFamily === 'Montserrat-Regular' && Number(fontSize) === 14
        // ? 5.3
        // : fontFamily === 'Merriweather-Regular' && Number(fontSize) === 14
        // ? 5.3
        // : fontFamily === 'Merriweather-Regular' && Number(fontSize) === 16
        // ? 4.7
        // : fontFamily === 'Poppins-Regular' &&
        //   Number(fontSize) === 14 &&
        //   height >= 844 &&
        //   height < 850
        // ? 5.8
        // : fontFamily === 'Poppins-Regular' &&
        //   Number(fontSize) === 14 &&
        //   height >= 850
        // ? 5.3
        // : fontFamily === 'Poppins-Regular' &&
        //   Number(fontSize) === 16 &&
        //   height >= 844 &&
        //   height < 850
        // ? 5.2
        // : fontFamily === 'Poppins-Regular' &&
        //   Number(fontSize) === 16 &&
        //   height >= 850
        // ? 5.1
        // : fontFamily === 'Poppins-Regular' &&
        //   Number(fontSize) === 18 &&
        //   height >= 844 &&
        //   height < 850
        // ? 4.5
        // : fontFamily === 'Poppins-Regular' &&
        //   Number(fontSize) === 18 &&
        //   height >= 850
        // ? 4.9
        // : Number(fontSize) === 14
        // ? 4.8
        // : height >= 890 && Number(fontSize) === 18
        // ? 3.5
        // : (Platform.OS === 'android' && height >= 840) ||
        //   (Platform.OS === 'android' && height < 840 && Number(fontSize) === 16)
        // ? 3.5
        // : (Platform.OS === 'android' && height >= 840) ||
        //   (Platform.OS === 'android' && height < 840 && Number(fontSize) === 20)
        // ? 3
        // : 4.1))
    // const totalCharacters =
    //   (charactersPerLine * linesPerPage) /
    //   (Number(fontSize) === 14 && fontFamily === 'Poppins-Regular' || fontFamily === 'Merriweather-Regular' && Platform.OS === 'ios' && height === 844 ? 4.5 : fontFamily === 'Poppins-Regular' || fontFamily === 'Merriweather-Regular' && Platform.OS === 'ios' && Number(fontSize) === 14 && height >= 890 ? 5.3 : fontFamily === 'Poppins-Regular' || fontFamily === 'Merriweather-Regular' && Platform.OS === 'ios' && Number(fontSize) === 14 && height >= 840 ? 5 : fontFamily === 'Poppins-Regular' || fontFamily === 'Merriweather-Regular' && Platform.OS === 'ios' && Number(fontSize) === 14 && height >= 812 ? 5 : fontFamily === 'Poppins-Regular' || fontFamily === 'Merriweather-Regular' && Number(fontSize) === 16 && Platform.OS === 'ios' ?  5.1 : fontFamily === 'Poppins-Regular' || fontFamily === 'Merriweather-Regular' && Number(fontSize) === 18 ? 5 :
    //   Number(fontSize) === 14
    //     ? 4.5
    //     : height >= 890  && Number(fontSize) === 18
    //     ? 3.5
    //     : Platform.OS === 'android' && height >= 840 || Platform.OS === 'android' && height < 840 && Number(fontSize) === 16 ? Platform.OS === 'android' ? 3.7 : 3.5
    //     : Platform.OS === 'android' && height >= 840 || Platform.OS === 'android' && height < 840 && Number(fontSize) === 20 ? Platform.OS === 'android' ? 3.2 : 3 : height >= 840 &&  Number(fontSize) === 14 && Platform.OS === 'ios' && fontFamily != 'Poppins-Regular' ? 3.6 : height >= 840 &&  Number(fontSize) === 18 && Platform.OS === 'ios' ? 3.8 : height >= 840 &&  Number(fontSize) === 16 && Platform.OS === 'ios' ? 4.1 : 3.6);
    const newChunks = splitTextIntoArray(
      dataBook?.content_en,
      totalCharacters ? totalCharacters : 700,
      // height <= 667
      //   ? Number(fontSize) === 14
      //     ? 655
      //     : 550
      //   : Number(fontSize) === 14
      //   ? 1000
      //   : Number(fontSize) === 16 && height > 844 ? height * 0.9   :  Number(fontSize) === 18 && height >= 812 ? 600 : 765,
    );
    // if(Number(page) > 0){
    //   const pageNew =  ((newChunks.length - (Number(page))) +  (Number(page)))
    //   console.log(pageNew)

    // }
    handleSetPage(page);
    // console.log(JSON.stringify(height), Number(fontSize), fontFamily )
    // console.log(JSON.stringify(newChunks))
    setTextChunks(newChunks);
  }, [dataBook, Dimensions.get('window').height, fontSize, fontFamily]);
  const renderFactItem = ({
    item,
    index,
    title,
    category,
    colorText,
    type,
    id,
  }) => (
    <>
      <QuotesContent
        typeImage={userProfile?.data?.type}
        id={id}
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
        handleListen={() => load ? null : handleListening()}
        type={type}
        isRippleAnimate={isRippleAnimate}
        userProfile={userProfile}
        price={priceAudio1}
        price2={priceAudio2}
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

  useEffect(() => {
    const backAction = () => {
      //  BackHandler.exitApp()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const renderFlatList = type => (
    <PagerView
      style={{flex: 1}}
      initialPage={page}
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
              paddingTop: Platform.OS === 'ios' ? wp(20) : 0,
              // paddingLeft: wp(5),
              // paddingRight: 5
              // paddingHorizontal: wp(20),
            }}>
            {renderFactItem({
              item: dtb,
              index,
              title: dataBook.title_en,
              category: dataBook?.category?.name,
              colorText: colorText,
              type: type,
              id: dataBook.id,
            })}
          </View>
        );
      })}
    </PagerView>
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
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/background/) && nextAppState === 'active') {    
            fetchCheckingDay()
      }
      setAppState(nextAppState);
    });
    return () => {
      subscription.remove();
    };
  }, [appState, ]);

  useEffect(() => {
    setBook(userStory);
  }, [isFocused]);

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
      // setShowModalCongrats(false);
      // setShowModalNewStory(false);
      // setLoading(false);
      // setShowModalSuccessPurchase(true);
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
  useEffect(() => {
    async function checkingRating() {
      const uniqueIds = Object.values(
        readStory?.reduce((acc, {id}) => {
          acc[id] = {id}; // Use an object as a map to remove duplicates
          return acc;
        }, {}),
      );
      if (uniqueIds.length === 4) {
        const data = await AsyncStorage.getItem('isRating');
        if (data != 'yes') {
          setRatingApp(true);
          AsyncStorage.setItem('isRating', 'yes');
        }
      }
    }

    checkingRating();
  }, [dataBook?.title_en, page]);
  const fetchStoryFree = async () => {
    const resp = await getStoryDetail(route?.params?.storyId);
    const payloadStory = {
      _method: 'PATCH',
      story_id: route?.params?.storyId,
      expire: 1,
    };

    await updateProfile(payloadStory);
    reloadUserProfile();
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
    setShowModalDay(false);
    setShowModal(false);
    setShowPreview(false);
    reset(story);
  };
  const reset = async (story: any) => {
    setTimeout(async() => {
      await pagerRef.current?.setPage(0);
      await pagerRef.current?.setPage(0);
    }, 100);
    handleSetStory(story);
    setScreenNumber(0);
  };

  useEffect(() => {
    async function fetchModal() {
      if (!(isPremiumStory || isPremiumAudio || isPremiumMonthly)) {
        const userHasRead = readStory?.some(
          (entry: any) =>
            entry?.id === dataBook.id && entry?.page === textChunks?.length,
        );

        if (
          !route?.params?.isFromLibrary &&
          !route?.params?.isFromBottomBar &&
          userHasRead &&
          textChunks?.length > 0
        ) {
          const value = await AsyncStorage.getItem('setToday');
          const stringifyDateNow = new Date();
          let strTanggalSekarang = stringifyDateNow.getDate().toString();
          if (value != null) {
            if (value === strTanggalSekarang) {
              setShowModalNewStory(true);
              setTimeout(() => {
                pagerRef?.current?.setPage(textChunks.length - 1);
              }, 200);
            }
          }
        }
      }
    }

    fetchModal();
  }, [dataBook, route?.params, textChunks]);

  useEffect(() => {
    const userHasRead = readStory?.some(
      (entry: any) =>
        entry?.id === dataBook.id && entry?.page === textChunks?.length,
    );
    const lastRead = readStory
      ?.filter((itm: any) => itm?.id === dataBook?.id)
      .reduce(
        (maxItem: any, item: any) =>
          item?.page > maxItem?.page ? item : maxItem,
        {
          page: -1,
        },
      );
        
    function setLastPage() {
      if (!userHasRead) {
        setTimeout(async () => {
          await pagerRef?.current?.setPage(lastRead?.page ? lastRead?.page : 0);
        }, 500);
      }
    }
    setLastPage();
  }, [dataBook, textChunks]);

  const userFinishedRead = readStory?.some(
    (entry: any) =>
      entry?.id === dataBook.id &&
      (entry?.page === textChunks?.length - 1 ||
        entry?.page > textChunks?.length - 1),
  );

  const touchEndStory = async (e: {nativeEvent: {locationX: any}}) => {
    setLoad(true)
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const screenWidth = Dimensions.get('window').width / 3;
  
    // Jika sentuhan terjadi di sebelah kanan
    if (touchX > screenWidth && !showModalCongrats) {
      // setTimeout(async () => {
      if (screenNumber === textChunks?.length - 1) {
        const existingEntry = readStory
          ? readStory.find(
              (item: any) =>
                item?.id === dataBook.id && item?.page === screenNumber + 1,
            )
          : undefined;
        if (
          typeof existingEntry === 'undefined' &&
          screenNumber === textChunks?.length - 1
        ) {
          // jika nanti pertama kali melakukan update data terakhir
          try {
            const res = await addPastStory(dataBook.id);
            // console.log(JSON.stringify(res))
            try {
              const data = {
                value: textChunks?.length,
              };
              const resp = await addPastLevel(data);
              // console.log(JSON.stringify(resp))
              if (resp?.data) {
                handleLeveling(resp?.data);
                // setTimeout(() => {
                  setLoad(false)
                  setShowModalCongrats(true);
                // }, 50);
              }
              checkingRead(screenNumber + 1);
            } catch (error) {
              console.log('ERROR PAS LEVEL', JSON.stringify(error));
            }
          } catch (error) {
            console.log('ERROR PAS STORY', JSON.stringify(error));
          }
        } else if (existingEntry && !(isPremiumStory || isPremiumAudio || isPremiumMonthly)) {
          // setTimeout(() => {
            setLoad(false)
            setShowModalNewStory(true);
          // }, 50);

          //jika tidak premium maka akan terus menampilan modal setiap terakhir
        } else if (existingEntry && (isPremiumStory || isPremiumAudio || isPremiumMonthly)) {
          // setTimeout(() => {
            setLoad(false)
            setShowModalCongrats(true);
          // }, 50);
          // await fecthNextStory();
        }
      }
    }
  };

  useEffect(() => {
    if (!__DEV__) {
      async function getPrice() {
        const products = await IAP.getProducts({
          skus: ['unlock_story_1_week_only'],
        });
        setPrice(products[0].localizedPrice);
      }
      getPrice();
    }
  }, []);
  const handleSuccessRating = async () => {
    setRating(false);
    if (isPremiumStory || isPremiumAudio || isPremiumMonthly) {
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
      try {
        const res = await getStoryDetail(userStory?.id);
        handleSetStory(res.data);
        setBook(res.data);
        if (res.data) {
          setShowModalNewStory(true);
        }
      } catch (error) {
        const res = await getStoryDetail(userStory?.id);
        handleSetStory(res.data);
        setBook(res.data);
        // setTimeout(() => {
          setShowModalNewStory(true);
        // }, 50);
      }
    }
  };
  const handleLater = async () => {
    const response = await addStory(`${nextStory?.id}?flag=read_later`);
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

  function RenderFactItemView() {
    const data =
      textChunks[page] === undefined ? textChunks[page - 1] : textChunks[page];
    return renderFactItem({
      item: textChunks[page],
      index: page,
      title: dataBook.title_en,
      category: dataBook?.category?.name,
      colorText: colorText,
      type: 'view',
      id: dataBook.id,
    });
  }

  const renderView = () => {
    if (route?.name != 'Main') {
      return (
        <Pressable
          onPress={() => (route?.name != 'Main' ? navigate('Main') : null)}
          style={{
            backgroundColor: backgroundColor,
            flex: 1,
            paddingTop: isIphoneXorAbove()
              ? 70
              : Platform.OS == 'android'
              ? 30
              : 50,
            //marginTop: 20,
          }}>
          <StatusBar
           hidden={false}
            barStyle={'dark-content'}
            backgroundColor={backgroundColor}
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
                  fontSize: moderateScale(Number(fontSize) - 2),
                  fontFamily: fontFamily,
                  marginBottom: wp(2),
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
                  fontSize: moderateScale(Number(fontSize) + 2),
                  fontFamily: fontFamily,
                  color:
                    backgroundColor === '#2C3439'
                      ? code_color.white
                      : code_color.blackDark,
                }}>
                {dataBook?.title_en}
              </Text>
            </View>

            <View
              style={{
                marginLeft: 5,
                padding: hp(5),
                paddingHorizontal: hp(10),
                borderRadius: hp(20),
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
                  fontSize: moderateScale(Number(14)),
                  fontFamily: fontFamily,
                  color: code_color.white,
                  marginLeft: wp(5),
                }}>
                Listen
              </Text>
            </View>
          </View>
          {textChunks.length > 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: backgroundColor,
                paddingTop: Platform.OS === 'ios' ? wp(20) : wp(0),
                paddingHorizontal: wp(20),
              }}>
              <RenderFactItemView />
            </View>
          ) : null}
        </Pressable>
      );
    } else {
      return (
        <View
          onTouchStart={touchEndStory}
          pointerEvents='box-none'
          style={{
            backgroundColor: backgroundColor,
            flex: 1,
            // paddingHorizontal: 20,
            // paddingTop: 20,
          }}>
          <StatusBar
           hidden={false}
            barStyle={'dark-content'}
            backgroundColor={backgroundColor}
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
            type={userProfile?.data?.type}
          />
          <ModalStoryUnlock
            type={userProfile?.data?.type}
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            data={undefined}
            restart={undefined}
            edit={undefined}
            readLater={
              !userFinishedRead &&
              screenNumber !== 0 &&
              screenNumber !== textChunks?.length - 1
            }
            isPremium={readLater ? null : isPremiumStory || isPremiumAudio || isPremiumMonthly}
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
          <ModalAppRating
           type={userProfile?.data?.type}
            isVisible={showRatingApp}
            onClose={() => {
              setRatingApp(false);
            }}
            handleSuccess={() => {
              setRatingApp(false);
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
            onClose={() => {
              pagerRef.current?.setPage(textChunks.length - 1);
              setScreenNumber(textChunks.length - 1);
              setShowModalNewStory(false);
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
              handleReadAds();
              addStory(nextStory.id);
              setShowModalSuccessPurchase(false);
            }}
            userType={userProfile?.data?.type}
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
              await addStory(`${nextStory?.id}?flag=read_later`);
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
              marginTop: Platform.OS === 'android' ? 0 : 20,
            }}>
            <View style={{flex: 1}}>
              <Text
                allowFontScaling={false}
                style={{
                  textAlign: 'left',
                  fontSize: moderateScale(Number(fontSize) - 2),
                  fontFamily: fontFamily,
                  marginBottom: hp(2),
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
                  fontSize: moderateScale(Number(fontSize) + 2),
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
                marginLeft: 5,
                padding: hp(5),
                paddingHorizontal: hp(10),
                borderRadius: hp(20),
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
                  fontSize: moderateScale(Number(14)),
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
            type={userProfile?.data?.type}
          />
          {showModalCongrats && (
            <ModalCongrats
              pastLevel={textChunks?.length}
              isVisible={showModalCongrats}
              onClose={async () => {
                // pagerRef.current?.setPage(dataBook.content_en?.length - 1);
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
