/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  PanResponder,
} from 'react-native';
import {code_color} from '../../utils/colors';
import SearchSvg from '../../assets/icons/search.jsx';
import LockFree from '../../assets/icons/lockFree';
import DescendingSvg from '../../assets/icons/descending.jsx';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import BackRight from '../../assets/icons/backRight';
import {goBack, navigate} from '../../shared/navigationRef';
import {
  addStory,
  getCategoryDetail,
  getStoryDetail,
  updateProfile,
} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import ModalSorting from '../../components/modal-sorting';
import ModalUnlockStory from '../../components/modal-unlock-story';
import ModalUnlockedStory from '../../components/modal-story-unlock';
import {loadRewarded, loadRewardedCategory} from '../../helpers/loadReward';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';
import {handleNativePayment, handlePayment} from '../../helpers/paywall';
import {reloadUserProfile} from '../../utils/user';
import * as IAP from 'react-native-iap';
import ModalUnlockPremium from '../../components/modal-unlock-premium';
import UnlockCategoryIcon from '../../assets/icons/unlockCategory';
import Loading from '../../components/loading';
import FastImage from 'react-native-fast-image';
import ModalGetPremium from '../../components/modal-get-premium';
import {hp} from '../../utils/screen';
import {moderateScale} from 'react-native-size-matters';
import {fetch} from '@react-native-community/netinfo';

