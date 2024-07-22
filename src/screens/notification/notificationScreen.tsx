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
} from 'react-native';
import {bg_notif, cover2, imgNotif, imgNotifReal, imgStep4} from '../../assets/images';
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
  getListAvatarTheme,
  updateProfile,
} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import {handleSetSteps} from '../../store/defaultState/actions';
import i18n from '../../i18n';
import Button from '../../components/buttons/Button';
import StepHeader from '../../layout/step/stepHeader';
import {Switch} from 'react-native-gesture-handler';
import {reloadUserProfile} from '../../utils/user';
import {fixedFontSize, hp, wp} from '../../utils/screen';
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const NotificationScreen = ({
  colorTheme,
  categories,
  handleSetSteps,
  stepsTutorial,
  userProfile,
  backgroundColor,
}) => {
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [newStories, setNewStories] = useState(
    userProfile?.data?.notif_enable === 0 ? false : true,
  );
  const [promotions, setPromotions] = useState(
    userProfile?.data?.notif_ads_enable === 0 ? false : true,
  );
  const [me, setMe] = useState(null);
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    handleThemeAvatar();
  }, []);
  const handleThemeAvatar = async () => {
    // alert(userProfile?.data?.type)
    // (angry,confused,cry,dizzy,excited,friendly,inlove,positive.scare,think)
    let params = {
      flag: userProfile?.data?.type === 'realistic' ? 'beach' : 'notif',
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
    fetchUpdate();
  }, [newStories, promotions]);

  return (
    <SafeAreaView style={{backgroundColor: bgTheme}}>
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
            marginVertical: hp(10),
          }}>
          <Pressable
            onPress={() => navigate('Settings')}
            style={{
              width: hp(35),
              height: hp(35),
              backgroundColor: 'white',
              borderRadius: hp(20),
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(180deg)',
            }}>
            <BackRight fill={bgTheme} width={hp(18)} height={hp(18)} />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: moderateScale(18),
                fontWeight: '600',
                color: 'white',
              }}>
              Notifications
            </Text>
          </View>
          <View
            style={{
              width: hp(35),
              height: hp(35),
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{
          backgroundColor: 'white',
          height: '100%',
          padding: hp(20),
        }}>
        <Text
          style={{
            fontSize: moderateScale(14),
            color: '#505962',
            marginBottom: hp(10),
          }}>
          Set your notifications
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: hp(20),
            borderBottomColor: code_color.blackDark,
            borderBottomWidth: 1,
            paddingBottom: hp(10),
          }}>
          <Text
            style={{fontSize: moderateScale(16), color: code_color.blackDark}}>
            New Stories
          </Text>
          <Switch
            style={{marginLeft: 'auto'}}
            trackColor={{false: '#767577', true: '#00B781'}}
            thumbColor={newStories ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setNewStories(!newStories)}
            value={newStories}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: hp(20),
            borderBottomColor: code_color.blackDark,
            borderBottomWidth: 1,
            paddingBottom: hp(10),
          }}>
          <Text
            style={{fontSize: moderateScale(16), color: code_color.blackDark}}>
            Promotions
          </Text>
          <Switch
            style={{marginLeft: 'auto'}}
            trackColor={{false: '#767577', true: '#00B781'}}
            thumbColor={promotions ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setPromotions(!promotions)}
            value={promotions}
          />
        </View>
        {userProfile?.data?.type === 'realistic'  ? <Image
              source={imgNotifReal}
              resizeMode="contain"
              style={{
                width: '100%',
                height: hp(300),
                borderRadius: hp(20),
                marginTop: 20
              }}
            />  :
        <View
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}>
          <View
            style={{
              position: 'relative',
              overflow: 'hidden',
              marginBottom: hp(-150),
              bottom: hp(-110),
              width: hp(200),
              height: hp(200),
              left: '33%',
              zIndex: 1,
            }}>
            <Image
              source={{uri: `${BACKEND_URL}/${partner}`}}
              resizeMode="cover"
              style={{
                width: hp(130),
                height: hp(450),
              }}
            />
          </View>
          <View
            style={{
              position: 'relative',
              overflow: 'hidden',
              marginBottom: hp(-100),
              bottom: hp(-58),
              width: hp(200),
              height: hp(200),
              left: '5%',
              zIndex: 1,
            }}>
            <Image
              source={{uri: `${BACKEND_URL}/${me}`}}
              resizeMode="cover"
              style={{
                width: hp(
                  me === '/assets/images/avatars/anime/2/positive.png' ? 130 : 150,
                ),
                height: hp(
                  me === '/assets/images/avatars/anime/1/positive.png' ? 440 : 420,
                ),
              }}
            />
          </View>

          <View>
            <Image
              source={bg_notif}
              resizeMode="cover"
              style={{
                width: '100%',
                height: hp(150),
                borderRadius: hp(20),
              }}
            />
            <View
              style={{
                alignItems: 'center',
                position: 'absolute',
                top: hp(-50),
                right: 0,
              }}>
              <Image
                source={imgNotif}
                resizeMode="contain"
                style={{width: hp(100), height: hp(100)}}
              />
            </View>
          </View>
        </View>  }
        <View>

        </View> 
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

NotificationScreen.propTypes = {
  activeVersion: PropTypes.any,
};

NotificationScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(NotificationScreen);
