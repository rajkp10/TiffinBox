/**
 * Author: Keval Gandevia
 */

import { useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext/AdminContext";

const AdminDashboard = () => {
  const { analysisDetails, getAnalysis, isLoading } = useAdminContext();

  useEffect(() => {
    getAnalysis();
  }, []);

  if (isLoading) {
    return (
      <div className="grid max-w-5xl mx-auto min-h-dvh place-content-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container px-6 py-6 mx-auto min-h-dvh">
      <p className="mb-10 text-4xl font-bold">
        <span className="text-5xl text-primary">/</span>
        <span>Dashboard</span>
      </p>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 md:grid-cols-2 justify-stretch">
        <div className="shadow-md card bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl card-title">
              <p className="text-center">Total Users</p>
            </h1>
            <p className="font-semibold text-center">
              {analysisDetails?.totalUsers || 0}
            </p>
          </div>
        </div>
        <div className="shadow-md card w-50 bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl card-title">
              <p className="text-center">Total Orders</p>
            </h1>
            <p className="font-semibold text-center">
              {analysisDetails?.totalOrders || 0}
            </p>
          </div>
        </div>
        <div className="shadow-md card w-50 bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl card-title">
              <p className="text-center">Total Earnings</p>
            </h1>
            <p className="font-semibold text-center">
              ${analysisDetails?.totalEarnings || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
