import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {AppState, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import Main from './Main';
import store, {persistor} from '../store/configure-store';
import {PaperProvider} from 'react-native-paper';
import {handleNativePayment, handlePayment} from '../helpers/paywall';
import {OPEN_OFFER_NOTIFICATION, eventTracking} from '../helpers/eventTracking';
import {navigate} from '../shared/navigationRef';

LogBox.ignoreAllLogs();

const App = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  // KILLED APP
  async function bootstrap() {
    const detail = await notifee.getInitialNotification();

    if (detail) {
      if (detail?.notification?.data?.type === 'paywall') {
        setTimeout(() => {
          handlePayment(detail?.notification?.data?.placement);
        }, 100);
        eventTracking(OPEN_OFFER_NOTIFICATION);
      } else if (detail?.notification?.data?.type === 'story') {
        navigate('Main', {isFromNotif: true});
      }
    }
  }

  useEffect(() => {
    bootstrap();
  }, []);

  useEffect(() => {
    // ACTIVE APP
    const unsubscribeOnMessage = messaging().onMessage(async detail => {
      if (detail.data?.type === 'paywall') {
        setTimeout(() => {
          handlePayment(detail.data?.placement);
        }, 100);
        eventTracking(OPEN_OFFER_NOTIFICATION);
      } else if (detail.data?.type === 'story') {
        navigate('Main', {isFromNotif: true});
      }
    });
    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  useEffect(() => {
    // BACKGROUND APP
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/background/) && nextAppState === 'active') {
        notifee.onForegroundEvent(async ({type, detail}) => {
          if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
            if (detail.notification.data?.type === 'paywall') {
              setTimeout(() => {
                handlePayment(detail.notification.data?.placement);
              }, 100);
              eventTracking(OPEN_OFFER_NOTIFICATION);
            } else if (detail.notification.data?.type === 'story') {
              navigate('Main', {isFromNotif: true});
            }
          }
        });
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  useEffect(() => {
    if (appState === 'active') {
      const clearNotifications = async () => {
        // await notifee.cancelAllNotifications();
        await notifee.setBadgeCount(0);
      };
      clearNotifications();
    }
  }, [appState]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <Main />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
