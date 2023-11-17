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
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const NotificationScreen = ({
  colorTheme,
  categories,
  isPremium,
  handleSetSteps,
  stepsTutorial,
  userProfile,
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
            <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
              Notifications
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
          backgroundColor: code_color.white,
          height: '100%',
          padding: 20,
        }}>
        <Text style={{fontSize: 18, fontWeight: '600', color: code_color.grey, marginBottom: 20}}>
          Set your notifications
        </Text>
        <View style={{flexDirection: 'row', marginVertical: 20, borderBottomColor: code_color.grey, borderBottomWidth: 1, paddingBottom: 10}}>
        <Text style={{fontSize: 16, fontWeight: '600', color: code_color.grey}}>
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
        <View style={{flexDirection: 'row', marginVertical: 20, borderBottomColor: code_color.grey, borderBottomWidth: 1, paddingBottom: 10}}>
        <Text style={{fontSize: 16, fontWeight: '600', color: code_color.grey}}>
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
              marginBottom: -100,
              bottom: -50,
              width: 200,
              height: 150,
              left: '5%',
              zIndex: 1,
            }}>
            <Image
              source={{uri: `${BACKEND_URL}/${me}`}}
              resizeMode="cover"
              style={{
                width: 140,
                height: 400,
              }}
            />
          </View>
          <View
            style={{
              position: 'relative',
              overflow: 'hidden',
              marginBottom: -100,
              width: 140,
              height: 150,
              left: '30%',
              zIndex: 1,
            }}>
            <Image
              source={{uri: `${BACKEND_URL}/${partner}`}}
              resizeMode="cover"
              style={{
                width: 140,
                height: 420,
              }}
            />
          </View>

          <View>
            <ImageBackground
              source={{
                uri: `${BACKEND_URL}/${userProfile?.data?.category?.image?.url}`,
              }}
              resizeMode="contain"
              style={{
                width: '100%',
                height: 100,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  position: 'absolute',
                  top: -80,
                  right: 0,
                }}>
                <Image
                  source={imgNotif}
                  resizeMode="contain"
                  style={{width: 100, height: 100}}
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
