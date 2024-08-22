/**
 * Author: Keval Gandevia
 */

import { GET_ALL_ACCEPTED_ORDERS, GET_ORDER_STATUS, SET_LOADING} from "./action";

const reducer = (state, action) => {
    if(action.type === GET_ALL_ACCEPTED_ORDERS) {
        return { ...state, acceptedOrderList: action.payload.acceptedOrderList };
    }
    if(action.type === GET_ORDER_STATUS) {
        return { ...state, orderStatus: action.payload.orderStatus };
    }
    if(action.type === SET_LOADING) {
        return { ...state, isLoading: action.payload };
    }
};

export default reducer;