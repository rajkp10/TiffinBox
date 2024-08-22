/**
 * Author: Harsh Maisuri
 */

import { GET_CUSTOMER_PROFILE, GET_SELLER_PROFILE } from "./actions";

export const reducer = (state, action) => {
  if (action.type == GET_CUSTOMER_PROFILE) {
    return { ...state, profileInfo: action.payload };
  }

  if (action.type == GET_SELLER_PROFILE) {
    return { ...state, profileInfo: action.payload };
  }
};
