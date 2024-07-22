/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import Main from './src/navigators/Main';
import App from './src/navigators/App';
import TrackPlayer from 'react-native-track-player';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
  console.log('apaaaaa')
    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
      // Update external API
      
  
      // Remove the notification
      await notifee.cancelNotification(notification.id);
    }
  });
Platform.OS === 'android' ? TrackPlayer.registerPlaybackService(() => require('./service')) : null;
// await TrackPlayer.setupPlayer()
AppRegistry.registerComponent(appName, () => App);
