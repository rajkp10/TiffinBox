/**
 * Author: Keval Gandevia
 */

import { createContext, useContext, useReducer, useState } from "react";
import reducer from "./reducer";
import { toast } from "react-hot-toast";
import { api } from "../../config/axiosConfig";
import {
  GET_ALL_ACCEPTED_ORDERS,
  GET_ORDER_STATUS,
  SET_LOADING,
} from "./action";

const backendURLs = {
  GET_ALL_ACCEPTED_ORDERS_URL: `/ordertrack/getAllAcceptedOrders`,
  UPDATE_ORDER_STATUS_URL: `/ordertrack/updateStatus`,
  VERIFY_ORDER_STATUS_URL: `/ordertrack/verifyOTP`,
  GET_ORDER_STATUS_URL: `/ordertrack/getOrderStatus`,
};

const initialState = {
  acceptedOrderList: [],
  orderStatus: "",
  isLoading: true,
};

const AppContext = createContext();

const OrderTrackAppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchDate, setSearchDate] = useState(new Date());

  const getAllAcceptedOrders = async () => {
    const orderDate = new Date(searchDate);
    const params = {
      orderDate,
    };
    await api
      .get(backendURLs.GET_ALL_ACCEPTED_ORDERS_URL, { params })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: GET_ALL_ACCEPTED_ORDERS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
  };

  const updateOrderStatus = async (data) => {
    const { orderId, newStatus } = data;
    const requestBody = {
      orderStatus: newStatus,
    };
    await api
      .post(`${backendURLs.UPDATE_ORDER_STATUS_URL}/${orderId}`, requestBody)
      .then((res) => {
        toast.success(res.data.message);
        getAllAcceptedOrders();
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
  };

  const verifyOtp = async (data) => {
    const { orderId, otp } = data;
    console.log(orderId + " " + otp);
    const requestBody = {
      otp,
    };
    const response = await api
      .post(`${backendURLs.VERIFY_ORDER_STATUS_URL}/${orderId}`, requestBody)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      })

    return response;
  };

  const getOrderStatus = async (orderId) => {
    dispatch({ type: SET_LOADING, payload: true });
    await api
      .get(`${backendURLs.GET_ORDER_STATUS_URL}/${orderId}`)
      .then((res) => {
        dispatch({ type: GET_ORDER_STATUS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => dispatch({ type: SET_LOADING, payload: false }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        getAllAcceptedOrders,
        updateOrderStatus,
        verifyOtp,
        getOrderStatus,
        searchDate,
        setSearchDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useOrderTrackContext = () => {
  return useContext(AppContext);
};

export { OrderTrackAppProvider, useOrderTrackContext };
