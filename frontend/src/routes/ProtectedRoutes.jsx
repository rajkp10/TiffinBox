import React from "react";
import { useAuthContext } from "../context/AuthenticationContext/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ role, children }) {
  const { userData } = useAuthContext();
  const { userRole } = userData;

  console.log(role, userRole);
  if (userRole) {
    if (role !== userRole) {
      return <Navigate to="/login" />;
    }
  }

  return children;
}

export default ProtectedRoutes;
