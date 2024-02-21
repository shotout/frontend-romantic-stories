import {
  handleSetStory,
  handleSetBackground,
  handleSetColorTheme,
  handleSetFontFamily,
  handleSetFontSize,
  handleSetSteps,
  handleNextStory,
  handleSetPage
} from '../../store/defaultState/actions';

export default dispatch => ({
  handleSetStory: (...args) => dispatch(handleSetStory(...args)),
  handleSetBackground: (...args) => dispatch(handleSetBackground(...args)),
  handleSetColorTheme: (...args) => dispatch(handleSetColorTheme(...args)),
  handleSetFontFamily: (...args) => dispatch(handleSetFontFamily(...args)),
  handleSetFontSize: (...args) => dispatch(handleSetFontSize(...args)),
  handleSetSteps: (...args) => dispatch(handleSetSteps(...args)),
  handleNextStory: (...args) => dispatch(handleNextStory(...args)),
  handleSetPage: (...args) => dispatch(handleSetPage(...args)),
});
