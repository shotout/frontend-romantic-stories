/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {code_color} from './src/utils/colors';
import {bg, bg_real, bg_splash, logo} from './src/assets/images';
import {navigate} from './src/shared/navigationRef';
import {getDefaultLanguange} from './src/utils/devices';
import PropTypes from 'prop-types';
import dispatcher from './src/navigators/dispatcher';
import states from './src/navigators/states';
import {connect} from 'react-redux';
import {getStoryList, updateProfile} from './src/shared/request';
import i18n from './src/i18n/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_INSTALLED, askTrackingPermission, eventTracking } from './src/helpers/eventTracking';
import { Adjust, AdjustConfig } from 'react-native-adjust';
import * as Sentry from '@sentry/react-native';
import { BACKEND_URL, SENTRY_DSN } from './src/shared/static';
import Purchasely, {
  LogLevels,
  Attributes,
  ProductResult,
  RunningMode,
  PLYPaywallAction,
} from 'react-native-purchasely';
import { handleSetStory } from './src/store/defaultState/actions';
import store from './src/store/configure-store';
import { Settings } from "react-native-fbsdk-next";
import { AppOpenAd } from 'react-native-google-mobile-ads';
import { getAppOpenID } from './src/shared/adsId';
import { reloadUserProfile } from './src/utils/user';
import FastImage from 'react-native-fast-image';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment-timezone';


Purchasely.start({
  apiKey: "e25a76b7-ffc7-435e-a817-c75d7be0dcfb",
  androidStores: ["Google"],
  storeKit1: false,
  userId: null,
  logLevel: LogLevels.DEBUG,
  runningMode: RunningMode.FULL,
});
const adUnitId = getAppOpenID();
const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});
appOpenAd.load();
function App({ userProfile }) {

  Sentry.init({
    // environment: 'production',
    environment: 'development',
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  Settings.initializeSDK();
  Settings.setAppID("657475116285203");
  useEffect(() => {
   
    const handleAppInstalled = async () => {
      const res = await AsyncStorage.getItem('isAppInstalled');
      if (!res) {
        eventTracking(APP_INSTALLED);
        AsyncStorage.setItem('isAppInstalled', 'yap');
      }
    };
    handleAppInstalled();
  }, []);
  useEffect(() => {
    FastImage.preload([
      {
        uri: `${BACKEND_URL}${'/assets/images/categories/covers/relationship.png'}`
      },
      {
        uri: `${BACKEND_URL}${'/assets/images/categories/covers/i_miss_u.png'}`
      },
      {
        uri: `${BACKEND_URL}${'/assets/images/categories/covers/dirty_mind.png'}`
      },
      {
        uri: `${BACKEND_URL}${'/assets/images/categories/covers/suprise_me.png'}`
      }
    ]);
    askTrackingPermission();
    getDefaultLanguange();
  }, []);
  const getToken = async () => {
    if (Platform.OS === "ios") {
      // console.log('GET APNS');  // I can see this log
      const apnsToken = await messaging().getAPNSToken(); 
      // console.log("==> APNS token", apnsToken); // THIS NEVER GETS CALLED
      if(apnsToken) {
        return await messaging().getToken();
      } else {
        await messaging().setAPNSToken('randomAPNStoken', 'sandbox').then(async () => {
         const data = await messaging().getToken();
         console.log("==> token", data);
        })
      };
    }
  };
  useEffect(() => {
    getToken()
    resetBadge()
    getInitialRoute();
    configTracker()
  }, []);

  const resetBadge = async() => {
    if(userProfile?.token){
      const payload = {
        _method: 'PATCH',
        notif_count: 0,
        timezone: moment.tz.guess(),
      };
      try {
        const data  = await updateProfile(payload);
      } catch (error) {
       
      }
    }
    
   
  }
  const configTracker = () => {
    const adjustConfig = new AdjustConfig(
      'tuqglinbysxs',
        AdjustConfig.EnvironmentSandbox,
      //  AdjustConfig.EnvironmentProduction,
    );
    adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
    Adjust.create(adjustConfig);
    if(__DEV__){
      console.log("Finish set configtracker");
    }
   
  };
  async function getInitialRoute() {
   
    if (userProfile?.token) {
      try {
        reloadUserProfile()
        const isFinishTutorial = await AsyncStorage.getItem('isTutorial');
        if (isFinishTutorial === 'yes') {
          setTimeout(() => {
            navigate('Tutorial');
          }, 500);
        }else{
          setTimeout(() => {
            navigate('Bottom');
          }, 500);
        }
      
      } catch (error) {
        setTimeout(() => {
          navigate('Onboard');
        }, 500);
      }
     
    } else {
      setTimeout(() => {
        navigate('Onboard');
      }, 500);
    }
  }
  //alert(Dimensions.get('window').width +"==="+ Dimensions.get('window').height)
  return (
    <ImageBackground source={bg_real} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
       {Platform.OS === 'android' ? <StatusBar hidden /> : null } 
      <View
        style={{
          // backgroundColor: code_color.splash,
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Image
          source={logo}
          style={{resizeMode: 'contain', width: '40%', height: 200}}
        />
        <Text
          allowFontScaling={false}
          style={{
            color: 'white',
            fontSize: 25,
            marginTop: 20,
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
          }}>
          {'Exciting Stories \n for your everyday fantasy'}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
App.propTypes = {
  activeVersion: PropTypes.any,
};

App.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(App);
