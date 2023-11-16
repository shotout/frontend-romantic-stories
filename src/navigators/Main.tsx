import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Alert} from 'react-native';
import App from '../../App';
import {connect} from 'react-redux';
import OnboardScreen from '../screens/onboarding/index';
import RegisterScreen from '../screens/register/index';
import {navigate, navigationRef} from '../shared/navigationRef';
import MyTabsComponent from './BottomNavigator';
import {BottomBarProvider} from './BottomBarContex';
import messaging from '@react-native-firebase/messaging';
import {checkDeviceRegister} from '../shared/request';
import DeviceInfo from 'react-native-device-info';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import ExploreLibraryScreen from '../screens/exploreLibrary/index';
import modalShare from '../screens/screenShare/index';
import screenMedia from '../screens/media/index';
import screenNotification from '../screens/notification/index';
import screenCategories from '../screens/categories/index';

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

  const HandleDeepLinking = () => {
    // const {navigate} = useNavigation()
    const handleDynamicLinks = async (link: any) => {
      let storyId = link.url.split('=').pop();
      navigate('Library');
      Alert.alert(storyId);
    };
    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
      return () => unsubscribe();
    }, []);

    return null;
  };

  const checkDevice = async () => {
    const device = await DeviceInfo.getUniqueId();
    try {
      const res = await checkDeviceRegister({
        device_id: device,
      });
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  };

  return (
    <BottomBarProvider value={{isBottomBarVisible, setBottomBarVisibility}}>
      <NavigationContainer ref={navigationRef}>
        <HandleDeepLinking />
        <Stack.Navigator
          screenOptions={screenOptionsDefault}
          initialRouteName={'Splash'}>
          <Stack.Screen name={'Splash'} component={App} />
          <Stack.Screen name={'Onboard'} component={OnboardScreen} />
          <Stack.Screen name={'Register'} component={RegisterScreen} />
          <Stack.Screen
            name={'ExploreLibrary'}
            component={ExploreLibraryScreen}
          />
          <Stack.Screen name={'Share'} component={modalShare} />
          <Stack.Screen name={'Media'} component={screenMedia} />
          <Stack.Screen name={'Notification'} component={screenNotification} />
          <Stack.Screen name={'Categories'} component={screenCategories} />
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
