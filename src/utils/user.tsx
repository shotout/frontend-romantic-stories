import {getUserProfile} from '../shared/request';
import store from '../store/configure-store';
import {handleSetProfile} from '../store/defaultState/actions';

const reloadUserProfile = async () => {
  try {
    const res = await getUserProfile();
    const currentUserProfile = store.getState().defaultState.userProfile;
    console.log(JSON.stringify(currentUserProfile))
    store.dispatch(
      handleSetProfile({
        ...currentUserProfile,
        ...res,
      }),
    );
  } catch (err) {
    console.log(err);
  }
};

export {reloadUserProfile};
