/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Main from './src/navigators/Main';
import App from './src/navigators/App';
import codePush from 'react-native-code-push';

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.IMMEDIATE,
  };
  
const AppWithCodePush = codePush(codePushOptions)(App);
AppRegistry.registerComponent(appName, () => AppWithCodePush);
