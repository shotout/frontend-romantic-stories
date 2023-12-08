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

export const handleSetStory = payload => ({
  type: types.SET_STORY_DATA,
  payload,
});

export const handleNextStory = payload => ({
  type: types.SET_STORY_NEXT_DATA,
  payload,
});
export const handleStoriesRelate = payload => ({
  type: types.SET_STORY_RELATE_DATA,
  payload,
});

export const handleReadStory = payload => ({
  type: types.SET_READ_STORY,
  payload,
});

export const handleSetSteps = payload => ({
  type: types.SET_STEP_TUTORIAL,
  payload,
});

export const handleSetBackground = payload => ({
  type: types.SET_BACKGROUND_COLOR,
  payload,
});

export const handleSetColorTheme = payload => ({
  type: types.SET_COLOR_THEME,
  payload,
});

export const handleSetFontFamily = payload => ({
  type: types.SET_FONT_FAMILY,
  payload,
});

export const handleSetFontSize = payload => ({
  type: types.SET_FONT_SIZE,
  payload,
});

export const handleSetPremium = payload => ({
  type: types.SET_USER_PREMIUM,
  payload,
});
