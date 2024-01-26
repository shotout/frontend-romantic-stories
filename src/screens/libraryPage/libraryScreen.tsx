/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Fragment, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
  ScrollView,
  Dimensions,
  Easing,
} from 'react-native';
import {
  bg,
  cover1,
  cover2,
  imgSearchNull,
  imgStep2,
  imgStep4,
  libraryAdd,
  logo,
} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {goBack, navigate} from '../../shared/navigationRef';
import LibrarySvg from '../../assets/icons/bottom/library.jsx';
import SearchSvg from '../../assets/icons/search.jsx';
import DescendingSvg from '../../assets/icons/descending.jsx';
import BackRightSvg from '../../assets/icons/backRight.jsx';
import LibraryAddSvg from '../../assets/icons/libraryAdd';
import ShareSvg from '../../assets/icons/share';
import DeleteSvg from '../../assets/icons/delete';
import EditSvg from '../../assets/icons/edit';
import DotSvg from '../../assets/icons/dot.jsx';
import EmptyLibrary from '../../assets/icons/emptyLibrary';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import ModalLibrary from '../../components/modal-library';
import ModalNewLibrary from '../../components/modal-new-library';
import ModalSorting from '../../components/modal-sorting';
import {
  deleteMyCollection,
  deleteMyStory,
  deleteStoryCollection,
  getDetailCollection,
  getExploreStory,
  getMyCollection,
  getStoryDetail,
} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import {moderateScale} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import StepHeader from '../../layout/step/stepHeader';
import ModalShareStory from '../../components/modal-share-story';
import ModalNewStory from '../../components/modal-new-story';
import {handleNativePayment, handlePayment} from '../../helpers/paywall';
import {sizing} from '../../shared/styling';
import {Step4} from '../../layout/tutorial';
import LockFree from '../../assets/icons/lockFree';
import AddCollection from '../../assets/icons/addCollection';
import ModalUnlockStory from '../../components/modal-unlock-story';
import ModalUnlockedStory from '../../components/modal-story-unlock';
import {loadRewarded} from '../../helpers/loadReward';
import {
  AdsConsentPrivacyOptionsRequirementStatus,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import ModalSuccessPurchase from '../../components/modal-success-purchase';
import * as IAP from 'react-native-iap';
import {backLeft} from '../../assets/icons';
import {Animated} from 'react-native';
import {TouchableOpacityBase} from 'react-native';
import {hp, wp} from '../../utils/screen';
import AnimatedLottieView from 'lottie-react-native';
import {useIsFocused} from '@react-navigation/native';

const LibraryScreen = ({
  colorTheme,
  handleSomeAction,
  stepsTutorial,
  handleSetSteps,
  backgroundColor,
  handleSetStory,
  userProfile,
  handleNextStory,
  nextStory,
  userStory,
}) => {
  // alert(JSON.stringify(userStory))
  const translateX = useRef(new Animated.Value(0)).current;
  const counter = useRef(0);
  const isFocused = useIsFocused();
  const [showModalUnlock, setShowModalUnlock] = useState(false);
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModal, setShowModal] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalSort, setShowModalSort] = useState(false);
  const [showModalShareStory, setShowModalShareStory] = useState(false);
  const [sharedStory, setSharedStory] = useState<any>(null);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [listCollection, setListCollection] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailCollection, setDetailCollection] = useState(null);
  const [listLibrary, setListLibrary] = useState([]);
  const [listLibraryDetail, setListLibraryDetail] = useState([]);
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [indexSweepLeft, setIndexSweepLeft] = useState(null);
  const [showUnlockedStory, setShowUnlockedStory] = useState(false);
  const [showModalNewStory, setShowModalNewStory] = useState(false);
  const [showModalSuccessPurchase, setShowModalSuccessPurchase] =
    useState(false);
  const [showModalSuccessPurchaseNative, setShowModalSuccessPurchaseNative] =
    useState(false);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [price, setPrice] = useState('');
  const activeStatus = useRef(false);

  const startBounceAnimation = () => {
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -180, // Geser ke kiri
        duration: 500,
        useNativeDriver: true,
      }),
      // Animated.timing(translateX, {
      //   toValue: -100, // Naik ke atas sejauh 100
      //   duration: 500,
      //   useNativeDriver: true,
      // }),
      // Animated.timing(translateX, {
      //   toValue: 0, // Turun kembali ke posisi semula
      //   duration: 500,
      //   useNativeDriver: true,
      // }),
    ]).start();
  };

  const startBounceAnimationDetail = () => {
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: -120, // Geser ke kiri
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const stopAnimation = () => {
    translateX.stopAnimation(value => {
      translateX.setValue(0); // Set the animation value to the current value
    });
  };
  const showWatchAds = async () => {
    setLoadingOne(true);
    const advert = await loadRewarded();
    advert.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      setShowModalUnlock(false);
      setLoadingOne(false);
      setTimeout(async () => {
        const resp = await getStoryDetail(selectedStory?.id);
        handleNextStory(resp.data);
        setShowModalSuccessPurchase(true);
      }, 500);
    });
  };

  const fecthProduct = async () => {
    const products = await IAP.getProducts({
      skus: ['unlock_story_1_week_only'],
    });
    if (products) {
      setPrice(products[0].localizedPrice);
    }
  };
  useEffect(() => {
    setDetail(null);
    fecthProduct();
  }, []);

  const handleRead = async item => {
    setSelectedStory(item?.item);
    if (
      userProfile?.data?.subscription?.plan?.id != 1 ||
      (userStory?.id != item?.item?.id &&
        item?.item?.expire != null &&
        new Date() < new Date(item?.item?.expire))
    ) {
      const resp = await getStoryDetail(item?.item?.id);
      handleSetStory(resp.data);
      navigate('Main');
    } else {
      const resp = await getStoryDetail(item?.item?.id);
      handleNextStory(resp.data);
      setShowModalUnlock(true);
    }
  };

  const handleReadDetail = async item => {
    setSelectedStory(item);
    if (
      userProfile?.data?.subscription?.plan?.id != 1 ||
      userStory?.id === item?.item?.id ||
      new Date() > new Date(item?.item?.expire)
    ) {
      const resp = await getStoryDetail(item?.id);
      handleSetStory(resp.data);
      navigate('Main');
      setDetail(null);
    } else {
      const resp = await getStoryDetail(item?.id);
      handleNextStory(resp.data);
      setShowModalUnlock(true);
      setDetail(null);
    }
  };

  const fetchDetail = async id => {
    const resp = await getDetailCollection(id);
    setDetailCollection(resp?.data?.collection);
    if (resp?.data?.stories?.data.length > 0) {
      setListLibraryDetail(resp?.data?.stories?.data);
    }
  };

  const renderCollect = item => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
      }}>
      <LibrarySvg fill={code_color.white} width={20} height={20} />
      <Text allowFontScaling={false} style={{marginLeft: 20, flex: 1}}>
        {item.name}
      </Text>
      <BackRightSvg />
    </View>
  );

  const renderContent = item => {
    if (detail != null) {
      return (
        <View>
          {detailCollection?.stories_count != 0 ? (
            <Animated.View
              style={
                indexSweepLeft === item?.item?.id
                  ? {
                      transform: [{translateX: translateX}],
                    }
                  : undefined
              }>
              <View
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: bgTheme,
                  borderColor: 'white',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                }}>
                <ImageBackground
                  source={{
                    uri: `${BACKEND_URL}${item?.item?.story?.category?.cover?.url}`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    alignItems: 'center',
                    paddingTop: 5,
                  }}
                  resizeMode="contain">
                  {(userProfile?.data?.subscription?.plan?.id != 2 &&
                    userProfile?.data?.subscription?.plan?.id != 3) ||
                    userStory?.id != item?.item?.id ||
                    (new Date() > new Date(item?.item?.expire) && (
                      <LockFree height={16} width={55} />
                    ))}
                </ImageBackground>
                <View
                  style={{
                    marginLeft: 0,
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, marginRight: 10}}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: code_color.white,
                          fontSize: 12,
                          marginBottom: 5,
                        }}>
                        {item?.item?.story?.category?.name}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: code_color.white,
                          fontSize: 14,
                          fontWeight: 400,
                          textAlign: 'left',
                        }}>
                        {item?.item?.story?.title_en}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleReadDetail(item?.story);
                      }}
                      style={{
                        backgroundColor: '#00B781',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        alignItems: 'center',
                        marginRight: 10,
                        borderRadius: 30,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: code_color.white,
                          fontWeight: 'bold',
                          fontSize: 12,
                        }}>
                        Read Story
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    height: '100%',
                    justifyContent: 'center',
                  }}
                  onPress={() => startBounceAnimationDetail()}>
                  <DotSvg />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : null}
          {/* <View
        style={{borderColor: '#778DFF', borderWidth: 1, paddingVertical: 10, backgroundColor: bgTheme}}
      /> */}
        </View>
      );
    } else {
      return (
     
          <Animated.View
            style={
              indexSweepLeft === item?.item?.id
                ? {
                    transform: [{translateX: translateX}],
                  }
                : null
            }>
            <View
              style={{
                paddingLeft: 10,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: bgTheme,
                borderColor: 'white',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                paddingVertical: 10,
                height: 120
              }}>
              <ImageBackground
                source={{
                  uri: `${BACKEND_URL}${item?.item?.category?.cover?.url}`,
                }}
                style={{
                  width: 100,
                  height: 100,
                  alignItems: 'center',
                  paddingTop: 5,
                }}
                resizeMode="contain">
                {userProfile?.data?.subscription?.plan?.id != 2 &&
                  userProfile?.data?.subscription?.plan?.id != 3 &&
                  userStory?.id != item?.item?.id &&
                  item?.item?.expire === null &&
                  new Date() > new Date(item?.item?.expire) && (
                    <LockFree height={16} width={55} />
                  )}
              </ImageBackground>
              <View
                style={{
                  marginLeft: 0,
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, marginRight: 10}}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontSize: 12,
                        marginBottom: 5,
                      }}>
                      {item?.item?.category?.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontSize: 14,
                        fontWeight: 400,
                        textAlign: 'left',
                      }}>
                      {item?.item?.title_en}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRead(item)}
                    style={{
                      backgroundColor: '#00B781',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      alignItems: 'center',
                      marginRight: 10,
                      borderRadius: 30,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                      Read Story
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  height: '100%',
                  justifyContent: 'center',
                }}
                onPress={async () => {
                  setIndexSweepLeft(item?.item?.id);
                  setTimeout(() => {
                    startBounceAnimation();
                  }, 100);
                }}>
                <DotSvg />
              </TouchableOpacity>
            </View>
          </Animated.View>
       
      );
    }
  };
  const renderContentSearch = item => {
    if (detail != null) {
      return (
        <View>
          {detailCollection?.stories_count != 0 ? (
            <Animated.View
              style={{
                transform: [{translateX: translateX}],
              }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: bgTheme,
                  borderColor: 'white',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                  paddingRight: 15,
                }}>
                <ImageBackground
                  source={{
                    uri: `${BACKEND_URL}${item?.category?.cover?.url}`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    alignItems: 'center',
                    paddingTop: 5,
                  }}
                  resizeMode="contain">
                  {userProfile?.data?.subscription?.plan?.id != 2 &&
                    userProfile?.data?.subscription?.plan?.id != 3 &&
                    userStory?.id != item?.item?.id &&
                    item?.item?.expire === null &&
                    new Date() > new Date(item?.item?.expire) && (
                      <LockFree height={16} width={55} />
                    )}
                </ImageBackground>
                <View
                  style={{
                    marginLeft: 0,
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, marginRight: 10}}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: code_color.white,
                          fontSize: 12,
                          marginBottom: 5,
                        }}>
                        {item?.category?.name}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: code_color.white,
                          fontSize: 14,
                          fontWeight: 400,
                          textAlign: 'left',
                        }}>
                        {item?.title_en}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleReadDetail(item?.story);
                      }}
                      style={{
                        backgroundColor: '#00B781',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        alignItems: 'center',
                        marginRight: 10,
                        borderRadius: 30,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: code_color.white,
                          fontWeight: 'bold',
                          fontSize: 12,
                        }}>
                        Read Story
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={{marginHorizontal: 5}}
                  onPress={() => startBounceAnimation()}>
                  <DotSvg />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : null}
          {/* <View
        style={{borderColor: '#778DFF', borderWidth: 1, paddingVertical: 10, backgroundColor: bgTheme}}
      /> */}
        </View>
      );
    } else {
      return (
        <View>
          <Animated.View
            style={{
              transform: [{translateX: translateX}],
            }}>
            <View
              style={{
                paddingHorizontal: 10,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: bgTheme,
                borderColor: 'white',
                // borderTopWidth: 1,
                borderBottomWidth: 1,
                paddingVertical: 10,
                paddingRight: 15,
              }}>
              <ImageBackground
                source={{
                  uri: `${BACKEND_URL}${item?.item?.category?.cover?.url}`,
                }}
                style={{
                  width: 100,
                  height: 100,
                  alignItems: 'center',
                  paddingTop: 5,
                }}
                resizeMode="contain">
                {userProfile?.data?.subscription?.plan?.id != 2 &&
                  userProfile?.data?.subscription?.plan?.id != 3 &&
                  userStory?.id != item?.item?.id &&
                  item?.item?.expire === null &&
                  new Date() > new Date(item?.item?.expire) && (
                    <LockFree height={16} width={55} />
                  )}
              </ImageBackground>
              <View
                style={{
                  marginLeft: 0,
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, marginRight: 10}}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontSize: 12,
                        marginBottom: 5,
                      }}>
                      {item?.item?.category?.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontSize: 14,
                        fontWeight: 400,
                        textAlign: 'left',
                      }}>
                      {item?.item?.title_en}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRead(item)}
                    style={{
                      backgroundColor: '#00B781',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      alignItems: 'center',
                      marginRight: 10,
                      borderRadius: 30,
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                      Read Story
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{marginHorizontal: 5}}
                onPress={() => startBounceAnimation()}>
                <DotSvg />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      );
    }
  };
  const renderContentCollection = item => {
    return (
      <View>
        <Pressable
          onPress={() => {
            setDetail(item?.item?.id);
            fetchDetail(item?.item?.id);
          }}
          style={{
            paddingHorizontal: 10,
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: bgTheme,
            borderColor: 'white',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}>
          <LibrarySvg fill={'white'} width={30} height={30} />
          <View
            style={{
              marginLeft: 20,
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                color: code_color.white,
                paddingVertical: 15,
              }}>
              {item?.item?.name}
            </Text>
          </View>

          <BackRightSvg />
        </Pressable>
      </View>
    );
  };
  const renderContentCollectionDetail = () => {
    return (
      <View>
        <Pressable
          onPress={() => {
            setDetail(null);
            handleRestart();
          }}
          style={{
            paddingHorizontal: 10,
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: bgTheme,
            borderColor: 'white',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}>
          <Image
            source={backLeft}
            style={{width: 10, height: 10, marginRight: 10}}
          />
          <LibrarySvg fill={'white'} width={30} height={30} />
          <View
            style={{
              marginLeft: 20,
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                color: code_color.white,
              }}>
              {detailCollection?.name}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: code_color.white,
              }}>
              {detailCollection?.stories_count}{' '}
              {detailCollection?.stories_count > 1 ? 'Stories' : 'Story'}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const deleteRowCollection = async rowMap => {
    try {
      const res = await deleteMyCollection(rowMap.item.id);
      handleRestart();
    } catch (error) {}
  };
  const deleteRowStory = async rowMap => {
    if (detail != null) {
      try {
        const res = await deleteStoryCollection(detail, rowMap.item.story?.id);
        handleRestart();
        fetchDetail(detail);
      } catch (error) {}
    } else {
      try {
        const res = await deleteMyStory(rowMap.item.id);
        handleRestart();
      } catch (error) {}
    }
  };
  const handleEditCollect = rowMap => {
    setId(rowMap.item);
    setShowModalNew(true);
    setEdit(true);
  };
  useEffect(() => {
    handleRestart();
  }, [items, isFocused]);

  useEffect(() => {
    async function fetchData() {
      try {
        let params = {
          search: keyword,
        };
        const res = await getExploreStory(params);
        setData(res);
      } catch (error) {
        setData(null);
      }
    }
    fetchData();
  }, []);
  const handleRestart = async () => {
    setShowModalNew(false);
    try {
      let params = {
        search: keyword,
        column: items?.column,
        dir: items?.value,
      };
      const res = await getMyCollection(params);
      console.log('DATA INI' + JSON.stringify(res));
      setListCollection(res.data);
      setListLibrary(res.outsides);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  // const handleTouchStart = e => {
  //   // Mendapatkan posisi sentuhan
  //   const touchX = e.nativeEvent.locationX;
  //   // Menghitung setengah lebar layar
  //   const halfScreenWidth = Dimensions.get('window').width / 2;
  //   // Jika sentuhan terjadi di sebelah kiri, set isSwipingLeft ke true
  //   if (touchX < halfScreenWidth) {
  //     console.log('masuk kiri');
  //     handleSetSteps(3 - 1);
  //     navigate('Main');
  //     setIsSwipingLeft(true);
  //   }
  //   // Jika sentuhan terjadi di sebelah kanan, set isSwipingRight ke true
  //   else {
  //     console.log('masuk kanan');
  //     handleSetSteps(3 + 1);
  //     navigate('ExploreLibrary');
  //     setIsSwipingRight(true);
  //   }
  // };
  const handleTouchEnd = () => {
    // Reset status swipe saat sentuhan selesai
    setIsSwipingLeft(false);
    setIsSwipingRight(false);
  };
  const handleTouchStart = e => {
    // Mendapatkan posisi sentuhan
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const screenWidth = Dimensions.get('window').width / 2.5;
    if (touchX < screenWidth) {
      navigate('Media');
    } else {
      handleSetSteps(3 + 1);
      navigate('ExploreLibrary');
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

  const renderProgress = () => <StepHeader currentStep={5} />;
  const renderTutorial = () => {
    if (stepsTutorial === 3) {
      return (
        <SafeAreaView
          onTouchStart={handleTouchStart}
          // onTouchEnd={handleTouchEnd}
          pointerEvents="box-only"
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height + 100,
            top: wp(-70) - Dimensions.get('window').height / 3,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              opacity: 1,
              marginTop: 5,
            }}>
            {renderProgress()}
          </View>

          <Step4
            handleNext={() => {
              handleSetSteps(stepsTutorial + 1);
              navigate('ExploreLibrary');
            }}
          />
        </SafeAreaView>
      );
    }
  };
  const handleUnlimited = async () => {
    //
    try {
      const paymentResult = await handlePayment('in_app');
      if (paymentResult.success) {
        setShowModalNewStory(false);
        console.log('Pembayaran berhasil:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran berhasil
      } else {
        setShowModalNewStory(false);
        console.log('Pembayaran gagal:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran gagal
      }
    } catch (error) {
      setShowModalNewStory(false);
      console.error('Terjadi kesalahan:', error);
      // Tangani kesalahan yang mungkin terjadi
    }
    // setShowModalGetPremium(true);
  };

  const renderEmpty = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <EmptyLibrary />
      <Text
        style={{
          color:
            backgroundColor === '#2C3439' ? code_color.black : code_color.white,
          fontSize: 14,
          fontWeight: '400',
          textAlign: 'center',
          lineHeight: 21,
          marginTop: 22,
          width: sizing.getDimensionWidth(0.9),
        }}>
        {
          'You don’t have any Stories saved in your library yet.\nTap the “♥︎“-icon on the main screen to save your\nfavorite Stories in your Library.'
        }
      </Text>
    </View>
  );
  const renderEmptySearch = () => (
    <ScrollView style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={imgSearchNull}
          style={{width: 100, height: 100, marginTop: 20}}
        />
        <Text
          style={{
            color: code_color.white,
            fontSize: 16,
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: 21,
            marginTop: 22,
            width: sizing.getDimensionWidth(0.9),
          }}>
          {'We can’t find that title in your library.'}
        </Text>
      </View>

      <View
        style={{
          borderColor: code_color.greyDefault,
          borderWidth: 1,
          borderStyle: 'solid',
          marginVertical: 20,
          marginHorizontal: 20,
        }}
      />
      <Text
        style={{
          color: code_color.white,
          fontSize: 18,
          fontWeight: '500',
          textAlign: 'center',
          marginVertical: 10,
        }}>
        {'Read one of our other Stories now:'}
      </Text>

      <SwipeListView
        data={data?.most_share}
        renderItem={item => renderContentSearch(item)}
        swipeGestureEnded={(_data, _rowMap) => {
          stopAnimation();
        }}
        renderHiddenItem={(_data, _rowMap) => (
          <View style={styles.rowBack}>
            {detail != null ? null : (
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => {
                  setId(_data?.item?.id);
                  setShowModal(true);
                }}>
                <LibraryAddSvg />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightCenter]}
              onPress={() => {
                setSharedStory(_data);
                setShowModalShareStory(true);
              }}>
              <ShareSvg />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => {
                Alert.alert(
                  'Are you sure you want to remove this story from your library?',
                  '',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        deleteRowStory(_data);
                      },
                    },
                    {text: 'Cancel', onPress: () => {}},
                  ],
                );
              }}>
              <DeleteSvg />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-180}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
    </ScrollView>
  );

  const handleNative = async () => {
    setLoading(true);
    const data = await handleNativePayment(
      'unlock_story_1_week_only',
      selectedStory?.id,
    );
    if (data) {
      setLoading(false);
      setShowModalUnlock(false);
      setShowModalNewStory(false);
      const resp = await getStoryDetail(selectedStory?.id);
      handleNextStory(resp.data);
      setShowModalSuccessPurchaseNative(true);
    } else {
      setLoading(false);
      setShowModalUnlock(false);
      setShowModalNewStory(false);
    }
  };
  const rippleAnimate = require('../../assets/lottie/ripple.json');
  return (
    <View>
      <ModalUnlockedStory
        restart
        edit
        isVisible={showUnlockedStory}
        onClose={() => setShowUnlockedStory(false)}
        readLater={true}
        data={selectedStory}
        handleRead={async () => {
          setShowUnlockedStory(false);
          const resp = await getStoryDetail(selectedStory?.id);
          handleSetStory(resp.data);
          navigate('Main');
        }}
        handleReadOther={async (storyId: number) => {
          setShowUnlockedStory(false);
          const resp = await getStoryDetail(storyId);
          handleSetStory(resp.data);
          navigate('Main');
        }}
      />
      <ModalUnlockStory
        isLoading={loading}
        isVisible={showModalUnlock}
        onClose={() => setShowModalUnlock(false)}
        data={nextStory}
        loadingOne={loadingOne}
        onWatchAds={showWatchAds}
        onUnlock={() => {
          handleNative();
        }}
        price={price}
        onGetUnlimit={() => handleUnlimited()}
      />
      <ModalSuccessPurchase
        isVisible={showModalSuccessPurchase}
        type={'watch'}
        onClose={() => {
          setShowModalSuccessPurchase(false);
          handleSetStory(nextStory);
          navigate('Main');
        }}
      />
      <ModalSuccessPurchase
        isVisible={showModalSuccessPurchaseNative}
        onClose={() => {
          setShowModalSuccessPurchaseNative(false);
          handleSetStory(nextStory);
          navigate('Main');
        }}
      />
      <View style={{flex: 0, height: wp(480), backgroundColor: bgTheme}}>
        <ModalLibrary
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
            handleRestart();
          }}
          data={listCollection}
          storyId={id}
        />
        <ModalNewLibrary
          isVisible={showModalNew}
          onClose={() => setShowModalNew(false)}
          restart={() => {
            setEdit(false);
            handleRestart();
          }}
          edit={edit}
          data={id}
        />
        <ModalSorting
          isVisible={showModalSort}
          onClose={() => setShowModalSort(false)}
          items={(value: any) => setItems(value)}
        />
        <ModalShareStory
          storyData={sharedStory}
          isVisible={showModalShareStory}
          onClose={() => {
            setShowModalShareStory(false);
            setSharedStory(null);
          }}
        />
        <ModalNewStory
          isLoading={loading}
          isVisible={showModalNewStory}
          onClose={() => setShowModalNewStory(false)}
          onWatchAds={() => {
            setShowModalNewStory(false);
            setShowModal(true);
          }}
          onUnlock={() => {
            handleNative();
          }}
          onGetUnlimit={() => {
            handleUnlimited();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <Pressable
            onPress={() => setShowModalNew(true)}
            style={{
              height: 30,
              width: 30,
              backgroundColor: code_color.white,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={libraryAdd}
              resizeMode="contain"
              style={{width: 20, height: 20}}
            />
          </Pressable>

          <Pressable
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              flex: 1,
              // padding: 10,
              borderRadius: 10,
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              height: 40,
            }}>
            <SearchSvg />
            <TextInput
              placeholder="Search"
              placeholderTextColor={code_color.black}
              allowFontScaling={false}
              value={keyword}
              onChangeText={value => setKeyword(value)}
              onSubmitEditing={() => handleRestart()}
              style={{
                marginLeft: 10,
                fontSize: 14,
                height: 40,
                flex: 1,
              }}
            />
          </Pressable>
          <Pressable onPress={() => setShowModalSort(true)}>
            <DescendingSvg fill={code_color.white} />
          </Pressable>
        </View>
        {listLibrary?.length > 0 || listCollection?.length > 0 ? (
          <ScrollView>
            {detail != null ? (
              renderContentCollectionDetail()
            ) : (
              <SwipeListView
                data={listCollection}
                renderItem={item => renderContentCollection(item)}
                renderHiddenItem={(_data, _rowMap) => (
                  <View style={styles.rowBack}>
                    <TouchableOpacity
                      style={[
                        styles.backLeftCollectBtn,
                        styles.backLeftBtnCollect,
                      ]}
                      onPress={() => handleEditCollect(_data)}>
                      <EditSvg />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.backRightCollectBtn,
                        styles.backRightBtnCollect,
                      ]}
                      onPress={() => {
                        Alert.alert(
                          'Are you sure you want to remove this collection?',
                          '',
                          [
                            {
                              text: 'Yes',
                              onPress: () => {
                                deleteRowCollection(_data);
                                // handleDelete(item.id);
                              },
                            },
                            {text: 'Cancel', onPress: () => {}},
                          ],
                        );
                      }}>
                      <DeleteSvg />
                    </TouchableOpacity>
                  </View>
                )}
                rightOpenValue={-120}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            )}
            {detail != null ? (
              <SwipeListView
                data={listLibraryDetail}
                renderItem={item => renderContent(item)}
                renderHiddenItem={(_data, _rowMap) => (
                  <View style={styles.rowBack}>
                    {detail != null ? null : (
                      <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={() => {
                          setId(_data?.item?.id);
                          setShowModal(true);
                        }}>
                        <LibraryAddSvg />
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={[styles.backRightBtn, styles.backRightCenter]}
                      onPress={() => {
                        setSharedStory(_data);
                        setShowModalShareStory(true);
                      }}>
                      <ShareSvg />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.backRightBtn, styles.backRightBtnRight]}
                      onPress={() => {
                        Alert.alert(
                          'Are you sure you want to remove this story from your library?',
                          '',
                          [
                            {
                              text: 'Yes',
                              onPress: () => {
                                deleteRowStory(_data);
                              },
                            },
                            {text: 'Cancel', onPress: () => {}},
                          ],
                        );
                      }}>
                      <DeleteSvg />
                    </TouchableOpacity>
                  </View>
                )}
                rightOpenValue={-120}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            ) : (
              <SwipeListView
                data={listLibrary}
                renderItem={item => renderContent(item)}
                swipeGestureEnded={(_data, _rowMap) => {
                  stopAnimation();
                }}
                renderHiddenItem={(_data, _rowMap) => (
                  <View style={styles.rowBack}>
                    {detail != null ? null : (
                      <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={() => {
                          setId(_data?.item?.id);
                          setShowModal(true);
                        }}>
                        <LibraryAddSvg />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={[styles.backRightBtn, styles.backRightCenter]}
                      onPress={() => {
                        setSharedStory(_data);
                        setShowModalShareStory(true);
                      }}>
                      <ShareSvg />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.backRightBtn, styles.backRightBtnRight]}
                      onPress={() => {
                        Alert.alert(
                          'Are you sure you want to remove this story from your library?',
                          '',
                          [
                            {
                              text: 'Yes',
                              onPress: () => {
                                deleteRowStory(_data);
                              },
                            },
                            {text: 'Cancel', onPress: () => {}},
                          ],
                        );
                      }}>
                      <DeleteSvg />
                    </TouchableOpacity>
                  </View>
                )}
                rightOpenValue={-180}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            )}
          </ScrollView>
        ) : listLibrary?.length === 0 &&
          listCollection?.length === 0 &&
          keyword.length === 0 ? (
          renderEmpty()
        ) : listLibrary?.length === 0 &&
          listCollection?.length === 0 &&
          keyword.length > 0 ? (
          renderEmptySearch()
        ) : (
          renderEmpty()
        )}
        <View
          style={{
            width: sizing.getDimensionWidth(1),
            alignItems: 'center',
            backgroundColor: bgTheme,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: -5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8,
          }}>
          <TouchableOpacity
            onPress={() => handleSomeAction('ExploreLibrary')}
            style={{
              backgroundColor: code_color.yellow,
              marginTop: moderateScale(20),
              padding: moderateScale(10),
              borderRadius: 8,
              width: sizing.getDimensionWidth(0.9),
              marginBottom: moderateScale(20),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LibrarySvg fill={code_color.black} width={20} height={20} />
            <Text
              style={{
                color: code_color.black,
                fontWeight: '500',
                fontSize: moderateScale(14),
                marginLeft: 20,
              }}>
              Explore more Stories
            </Text>
          </TouchableOpacity>
          {/* {stepsTutorial === 3 ? (
            <View style={{position: 'absolute', bottom: -30}}>
              <AnimatedLottieView
                source={rippleAnimate}
                style={{
                  width: wp(150),
                }}
                autoPlay
                duration={3000}
                loop={true}
              />
            </View>
          ) : null} */}
        </View>
      </View>
      {/* {renderTutorial()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingLeft: 15,
  },
  backLeftCollectBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
    height: 69,
  },
  backRightCollectBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
    height: 69,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
    // height: 40
  },
  backLeftBtnCollect: {
    backgroundColor: '#FF932F',
    right: 60,
  },
  backRightBtnCollect: {
    backgroundColor: '#FF453B',
    right: 0,
  },
  backRightBtnLeft: {
    backgroundColor: '#797BFE',
    right: 120,
  },
  backRightCenter: {
    backgroundColor: '#3493FD',
    right: 60,
  },
  backRightBtnRight: {
    backgroundColor: '#FF453B',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

LibraryScreen.propTypes = {
  activeVersion: PropTypes.any,
  handleSomeAction: PropTypes.func,
};

LibraryScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(LibraryScreen);
