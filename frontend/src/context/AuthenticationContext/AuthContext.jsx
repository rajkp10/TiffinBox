/**
 * Author : Kunj Hiteshkumar Pathak
 * Dalhousie Email : kn743706@dal.ca
 * Commit Email : kunjpathak1212@gmail.com
 */

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import reducer from "./reducer";
import { toast } from "react-hot-toast";
import { api } from "../../config/axiosConfig";

// const API = axios.create({
//   baseURL: "http://localhost:8080/api/",
// });

const backendURLs = {
  LOGIN_URL: `/auth/logIn`,
  CUSTOMER_SIGNUP_URL: `/auth/customer/signUp`,
  SELLER_SIGNUP_URL: `/auth/seller/signUp`,
  RESET_PASSWORD_URL: `/profile/resetPassword`,
  FORGOT_PASSWORD_URL: `/auth/forgotPassword`

};

const initialState = {
  user: "",
  userProfile: "",
  userRole: "",
  authToken: "",
  refreshToken: "",
  isRegistered: false,
};

const AppContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialState);

  const handleSellerRegistration = async (data) => {
    console.log(data);
    const requestBody = {
      firstname: data.first_name,
      lastname: data.last_name,
      email: data.email_id,
      password: data.password,
      companyAddress: data.company_address,
      companyZipCode: data.company_postal_code,
      companyName: data.company_name,
      cfcrNumber: data.lic_number,
      cuisine: data.cuisine_type,
      contactNumber: data.contact_number,
      cityName: data.city,
      provinceName: data.province,
    };
    console.log(requestBody);
    await api
      .post(backendURLs.SELLER_SIGNUP_URL, requestBody)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200 || res?.status === 201) {
          toast.success(res?.data.message);
          userData.isRegistered = true;
          return true;
        } else if (!res?.data.success) {
          toast.error(res?.data.message);
        }
        return false;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.res?.data.message);
        return false;
      });
  };

  const handleCustomerRegistration = async (data) => {
    console.log(data);
    const requestBody = {
      firstname: data.first_name,
      lastname: data.last_name,
      email: data.email_id,
      password: data.password,
      streetAddress: data.street_address,
      zipCode: data.postal_code,
      contactNumber: data.contact_number,
      cityName: data.city_name,
      provinceName: data.province,
    };
    await api
      .post(backendURLs.CUSTOMER_SIGNUP_URL, requestBody)
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200 || res?.status === 201) {
          toast.success(res?.data.message);
          userData.isRegistered = true;
          return true;
        } else if (!res?.data.success) {
          toast.error(res?.data.message);
        }
        return false;
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.res?.data.message);
        return false;
      });
  };

  const handleResetPassword = async (data) => {
    console.log(data);
    const requestBody = {
      oldPassword: data.old_password,
      newPassword: data.new_password,
    };
    try {
      const res = await api.post(backendURLs.RESET_PASSWORD_URL, requestBody);
      console.log(res?.data);
      if (res?.status === 200 || res?.status === 201) {
        toast.success(res?.data.message);
        return { success: true, message: res?.data.message };
      }
      return { success: false, message: res?.data.message };
    } catch (error) {
      console.log(error);
      return { success: false, message: error.response?.data.message };
    }
  };
  const handleLoginSubmit = async (data) => {
    console.log(data);
    const requestBody = {
      email: data.email_id,
      password: data.password,
    };
    await api
      .post(backendURLs.LOGIN_URL, requestBody)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setTokens(data);
        toast.success(res?.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setTokens = (data) => {
    setUserData({
      ...userData,
      user: data,
      userRole: data.userRole,
      userProfile: data.profileImage,
      authToken: data.token,
      refreshToken: data.refreshToken,
    });

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("userRole", data.userRole);
    localStorage.setItem("userProfile", data.profileImage);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
  };

  const logout = () => {
    setUserData(initialState);
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  };

  const handleForgotSubmit = async (data) => {
    const requestBody = {
      email: data.email_id,
    };

    try {
      const result = await api.post(backendURLs.FORGOT_PASSWORD_URL, requestBody);

      if (result.status === 200 || result.status === 201) {
        toast.success(result.data.message);
        navigate('/auth/logIn');
        return true;
      }

    }
    catch (error) {

      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("user") &&
      localStorage.getItem("userRole") &&
      localStorage.getItem("userProfile") &&
      localStorage.getItem("authToken") &&
      localStorage.getItem("refreshToken")
    ) {
      setUserData({
        ...userData,
        user: localStorage.getItem("user"),
        userRole: localStorage.getItem("userRole"),
        userProfile: localStorage.getItem("userProfile"),
        authToken: localStorage.getItem("authToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        userData,
        handleSellerRegistration,
        handleCustomerRegistration,
        handleLoginSubmit,
        handleResetPassword,
        handleForgotSubmit,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AppContext);
};

export { AuthProvider, useAuthContext };
