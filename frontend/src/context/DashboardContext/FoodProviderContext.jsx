/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

import React, { useContext, useState } from "react";
import { api } from "../../config/axiosConfig";
import toast from "react-hot-toast";

const DashboardContext = React.createContext();

const initialState = {
  ordersAnalysis: [],
  revenueAnalysis: [],
  mostOrderedMeal: "None",
  averageRating: 0,
};

const DashboardProvider = ({ children }) => {
  const [dashboardAnalytics, setDashboardAnalytics] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    await api
      .get("/foodserviceprovider/dashboard")
      .then((res) => {
        const data = res.data;
        console.log(data);
        setDashboardAnalytics({
          ...dashboardAnalytics,
          ordersAnalysis: data.ordersAnalysis,
          revenueAnalysis: data.revenueAnalysis,
          mostOrderedMeal: data.mostOrderedMeal,
          averageRating: data.averageRating,
        });
        toast.success(data.message);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <DashboardContext.Provider
      value={{ dashboardAnalytics, fetchAnalytics, loading }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

const useFoodProviderDashboard = () => {
  return useContext(DashboardContext);
};

export { DashboardProvider, useFoodProviderDashboard };