const DetailCategoryScreen = ({
  route,
  colorTheme,
  handleSetSteps,
  handleSetStory,
  handleNextStory,
  stepsTutorial,
  backgroundColor,
  userProfile,
  nextStory,
  handleSetDetailCategory,
  dataDetailCategory,
}) => {
  const [showModalGetPremium, setShowModalGetPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModalSort, setShowModalSort] = useState(false);
  const [keyword, setKeyword] = useState('');
  // const [data, setData] = useState<any>();
  const [data, setData] = useState<any>(route?.params?.categoryId);
  const [showModalUnlock, setShowModalUnlock] = useState(false);
  const [showModalUnlockCategory, setShowModalUnlockCategory] = useState(false);
  const [showUnlockedStory, setShowUnlockedStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [items, setItems] = useState(null);
  const [selectStory, setSelectStory] = useState('');
  const [price, setPrice] = useState('');
  const [loadingAds, setLoadingAds] = useState(false);
  const [load, setLoad] = useState(false);

  const uniqueAlphabets = Array.from(
    new Set(data?.data?.map(item => item.title_en[0])),
  );
  const filteredData = selectedAlphabet
    ? data?.data?.filter(item => item.title_en[0] === selectedAlphabet)
    : data?.data;

  const showWatchAds = async () => {
    fetch().then(async state => {
      if (state.isConnected) {
        setLoading2(true);
        const advert = await loadRewarded();
        advert.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
          setLoading2(false);
          setShowModalUnlock(false);
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
            setShowUnlockedStory(true);
          }, 500);
        });
      } else {
        offline()
      }
    })
   
  };

  const handlePremium = async () => {
    setTimeout(async () => {
      const resp = await getStoryDetail(selectedStory?.id);
      handleNextStory(resp.data);
      setShowUnlockedStory(true);
    }, 500);
  };

  const handleFree = async () => {
    setTimeout(async () => {
      const resp = await getStoryDetail(selectedStory?.id);
      handleNextStory(resp.data);
      setShowModalUnlock(true);
    }, 500);
  };
  const handleUnlimited = async () => {
    fetch().then(async state => {
      if (state.isConnected) {
        try {
          const paymentResult = await handlePayment('in_app');
          if (paymentResult.success) {
            setShowModalGetPremium(true);
            setShowUnlockedStory(false);
          } else {
            setShowUnlockedStory(false);
          }
        } catch (error) {
          setShowUnlockedStory(false);
        }
      } else {
        offline()
      }
    });
    
    // setShowModalGetPremium(true);
  };

  const handleRestart = () => {
    async function fetchData() {
      try {
        let params = {
          search: keyword,
          column: items?.column === 'name' ? 'title_en' : items?.column,
          dir: items?.value,
        };
        const res = await getCategoryDetail(route?.params?.categoryId, params);
        setData(res);
        handleSetDetailCategory(res);
        setLoad(false);
      } catch (error) {
        // setData(null);
        setLoad(false);
      }
    }
    setLoad(true);
    fetchData();
  };
  useEffect(() => {
    // handleRestart();
  }, [keyword, items, route?.params?.categoryId]);

  const fetchUpdate = async () => {
    const payload = {
      _method: 'PATCH',
      category_id: selectStory,
    };
    await updateProfile(payload);
    reloadUserProfile();
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

  const showInterStialCategory = async () => {
    setLoadingAds(true);
    const advert = await loadRewardedCategory();
    const pageCountDownReward = advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('Earn page countdown reward:', reward);
        if (reward) {
          Alert.alert('Congrats! You have unlocked the selected Topic.', '', [
            {
              text: 'OK',
              onPress: async () => fetchUpdate(),
            },
          ]);
        }
        setLoadingAds(false);
      },
    );
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const touchY = event.nativeEvent.locationY;
        handleTouchMove(touchY);
      },
    }),
  ).current;

  const handleTouchMove = touchY => {
    // Lakukan sesuatu dengan informasi pergerakan sentuhan, misalnya memperbarui huruf terpilih
    const touchedAlphabetIndex = Math.floor(touchY / 10); // Sesuaikan dengan tinggi setiap elemen huruf
    if (
      touchedAlphabetIndex >= 0 &&
      touchedAlphabetIndex < dummyFilter.length
    ) {
      const touchedAlphabet = dummyFilter[touchedAlphabetIndex];
      if (selectedAlphabet !== touchedAlphabet) {
        setSelectedAlphabet(touchedAlphabet);
      }
    }
  };
  const handleNative = async () => {
    setLoading(true);
    const data = await handleNativePayment(
      'unlock_story_1_week_only',
      selectedStory?.id,
    );
    if (data) {
      setTimeout(async () => {
        setLoading(false);
        setShowModalUnlock(false);
      }, 100);
    } else {
      setLoading(false);
      setShowModalUnlock(false);
    }
  };

  const dummyFilter = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '#',
  ];

  // const remainingData = selectedAlphabet
  //   ? data?.data?.filter(item => item.title_en[0] !== selectedAlphabet)
  //   : [];

  // const combinedData = filteredData ? filteredData.concat(remainingData) : data?.data;

  // ini untuk mode hybrid jika di buka
  const filteredDataSelected = selectedAlphabet
    ? data?.stories?.filter(item => item.title_en[0] === selectedAlphabet)
    : [];

  // const filteredDataSelected = selectedAlphabet
  //   ? data?.data?.filter(item => item.title_en[0] === selectedAlphabet)
  //   : [];
    // ini juga untuk  mode hybrid
    const filteredDataOthers = selectedAlphabet
    ? data?.stories?.filter(item => item.title_en[0] !== selectedAlphabet)
    : data?.stories;
  // const filteredDataOthers = selectedAlphabet
  //   ? data?.data?.filter(item => item.title_en[0] !== selectedAlphabet)
  //   :data?.data;

  const combinedData = filteredDataSelected.concat(filteredDataOthers);
  const alphabets = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '#',
  ];

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const alphabetIndex = Math.floor(offsetY / 16);
    const currentAlphabet = alphabets[alphabetIndex];
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedStory) {
        try {
          const resp = await getStoryDetail(selectedStory?.id);
          handleSetStory(resp.data);
          handleNextStory(resp.data);
          if (userProfile?.data?.subscription?.plan_id === 1) {
            setTimeout(() => {
              setShowModalUnlock(true);
            }, 200);
          } else {
            setShowUnlockedStory(true);
          }
        } catch (error) {
          handleSetStory(selectedStory);
          handleNextStory(selectedStory);
          if (userProfile?.data?.subscription?.plan_id === 1) {
            setTimeout(() => {
              setShowModalUnlock(true);
            }, 200);
          } else {
            setShowUnlockedStory(true);
          }
        }
      }
    };
    fetchData();
  }, [selectedStory]);

  const offline = () => {
    Alert.alert(
      'YOU SEEM TO BE OFFLINE',
      'Please check your internet connection and try again.',
      [
        {
          text: 'OK',
          onPress: async () => ({}),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: bgTheme}}>
      <ModalSorting
        isVisible={showModalSort}
        onClose={() => setShowModalSort(false)}
        items={(value: any) => setItems(value)}
      />
      <ModalGetPremium
        isVisible={showModalGetPremium}
        onGotIt={() => {
          setShowModalGetPremium(false);
        }}
        onClose={() => setShowModalGetPremium(false)}
      />
      <ModalUnlockStory
        isLoading={loading}
        isVisible={showModalUnlock}
        onClose={() => setShowModalUnlock(false)}
        data={nextStory}
        onWatchAds={showWatchAds}
        onUnlock={() => {
          fetch().then(async state => {
            if (state.isConnected) {
              handleNative();
            } else {
              offline()
            }
          });
        }}
        loadingOne={loading2}
        price={price}
        onGetUnlimit={() => handleUnlimited()}
        type={userProfile?.data?.type}
      />
      <ModalUnlockPremium
        isVisible={showModalUnlockCategory}
        onClose={() => setShowModalUnlockCategory(false)}
        title={'Unlock this topic\r\nfor free now'}
        desc={
          'Watch a Video to unlock this Topic\r\nfor Free or go UNLIMITED\r\nfor full access!'
        }
        onSuccess={showInterStialCategory}
        Icon={() => <UnlockCategoryIcon style={{marginBottom: 20}} />}
        isLoadingAds={loadingAds}
      />
      <View
        style={{
          flex: 0,
          backgroundColor: bgTheme,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: hp(10),
          }}>
          <Pressable
            onPress={() => goBack()}
            style={{
              width: hp(35),
              height: hp(35),
              backgroundColor: code_color.white,
              borderRadius: hp(20),
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(180deg)',
            }}>
            <BackRight fill={bgTheme} height={hp(20)} width={hp(20)} />
          </Pressable>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              flex: 1,
              borderRadius: hp(20),
              margin: hp(10),
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: hp(10),
              height: hp(40),
            }}>
            <SearchSvg height={hp(20)} width={hp(20)} />
            <TextInput
              placeholder="Search"
              allowFontScaling={false}
              value={keyword}
              onChangeText={value => setKeyword(value)}
              placeholderTextColor={code_color.black}
              style={{
                marginLeft: hp(10),
                fontSize: moderateScale(14),
                color: code_color.black,
                flex: 1,
                height: '100%',
              }}
            />
          </View>
          <Pressable onPress={() => setShowModalSort(true)}>
            <DescendingSvg
              fill={code_color.white}
              height={hp(30)}
              width={hp(30)}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          backgroundColor: code_color.white,
          height: '100%',
        }}>
        {data?.name && (
          <Text
            style={{
              fontSize: moderateScale(16),
              fontWeight: '600',
              marginTop: hp(10),
              marginLeft: hp(13),
              color: code_color.black,
            }}>
            Category: {data?.name}
          </Text>
        )}
        <View>
          {data?.most_share?.length > 0 && (
            <View
              style={{
                backgroundColor: '#F0F2FF',
                marginTop: hp(11),
                marginHorizontal: hp(13),
                minWidth: Dimensions.get('screen').width - hp(26),
                borderRadius: hp(8),
                padding: hp(16),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: '600',
                  marginBottom: hp(16),
                  color: code_color.black,
                }}>
                🔥 Most liked Stories in this Category
              </Text>
              <ScrollView horizontal style={{flex: 0}}>
                {data?.most_share.map((itm: any, idx: number) => (
                  <Pressable
                    onPress={() => {
                      setSelectedStory(itm);
                    }}
                    style={{
                      width: hp(95),
                      marginRight: hp(
                        idx + 1 === data?.most_read?.length ? 0 : 16,
                      ),
                    }}
                    key={idx}>
                    {userProfile?.data?.subscription?.plan_id != 2 &&
                      userProfile?.data?.subscription?.plan_id != 3 && (
                        <LockFree
                          height={hp(16)}
                          width={hp(55)}
                          style={{
                            marginBottom: hp(-20),
                            marginTop: hp(4),
                            marginLeft: hp(4),
                            zIndex: 1,
                          }}
                        />
                      )}
                    <FastImage
                      source={{
                        uri: `${BACKEND_URL}${itm?.category?.cover?.url}`,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      style={{
                        height: hp(130),
                        width: hp(95),
                        borderRadius: hp(6),
                      }}
                    />
                    <Text
                      style={{
                        fontSize: moderateScale(9),
                        fontWeight: '400',
                        marginTop: 6,
                        opacity: 0.8,
                        color: code_color.black,
                      }}>
                      {itm?.category?.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize: moderateScale(10),
                        fontWeight: '600',
                        marginTop: 6,
                        color: code_color.black,
                      }}>
                      {itm.title_en}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        {/* <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginTop: 10,
            marginLeft: 13,
          }}>
          {selectedAlphabet}
        </Text> */}
        <View style={{flexDirection: 'row', flex: 1, paddingBottom: hp(150)}}>
          <ScrollView
            onScroll={handleScroll}
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: hp(20),
              flex: 1,
            }}>
            {combinedData &&
              combinedData.map((itm: any, idx: number) => (
                <Pressable
                  onPress={() => {
                    setSelectedStory(itm);
                  }}
                  key={idx}
                  style={{
                    height: 'auto',
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: hp(13),
                    borderBottomColor: '#F0F2FF',
                    borderBottomWidth: 1,
                  }}>
                  <FastImage
                    source={{
                      uri: `${BACKEND_URL}${itm?.category?.cover?.url}`,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                      height: hp(50),
                      width: hp(36.5),
                      borderRadius: hp(5),
                      marginVertical: hp(10),
                    }}
                  />

                  <View style={{marginLeft: hp(10), justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: moderateScale(12),
                        fontWeight: '400',
                        color: code_color.black,
                        opacity: 0.5,
                        marginBottom: hp(4),
                      }}>
                      {itm?.category?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        fontWeight: '700',
                        color: code_color.black,
                      }}>
                      {itm?.title_en}
                    </Text>
                  </View>
                  {userProfile?.data?.subscription?.plan_id != 2 &&
                    userProfile?.data?.subscription?.plan_id != 3 && (
                      <LockFree
                        height={hp(16)}
                        width={hp(55)}
                        style={{
                          marginLeft: 'auto',
                          zIndex: 1,
                        }}
                      />
                    )}
                </Pressable>
              ))}
          </ScrollView>
          {/* <View
            {...panResponder.panHandlers}
            style={{

              width: sizing.getDimensionWidth(0.05),
            }}>
            {dummyFilter.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAlphabet(item)}
                style={{
                  padding: 0,
                }}>
                <Text
                  style={{
                    fontSize: 12.5,
                    textAlign: 'right',
                    marginVertical: 0,
                    paddingRight: 20,
                  }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View> */}
        </View>
      </View>

      <ModalUnlockedStory
        restart
        edit
        isVisible={showUnlockedStory}
        onClose={() => setShowUnlockedStory(false)}
        readLater={true}
        data={selectedStory}
        handleRead={async () => {
          const resp = await getStoryDetail(selectedStory?.id);
          handleSetStory(resp.data);
          const response = await addStory(selectedStory?.id);
          navigate('Main');
        }}
        handleLater={async () => {
          await addStory(`${nextStory?.id}?flag=read_later`);
          setShowUnlockedStory(false);
        }}
        handleReadOther={async (storyId: number) => {
          setShowUnlockedStory(false);
          const resp = await getStoryDetail(storyId);
          handleSetStory(resp.data);
          navigate('Main');
        }}
        type={userProfile?.data?.type}
      />
      <Loading loading={load} />
    </SafeAreaView>
  );
};

DetailCategoryScreen.propTypes = {
  activeVersion: PropTypes.any,
};

DetailCategoryScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(DetailCategoryScreen);
