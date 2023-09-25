export default states => ({
  categories: states.defaultState.defaultData.categories,
  userProfile: states.defaultState.userProfile?.data,
  getAvatarFemale:
    states.defaultState.userProfile?.data?.get_avatar_female?.image?.url,
  getAvatarMale:
    states.defaultState.userProfile?.data?.get_avatar_male?.image?.url,
  colorTheme: states.defaultState.colorTheme,
});
