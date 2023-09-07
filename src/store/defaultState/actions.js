import * as types from './types';

export const fetchInitialData = async (isHasLogin, appOpenAd, loadingRef) => {};

export const setStorageStatus = payload => ({
  type: types.SET_STORAGE_STATUS,
  payload,
});

export const handleSetProfile = payload => ({
  type: types.SET_PROFILE_DATA,
  payload,
});
