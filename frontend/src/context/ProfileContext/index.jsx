/**
 * Author: Harsh Maisuri
 */

import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import axios from "axios";
import {
  EDIT_CUSTOMER_PROFILE,
  GET_CUSTOMER_PROFILE,
  GET_SELLER_PROFILE,
} from "./actions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/axiosConfig";
import { useAuthContext } from "../AuthenticationContext/AuthContext";

const initialState = {
  profileInfo: {},
};

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api/profile",
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Adjust based on how you store the token
//     console.log(token)
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Create Profile context

const ProfileContext = createContext();

// Custom hook to use Profile context

export const useProfile = () => useContext(ProfileContext);

const ProfileAppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userData } = useAuthContext();
  const navigate = useNavigate();

  // Function to get customer profile information

  const getProfileInfo = () => {
    return api.get(`/profile/customer`).then((res) => {
      dispatch({ type: GET_CUSTOMER_PROFILE, payload: res.data });
    });
  };

  // Function to edit customer profile information

  const editProfileInfo = (payload) => {
    return api.post(`/profile/customer/editProfile`, payload).then((res) => {
      toast.success(res.data.message);
      navigate("/customer/view-profile");
    });
  };

  // Function to get seller profile information

  const getSellerProfileInfo = () => {
    return api.get(`/profile/seller`).then((res) => {
      console.log(res, "ress");
      dispatch({ type: GET_SELLER_PROFILE, payload: res.data });
    });
  };

  // Function to edit seller profile information

  const editSellerProfileInfo = (payload) => {
    return api.post(`/profile/seller/editProfile`, payload).then((res) => {
      toast.success(res.data.message);
      navigate("/foodprovider/view-profile");
    });
  };

  // Function to update profile image

  const updateProfileImage = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/profile/uploadImg", formData).then((res) => {
      console.log(res);
      userData.userProfile = res.data.profileImage;
      localStorage.setItem("userProfile", res.data.profileImage);
      toast.success(res.data.message);
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getProfileInfo,
        editProfileInfo,
        getSellerProfileInfo,
        editSellerProfileInfo,
        updateProfileImage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileAppProvider;
