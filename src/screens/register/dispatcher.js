import {
  handleSetProfile,
  handleSetBackground,
  handleSetColorTheme,
  handleSetFontFamily,
  handleSetFontSize,
  handleSetStory,
  handleSetSteps,
  resetParams,
  handleSetCharacter,
  handleSetCharacterPartner,
  handleSetMainAva,
  handleSetPartnerAva
} from '../../store/defaultState/actions';

export default dispatch => ({
  handleSetStory: (...args) => dispatch(handleSetStory(...args)),
  handleSetProfile: (...args) => dispatch(handleSetProfile(...args)),
  handleSetBackground: (...args) => dispatch(handleSetBackground(...args)),
  handleSetColorTheme: (...args) => dispatch(handleSetColorTheme(...args)),
  handleSetFontFamily: (...args) => dispatch(handleSetFontFamily(...args)),
  handleSetFontSize: (...args) => dispatch(handleSetFontSize(...args)),
  handleSetSteps: (...args) => dispatch(handleSetSteps(...args)),
  resetParams: (...args) => dispatch(resetParams(...args)),
  handleSetCharacter: (...args) => dispatch(handleSetCharacter(...args)),
  handleSetCharacterPartner: (...args) => dispatch(handleSetCharacterPartner(...args)),
  handleSetMainAva: (...args) => dispatch(handleSetMainAva(...args)),
  handleSetPartnerAva: (...args) => dispatch(handleSetPartnerAva(...args)),
});
