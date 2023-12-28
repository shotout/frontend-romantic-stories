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
import {cover2, imgNotif, imgStep4} from '../../assets/images';
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
import {getExploreStory, getListAvatarTheme, updateProfile} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import {handleSetSteps} from '../../store/defaultState/actions';
import i18n from '../../i18n';
import Button from '../../components/buttons/Button';
import StepHeader from '../../layout/step/stepHeader';
import { Switch } from 'react-native-gesture-handler';
import { reloadUserProfile } from '../../utils/user';
import { fixedFontSize, hp, wp } from '../../utils/screen';
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const NotificationScreen = ({
  colorTheme,
  categories,
  handleSetSteps,
  stepsTutorial,
  userProfile,
  backgroundColor
}) => {
  
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [newStories, setNewStories] = useState(userProfile?.data?.notif_enable === 0 ? false : true);
  const [promotions, setPromotions] = useState(userProfile?.data?.notif_ads_enable === 0 ? false : true);
  const [me, setMe] = useState(null);
  const [partner, setPartner] = useState(null);

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
    if(newStories || promotions){
      fetchUpdate()
    }
   

  }, [newStories, promotions])

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
            marginHorizontal: wp(10),
            marginVertical: wp(10),
          }}>
          <Pressable
            onPress={() => goBack()}
            style={{
              width: wp(35),
              height: wp(35),
              backgroundColor: backgroundColor,
              borderRadius: wp(20),
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(180deg)',
            }}>
            <BackRight fill={bgTheme} />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text allowFontScaling={false} style={{fontSize: fixedFontSize(18), fontWeight: '600', color: backgroundColor}}>
              Notifications
            </Text>
          </View>
          <View
            style={{
              width: wp(35),
              height: wp(35),
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{
          backgroundColor: backgroundColor,
          height: '100%',
          padding: wp(20),
        }}>
        <Text style={{fontSize: fixedFontSize(18), fontWeight: '600', color: backgroundColor === code_color.blackDark ? 'white' : code_color.blackDark, marginBottom: wp(20)}}>
          Set your notifications
        </Text>
        <View style={{flexDirection: 'row', marginVertical: wp(20), borderBottomColor: backgroundColor === code_color.blackDark ? 'white' : code_color.blackDark, borderBottomWidth: 1, paddingBottom: wp(10)}}>
        <Text style={{fontSize: fixedFontSize(16), fontWeight: '600', color: backgroundColor === code_color.blackDark ? 'white' : code_color.blackDark,}}>
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
        <View style={{flexDirection: 'row', marginVertical: wp(20), borderBottomColor:  backgroundColor === code_color.blackDark ? 'white' : code_color.blackDark, borderBottomWidth: 1, paddingBottom: wp(10)}}>
        <Text style={{fontSize: fixedFontSize(16), fontWeight: '600', color: backgroundColor === code_color.blackDark ? 'white' : code_color.blackDark,}}>
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
       
        <>
          <View
            style={{
              position: 'relative',
              overflow: 'hidden',
              marginBottom: wp(-100),
              bottom: -50,
              width: wp(200),
              height: hp(150),
              left: '5%',
              zIndex: 1,
            }}>
            <Image
              source={{uri: `${BACKEND_URL}/${me}`}}
              resizeMode="cover"
              style={{
                width: wp(140),
                height: hp(500),
              }}
            />
          </View>
          <View
            style={{
              position: 'relative',
              overflow: 'hidden',
              marginBottom: wp(-100),
              width: wp(200),
              height: hp(150),
              left: '30%',
              zIndex: 1,
            }}>
            <Image
              source={{uri: `${BACKEND_URL}/${partner}`}}
              resizeMode="cover"
              style={{
                width: wp(140),
                height: hp(500),
              }}
            />
          </View>

          <View>
            <ImageBackground
              source={{
                uri: `${BACKEND_URL}${userProfile?.data?.category?.image?.url}`,
              }}
              resizeMode="contain"
              style={{
                width: '100%',
                height: wp(100),
              }}>
              <View
                style={{
                  alignItems: 'center',
                  position: 'absolute',
                  top: wp(-80),
                  right: 0,
                }}>
                <Image
                  source={imgNotif}
                  resizeMode="contain"
                  style={{width: wp(100), height: hp(100)}}
                />
              </View>
            </ImageBackground>
          </View>
        </>
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
