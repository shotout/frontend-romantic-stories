import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {AppState, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import notifee from '@notifee/react-native';

import Main from './Main';
import store, {persistor} from '../store/configure-store';
import {PaperProvider} from 'react-native-paper';

LogBox.ignoreAllLogs();

const App = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
