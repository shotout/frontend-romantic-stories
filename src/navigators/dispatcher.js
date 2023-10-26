import {handleSetStory, handleSetSteps} from '../store/defaultState/actions';

export default dispatch => ({
    handleSetStory: (...args) => dispatch(handleSetStory(...args)),
    handleSetSteps: (...args) => dispatch(handleSetSteps(...args)),
});