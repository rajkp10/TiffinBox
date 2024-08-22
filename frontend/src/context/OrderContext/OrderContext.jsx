/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

import React, { useContext, useState } from "react";
import { api } from "../../config/axiosConfig";
import toast from "react-hot-toast";

const OrderContext = React.createContext();

const initialStates = {
  orderList: [],
  orderDetails: null,
  subscriptionList: [],
};

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(initialStates);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState(new Date());

  const fetchAllOrders = async () => {
    setLoading(true);
    await api
      .get(`/orders`)
      .then((res) => {
        const { orderDetails } = res.data;
        console.log(orderDetails);
        setOrders({ ...orders, orderList: orderDetails });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const fetchOrderDetails = async (orderId) => {
    setLoading(true);
    await api
      .get(`/orders/${orderId}`)
      .then((res) => {
        const { orderDetails } = res.data;
        console.log(orderDetails);
        setOrders({ ...orders, orderDetails, orderList: [] });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const fetchReceivedOrders = async () => {
    const orderDate = new Date(searchDate);
    const params = {
      orderDate,
    };
    setLoading(true);
    setOrders({ ...orders, orderList: [] });
    await api
      .get(`/orders/received`, { params })
      .then((res) => {
        const { orderDetails } = res.data;
        setOrders({ ...orders, orderList: orderDetails, orderDetails: null });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const placeOrder = async (cart) => {
    const { cartItem } = cart;
    const data = {
      mealId: cartItem.mealId,
      foodServiceProviderId: cartItem.foodServiceProviderId,
      totalAmount: cart.totalAmount,
      quantity: cart.quantity,
      additionalRequestDescription: "",
    };
    await api
      .post("/orders", data)
      .then((res) => {
        toast.success("Order Placed.");
      })
      .catch((error) => console.log(error));
  };

  const subscribe = async (data) => {
    setLoading(true);
    await api
      .post("/subscription", data)
      .then((res) => {
        console.log(res);
        toast.success("Subscribed to the Meal.");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  const getSubscription = async () => {
    setLoading(true);
    await api
      .get("/subscription")
      .then((res) => {
        console.log(res);
        const { subscriptionDetails } = res.data;
        setOrders({ ...orders, subscriptionList: subscriptionDetails });
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      })
      .finally(() => setLoading(false));
  };

  const acceptOrder = async (orderId) => {
    setLoading(true);
    const response = await api
      .post(`/ordertrack/acceptOrder/${orderId}`, {})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => setLoading(false));

    return response;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        searchDate,
        setSearchDate,
        fetchAllOrders,
        fetchOrderDetails,
        fetchReceivedOrders,
        placeOrder,
        subscribe,
        getSubscription,
        acceptOrder,
        loading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderProvider, useOrderContext };
