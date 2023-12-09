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
import {getExploreStory} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import {handleSetSteps} from '../../store/defaultState/actions';
import i18n from '../../i18n';
import Button from '../../components/buttons/Button';
import StepHeader from '../../layout/step/stepHeader';
import {Step4_2} from '../../layout/tutorial';
import ModalSorting from '../../components/modal-sorting';
import ModalUnlockStory from '../../components/modal-unlock-story';
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const ExploreLibraryScreen = ({
  colorTheme,
  categories,
  isPremium,
  handleSetSteps,
  stepsTutorial,
  backgroundColor,
  userProfile
}) => {
  console.log(JSON.stringify(userProfile))
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModalSort, setShowModalSort] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState<any>();
  const [showModalUnlock, setShowModalUnlock] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [items, setItems] = useState(null);

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

  const handleTouchStart = e => {
    // Mendapatkan posisi sentuhan
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const halfScreenWidth = Dimensions.get('window').width / 2;
    // Jika sentuhan terjadi di sebelah kiri, set isSwipingLeft ke true
    if (touchX < halfScreenWidth) {
      console.log('masuk kiri');
      handleSetSteps(3);
      goBack();
      setIsSwipingLeft(true);
    }
    // Jika sentuhan terjadi di sebelah kanan, set isSwipingRight ke true
    else {
      handleSetSteps(4 + 1);
      navigate('Main');
      setIsSwipingRight(true);
    }
  };
  const handleTouchEnd = () => {
    // Reset status swipe saat sentuhan selesai
    setIsSwipingLeft(false);
    setIsSwipingRight(false);
  };
  useEffect(() => {
    handleRestart();
  }, [items]);
  const renderProgress = () => <StepHeader currentStep={6} />;
  const renderTutorial = () => {
    if (stepsTutorial === 4) {
      return (
        <SafeAreaView
          // onTouchStart={handleTouchStart}
          // onTouchEnd={handleTouchEnd}
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
        isVisible={showModalUnlock}
        onClose={() => {
          setShowModalUnlock(false);
          setSelectedStory(null);
        }}
        data={selectedStory}
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
          <View style={{flex: 0, height: 270}}>
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
                🔥 Most Read
              </Text>
              <ScrollView horizontal>
                {data?.most_read.map((itm: any, idx: number) => (
                  <Pressable
                    onPress={() => {
                      if (!isPremium) {
                        setShowModalUnlock(true);
                        setSelectedStory(itm);
                      }
                    }}
                    style={{
                      width: 95,
                      marginRight: idx + 1 === data?.most_read?.length ? 0 : 16,
                    }}
                    key={idx}>
                    {itm.is_free === 0 || userProfile?.data?.subscription?.id != 2 || userProfile?.data?.subscription?.id != 3 && (
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
                marginTop: 11,
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
                  <View
                    style={{
                      width: 95,
                      marginRight: idx + 1 === data?.category?.length ? 0 : 16,
                    }}
                    key={idx}>
                    <View
                      style={{
                        height: 18,
                        width: 18,
                        backgroundColor: code_color.white,
                        borderRadius: 15,
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        zIndex: 1,
                      }}
                    />
                    { userProfile?.data?.subscription?.id != 2 && userProfile?.data?.subscription?.id != 3  && (
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
                      source={{uri: `${BACKEND_URL}${itm?.image?.url}`}}
                      resizeMode="cover"
                      style={{height: 130, width: 95, borderRadius: 6}}
                    />
                    <Text
                      style={{fontSize: 10, fontWeight: '600', marginTop: 6}}>
                      {itm.name}
                    </Text>
                  </View>
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
                      if (!isPremium) {
                        setShowModalUnlock(true);
                        setSelectedStory(itm);
                      }
                    }}
                    style={{
                      width: 95,
                      marginRight:
                        idx + 1 === data?.most_share?.length ? 0 : 16,
                    }}
                    key={idx}>
                    {userProfile?.data?.subscription?.id != 2 && userProfile?.data?.subscription?.id != 3 && (
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
