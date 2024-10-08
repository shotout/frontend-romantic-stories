export default states => ({
  categories: states.defaultState.defaultData.categories,
  userProfile: states.defaultState.userProfile?.data,
  colorTheme: states.defaultState.colorTheme,
  backgroundColor: states.defaultState.backgroundColor,
  mainAva: states.defaultState.mainAva,
  characterPartnerAva: states.defaultState.characterPartnerAva,
  characterAva: states.defaultState.characterAva,
});
