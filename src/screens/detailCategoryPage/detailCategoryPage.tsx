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
  Image,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  FlatList,
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
}) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const flatListRef = useRef(null);
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModalSort, setShowModalSort] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<any>();
  const [showModalUnlock, setShowModalUnlock] = useState(false);
  const [showModalUnlockCategory, setShowModalUnlockCategory] = useState(false);
  const [showUnlockedStory, setShowUnlockedStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [items, setItems] = useState(null);
  const [selectStory, setSelectStory] = useState('');
  const [price, setPrice] = useState('');
  const [loadingAds, setLoadingAds] = useState(false);
  const uniqueAlphabets = Array.from(
    new Set(data?.data?.map(item => item.title_en[0])),
  );
  const filteredData = selectedAlphabet
    ? data?.data?.filter(item => item.title_en[0] === selectedAlphabet)
    : data?.data;

  const showWatchAds = async () => {
    const advert = await loadRewarded();
    advert.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      setShowModalUnlock(false);
      setTimeout(async () => {
        const resp = await getStoryDetail(selectedStory?.id);
        handleNextStory(resp.data);
        setShowUnlockedStory(true);
      }, 500);
    });
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
    //
    try {
      const paymentResult = await handlePayment('in_app');
      if (paymentResult.success) {
        setShowUnlockedStory(false);
        console.log('Pembayaran berhasil:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran berhasil
      } else {
        setShowUnlockedStory(false);
        console.log('Pembayaran gagal:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran gagal
      }
    } catch (error) {
      setShowUnlockedStory(false);
      console.error('Terjadi kesalahan:', error);
      // Tangani kesalahan yang mungkin terjadi
    }
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
      } catch (error) {
        setData(null);
      }
    }
    fetchData();
  };
  useEffect(() => {
    handleRestart();
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
    async function getPrice() {
      const products = await IAP.getProducts({
        skus: ['unlock_story_1_week_only'],
      });
      console.log('Products:', products);
      setPrice(products[0].localizedPrice);
    }
    getPrice();
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
      
        // Deteksi pergerakan sentuhan di sini
        // Anda dapat menggunakan gestureState untuk mendapatkan informasi lebih lanjut
        const touchX = event.nativeEvent.locationX;
        const touchY = event.nativeEvent.locationY;
        // Lakukan sesuatu dengan informasi sentuhan, misalnya memperbarui huruf terpilih
        console.log(touchX)
        handleTouchMove(touchX, touchY);
      },
    }),
  ).current;

  const handleTouchMove = (touchX, touchY) => {
    const touchedAlphabetIndex = Math.floor(touchY / 30); // Misalkan setiap huruf memiliki tinggi 30
    if (
      touchedAlphabetIndex >= 0 &&
      touchedAlphabetIndex < uniqueAlphabets.length
    ) {
      const touchedAlphabet = uniqueAlphabets[touchedAlphabetIndex];
      if (selectedAlphabet !== touchedAlphabet) {
        setSelectedAlphabet(touchedAlphabet);
      }
    }
  };
