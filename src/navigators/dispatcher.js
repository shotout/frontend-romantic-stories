import {handleSetStory} from '../store/defaultState/actions';

export default dispatch => ({
    handleSetStory: (...args) => dispatch(handleSetStory(...args)),
});