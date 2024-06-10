export default states => ({
  categories: states.defaultState.defaultData.categories,
  userProfile: states.defaultState.userProfile,
  levelingUser: states.defaultState.levelingUser,
  colorTheme: states.defaultState.colorTheme,
  getAvatarMale:
    states.defaultState.userProfile?.data?.get_avatar_male?.image?.url,
});
