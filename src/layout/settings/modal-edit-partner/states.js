export default states => ({
  categories: states.defaultState.defaultData.categories,
  userProfile: states.defaultState.userProfile?.data,
  colorTheme: states.defaultState.colorTheme,
  backgroundColor: states.defaultState.backgroundColor,
  partnerAva: states.defaultState.partnerAva,
  characterPartnerAva: states.defaultState.characterPartnerAva,
  characterAva: states.defaultState.characterAva,
});
