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
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import {
  imgSearchNull,
  libraryAdd,
} from '../../assets/images';
import {code_color} from '../../utils/colors';
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
import UnlockedTime from '../../assets/icons/unlockedTime';
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
  updateProfile,
} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import {moderateScale} from 'react-native-size-matters';
import ModalShareStory from '../../components/modal-share-story';
import ModalNewStory from '../../components/modal-new-story';
import {handleNativePayment, handlePayment} from '../../helpers/paywall';
import {sizing} from '../../shared/styling';
import LockFree from '../../assets/icons/lockFree';
import ModalUnlockStory from '../../components/modal-unlock-story';
import ModalUnlockedStory from '../../components/modal-story-unlock';
import {loadRewarded} from '../../helpers/loadReward';
import {
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import ModalSuccessPurchase from '../../components/modal-success-purchase';
import * as IAP from 'react-native-iap';
import {Animated} from 'react-native';
import {hp, wp} from '../../utils/screen';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import ModalGetPremium from '../../components/modal-get-premium';
import { reloadUserProfile } from '../../utils/user';

const LibraryScreen = ({
  colorTheme,
  handleSomeAction,
  handleSetStory,
  userProfile,
  handleNextStory,
  nextStory,
  userStory,
  handleSetPage
}) => {
  const [showModalGetPremium, setShowModalGetPremium] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const counter = useRef(0);
  const isFocused = useIsFocused();
  const [showModalUnlock, setShowModalUnlock] = useState(false);
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModal, setShowModal] = useState(false);
  const [row, setRow] = useState(null);
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
  const [loadingList, setLoadingList] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const stopAnimation = () => {
    translateX.stopAnimation(value => {
      translateX.setValue(0); // Set the animation value to the current value
    });
  };
  const showWatchAds = async () => {
    setLoadingOne(true);
    const advert = await loadRewarded();
    advert.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward: any) => {
      setShowModalUnlock(false);
      setLoadingOne(false);
      setTimeout(async () => {
        const resp = await getStoryDetail(selectedStory?.id);
        const payloadStory = {
          _method: 'PATCH',
          story_id: selectedStory?.id,
          expire: 1,
        };
      
        await updateProfile(payloadStory);
        reloadUserProfile();
        handleNextStory(resp.data);
        setShowModalSuccessPurchase(true);
      }, 500);
    });
  };

  const fecthProduct = async () => {
    if (!__DEV__) {
      const products = await IAP.getProducts({
        skus: [Platform.OS === 'ios' ? 'unlock_story_1_week_only' : 'unlock_stories_1week'],
      });
      if (products) {
        setPrice(products[0].localizedPrice);
      }
    }
  };
  useEffect(() => {
    setDetail(null);
    fecthProduct();
  }, []);

  const handleRead = async item => {
    setSelectedStory(item?.item);

    if (userStory?.id === (item?.item?.id ? item?.item?.id : item?.id)) {
      const resp = await getStoryDetail(item?.item?.id);
      handleSetStory(resp.data);
      navigate('Main', {isFromLibrary: true});
    } else if (
      userProfile?.data?.subscription?.plan?.id != 1 
    ) {
      const resp = await getStoryDetail(item?.item?.id);
      handleSetStory(resp.data);
      navigate('Main', {isFromLibrary: true});
    } else if (
      userProfile?.data?.subscription?.plan?.id === 1 &&
      item?.item?.expire != null &&
      new Date(item?.item?.expire) > new Date() || item?.item?.is_read_later === 1 
    ) {
      const resp = await getStoryDetail(item?.item?.id);
      handleSetStory(resp.data);
      navigate('Main', {isFromLibrary: true});
    } else {
      const resp = await getStoryDetail(item?.item?.id);
      handleNextStory(resp.data);
      setShowModalUnlock(true);
    }
    // if (
    //   // userProfile?.data?.subscription?.plan?.id != 1 ||
    //   // userStory?.id === (item?.item?.id ? item?.item?.id : item?.id) ||
    //   // (item?.item?.expire != null &&   new Date() > new Date(item?.item?.expire))
    //   userProfile?.data?.subscription?.plan?.id != 1 &&
    //           userStory?.id === (item?.item?.id ? item?.item?.id : item?.id) &&
    //           item?.item?.expire === null &&
    //           new Date() > new Date(item?.item?.expire)
    // ) {

    //   const resp = await getStoryDetail(item?.item?.id);
    //   handleSetStory(resp.data);
    //   navigate('Main');
    // } else {
    //   const resp = await getStoryDetail(item?.item?.id);
    //   handleNextStory(resp.data);
    //   setShowModalUnlock(true);
    // }
  };

  const calculateRemainingTime = (targetDateTime: string) => {
    const targetDate = new Date(targetDateTime);
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference < 0) {
      return null;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    return {day: days, hour: hours};
  };

  const handleReadDetail = async item => {
    setSelectedStory(item);
    if (
      item?.item?.is_read_later === 1 ||
      userProfile?.data?.subscription?.plan?.id != 1 ||
      userStory?.id === (item?.item?.id ? item?.item?.id : item?.id) ||
      new Date() > new Date(item?.item?.expire) 
      
    ) {
      const resp = await getStoryDetail(item?.id);
      handleSetStory(resp.data);
      navigate('Main', {isFromLibrary: true});
      setDetail(null);
    } else {
      const resp = await getStoryDetail(item?.id);
      handleNextStory(resp.data);
      setShowModalUnlock(true);
      setDetail(null);
    }
  };
  useEffect(() => {
    if (detail) {
      fetchDetail(detail);
    }
  }, [keyword, items]);
  const fetchDetail = async id => {
    let params = {
      search: keyword,
      column: items?.column,
      dir: items?.value,
      length: 50,
    };
    const resp = await getDetailCollection(id, params);
    setDetailCollection(resp?.data?.collection);
    if (resp?.data?.stories?.data.length > 0) {
      setListLibraryDetail(resp?.data?.stories?.data);
    } else {
      setListLibraryDetail([]);
    }
  };

  const onRowPress = (rowMap, rowKey, data) => {
    setRow(rowKey);
    if (rowMap[rowKey]) {
      rowMap[rowKey].manuallySwipeRow(data ? -120 : -180);
    }
  };
  const closeRow = (rowMap, rowKey) => {
    setRow(null);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const renderContent = (item, rowMap) => {
     console.log(`${BACKEND_URL}${item?.item?.category?.cover?.url}`,)
    if (detail != null) {
      return (
        <Pressable onPress={() => handleReadDetail(item?.item?.story)}>
          {listLibraryDetail.length > 0 ? (
            <View
              // onPress={() => closeRow(rowMap, item.item.id)}
              style={{
                paddingLeft: hp(10),
                paddingBottom: hp(10),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: bgTheme,
                borderColor: 'white',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                paddingVertical: hp(10),
                height: hp(120),
              }}>
              <FastImage
                source={{
                  uri: `${BACKEND_URL}${item?.item?.story?.category?.cover?.url}`,
                }}
                style={{
                  width: hp(100),
                  height: hp(100),
                  alignItems: 'center',
                  paddingTop: 5,
                }}
                resizeMode="contain">
                {userProfile?.data?.subscription?.plan?.id != 2 &&
                userProfile?.data?.subscription?.plan?.id != 3 &&
                userStory?.id != item?.item?.story?.id &&
                item?.item?.expire === null && 
                item?.item?.is_read_later != 1 &&
                new Date() > new Date(item?.item?.expire) ? (
                  <LockFree height={hp(16)} width={hp(55)} />
                ) : (
                  new Date() < new Date(item?.item?.expire) && (
                    <UnlockedTime
                      width={hp(100)}
                      height={hp(27)}
                      day={calculateRemainingTime(item?.item?.expire)?.day}
                      hour={calculateRemainingTime(item?.item?.expire)?.hour}
                    />
                  )
                )}
              </FastImage>
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
                        fontSize: moderateScale(12),
                        marginBottom: 5,
                      }}>
                      {item?.item?.story?.category?.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontSize: moderateScale(14),
                        fontWeight: '400',
                        textAlign: 'left',
                      }}>
                      {item?.item?.story?.title_en}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      handleReadDetail(item?.item?.story);
                    }}
                    style={{
                      backgroundColor: '#00B781',
                      paddingHorizontal: hp(15),
                      paddingVertical: hp(10),
                      alignItems: 'center',
                      marginRight: hp(10),
                      borderRadius: hp(30),
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontWeight: 'bold',
                        fontSize: moderateScale(12),
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
                onPress={() => {
                  if (row) {
                    closeRow(rowMap, item.item.id);
                  } else {
                    onRowPress(rowMap, item.item.id, true);
                  }
                }}>
                <DotSvg />
              </TouchableOpacity>
            </View>
          ) : (
            renderEmptySearch()
          )}
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={() => handleRead(item)}
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
            height: 120,
          }}>
          <FastImage
            source={{
              uri: `${BACKEND_URL}${item?.item?.category?.cover?.url}`,
            }}
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              // paddingTop: 5,
            }}
            resizeMode="contain">
            {userProfile?.data?.subscription?.plan?.id != 2 &&
            userProfile?.data?.subscription?.plan?.id != 3 &&
            userStory?.id != item?.item?.id &&
            item?.item?.expire === null &&
            item?.item?.is_read_later != 1 &&
            new Date() > new Date(item?.item?.expire) ? (
              <LockFree height={16} width={55} style={{marginTop: 5}} />
            ) : (
              new Date() < new Date(item?.item?.expire) && (
                <UnlockedTime
                  width={100}
                  height={27}
                  day={calculateRemainingTime(item?.item?.expire)?.day}
                  hour={calculateRemainingTime(item?.item?.expire)?.hour}
                />
              )
            )}
          </FastImage>
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
            onPress={() => {
              if (row) {
                closeRow(rowMap, item.item.id);
              } else {
                onRowPress(rowMap, item.item.id, false);
              }
            }}>
            <DotSvg />
          </TouchableOpacity>
        </Pressable>
      );
    }
  };
  const renderContentSearch = (item, rowMap) => {
    console.log(`${BACKEND_URL}${item?.item?.category?.cover?.url}`,)
    if (detail != null) {
      return (
        <Pressable onPress={() => handleRead(item)}>
          <Animated.View
            style={{
              transform: [{translateX: translateX}],
            }}>
            <View
              style={{
                paddingHorizontal: hp(10),
                paddingBottom: hp(10),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: bgTheme,
                borderColor: 'white',
                // borderTopWidth: 1,
                borderBottomWidth: 1,
                paddingVertical: hp(10),
                paddingRight: hp(15),
              }}>
              <FastImage
                source={{
                  uri: `${BACKEND_URL}${item?.item?.category?.cover?.url}`,
                }}
                style={{
                  width: hp(100),
                  height: hp(100),
                  alignItems: 'center',
                  paddingTop: hp(5),
                }}
                resizeMode="contain">
                {userProfile?.data?.subscription?.plan?.id != 2 &&
                  userProfile?.data?.subscription?.plan?.id != 3 &&
                  userStory?.id != item?.item?.id &&  item?.item?.is_read_later != 1 && (
                    <LockFree height={hp(16)} width={hp(55)} />
                  )}
              </FastImage>
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
                        fontSize: moderateScale(12),
                        marginBottom: 5,
                      }}>
                      {item?.item?.category?.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontSize: moderateScale(14),
                        fontWeight: '400',
                        textAlign: 'left',
                      }}>
                      {item?.item?.title_en}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRead(item)}
                    style={{
                      backgroundColor: '#00B781',
                      paddingHorizontal: hp(15),
                      paddingVertical: hp(10),
                      alignItems: 'center',
                      marginRight: hp(10),
                      borderRadius: hp(30),
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontWeight: 'bold',
                        fontSize: moderateScale(12),
                      }}>
                      Read Story
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{marginHorizontal: 5}}
                onPress={() => {
                  if (row) {
                    closeRow(rowMap, item.item.id);
                  } else {
                    onRowPress(rowMap, item.item.id, false);
                  }
                }}>
                <DotSvg />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      );
    } else {
      return (
        <Pressable onPress={() => handleRead(item)}>
          <Animated.View
            style={{
              transform: [{translateX: translateX}],
            }}>
            <View
              style={{
                paddingHorizontal: hp(10),
                paddingBottom: hp(10),
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: bgTheme,
                borderColor: 'white',
                // borderTopWidth: 1,
                borderBottomWidth: 1,
                paddingVertical: hp(10),
                paddingRight: hp(15),
              }}>
              <FastImage
                source={{
                  uri: `${BACKEND_URL}${item?.item?.category?.cover?.url}`,
                }}
                style={{
                  width: hp(100),
                  height: hp(100),
                  alignItems: 'center',
                  paddingTop: 5,
                }}
                resizeMode="contain">
                {userProfile?.data?.subscription?.plan?.id != 2 &&
                  userProfile?.data?.subscription?.plan?.id != 3 &&
                  userStory?.id != item?.item?.id &&  item?.item?.is_read_later != 1 && (
                    <LockFree height={hp(16)} width={hp(55)} />
                  )}
              </FastImage>
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
                        fontSize: moderateScale(12),
                        marginBottom: 5,
                      }}>
                      {item?.item?.category?.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontSize: moderateScale(14),
                        fontWeight: '400',
                        textAlign: 'left',
                      }}>
                      {item?.item?.title_en}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRead(item)}
                    style={{
                      backgroundColor: '#00B781',
                      paddingHorizontal: hp(15),
                      paddingVertical: hp(10),
                      alignItems: 'center',
                      marginRight: hp(10),
                      borderRadius: hp(30),
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: code_color.white,
                        fontWeight: 'bold',
                        fontSize: moderateScale(12),
                      }}>
                      Read Story
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{marginHorizontal: 5}}
                onPress={() => {
                  if (row) {
                    closeRow(rowMap, item.item.id);
                  } else {
                    onRowPress(rowMap, item.item.id, false);
                  }
                }}>
                <DotSvg />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Pressable>
      );
    }
  };
  const renderContentCollection = item => {
    return (
      <Pressable
        onPress={() => {
          setDetailCollection(null);
          setListLibraryDetail([]);
          setDetail(item?.item?.id);
          fetchDetail(item?.item?.id);
        }}
        style={{
          paddingHorizontal: hp(10),
          paddingBottom: hp(10),
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: bgTheme,
          borderColor: 'white',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          paddingVertical: hp(10),
        }}>
        <LibrarySvg fill={'white'} width={hp(30)} height={hp(30)} />
        <View
          style={{
            marginLeft: hp(20),
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
            paddingHorizontal: hp(10),
            paddingBottom: hp(10),
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: bgTheme,
            borderColor: 'white',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            paddingVertical: hp(10),
          }}>
          <BackRightSvg
            height={hp(20)}
            width={hp(20)}
            style={{marginRight: 8, transform: [{rotate: '180deg'}]}}
          />
          <LibrarySvg fill={'white'} width={hp(30)} height={hp(30)} />
          <View
            style={{
              marginLeft: hp(20),
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text
              allowFontScaling={false}
              style={{
                color: code_color.white,
                fontSize: moderateScale(14),
              }}>
              {detailCollection?.name}
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: code_color.white,
                fontSize: moderateScale(14),
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
          search: '',
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
    setLoadingList(true);
    try {
      let params = {
        search: keyword,
        column: items?.column,
        dir: items?.value,
      };
      const res = await getMyCollection(params);

    
      setListCollection(res.data);
      setListLibrary(res.outsides);
      setLoadingList(false);
    } catch (error) {
      setLoadingList(false);
      console.log(JSON.stringify(error));
    }
  };

  const searchKeyword = async key => {
    setKeyword(key);
    try {
      let params = {
        search: key,
        column: items?.column,
        dir: items?.value,
      };
      const res = await getMyCollection(params);
      setListCollection(res.data);
      setListLibrary(res.outsides);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  const handleUnlimited = async () => {
    //
    try {
      const paymentResult = await handlePayment('in_app');
      if (paymentResult.success) {
        setShowModalNewStory(false);
        setShowModalGetPremium(true);
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
    <View
      style={{
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
      }}>
      <EmptyLibrary />
      <Text
        style={{
          color:
           code_color.white,
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
    <ScrollView style={{flex: 1}} scrollEnabled={scrollEnabled}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={imgSearchNull}
          style={{width: hp(100), height: hp(100), marginTop: hp(20)}}
        />
        <Text
          style={{
            color: code_color.white,
            fontSize: moderateScale(16),
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: moderateScale(21),
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
          marginVertical: hp(20),
          marginHorizontal: hp(20),
        }}
      />
      <Text
        style={{
          color: code_color.white,
          fontSize: moderateScale(18),
          fontWeight: '500',
          textAlign: 'center',
          marginVertical: 10,
        }}>
        {'Read one of our other Stories now:'}
      </Text>

      <SwipeListView
        style={{flex: 1}}
        disableRightSwipe
        showsVerticalScrollIndicator={false}
        keyExtractor={(rowData, index) => {
          return rowData?.id.toString();
        }}
        data={data?.most_share}
        renderItem={(item, rowMap) => renderContentSearch(item, rowMap)}
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
      Platform.OS === 'ios' ? 'unlock_story_1_week_only' : 'unlock_stories_1week',
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
      // setLoading(false);
      // setShowModalUnlock(false);
      // setShowModalNewStory(false);
      // const resp = await getStoryDetail(selectedStory?.id);
      // handleNextStory(resp.data);
      // setShowModalSuccessPurchaseNative(true);
      setLoading(false);
      setShowModalUnlock(false);
      setShowModalNewStory(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ModalGetPremium
        isVisible={showModalGetPremium}
        onGotIt={() => {
          setShowModalGetPremium(false);
        }}
        onClose={() => setShowModalGetPremium(false)}
      />
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
          navigate('Main', {isFromLibrary: true});
        }}
        handleReadOther={async (storyId: number) => {
          setShowUnlockedStory(false);
          const resp = await getStoryDetail(storyId);
          handleSetStory(resp.data);
          navigate('Main', {isFromLibrary: true});
        }}
        type={userProfile?.data?.type}
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
        type={userProfile?.data?.type}
      />
      <ModalSuccessPurchase
        isVisible={showModalSuccessPurchase}
        type={'watch'}
        onClose={() => {
          setShowModalSuccessPurchase(false);
          handleSetStory(nextStory);
          navigate('Main', {isFromLibrary: true});
        }}
        userType={userProfile?.data?.type}
      />
      <ModalSuccessPurchase
        isVisible={showModalSuccessPurchaseNative}
        onClose={() => {
          setShowModalSuccessPurchaseNative(false);
          handleSetStory(nextStory);
          handleSetPage(0);
          navigate('Main', {isFromLibrary: true});
        }}
        userType={userProfile?.data?.type}
      />
      <View style={{flex: 0, height: hp( Dimensions.get('window').height === 667 ? 400 : 480), backgroundColor: bgTheme}}>
        <ModalLibrary
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
            handleRestart();
          }}
          data={listCollection}
          storyId={id}
          keyword={keyword}
          setKeyword={value => searchKeyword(value)}
          setItems={value => setItems(value)}
          handleRestart={() => handleRestart()}
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
          type={userProfile?.data?.type}
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
            marginHorizontal: hp(10),
          }}>
          <Pressable
            onPress={() => setShowModalNew(true)}
            style={{
              height: hp(30),
              width: hp(30),
              backgroundColor: code_color.white,
              borderRadius: hp(15),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={libraryAdd}
              resizeMode="contain"
              style={{width: hp(20), height: hp(20)}}
            />
          </Pressable>

          <Pressable
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              flex: 1,
              // padding: 10,
              borderRadius: hp(10),
              margin: hp(10),
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: hp(10),
              height: hp(40),
            }}>
            <SearchSvg height={hp(22)} width={hp(22)} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={code_color.black}
              allowFontScaling={false}
              value={keyword}
              onChangeText={value => setKeyword(value)}
              onSubmitEditing={() => {
                if (detail) {
                  fetchDetail(detail);
                } else {
                  handleRestart();
                }
              }}
              style={{
                marginLeft: hp(10),
                fontSize: moderateScale(14),
                height: hp(40),
                flex: 1,
              }}
            />
          </Pressable>
          <Pressable onPress={() => setShowModalSort(true)}>
            <DescendingSvg
              fill={code_color.white}
              height={hp(30)}
              width={hp(30)}
            />
          </Pressable>
        </View>
        {loadingList ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={'white'} size={hp(40)} />
            <Text
              allowFontScaling={false}
              style={{
                color: 'white',
                marginTop: hp(5),
                fontSize: moderateScale(12),
              }}>
              Loading ...
            </Text>
          </View>
        ) : (
          <>
            {listLibrary?.length > 0 || listCollection?.length > 0 ? (
              <View
                style={{
                  flex: 1,
                  paddingBottom: hp(100),
                  justifyContent: 'flex-start',
                  alignContent: 'flex-start',
                }}>
                {detail != null ? (
                  renderContentCollectionDetail()
                ) : listCollection.length > 0 ? (
                  <SwipeListView
                    style={{flex: 0, maxHeight: hp(68)}}
                    disableRightSwipe
                    showsVerticalScrollIndicator={false}
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
                ) : null}
                {detail != null ? (
                  <SwipeListView
                    style={{flex: 0, height: 'auto'}}
                    disableRightSwipe
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(rowData, index) => {
                      return rowData?.id.toString();
                    }}
                    data={listLibraryDetail}
                    renderItem={(item, rowMap) => renderContent(item, rowMap)}
                    renderHiddenItem={(_data, _rowMap) => (
                      <View style={styles.rowBack}>
                        {detail != null ? null : (
                          <TouchableOpacity
                            style={[
                              styles.backRightBtn,
                              styles.backRightBtnLeft,
                            ]}
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
                          style={[
                            styles.backRightBtn,
                            styles.backRightBtnRight,
                          ]}
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
                    keyExtractor={(rowData, index) => {
                      return rowData?.id.toString();
                    }}
                    style={{flex: 0, height: 'auto'}}
                    disableRightSwipe
                    showsVerticalScrollIndicator={false}
                    data={listLibrary}
                    renderItem={(item, rowMap) => renderContent(item, rowMap)}
                    swipeGestureEnded={(_data, _rowMap) => {
                      stopAnimation();
                    }}
                    renderHiddenItem={(_data, _rowMap) => (
                      <View style={styles.rowBack}>
                        {detail != null ? null : (
                          <TouchableOpacity
                            style={[
                              styles.backRightBtn,
                              styles.backRightBtnLeft,
                            ]}
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
                          style={[
                            styles.backRightBtn,
                            styles.backRightBtnRight,
                          ]}
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
              </View>
            ) : listLibrary?.length === 0 &&
              listCollection?.length === 0 &&
              detail === null &&
              keyword.length === 0 ? (
              renderEmpty()
            ) : (listLibrary?.length === 0 &&
                listCollection?.length === 0 &&
                detail === null &&
                keyword.length > 0) ||
              (detail != null && listLibraryDetail?.length === 0) ? (
              renderEmptySearch()
            ) : (
              renderEmpty()
            )}
          </>
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
            position: 'absolute',
            bottom: 0,
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
        </View>
      </View>
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
