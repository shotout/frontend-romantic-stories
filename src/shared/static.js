// Prod version
export const BACKEND_URL = 'https://staging-api.erotalesapp.com';
export const API_URL = 'https://staging-api.erotalesapp.com/api/v1';
export const STATIC_ONBOARD = 'onboarding';

// dev version
// export const BACKEND_URL = 'https://backend-api-dev.mcsmartapp.com';
// export const API_URL = 'https://backend-api-dev.mcsmartapp.com/api/v1';
// export const STATIC_ONBOARD = 'dev_onboarding'

export const APP_VERSION = '1.0.3';
export const STORE = {
  playstore: 'https://play.google.com/store/apps/details?id=apps.mcsmart&pli=1',
  appstore: 'https://apps.apple.com/us/app/mcsmart/id1658465230',
};
export const SENTRY_DSN =
  'https://f518c7bcaf12272f49b5b5b4a51b2cb9@o4504954514898944.ingest.sentry.io/4505798010208256';

export const downloadText = `I found this fact on the McSmart App. Download now for the best facts:\n\nPlaystore: ${STORE.playstore}\nAppstore: ${STORE.appstore}\n`;

export const STORAGE_STATUS = {
  loading: 'LOADING',
  rehydrated: 'REHYDRATED',
};
