import {handleSetStory, handleSetSteps, handleReadStory, handleNextStory, handleStoriesRelate} from '../../store/defaultState/actions';

export default dispatch => ({
    handleSetStory: (...args) => dispatch(handleSetStory(...args)),
    handleSetSteps: (...args) => dispatch(handleSetSteps(...args)),
    handleReadStory: (...args) => dispatch(handleReadStory(...args)),
    handleNextStory: (...args) => dispatch(handleNextStory(...args)),
    handleStoriesRelate: (...args) => dispatch(handleStoriesRelate(...args)),
});