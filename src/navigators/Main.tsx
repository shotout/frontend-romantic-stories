import React, {useRef, useEffect, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BackHandler, Text, View} from 'react-native';
import App from '../../App';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import reducers from '../redux/reducers/index';
import ReduxThunk from 'redux-thunk';
import OnboardScreen from '../screens/onboarding/index';
import RegisterScreen from '../screens/register/index';
import { navigationRef } from '../shared/navigationRef';

const screenOptionsDefault = {
  cardOverlayEnabled: false,
  // presentation: 'transparentModal',
  animationEnabled: false,
  gestureEnabled: false,
  header: () => null,
  headerMode: 'screen',
};

const Stack = createNativeStackNavigator();
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));


export default ({reduxDispatch}) => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={screenOptionsDefault}
          initialRouteName={'Splash'}>
          <Stack.Screen name={'Splash'} component={App} />
          <Stack.Screen name={'Onboard'} component={OnboardScreen} />
          <Stack.Screen name={'Register'} component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
