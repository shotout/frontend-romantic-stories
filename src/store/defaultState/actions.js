import * as types from './types';

export const fetchInitialData = async (isHasLogin, appOpenAd, loadingRef) => {};

export const setStorageStatus = payload => ({
  type: types.SET_STORAGE_STATUS,
  payload,
});

export const resetParams = payload => ({
  type: types.RESET_PARAMS,
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
export const handleLeveling = payload => ({
  type: types.SET_LEVELING_DATA,
  payload,
});

export const handleReadStory = payload => ({
  type: types.SET_READ_STORY,
  payload,
});

export const handleListenStory = payload => ({
  type: types.SET_LISTEN_STORY,
  payload,
});


export const handleSetSteps = payload => ({
  type: types.SET_STEP_TUTORIAL,
  payload,
});

export const handleSetPage = payload => ({
  type: types.SET_PAGE,
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

export const handleSetBgShare = payload => ({
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

export const handleSetColor = payload => ({
  type: types.SET_COLOR_TEXT,
  payload,
});

export const handleSetListCollection = payload => ({
  type: types.SET_LIST_COLLECTION,
  payload,
});

export const handleSetListLibrary = payload => ({
  type: types.SET_LIST_LIBRARY,
  payload,
});