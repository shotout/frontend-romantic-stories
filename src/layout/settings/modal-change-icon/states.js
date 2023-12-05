export default states => ({
  categories: states.defaultState.defaultData.categories,
  userProfile: states.defaultState.userProfile?.data,
  colorTheme: states.defaultState.colorTheme,
  isPremium: states.defaultState.isPremium,
  backgroundColor: states.defaultState.backgroundColor,
});
