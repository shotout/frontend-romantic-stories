import React, {useRef, useEffect, useCallback, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BackHandler, Text, View} from 'react-native';
import App from '../../App';
import {Provider, connect} from 'react-redux';
import OnboardScreen from '../screens/onboarding/index';
import RegisterScreen from '../screens/register/index';
import {navigationRef} from '../shared/navigationRef';
import MyTabsComponent from './BottomNavigator';
import {BottomBarProvider} from './BottomBarContex';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store, {persistor} from '../store/configure-store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import messaging from '@react-native-firebase/messaging';
import {checkDeviceRegister} from '../shared/request';
import DeviceInfo from 'react-native-device-info';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';

const screenOptionsDefault = {
  cardOverlayEnabled: false,
  // presentation: 'transparentModal',
  animationEnabled: false,
  gestureEnabled: false,
  header: () => null,
  headerMode: 'screen',
};

const Stack = createNativeStackNavigator();

function Main({registerData, userProfile, props}) {
  const [isBottomBarVisible, setBottomBarVisibility] = useState(true);
  useEffect(() => {
    checkDevice();
    const checkFirebase = async () => {
      const fcmToken = await messaging().getToken();
     
    };
    checkFirebase();
  });
  const checkDevice = async () => {
    const device = await DeviceInfo.getUniqueId();
    try {
      const res = await checkDeviceRegister({
        device_id: device,
      });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };
  return (
    <BottomBarProvider value={{isBottomBarVisible, setBottomBarVisibility}}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={screenOptionsDefault}
          initialRouteName={'Splash'}>
          <Stack.Screen name={'Splash'} component={App} />
          <Stack.Screen name={'Onboard'} component={OnboardScreen} />
          <Stack.Screen name={'Register'} component={RegisterScreen} />
          <Stack.Screen name="Bottom" component={MyTabsComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </BottomBarProvider>
  );
}

Main.propTypes = {
  activeVersion: PropTypes.any,
};

Main.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(Main);
