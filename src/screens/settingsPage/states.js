export default states => ({
  registerData: states.defaultState.registerData,
  userProfile: states.defaultState.userProfile,
  userStory: states.defaultState.userStory,
  backgroundColor: states.defaultState.backgroundColor,
  fontFamily: states.defaultState.fontFamily,
  fontSize: states.defaultState.fontSize,
  colorTheme: states.defaultState.colorTheme,
  getAvatarFemale:
    states.defaultState.userProfile?.data?.get_avatar_female?.image?.url,
  getAvatarMale:
    states.defaultState.userProfile?.data?.get_avatar_male?.image?.url,
});
