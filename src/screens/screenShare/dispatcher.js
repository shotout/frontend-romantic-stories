import {handleSetBgShare, handleSetFontFamily, handleSetSteps} from '../../store/defaultState/actions';

export default dispatch => ({
    handleSetFontFamily: (...args) => dispatch(handleSetFontFamily(...args)),
    handleSetSteps: (...args) => dispatch(handleSetSteps(...args)),
    handleSetBgShare: (...args) => dispatch(handleSetBgShare(...args)),
});