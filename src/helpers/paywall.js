import Purchasely, { ProductResult } from "react-native-purchasely";
import { eventTracking } from "./eventTracking";
import store from "../store/configure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { STATIC_ONBOARD } from "../shared/static";


export const handlePayment = async (vendorId, cb) =>
new Promise(async (resolve, reject) => {
  try {
    // eventTracking(SHOW_PAYWALL);
    let stringVendor = vendorId;
    // const subscriptions = await Purchasely.userSubscriptions();
    // console.log('Subscription status:', subscriptions);
    const purchaseId = await Purchasely.getAnonymousUserId();
      if (vendorId === STATIC_ONBOARD) {
        // await setSubcription({
        //   subscription_type: 1,
        //   purchasely_id: purchaseId,
        // });
      } else if (!stringVendor) {
        const currentDate = moment().format("YYYY-MM-DD");
        const getInstallDate = await AsyncStorage.getItem("firstInstall");
        if (getInstallDate === currentDate) {
          stringVendor = "offer_no_purchase_after_onboarding_paywall";
        } else {
          stringVendor = "offer_no_purchase_after_onboarding_paywall_2nd";
        }
      }
      console.log("OPEN Purchasely", stringVendor);
      const res = await Purchasely.presentPresentationForPlacement({
        placementVendorId: 'onboarding',
          // stringVendor || "in_app_paywall",
        isFullscreen: true,
      });
      console.log("Purchasely result:", res.result);
      const user = store.getState().defaultState.userProfile;
      console.log("Check user data purchase:", user);
      switch (res.result) {
        case ProductResult.PRODUCT_RESULT_PURCHASED:
          console.log("FINISH PURCHASED:", user.token);
          if (user.token) {
            // await setSubcription({
            //   subscription_type: vendorId === "one_month_free" ? 3 : 2,
            //   subscription_data: res,
            //   purchasely_id: purchaseId,
            // });
            // await reloadUserProfile();
            Purchasely.closePaywall();
          }
        //   eventTracking(FREE_TRIAL);
          break;
        case ProductResult.PRODUCT_RESULT_RESTORED:
          console.log("Payment restored");
          // let message = null;
          // if (res.plan != null) {
          //   console.log(`User purchased ${res.plan.name}`);
          //   message = res.plan.name;
          // }

          // eventTracking(RESTORE_PURCHASED, message);
          break;
        case ProductResult.PRODUCT_RESULT_CANCELLED:
          console.log("Payment cancel");
          if (Platform.OS === "android") {
            if (
              !vendorId ||
              vendorId === STATIC_ONBOARD ||
              vendorId === "offer_no_purchase_after_onboarding_paywall"
            ) {
              // handlePayment(vendorId);
            }
          }
          // await setSubcription({
          //   subscription_type: 1,
          //   purchasely_id: purchaseId,
          // });
          break;
        default:
          break;
      }
      if (typeof cb === "function") cb();
      resolve(res);
    } catch (err) {
      console.log("error payment:", err);
    }
  });