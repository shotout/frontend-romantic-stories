import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {AppState, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import notifee, {EventType} from '@notifee/react-native';

import Main from './Main';
import store, {persistor} from '../store/configure-store';
import {PaperProvider} from 'react-native-paper';
import {handleNativePayment, handlePayment} from '../helpers/paywall';
import {OPEN_OFFER_NOTIFICATION, eventTracking} from '../helpers/eventTracking';

LogBox.ignoreAllLogs();

const App = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        notifee.onForegroundEvent(async ({type, detail}) => {
          if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
            if (detail.notification.data?.type === 'paywall') {
              console.log(
                'Check paywall data new banget:',
                detail.notification.data,
              );
              setTimeout(() => {
                // handleNativePayment(detail.notification.data?.placement);
                handlePayment(detail.notification.data?.placement);
              }, 1000);
              eventTracking(OPEN_OFFER_NOTIFICATION);
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
        await notifee.cancelAllNotifications();
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
