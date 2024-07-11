import Purchasely, {ProductResult} from 'react-native-purchasely';
import {BUY_10_AUDIO, BUY_50_AUDIO, SHOW_PAYWALL, SUBSCRIPTION_STORIES_AUDIO, eventTracking} from './eventTracking';
import store from '../store/configure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {STATIC_ONBOARD} from '../shared/static';
import {handleSetPremium} from '../store/defaultState/actions';
import * as IAP from 'react-native-iap';
import {updateProfile} from '../shared/request';
import {reloadUserProfile} from '../utils/user';
import { checkDays, reformatDate } from '../utils/helper';

export const handlePayment = async (vendorId, notif, cb,) =>
  new Promise(async (resolve, reject) => {
   
    try {
      eventTracking(SHOW_PAYWALL);
      let stringVendor = vendorId;
      const set10min = await AsyncStorage.getItem('firstInstall');
      const main10 = reformatDate(parseFloat(set10min));
      const data = checkDays(main10)
      const user = store.getState().defaultState.userProfile;
      
      if(vendorId === 'unsubscribe_placement' || notif){
        stringVendor = vendorId
      }else if(data === 'kurang' ){
        stringVendor = 'in_app'
      // }else if(data === 'antara'){
      //   stringVendor = 'offer_75'
      }else if(data === 'lebih'){
        stringVendor =  'offer_50'
      }
      console.log('OPEN Purchasely', stringVendor);
      const res = await Purchasely.presentPresentationForPlacement({
        placementVendorId: notif ? user?.data?.type === 'realistic' ? `${vendorId}_realistic` : vendorId : user?.data?.type === 'realistic' ? `${stringVendor}_realistic` :  stringVendor,
        isFullscreen: true,
      });
      console.log('Purchasely result:', JSON.stringify(res));
      
      // console.log('Check user data purchase:', user);
      switch (res.result) {
        case ProductResult.PRODUCT_RESULT_PURCHASED:
          // const payload = {
          //   _method: 'PATCH',
          //   is_member:
          //     vendorId === 'in_app' && res?.plan?.vendorId === 'ErotalesUnlimitedStoriesandAudioAnnual' ? 3 :  vendorId === 'in_app' && res?.plan?.vendorId != 'ErotalesUnlimitedStoriesandAudioAnnual' ? 2 : vendorId === 'onboarding'
          //       ? 2
          //       : 'upgrade_to_unlimited_audio_story'
          //       ? 3
          //       : 1,
          // };
          // await updateProfile(payload);
          reloadUserProfile('purchase');
          console.log('FINISH PURCHASED:', res.result);
          eventTracking(res?.plan?.vendorId === 'ErotalesUnlimitedStoriesandAudioAnnual' ? SUBSCRIPTION_STORIES_AUDIO : SUBSCRIPTION_STORIES_AUDIO)
          resolve({success: true, result: res});
          if (user.token) {
            Purchasely.closePaywall();
            resolve({success: true, result: res});
          }
          break;
        case ProductResult.PRODUCT_RESULT_RESTORED:
          console.log('Payment restored');
          resolve({success: true, result: res});
          break;
        case ProductResult.PRODUCT_RESULT_CANCELLED:
          console.log('Payment cancel');
          if (Platform.OS === 'android') {
            if (
              !vendorId ||
              vendorId === STATIC_ONBOARD ||
              vendorId === 'offer_no_purchase_after_onboarding_paywall'
            ) {
              // handlePayment(vendorId);
            }
          }
          resolve({success: false, result: res});
          break;
        default:
          break;
      }

      if (typeof cb === 'function') {
        cb();
      }
    } catch (err) {
      console.log('error payment:', err);
    }
  });

export const handleNativePayment = async (sku, storyId) => {
  try {
    // const products = await IAP.getProducts({ skus: ['unlock_story_1_week_only'] });
    // console.log('Products:', products);
    const result = await IAP.requestPurchase({
      sku: sku ? sku : 'unlock_story_1_week_only',
    });
    const payload = {
      _method: 'PATCH',
      is_audio: 1,
      audio_limit: sku === 'unlock_10_audio_stories' ? 10 : 'unlock_5_audio_stories' ? 50 : 0,
    };
    const payloadStory = {
      _method: 'PATCH',
      story_id: storyId,
      expire: 7,
    };
    eventTracking(sku === 'unlock_10_audio_stories' ? BUY_10_AUDIO : sku === 'unlock_5_audio_stories' ? BUY_50_AUDIO : null)
    await updateProfile(
      sku === 'unlock_story_1_week_only' ? payloadStory : payload,
    );
    reloadUserProfile();
    await AsyncStorage.setItem(
      'subscribtions',
      sku ? sku : 'unlock_story_1_week_only',
    );

    // Operasi selesai dengan sukses, return true
    return true;
  } catch (error) {
    // Tangani kesalahan
    console.error('Error:', error);

    // Operasi gagal, return false
    return false;
  }
};
