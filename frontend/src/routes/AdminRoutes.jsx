import React from "react";
import { AdminAppProvider } from "../context/AdminContext/AdminContext";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import PendingRequests from "../pages/Admin/PendingRequests";
import SinglePendingRequest from "../pages/Admin/SinglePendingRequest";
import UserList from "../pages/Admin/UserList";
import Sidebar from "../components/shared/Sidebar";
import Footer from "../components/shared/Footer";
import ProtectedRoutes from "./ProtectedRoutes";
import { UserRoles } from "../utils/UserRoles";

function AdminRoutes() {
  return (
    <AdminAppProvider>
      <Sidebar>
        <ProtectedRoutes role={UserRoles.ADMIN}>
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="pending-request" element={<PendingRequests />} />
            <Route
              path="single-pending-request/:foodServiceProviderId"
              element={<SinglePendingRequest />}
            />
            <Route path="user-list" element={<UserList />} />
          </Routes>
        </ProtectedRoutes>
        <Footer />
      </Sidebar>
    </AdminAppProvider>
  );
}

export default AdminRoutes;
