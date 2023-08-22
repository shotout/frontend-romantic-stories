import i18n from 'i18n-js';

import eng from './locales/en';
import id_ID from './locales/id';

// let deviceLanguage =
//   Platform.OS === 'ios'
//     ? bahasa(// iOS 13
//     : NativeModules.I18nManager.localeIdentifier;
// let ind = Platform.OS === 'android' ? in_ID : id_ID;
// // NOTE : for dynamically change language inside app (need restart)
// console.log('BAHASA ='+JSON.stringify(NativeModules.SettingsManager.settings.AppleLocale))
// i18n.locale = deviceLanguage;

i18n.translations = {eng, id_ID};

i18n.fallbacks = true;

i18n.missingBehaviour = 'guess';



export default i18n;
