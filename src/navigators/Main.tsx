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
import { PersistGate } from "redux-persist/lib/integration/react";

const screenOptionsDefault = {
  cardOverlayEnabled: false,
  // presentation: 'transparentModal',
  animationEnabled: false,
  gestureEnabled: false,
  header: () => null,
  headerMode: 'screen',
};

const Stack = createNativeStackNavigator();

export default ({reduxDispatch}) => {
  const [isBottomBarVisible, setBottomBarVisibility] = useState(true);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BottomBarProvider
            value={{isBottomBarVisible, setBottomBarVisibility}}>
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
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};
