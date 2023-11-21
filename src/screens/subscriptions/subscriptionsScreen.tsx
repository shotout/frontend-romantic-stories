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
import {BACKEND_URL} from '../../shared/static';
import {handleSetSteps} from '../../store/defaultState/actions';
import i18n from '../../i18n';
import Button from '../../components/buttons/Button';
import StepHeader from '../../layout/step/stepHeader';
import {Switch} from 'react-native-gesture-handler';
import {reloadUserProfile} from '../../utils/user';
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const SubscriptionsScreen = ({colorTheme, userProfile}) => {
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
          backgroundColor: '#F6F7FD',
          height: '100%',
          padding: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            color: code_color.blackDark,
            marginBottom: 20,
          }}>
          Your Current Subscription:
        </Text>

        <View
          style={{
            backgroundColor: code_color.white,
            padding: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              backgroundColor: code_color.blueDark,
              padding: 10,
              borderRadius: 10,
              marginHorizontal: 40,
              // width: '70%',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 10
            }}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold',
                color: code_color.white,
              }}>
              {userProfile?.data?.subscription?.plan?.stripe_name}
            </Text>

          </View>
          {userProfile?.data?.subscription?.plan?.notes.map(item => (
              <View style={{flexDirection: 'row', marginVertical: 10, marginHorizontal: 10}}>
                <View style={{
                  backgroundColor:
                    code_color.greenDark,
                  borderRadius: 30,
                  width: 25,
                  height: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <ChecklistSvg width={13} />
                </View>
                
                <View style={{marginLeft: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{item?.title}</Text>
                <Text>{item?.description}</Text>
                </View>
                
              </View>
            ))}
        </View>
      </ScrollView>
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
