/**
 * Author: Keval Gandevia
 */

import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import { toast } from "react-hot-toast";
import {
  GET_ALL_USER_PENDING_REQUESTS,
  GET_ALL_USERS,
  GET_SINGLE_PENDING_REQUEST,
  GET_ANALYSIS,
  SET_LOADING
} from "./action";
import { api } from "../../config/axiosConfig";


const backendURLs = {
  GET_ALL_PENDING_REQUESTS_URL: `/admin/getAllPendingRequests`,
  GET_SINGLE_PENDING_REQUEST_URL: `/admin/getSinglePendingRequest`,
  APPROVE_PENDING_REQUEST_URL: `/admin/approve`,
  REJECT_PENDING_REQUEST_URL: `/admin/reject`,
  GET_ALL_USERS_URL: `/admin/getAllUsers`,
  REMOVE_USER_URL: `/admin/removeUser`,
  GET_ANALYSIS_URL: `/admin/getAnalysis`
};

const initialState = {
  userPendingRequests: [],
  singleUserDetails: null,
  userList: [],
  analysisDetails: null,
  isLoading: true,
};

const AppContext = createContext();

const AdminAppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllPendingRequests = async () => {
    dispatch({type: SET_LOADING, payload: true})
    await api.get(backendURLs.GET_ALL_PENDING_REQUESTS_URL)
      .then((res) => {
        dispatch({ type: GET_ALL_USER_PENDING_REQUESTS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => dispatch({type: SET_LOADING, payload: false}));
  };

  const getSinglePendingRequest = async (foodServiceProviderId) => {
    dispatch({type: SET_LOADING, payload: true})
    await api.get(
      `${backendURLs.GET_SINGLE_PENDING_REQUEST_URL}/${foodServiceProviderId}`
    )
      .then((res) => {
        dispatch({ type: GET_SINGLE_PENDING_REQUEST, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => dispatch({type: SET_LOADING, payload: false}));
  };

  const approvePendingRequest = async (email) => {
    dispatch({type: SET_LOADING, payload: true})
    await api.post(`${backendURLs.APPROVE_PENDING_REQUEST_URL}/${email}`, {})
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => dispatch({type: SET_LOADING, payload: false}));
  };

  const rejectPendingRequest = async (email) => {
    dispatch({type: SET_LOADING, payload: true})
    await api.post(`${backendURLs.REJECT_PENDING_REQUEST_URL}/${email}`, {})
      .then((res) => {
        toast.error(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => dispatch({type: SET_LOADING, payload: false}));
  };

  const getAllUsers = async () => {
    dispatch({type: SET_LOADING, payload: true})
    await api.get(backendURLs.GET_ALL_USERS_URL)
      .then((res) => {
        dispatch({ type: GET_ALL_USERS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => dispatch({type: SET_LOADING, payload: false}));
  };

  const removeUser = async (email) => {
    dispatch({type: SET_LOADING, payload: true})
    await api.post(`${backendURLs.REMOVE_USER_URL}/${email}`, {})
      .then((res) => {
        toast.success(res.data.message);
        getAllUsers();
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => dispatch({type: SET_LOADING, payload: false}));
  };

  const getAnalysis = async () => {
    dispatch({type: SET_LOADING, payload: true})
    await api.get(backendURLs.GET_ANALYSIS_URL)
      .then((res) => {
        console.log(res.data)
        dispatch({ type: GET_ANALYSIS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
      .finally(() => dispatch({type: SET_LOADING, payload: false}));
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        getAllPendingRequests,
        getSinglePendingRequest,
        approvePendingRequest,
        rejectPendingRequest,
        getAllUsers,
        removeUser,
        getAnalysis,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAdminContext = () => {
  return useContext(AppContext);
};

export { AdminAppProvider, useAdminContext };
