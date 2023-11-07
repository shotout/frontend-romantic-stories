import {handleSetSteps} from '../../store/defaultState/actions';

export default dispatch => ({
    handleSetSteps: (...args) => dispatch(handleSetSteps(...args)),
});