import {
  handleSetStory,
  handleSetSteps,
  handleReadStory,
  handleNextStory,
  handleStoriesRelate,
  handleLeveling,
  handleListenStory,
  handleSetPage,
  handleSetExploreCategory,
  handleSetExplore
} from '../../store/defaultState/actions';

export default dispatch => ({
  handleSetStory: (...args) => dispatch(handleSetStory(...args)),
  handleSetSteps: (...args) => dispatch(handleSetSteps(...args)),
  handleSetPage: (...args) => dispatch(handleSetPage(...args)),
  handleReadStory: (...args) => dispatch(handleReadStory(...args)),
  handleListenStory: (...args) => dispatch(handleListenStory(...args)),
  handleNextStory: (...args) => dispatch(handleNextStory(...args)),
  handleStoriesRelate: (...args) => dispatch(handleStoriesRelate(...args)),
  handleLeveling: (...args) => dispatch(handleLeveling(...args)),
  handleSetExplore: (...args) => dispatch(handleSetExplore(...args)),
  handleSetExploreCategory: (...args) => dispatch(handleSetExploreCategory(...args)),
});
