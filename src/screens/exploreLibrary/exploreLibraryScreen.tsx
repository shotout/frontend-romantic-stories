/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import {imgStep4_2} from '../../assets/images';
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
import AnimatedLottieView from 'lottie-react-native';
import {moderateScale} from 'react-native-size-matters';
import {
  getExploreStory,
  getStoryDetail,
  updateProfile,
} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import {handleSetSteps} from '../../store/defaultState/actions';
import i18n from '../../i18n';
import Button from '../../components/buttons/Button';
import StepHeader from '../../layout/step/stepHeader';
import {Step4_2} from '../../layout/tutorial';
import ModalSorting from '../../components/modal-sorting';
import ModalUnlockStory from '../../components/modal-unlock-story';
import ModalUnlockedStory from '../../components/modal-story-unlock';
import {loadRewarded, loadRewardedCategory} from '../../helpers/loadReward';
import {AdEventType, RewardedAdEventType} from 'react-native-google-mobile-ads';
import {handleNativePayment, handlePayment} from '../../helpers/paywall';
import {reloadUserProfile} from '../../utils/user';
import ChecklistSvg from './../../assets/icons/checklist';
import * as IAP from 'react-native-iap';
import ModalUnlockPremium from '../../components/modal-unlock-premium';
import UnlockCategoryIcon from '../../assets/icons/unlockCategory';
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const ExploreLibraryScreen = ({
  colorTheme,
  categories,
  isPremium,
  handleSetSteps,
  handleSetStory,
  handleNextStory,
  stepsTutorial,
  backgroundColor,
  userProfile,
}) => {
  const [loading, setLoading] = useState(false);
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModalSort, setShowModalSort] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<any>();
  const [showModalUnlock, setShowModalUnlock] = useState(false);
  const [showModalUnlockCategory, setShowModalUnlockCategory] = useState(false);
  const [showUnlockedStory, setShowUnlockedStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [items, setItems] = useState(null);
  const [selectStory, setSelectStory] = useState('');
  const [price, setPrice] = useState('');
  const [loadingAds, setLoadingAds] = useState(false);

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
        const res = await getExploreStory(params);
        setData(res);
      } catch (error) {
        setData(null);
      }
    }
    fetchData();
  };
  useEffect(() => {
    handleRestart();
  }, [keyword, items]);

  // const handleTouchStart = e => {
  //   // Mendapatkan posisi sentuhan
  //   const touchX = e.nativeEvent.locationX;
  //   // Menghitung setengah lebar layar
  //   const halfScreenWidth = Dimensions.get('window').width / 2;
  //   // Jika sentuhan terjadi di sebelah kiri, set isSwipingLeft ke true
  //   if (touchX < halfScreenWidth) {
  //     console.log('masuk kiri');
  //     handleSetSteps(3);
  //     goBack();
  //     setIsSwipingLeft(true);
  //   }
  //   // Jika sentuhan terjadi di sebelah kanan, set isSwipingRight ke true
  //   else {
  //     handleSetSteps(4 + 1);
  //     navigate('Main');
  //     setIsSwipingRight(true);
  //   }
  // };
  const handleTouchEnd = () => {
    // Reset status swipe saat sentuhan selesai
    setIsSwipingLeft(false);
    setIsSwipingRight(false);
  };
  useEffect(() => {
    handleRestart();
  }, [items]);
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
  const renderProgress = () => <StepHeader currentStep={6} />;
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
              onPress: async () => fetchUpdate(nextCategory),
            },
          ]);
        }
        setLoadingAds(false);
      },
    );
  };
  const handleNative = async() => {
    setLoading(true)
    const data  = await handleNativePayment('unlock_story_1_week_only', selectedStory?.id);
    if(data){
      setLoading(false)
      setShowModalUnlock(false);
    }else{
      setLoading(false)
      setShowModalUnlock(false);
    }
  }
  
  const handleTouchStart = e => {
    // Mendapatkan posisi sentuhan
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const screenWidth = Dimensions.get('window').width / 2.5;
    if (touchX < screenWidth) {
      handleSetSteps(4 - 1);
      navigate('Library');
    } else {
      handleSetSteps(4 + 1);
      navigate('Main');
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
  const renderTutorial = () => {
    if (stepsTutorial === 4) {
      return (
        <SafeAreaView
          onTouchStart={handleTouchStart}
          // onTouchEnd={handleTouchEnd}
          pointerEvents="box-only"
          style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            top: 30,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          {renderProgress()}
          <Step4_2
            handleNext={() => {
              handleSetSteps(4 + 1);
              navigate('Main');
            }}
            handlePrev={() => {
              handleSetSteps(4 - 1);
              navigate('Library');
            }}
          />
        </SafeAreaView>
      );
    }
  };
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
        data={selectedStory}
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
            onPress={() => navigate('Library')}
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
      <ScrollView
        style={{
          backgroundColor: backgroundColor,
          height: '100%',
        }}>
        {data?.most_read?.length > 0 && (
          <View style={{flex: 0, height: 'auto'}}>
            <View
              style={{
                backgroundColor: '#F0F2FF',
                marginTop: 11,
                marginHorizontal: 13,
                // height: 250,
                minWidth: Dimensions.get('screen').width - 26,
                borderRadius: 8,
                padding: 16,
              }}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
                🔥 Most Read
              </Text>
              <ScrollView horizontal>
                {data?.most_read.map((itm: any, idx: number) => (
                  <Pressable
                    onPress={() => {
                      if (userProfile?.data?.subscription?.plan_id === 1) {
                        setShowModalUnlock(true);
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
          </View>
        )}

        {data?.category?.length > 0 && (
          <View style={{flex: 0, height: 250}}>
            <View
              style={{
                backgroundColor: '#F0F2FF',
                marginTop: 13,
                marginHorizontal: 13,
                height: 230,
                minWidth: Dimensions.get('screen').width - 26,
                borderRadius: 8,
                padding: 16,
              }}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
                📚 Try different story category
              </Text>
              <ScrollView horizontal>
                {data?.category.map((itm: any, idx: number) => (
                  <Pressable
                    onPress={() =>
                      navigate('CategoryDetail', {categoryId: itm.id})
                    }
                    style={{
                      width: 95,
                      marginRight: idx + 1 === data?.category?.length ? 0 : 16,
                    }}
                    key={idx}>
                    {/* <View
                      style={{
                        height: 18,
                        width: 18,
                        backgroundColor:
                          itm.id === selectStory
                            ? code_color.blueDark
                            : code_color.white,
                        borderRadius: 15,
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        zIndex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {itm.id === selectStory ? (
                        <ChecklistSvg width={10} />
                      ) : null}
                    </View> */}
                    {/* { userProfile?.data?.subscription?.plan_id != 2 && userProfile?.data?.subscription?.plan_id != 3  && (
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
                    )} */}
                    <Image
                      source={{uri: `${BACKEND_URL}${itm?.image?.url}`}}
                      resizeMode="cover"
                      style={{height: 130, width: 95, borderRadius: 6}}
                    />
                    <Text
                      style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                      {itm.name}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {data?.most_share?.length > 0 && (
          <View style={{flex: 0, height: 270, marginBottom: 50}}>
            <View
              style={{
                backgroundColor: '#F0F2FF',
                marginTop: 11,
                marginHorizontal: 13,
                height: 250,
                minWidth: Dimensions.get('screen').width - 26,
                borderRadius: 8,
                padding: 16,
              }}>
              <Text style={{fontSize: 16, fontWeight: '600', marginBottom: 16}}>
                ❤️ You might also like
              </Text>
              <ScrollView horizontal>
                {data.most_share.map((itm: any, idx: number) => (
                  <Pressable
                    onPress={() => {
                      if (userProfile?.data?.subscription?.plan_id === 1) {
                        setShowModalUnlock(true);
                        setSelectedStory(itm);
                      } else {
                        setSelectedStory(itm);
                        handlePremium();
                      }
                    }}
                    style={{
                      width: 95,
                      marginRight:
                        idx + 1 === data?.most_share?.length ? 0 : 16,
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
                      {itm?.category?.name}
                    </Text>
                    <Text
                      style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                      {itm.title_en}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        )}
        {/* <View
          style={{
            height: moderateScale(100),
            width: moderateScale(100),
            backgroundColor: bgTheme,
            alignSelf: 'center',
            marginBottom: 100,
            borderRadius: moderateScale(8),
          }}>
          <AnimatedLottieView
            source={swipeupIcon}
            // style={styles.animationStyle}
            autoPlay
            // ref={firstStepTutorial}
            duration={3000}
            loop={true}
          />
        </View> */}
      </ScrollView>
      {renderTutorial()}
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

const styles = StyleSheet.create({});

ExploreLibraryScreen.propTypes = {
  activeVersion: PropTypes.any,
};

ExploreLibraryScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(ExploreLibraryScreen);
