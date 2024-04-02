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
  ImageBackground,
  Linking,
} from 'react-native';
import {cover2, imgNotif, imgStep4} from '../../assets/images';
import {code_color} from '../../utils/colors';
import Close from '../../assets/icons/close.jsx';
import LockFree from '../../assets/icons/lockFree';
import DescendingSvg from '../../assets/icons/descending.jsx';
import ChecklistSvg from '../../assets/icons/checklist';
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
  getListAvatarTheme,
  updateProfile,
} from '../../shared/request';
import {reloadUserProfile} from '../../utils/user';
import BookLockIcon from '../../assets/icons/bookLock';
import {handleNativePayment, handlePayment} from '../../helpers/paywall';
import * as Progress from 'react-native-progress';
import ModalAudioUnlock from '../../components/modal-audio-unlock';
import moment from 'moment';
import ModalGetPremium from '../../components/modal-get-premium';
import * as IAP from 'react-native-iap';
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const SubscriptionsScreen = ({colorTheme, userProfile, backgroundColor}) => {
  const [showModalGetPremium, setShowModalGetPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('10/10 Audio Stories');
  const [showAudio, setShowAudio] = useState(false);
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [newStories, setNewStories] = useState(
    userProfile?.data?.notif_enable === 0 ? false : true,
  );
  const [promotions, setPromotions] = useState(
    userProfile?.data?.notif_ads_enable === 0 ? false : true,
  );

  const subscriptionStartDate = moment(userProfile?.data?.subscription.started);
  // Mendapatkan tanggal berakhir langganan (1 tahun setelah tanggal mulai)
  const subscriptionEndDate = subscriptionStartDate.add(1, 'year');

  // Mendapatkan tanggal saat ini
  const currentDate = moment();

  // Menghitung sisa hari
  const remainingDays = subscriptionEndDate.diff(currentDate, 'days');
  const [priceAudio1, setPriceAudio1] = useState('');
  const [priceAudio2, setPriceAudio2] = useState('');
  const [me, setMe] = useState(null);
  const [partner, setPartner] = useState(null);
  useEffect(() => {
    if(!__DEV__){
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
    }
   
  }, []);
  useEffect(() => {
    handleThemeAvatar();
  }, []);
  const handleThemeAvatar = async () => {
    // (angry,confused,cry,dizzy,excited,friendly,inlove,positive.scare,think)
    let params = {
      flag: 'notif',
    };
    try {
      const data = await getListAvatarTheme(params);
      if (data?.data) {
        setMe(data?.data?.me);
        setPartner(data?.data?.partner);
      }
    } catch (error) {}
  };
  const fetchUpdate = async () => {
    const payload = {
      _method: 'PATCH',
      notif_ads_enable: promotions ? 1 : 0,
      notif_enable: newStories ? 1 : 0,
    };
    await updateProfile(payload);
    reloadUserProfile();
  };

  useEffect(() => {
    if (newStories || promotions) {
      fetchUpdate();
    }
  }, [newStories, promotions]);

  useEffect(() => {
    reloadUserProfile();
  }, []);
  const openPaymentSettings = () => {
    Linking.openURL('app-settings:');
    // const packageName = 'app.erotales'; // Package name for Google Play Store

    // Linking.openURL(`market://details?id=${packageName}`)
    //   .catch(() => {
    //     // Jika Google Play Store tidak terinstall, buka di browser
    //     Linking.openURL(`https://play.google.com/store/apps/details?id=${packageName}`);
    //   });
  };

  const handleAudio = async () => {
    setTitle('50/50 Audio Stories');
    setLoading2(true);
    const data = await handleNativePayment('unlock_5_audio_stories');
    if (data) {
      setShow(false);
      setTimeout(async () => {
        setShowAudio(true);
        setLoading2(false);
      }, 100);
    } else {
      setShow(false);
      setLoading2(false);
    }
  };
  const handleAudioOne = async () => {
    setLoading(true);
    setTitle('10/10 Audio Stories');
    const data = await handleNativePayment('unlock_10_audio_stories');
    if (data) {
      setLoading(false);
      setShow(false);
      setTimeout(async () => {
        setShowAudio(true);
      }, 100);
    } else {
      setLoading(false);
      setShow(false);
    }
  };
  const handleInapp = async value => {
    //
    try {
      const paymentResult = await handlePayment(value);
      if (paymentResult.success) {
        reloadUserProfile();
        setShowModalGetPremium(true);
        console.log('Pembayaran berhasil:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran berhasil
      } else {
        console.log('Pembayaran gagal:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran gagal
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      // Tangani kesalahan yang mungkin terjadi
    }
    // setShowModalGetPremium(true);
  };

  const audioTake = userProfile?.data?.subscription?.audio_take || 0;
const audioLimit = userProfile?.data?.subscription?.audio_limit || 0;

const result = audioLimit !== 0 ? 1 - (audioTake / audioLimit) : 0;
  return (
    <SafeAreaView style={{backgroundColor: bgTheme, flex: 1}}>
      <ModalGetPremium
        isVisible={showModalGetPremium}
        onGotIt={() => {
          setShowModalGetPremium(false);
        }}
        onClose={() => setShowModalGetPremium(false)}
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
            marginVertical: 10,
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
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: code_color.white,
              }}>
              Subscription
            </Text>
          </View>
          <View
            style={{
              width: 35,
              height: 35,
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{
          backgroundColor: '#f1f1f1',
          opacity: 1,
          height: '100%',
          flex: 1,
          padding: moderateScale(20),
          paddingBottom: moderateScale(50),
        }}>
        <Text
          style={{
            fontSize: moderateScale(17),
            textAlign: 'center',
            fontWeight: 'bold',
            color: code_color.blackDark,
            marginBottom: moderateScale(15),
          }}>
          Your Current Subscription:
        </Text>

        <View
          style={{
            backgroundColor: code_color.white,
            shadowColor: code_color.grey,
            // shadowRadius: 4,
            // shadowOffset: {
            //   width: 1,
            //   height: 1,
            // },
            // shadowOpacity: 1,
            // elevation:1,
            padding: 10,
            borderRadius: 10,
            marginBottom: 30
          }}>
          <View
            style={{
              backgroundColor: code_color.blueDark,
              padding: 10,
              borderRadius: 10,
              marginHorizontal: moderateScale(40),
              // width: '70%',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: moderateScale(20),
              marginBottom: moderateScale(10),
            }}>
            <Text
              style={{
                fontSize: moderateScale(18),
                textAlign: 'center',
                fontWeight: 'bold',
                color: code_color.white,
              }}>
              {userProfile?.data?.subscription?.plan?.title}
            </Text>
          </View>
          {userProfile?.data?.subscription?.plan?.notes.map(item => (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  backgroundColor: item.check
                    ? code_color.greenDark
                    : code_color.red,
                  borderRadius: 30,
                  width: 25,
                  height: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {item.check ? (
                  <ChecklistSvg width={13} />
                ) : (
                  <Close width={13} fill={code_color.white} />
                )}
              </View>

              <View style={{marginLeft: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: moderateScale(14)}}>
                  {item?.title}
                </Text>
                <Text style={{fontSize: moderateScale(12)}}>
                  {item?.description}
                </Text>
              </View>
            </View>
          ))}
          <View
            style={{
              borderStyle: 'dashed',
              marginHorizontal: 0,
              borderWidth: 1,
              marginVertical: 10,
              borderColor: code_color.greyDefault,
            }}
          />
          {userProfile?.data?.subscription?.plan?.id != 1 ? (
            <View>
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <View style={{flex: 1, alignItems: 'flex-start'}}>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: code_color.grey,

                      textAlign: 'center',
                    }}>
                    Start
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: code_color.blueDark,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {moment(userProfile?.data?.subscription.started).format(
                      'YYYY-MM-DD',
                    )}
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: code_color.grey,

                      textAlign: 'center',
                    }}>
                    End
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(14),
                      color: code_color.blueDark,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {moment(userProfile?.data?.subscription.started)
                      .add(1, 'year')
                      .format('YYYY-MM-DD')}
                  </Text>
                </View>
              </View>
              <Progress.Bar
                progress={0.1}
                width={Dimensions.get('window').width - 60}
                color="#5873FF"
              />
              <View
                style={{flex: 1, alignItems: 'flex-end', marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    color: code_color.grey,

                    textAlign: 'center',
                  }}>
                  {remainingDays} Days
                </Text>
              </View>
            </View>
          ) : null}

          {userProfile?.data?.subscription?.plan?.id != 1 &&
          userProfile?.data?.subscription?.plan?.id != 3 ? (
            <View>
              <Pressable
                onPress={() => {
                  userProfile?.data?.subscription?.plan?.id === 1
                    ? handleInapp('in_app')
                    : userProfile?.data?.subscription?.plan?.id === 2
                    ?  handleInapp('upgrade_to_unlimited_audio_story')
                    : null;
                }}
                style={{
                  backgroundColor: '#009A37',
                  width: '100%',
                  marginTop: moderateScale(40),
                  paddingVertical: moderateScale(14),
                  borderRadius: moderateScale(6),
                }}>
                <View
                  style={{
                    position: 'absolute',
                    marginHorizontal: 'auto',
                    backgroundColor: '#FFD12F',
                    alignSelf: 'center',
                    paddingVertical: moderateScale(0),
                    paddingHorizontal: moderateScale(24),
                    borderRadius: moderateScale(10),
                    zIndex: 1,
                    top: -moderateScale(8),
                  }}>
                  <Text style={{color: code_color.black, fontWeight: 600}}>
                    {userProfile?.data?.subscription?.plan?.id === 1
                      ? 'UNLOCK EVERYTHING'
                      : 'UPGRADE YOUR PACKAGE'}
                  </Text>
                </View>

                <Text
                  style={{
                    color: code_color.white,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}>
                  {userProfile?.data?.subscription?.plan?.id === 1
                    ? 'Get EroTales UNLIMITED'
                    : userProfile?.data?.subscription?.plan?.id === 2
                    ? 'Get EroTales UNLIMITED + Audio'
                    : null}
                </Text>
              </Pressable>
              <Pressable onPress={() => handleInapp('unsubscribe_placement')}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: code_color.grey,
                    textAlign: 'center',
                    marginVertical: 20,
                  }}>
                  Cancel Plan
                </Text>
              </Pressable>
            </View>
          ) : userProfile?.data?.subscription?.plan?.id === 1 ? (
            <Pressable
              onPress={() => {
                userProfile?.data?.subscription?.plan?.id === 1
                  ? handleInapp('in_app')
                  : userProfile?.data?.subscription?.plan?.id === 2
                  ? setShow(true)
                  : null;
              }}
              style={{
                backgroundColor: '#009A37',
                width: '100%',
                marginTop: moderateScale(40),
                paddingVertical: moderateScale(14),
                borderRadius: moderateScale(6),
              }}>
              <View
                style={{
                  position: 'absolute',
                  marginHorizontal: 'auto',
                  backgroundColor: '#FFD12F',
                  alignSelf: 'center',
                  paddingVertical: moderateScale(0),
                  paddingHorizontal: moderateScale(24),
                  borderRadius: moderateScale(10),
                  zIndex: 1,
                  top: -moderateScale(8),
                }}>
                <Text style={{color: code_color.black, fontWeight: 600}}>
                  {userProfile?.data?.subscription?.plan?.id === 1
                    ? 'UNLOCK EVERYTHING'
                    : 'UPGRADE YOUR PACKAGE'}
                </Text>
              </View>
              <BookLockIcon
                style={{position: 'absolute', top: '70%', left: '12%'}}
              />
              <Text
                style={{
                  color: code_color.white,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {userProfile?.data?.subscription?.plan?.id === 1
                  ? 'Get EroTales UNLIMITED'
                  : userProfile?.data?.subscription?.plan?.id === 2
                  ? 'Get EroTales UNLIMITED + Audio'
                  : null}
              </Text>
            </Pressable>
          ) : null}
        </View>
        <View>
          {userProfile?.data?.subscription?.is_audio != 0 && userProfile?.data?.subscription?.plan?.id != 3 ? (
            <View style={{paddingBottom: 50}}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginVertical: 20,
                }}>
                Audio Stories:
              </Text>
              <Pressable
                onPress={() => {
                  handleInapp('inapp_paywall_a');
                }}
                style={{
                  backgroundColor: '#D8DEFD',
                  width: '100%',
                  marginTop: moderateScale(10),
                  paddingVertical: moderateScale(14),
                  borderRadius: moderateScale(10),
                }}>
                <View
                  style={{
                    position: 'absolute',
                    marginHorizontal: 'auto',
                    backgroundColor: code_color.blueDark,
                    alignSelf: 'center',
                    paddingVertical: moderateScale(5),
                    paddingHorizontal: moderateScale(24),
                    borderRadius: moderateScale(15),
                    zIndex: 1,
                    top: -moderateScale(8),
                  }}>
                  <Text style={{color: code_color.white, fontWeight: 600}}>
                    Package: {userProfile?.data?.subscription?.audio_limit}{' '}
                    Audio Stories
                  </Text>
                </View>

                <View
                  style={{flexDirection: 'row', marginLeft: 10, marginTop: 5}}>
                  <Progress.Circle
                    size={60}
                    thickness={5}
                    borderWidth={2}
                    progress={
                      result
                    }
                    showsText
                    formatText={() =>
                      `${Math.round(
                        ((userProfile?.data?.subscription?.audio_limit -
                          userProfile?.data?.subscription?.audio_take) *
                          100) /
                          100,
                      )} / ${Math.round(
                        (userProfile?.data?.subscription?.audio_limit * 100) /
                          100,
                      )}`
                    }
                    color="#5873FF"
                    textStyle={{fontSize: 12, fontWeight: 'bold'}}
                  />

                  <View>
                    <Text
                      style={{
                        color: '#5873FF',
                        textAlign: 'left',
                        fontWeight: 'bold',
                        marginLeft: 20,
                        marginTop: 5,
                      }}>
                      {userProfile?.data?.subscription?.audio_limit -
                        userProfile?.data?.subscription?.audio_take}{' '}
                      Audio Stories remaining
                    </Text>
                    <Text
                      style={{
                        color: code_color.blackDark,
                        marginVertical: 5,
                        marginLeft: 20,
                        width: 250,
                        textAlign: 'left',
                      }}>
                      {`You can still listen to ${
                        userProfile?.data?.subscription?.audio_limit -
                        userProfile?.data?.subscription?.audio_take
                      }/${
                        userProfile?.data?.subscription?.audio_limit
                      } Audio \nStories in your package.`} {userProfile?.data?.subscription?.plan?.id === 2 ? <Text onPress={() => {setShow(true)}} style={{ textDecorationLine: 'underline',  color: '#5873FF', }}>Get more</Text> : null }
                    </Text>
                  </View>
                </View>

                {/* <BookLockIcon
                    style={{position: 'absolute', top: '70%', left: '12%'}}
                  /> */}
              </Pressable>
            </View>
          ) : null}
          {userProfile?.data?.subscription?.plan?.id === 3  ? (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: moderateScale(10),
                  alignItems: 'center',
                  marginVertical: moderateScale(20),
                  opacity: 0.2,
                }}>
                <View
                  style={{
                    backgroundColor: code_color.black,
                    flex: 1,
                    height: 1,
                  }}
                />
                <Text style={{marginHorizontal: moderateScale(8)}}>
                  INACTIVE PACKAGE
                </Text>
                <View
                  style={{
                    backgroundColor: code_color.black,
                    flex: 1,
                    height: 1,
                  }}
                />
              </View>
              <Text
                style={{
                  marginHorizontal: moderateScale(8),
                  textAlign: 'center',
                }}>
                {' '}
                You can still use the remaining Stories after your Subscription
                expired
              </Text>
              <View style={{marginBottom: 20}}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginVertical: 20,
                    color: '#505962',
                  }}>
                  Audio Stories:
                </Text>
                <Pressable
                  onPress={() => {
                    handleInapp('inapp_paywall_a');
                  }}
                  style={{
                    backgroundColor: '#DDDEE3',
                    width: '100%',
                    marginTop: moderateScale(10),
                    paddingVertical: moderateScale(14),
                    borderRadius: moderateScale(6),
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      marginHorizontal: 'auto',
                      backgroundColor: '#93989F',
                      alignSelf: 'center',
                      paddingVertical: moderateScale(0),
                      paddingHorizontal: moderateScale(24),
                      borderRadius: moderateScale(10),
                      zIndex: 1,
                      top: -moderateScale(8),
                    }}>
                    <Text style={{color: code_color.white, fontWeight: 600}}>
                      Package: {userProfile?.data?.subscription?.audio_limit}{' '}
                      Audio Stories
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 10,
                      marginTop: 5,
                    }}>
                    <Progress.Circle
                      size={60}
                      thickness={5}
                      borderWidth={2}
                      progress={
                        result
                      }
                      showsText
                      formatText={() =>
                        `${Math.round(
                          ((userProfile?.data?.subscription?.audio_limit -
                            userProfile?.data?.subscription?.audio_take) *
                            100) /
                            100,
                        )} / ${Math.round(
                          (userProfile?.data?.subscription?.audio_limit * 100) /
                            100,
                        )}`
                      }
                      borderColor="#93989F"
                      // progress={userProfile?.data?.subscription?.audio_take}
                      color="#93989F"
                      textStyle={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#93989F',
                      }}
                    />

                    <View style={{flex: 1, alignItems: 'center'}}>
                      <Text
                        style={{
                          color: '#93989F',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}>
                        {userProfile?.data?.subscription?.audio_limit -
                          userProfile?.data?.subscription?.audio_take}{' '}
                        Audio Stories remaining
                      </Text>
                      <Text
                        style={{
                          color: '#93989F',
                          // marginVertical: 5,
                          // marginLeft: 20,
                          flex: 1,
                          width: 200,
                          alignItems: 'center',
                          textAlign: 'center',
                        }}>
                        You can still listen to{' '}
                        {userProfile?.data?.subscription?.audio_limit -
                          userProfile?.data?.subscription?.audio_take}
                        /{userProfile?.data?.subscription?.audio_limit} Audio
                        Stories in your package.<Text onPress={() => {}} style={{ textDecorationLine: 'underline', }}>Get more</Text>
                      </Text>
                    </View>
                  </View>

                  {/* <BookLockIcon
                    style={{position: 'absolute', top: '70%', left: '12%'}}
                  /> */}
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <ModalAudioUnlock
        isLoading={loading}
        isLoading2={loading2}
        isVisible={show}
        onClose={() => setShow(false)}
        onGetAudio={() => handleAudio()}
        onGetAudio1={() => handleAudioOne()}
        price={priceAudio1}
        price2={priceAudio2}
        subs={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

SubscriptionsScreen.propTypes = {
  activeVersion: PropTypes.any,
};

SubscriptionsScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(SubscriptionsScreen);
