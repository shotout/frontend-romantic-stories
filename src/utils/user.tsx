import { eventTracking, revenueTracking } from '../helpers/eventTracking';
import {getUserProfile} from '../shared/request';
import store from '../store/configure-store';
import {handleSetProfile} from '../store/defaultState/actions';

const reloadUserProfile = async (type) => {
  try {
    const res = await getUserProfile();
    const currentUserProfile = store.getState().defaultState.userProfile;
    //console.log(JSON.stringify(currentUserProfile))
    store.dispatch(
      handleSetProfile({
        ...currentUserProfile,
        ...res,
      }),
    );
    if(type){
      if(res.data.subscription.type !== 1){
        const objPurchase = JSON.parse(
          res.data.subscription.purchasely_data
        );
        if (objPurchase) {
          console.log(objPurchase)
          revenueTracking(
            objPurchase.plan_price_in_customer_currency,
            objPurchase.customer_currency
          );
        }
      }
    }
    
   
  } catch (err) {
    console.log(err);
  }
};

export {reloadUserProfile};
