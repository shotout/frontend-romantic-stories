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
  Image,
  ImageBackground,
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
import {bg_splash, logo} from './src/assets/images';
import {navigate} from './src/shared/navigationRef';
import {getDefaultLanguange} from './src/utils/devices';
import PropTypes from 'prop-types';
import dispatcher from './src/navigators/dispatcher';
import states from './src/navigators/states';
import {connect} from 'react-redux';
import {getStoryList} from './src/shared/request';
import i18n from './src/i18n/index';

function App({userProfile, handleSetStory}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    getDefaultLanguange();
  }, []);
  useEffect(() => {
    getInitialRoute();
  }, []);
  async function getInitialRoute() {
    if (userProfile?.token) {
      // const res = await getStoryList();
      // handleSetStory(res.data);
      setTimeout(() => {
        navigate('Bottom');
      }, 500);
    } else {
      setTimeout(() => {
        navigate('Onboard');
      }, 500);
    }
  }
  return (
    <ImageBackground source={bg_splash} style={{width: '100%', height: '100%'}}>
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
            fontSize: 28,
            marginTop: 20,
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
          }}>
          {'Your everyday \n Fantasy'}
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