const handleNative = async () => {
  setLoading(true)
  const data = await handleNativePayment('unlock_story_1_week_only', selectedStory?.id);
  if (data) {
    
    setTimeout(async () => {
      setLoading(false)
      setShowModalUnlock(false);
    }, 100);
  } else {
   
    setLoading(false)
    setShowModalUnlock(false);
   
  }
  
}

  return (
    <SafeAreaView style={{backgroundColor: bgTheme}}>
      <ModalSorting
        isVisible={showModalSort}
        onClose={() => setShowModalSort(false)}
        items={(value: any) => setItems(value)}
      />
      <ModalUnlockStory
        isLoading={loading}
        isVisible={showModalUnlock}
        onClose={() => setShowModalUnlock(false)}
        data={nextStory}
        onWatchAds={showWatchAds}
        onUnlock={() => {
          handleNative()
        }}
        price={price}
        onGetUnlimit={() => handleUnlimited()}
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
            marginHorizontal: 10,
          }}>
          <Pressable
            onPress={() => goBack()}
            style={{
              width: 35,
              height: 35,
              backgroundColor: code_color.white,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(180deg)',
            }}>
            <BackRight fill={bgTheme} />
          </Pressable>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              flex: 1,
              borderRadius: 20,
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
              height: 40,
            }}>
            <SearchSvg />
            <TextInput
              placeholder="Search"
              allowFontScaling={false}
              value={keyword}
              onChangeText={value => setKeyword(value)}
              placeholderTextColor={code_color.black}
              style={{marginLeft: 10, fontSize: 14, color: code_color.black}}
            />
          </View>
          <Pressable onPress={() => setShowModalSort(true)}>
            <DescendingSvg fill={code_color.white} />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          backgroundColor: backgroundColor,
          height: '100%',
        }}>
        {data?.category?.name && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginVertical: 10,
              marginLeft: 13,
            }}>
            Category: {data?.category?.name}
          </Text>
        )}
        <View>
          {data?.most_share?.length > 0 && (
            <View
              style={{
                backgroundColor: '#F0F2FF',
                marginTop: 11,
                marginHorizontal: 13,
                minWidth: Dimensions.get('screen').width - 26,
                borderRadius: 8,
                padding: 16,
              }}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
                🔥 Most liked Stories in this Category
              </Text>
              <ScrollView horizontal style={{flex: 0}}>
                {data?.most_share.map((itm: any, idx: number) => (
                  <Pressable
                    onPress={() => {
                      if (userProfile?.data?.subscription?.plan_id === 1) {
                        handleFree();
                        setSelectedStory(itm);
                      } else {
                        setSelectedStory(itm);
                        handlePremium();
                      }
                    }}
                    style={{
                      width: 95,
                      marginRight: idx + 1 === data?.most_read?.length ? 0 : 16,
                    }}
                    key={idx}>
                    {userProfile?.data?.subscription?.plan_id != 2 &&
                      userProfile?.data?.subscription?.plan_id != 3 && (
                        <LockFree
                          height={16}
                          width={55}
                          style={{
                            marginBottom: -20,
                            marginTop: 4,
                            marginLeft: 4,
                            zIndex: 1,
                          }}
                        />
                      )}
                    <Image
                      source={{
                        uri: `${BACKEND_URL}${itm?.category?.cover?.url}`,
                      }}
                      resizeMode="cover"
                      style={{height: 130, width: 95, borderRadius: 6}}
                    />
                    <Text
                      style={{
                        fontSize: 9,
                        fontWeight: '400',
                        marginTop: 6,
                        opacity: 0.8,
                      }}>
                      {itm.category.name}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                      {itm.title_en}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginVertical: 10,
            marginLeft: 13,
          }}>
          {selectedAlphabet}
        </Text>
        <View style={{flexDirection: 'row', flex: 1, paddingBottom: 150}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: 20, marginRight: 20, flex: 0}}>
            {filteredData &&
              filteredData.map((itm: any, idx: number) => (
                <Pressable
                  onPress={() => {
                    setSelectedStory({...itm});
                    if (userProfile?.data?.subscription?.plan_id === 1) {
                      handleFree();
                    } else {  
                      handlePremium();
                    }
                  }}
                  key={idx}
                  style={{
                    height: 'auto',
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 13,
                    borderBottomColor: '#F0F2FF',
                    borderBottomWidth: 1,
                  }}>
                  <Image
                    source={{
                      uri: `${BACKEND_URL}${itm?.category?.cover?.url}`,
                    }}
                    resizeMode="cover"
                    style={{
                      height: 50,
                      width: 36.5,
                      borderRadius: 5,
                      marginVertical: 10,
                    }}
                  />
                  <View style={{marginLeft: 10, justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: code_color.black,
                        opacity: 0.5,
                        marginBottom: 4,
                      }}>
                      {itm.category.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: code_color.black,
                      }}>
                      {itm.title_en}
                    </Text>
                  </View>
                  {userProfile?.data?.subscription?.plan_id != 2 &&
                    userProfile?.data?.subscription?.plan_id != 3 && (
                      <LockFree
                        height={16}
                        width={55}
                        style={{
                          marginLeft: 'auto',
                          zIndex: 1,
                        }}
                      />
                    )}
                </Pressable>
              ))}
          </ScrollView>
          <View
            {...panResponder.panHandlers}
            style={{width: 30, marginRight: 20, flex: 1}}>
            {uniqueAlphabets.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAlphabet(item)}
                style={{
                  padding: 0,
                }}>
                <Text style={{fontSize: 14, textAlign: 'right', marginVertical: 0}}>{item}</Text>
              </Pressable>
            ))}
          </View>
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
          navigate('Main');
        }}
      />
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
