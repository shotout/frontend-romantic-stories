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
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import {code_color} from '../../utils/colors';
import DownChevron from '../../assets/icons/downChevron';
import UpChevron from '../../assets/icons/upChevron';
import Slider from '@react-native-community/slider';
import {ScrollView} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import ChecklistSvg from './../../assets/icons/checklist';
import Lock from './../../assets/icons/lock';
import Watch from './../../assets/icons/watch';
import UnlockBgIcon from './../../assets/icons/unlockBg';
import UnlockFontIcon from './../../assets/icons/unlockFont';
import UnlockThemeIcon from './../../assets/icons/unlockTheme';
import {fontList} from '../../utils/constants';
import ModalUnlockPremium from '../../components/modal-unlock-premium';
import {
  AdEventType,
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import {
  getRewardedBgColorID,
  getRewardedImageID,
  getRewardedColorThemeID,
  getRewardedFontThemeID,
  getRewardedInsterstialStoryID,
} from '../../shared/adsId';
import {
  loadInterstialAds,
  loadRewarded,
  loadRewardedColorBg,
  loadRewardedColorTheme,
  loadRewardedFont,
} from '../../helpers/loadReward';
import LoadingFullScreen from '../../components/loading-fullscreen';
import { wp } from '../../utils/screen';
const adUnitId = getRewardedFontThemeID();
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const interstialAds = InterstitialAd.createForAdRequest(
  getRewardedInsterstialStoryID(),
  {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  },
);
const FontScreen = ({
  userProfile,
  handleSetBackground,
  handleSetFontSize,
  handleSetColorTheme,
  colorTheme,
  fontSize,
  backgroundColor,
  handleSetFontFamily,
  isPremium,
  fontFamily,
  handleSetColor,
}) => {
  const [show, setShow] = useState(false);
  const [loadingAds, setLoadingAds] = useState(false);
  const [fontSelect, setSelectFont] = useState({
    name: fontFamily,
    value: `${fontFamily}`,
  });
  const [nextFont, setNextFont] = useState({
    name: '',
    value: '',
  });
  const [colorsBg, setColorsBg] = useState([
    {
      code: '#3F58DD',
    },
    {
      code: '#2C8272',
    },
    {
      code: '#942AA7',
    },
    {
      code: '#0D648B',
    },
    {
      code: '#604A9E',
    },
  ]);

  const [bg_color, set_bgColor] = useState(backgroundColor);
  const [fontSizeDefault, setFontSize] = useState(fontSize);
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [selectedBgTheme, setSelectedBgTheme] = useState({code: colorTheme});
  const [modalUnlockBg, setModalUnlockBg] = useState(false);
  const [modalUnlockFont, setModalUnlockFont] = useState(false);
  const [modalUnlockTheme, setModalUnlockTheme] = useState(false);
  const [isFinishAds, setIsFinishAds] = useState(false);

  const setBg = value => {
    set_bgColor(value);
    handleSetBackground(value);
    handleSetColor(
      value === code_color.white ? code_color.blackDark : code_color.white,
    );
  };

  const handleFont = value => {
    if (value === 0) {
      setFontSize(Number(fontSizeDefault) - 2);
      handleSetFontSize(Number(fontSizeDefault) - 2);
    } else if (value === 1) {
      // setFontSize(12);
      // handleSetFontSize(12);
      setFontSize(16);
      handleSetFontSize(16);
    } else {
      setFontSize(Number(fontSizeDefault) + 2);
      handleSetFontSize(Number(fontSizeDefault) + 2);
    }
    // setFontSize(fontSizeDefault)
  };

  const handleBgThemeColor = (code: string | null) => {
    setBgTheme(code ? code : selectedBgTheme.code);
    handleSetColorTheme(code ? code : selectedBgTheme.code);
  };
  const showInterStialFont = async () => {
    setLoadingAds(true);
    const advert = await loadRewardedFont();
    const pageCountDownReward = advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('Earn page countdown reward:', reward);
        if (reward) {
          Alert.alert('Congrats! You have unlocked the selected Font.', '', [
            {
              text: 'OK',
              onPress: () => {
                setSelectFont(nextFont);
                handleSetFontFamily(nextFont.value);
                setModalUnlockFont(false);
              },
            },
          ]);
        }
        setLoadingAds(false);
      },
    );
  };

  const showIntersialBg = async () => {
    setLoadingAds(true);
    const advert = await loadRewardedColorBg();
    const pageCountDownReward = advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('Earn page countdown reward:', reward);
        if (reward) {
          Alert.alert(
            'Congrats! You have unlocked the selected Background.',
            '',
            [
              {
                text: 'OK',
                onPress: async () => {
                  setBg(
                    bg_color === code_color.blackDark
                      ? code_color.white
                      : code_color.blackDark,
                  );
                  setModalUnlockBg(false);
                },
              },
            ],
          );
        }
        setLoadingAds(false);
      },
    );
  };

  const showIntersialTheme = async () => {
    setLoadingAds(true);
    const advert = await loadRewardedColorTheme();
    const pageCountDownReward = advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('Earn page countdown reward:', reward);
        if (reward) {
          Alert.alert('Congrats! You have unlocked the selected Theme.', '', [
            {
              text: 'OK',
              onPress: () => {
                handleBgThemeColor(selectedBgTheme.code);
                setModalUnlockTheme(false);
              },
            },
          ]);
        }
        setLoadingAds(false);
      },
    );
  };
  useEffect(() => {
    // Handle interstial reward quote ads

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('LOAD ADS FROM MAIN PAGE REWARD');
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    const rewardedOpen = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('LOAD ADS MODAL COUNTDOWN');
      },
    );
    const rewardedClose = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        // setTimeout(() => {
        //   AsyncStorage.removeItem('interstial')
        //  }, 1000);

        console.log('LOAD ADS MODAL COUNTDOWN');
      },
    );
    const interstialListenerAds = interstialAds.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        // Do not allow AppOpenAd to show right after InterstitialAd is closed.
        // We can depend on this as it's called soon enough before AppState event fires.
        interstialAds.load();
      },
    );

    interstialAds.load();
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      rewardedOpen();
      rewardedClose();
      interstialListenerAds();
    };
  }, []);
  return (
    <View style={{flex: 0, height: wp(375), backgroundColor: bgTheme}}>
      <ModalUnlockPremium
        isVisible={modalUnlockBg}
        onClose={() => setModalUnlockBg(false)}
        title={'Unlock this Background\r for Free now'}
        desc={
          'Watch a Video to unlock this Background for Free or go UNLIMITED to unlock everything!'
        }
        Icon={() => <UnlockBgIcon style={{marginBottom: 20}} width={'50%'} />}
        isLoadingAds={loadingAds}
        onSuccess={showIntersialBg}
      />
      <ModalUnlockPremium
        isVisible={modalUnlockFont}
        onClose={() => {
          setModalUnlockFont(false);
        }}
        title={'Unlock this Font\r\nfor Free now'}
        desc={
          'Watch a Video to unlock this new Font for Free or go UNLIMITED to unlock everything!'
        }
        Icon={() => (
          <UnlockFontIcon
            style={{marginBottom: 20}}
            width={'50%'}
            fontBefore={fontSelect.value}
            fontAfter={nextFont.value}
          />
        )}
        isLoadingAds={loadingAds}
        onSuccess={async () => showInterStialFont()}
      />
      <ModalUnlockPremium
        isVisible={modalUnlockTheme}
        onClose={() => {
          setModalUnlockTheme(false);
        }}
        title={'Unlock this Theme\r\nfor Free now'}
        desc={
          'Watch a Video to unlock this new Theme for Free or go UNLIMITED to unlock everything!'
        }
        Icon={() => (
          <UnlockThemeIcon style={{marginBottom: 20}} width={'50%'} />
        )}
        isLoadingAds={loadingAds}
        onSuccess={() => showIntersialTheme()}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text allowFontScaling={false} style={{color: code_color.white}}>
            BACKGROUND
          </Text>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Pressable
              onPress={() => {
                if (userProfile?.data?.subscription?.plan?.id === 1 &&  bg_color != code_color.white) {
                  setModalUnlockBg(true);
                } else {
                  setBg(code_color.white);
                }
              }}
              style={{
                borderColor:
                  bg_color === code_color.white ? code_color.yellow : undefined,
                borderWidth: bg_color === code_color.white ? 3 : 0,
                borderRadius: 40,
                padding: 3,
                marginRight: 10,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: code_color.white,
                  borderRadius: 30,
                }}
              />
              {userProfile?.data?.subscription?.plan?.id === 1 &&
              bg_color !== code_color.white ? (
                <>
                  <View
                    style={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      backgroundColor: code_color.black,
                      height: 18,
                      width: 18,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Lock width={9} />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      backgroundColor: code_color.pink,
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                      alignSelf: 'center',
                    }}>
                    <Watch fill={code_color.white} height={12} width={12} />
                    <Text
                      style={{
                        color: code_color.white,
                        fontSize: 8,
                        fontWeight: '700',
                        marginLeft: 2,
                      }}>
                      Free
                    </Text>
                  </View>
                </>
              ) : null}
            </Pressable>

            <Pressable
              onPress={() => {
                if (userProfile?.data?.subscription?.plan?.id === 1 &&  bg_color != code_color.blackDark) {
                  setModalUnlockBg(true);
                } else {
                  setBg(code_color.blackDark);
                }
              }}
              style={{
                borderColor:
                  bg_color === code_color.blackDark
                    ? code_color.yellow
                    : undefined,
                borderWidth: bg_color === code_color.blackDark ? 3 : 0,
                borderRadius: 40,
                padding: 3,
                marginLeft: 10,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: code_color.blackDark,
                  borderRadius: 30,
                }}
              />
              {userProfile?.data?.subscription?.plan?.id === 1 &&
              bg_color !== code_color.blackDark ? (
                <>
                  <View
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: code_color.black,
                      height: 18,
                      width: 18,
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Lock width={9} />
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      backgroundColor: code_color.pink,
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                      alignSelf: 'center',
                    }}>
                    <Watch fill={code_color.white} height={12} width={12} />
                    <Text
                      style={{
                        color: code_color.white,
                        fontSize: 8,
                        fontWeight: '700',
                        marginLeft: 2,
                      }}>
                      Free
                    </Text>
                  </View>
                </>
              ) : null}
            </Pressable>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: code_color.grey,
            height: 50,
            marginHorizontal: 10,
          }}
        />
        <View style={{flex: 1}}>
          <Text allowFontScaling={false} style={{color: code_color.white}}>
            TEXT SIZE
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text
              allowFontScaling={false}
              style={{flex: 1, color: code_color.white}}>
              A-
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                flex: 1,
                textAlign: 'right',
                color: code_color.white,
                fontSize: 18,
              }}>
              A+
            </Text>
          </View>
          <Slider
            step={1}
            // style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={2}
            value={
              Number(fontSizeDefault) === 16
                ? 1
                : Number(fontSizeDefault) === 14
                ? 0
                : 2
            }
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            onValueChange={value => handleFont(value)}
            thumbTintColor="#ffd500"
          />
        </View>
      </View>
      <View
        style={{borderColor: 'white', borderWidth: 0.5, marginVertical: 10}}
      />
      <View style={{flex: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}>
          <Text
            allowFontScaling={false}
            style={{flex: 1, color: code_color.white, textAlign: 'left'}}>
            CHANGE FONT
          </Text>
          <Text allowFontScaling={false} style={{color: code_color.white}}>
            {fontSelect.name}
          </Text>
          <Pressable
            onPress={() => setShow(!show)}
            style={{
              backgroundColor: code_color.white,
              padding: 5,
              borderRadius: 20,
              width: 25,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            {show ? (
              <DownChevron color={bgTheme} />
            ) : (
              <UpChevron color={bgTheme} />
            )}
          </Pressable>
        </View>
        {!show ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {fontList.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setNextFont(item);
                  if (userProfile?.data?.subscription?.plan?.id != 1 && fontSelect.name === item.name) {
                    handleSetFontFamily(item.value);
                  } else  if(userProfile?.data?.subscription?.plan?.id === 1 && fontSelect.name === item.name){
                    
                  }else{
                    setModalUnlockFont(true);
                  }
                }}
                style={{
                  backgroundColor:
                    fontSelect.name === item.name
                      ? code_color.white
                      : undefined,
                  borderColor: code_color.white,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  margin: 10,
                  height: 40,
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 0,
                    fontFamily: item.value,
                    color:
                      fontSelect.name === item.name
                        ? code_color.blackDark
                        : 'white',
                  }}>
                  {item.name}
                </Text>
                {userProfile?.data?.subscription?.plan?.id === 1 &&
                fontSelect.name !== item.name ? (
                  <>
                    <View
                      style={{
                        position: 'absolute',
                        top: -2,
                        left: -1,
                        backgroundColor: code_color.black,
                        height: 18,
                        width: 18,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Lock width={9} />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: -6,
                        right: -8,
                        backgroundColor: code_color.pink,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                      }}>
                      <Watch fill={code_color.white} height={12} width={12} />
                      <Text
                        style={{
                          color: code_color.white,
                          fontSize: 8,
                          fontWeight: '700',
                          marginLeft: 2,
                        }}>
                        Free
                      </Text>
                    </View>
                  </>
                ) : null}
              </Pressable>
            ))}
          </ScrollView>
        ) : null}
      </View>

      <View
        style={{borderColor: 'white', borderWidth: 0.5, marginVertical: 10}}
      />
      <View style={{flex: 1, marginHorizontal: 20}}>
        <Text
          allowFontScaling={false}
          style={{color: code_color.white, textAlign: 'left'}}>
          CHANGE THEME COLOR
        </Text>
        <View
          style={{
            backgroundColor: code_color.white,
            flexDirection: 'row',
            flex: 0,
            marginTop: 10,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          {colorsBg.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedBgTheme(item);
                  if (userProfile?.data?.subscription?.plan?.id != 1) {
                    handleBgThemeColor(item.code);
                  } else {
                    setModalUnlockTheme(true);
                  }
                }}
                key={i}
                style={{
                  backgroundColor: item.code,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: code_color.grey,
                  marginHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {bgTheme === item.code ? <ChecklistSvg /> : null}
                {userProfile?.data?.subscription?.plan?.id === 1 &&
                bgTheme !== item.code ? (
                  <>
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: code_color.black,
                        height: 15,
                        width: 15,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Lock width={8} />
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        backgroundColor: code_color.pink,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                      }}>
                      <Watch fill={code_color.white} height={12} width={12} />
                      <Text
                        style={{
                          color: code_color.white,
                          fontSize: 8,
                          fontWeight: '700',
                          marginLeft: 2,
                        }}>
                        Free
                      </Text>
                    </View>
                  </>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {/* <LoadingFullScreen isLoading={isLoadingInterstial} /> */}
    </View>
  );
};

const styles = StyleSheet.create({});
FontScreen.propTypes = {
  activeVersion: PropTypes.any,
};

FontScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(FontScreen);
