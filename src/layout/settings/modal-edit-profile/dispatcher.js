import {handleSetPremium} from '../../../store/defaultState/actions';

export default dispatch => ({
  handleSetPremium: (...args) => dispatch(handleSetPremium(...args)),
});
