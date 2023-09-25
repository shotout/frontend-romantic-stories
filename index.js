/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Main from './src/navigators/Main';
import App from './src/navigators/App';

AppRegistry.registerComponent(appName, () => App);
