/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import Main from './src/navigators/Main';
import App from './src/navigators/App';
import TrackPlayer from 'react-native-track-player';

Platform.OS === 'android' ? TrackPlayer.registerPlaybackService(() => require('./service')) : null;
// await TrackPlayer.setupPlayer()
AppRegistry.registerComponent(appName, () => App);
