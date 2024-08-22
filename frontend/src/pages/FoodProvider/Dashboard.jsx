/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

import { FaStar } from "react-icons/fa";
import DashboardBarGraph from "../../components/FoodServiceProvider/DashboardBarGraph";
import { useFoodProviderDashboard } from "../../context/DashboardContext/FoodProviderContext";
import { useEffect } from "react";

function Dashboard() {
  const { dashboardAnalytics, fetchAnalytics, loading } =
    useFoodProviderDashboard();
  const { ordersAnalysis, revenueAnalysis, mostOrderedMeal, averageRating } =
    dashboardAnalytics;

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="w-full max-w-5xl px-6 mx-auto my-10 min-h-dvh">
      <p className="mb-10 text-4xl font-bold">
        <span className="text-5xl text-primary">/</span>
        <span>Dashboard</span>
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="shadow card">
          <DashboardBarGraph
            heading="Orders"
            data={ordersAnalysis}
            xAxisDataKey="month"
            barDataKey="orders"
          />
        </section>
        <section className="shadow card">
          <DashboardBarGraph
            heading="Revenue"
            data={revenueAnalysis}
            xAxisDataKey="month"
            barDataKey="revenue"
          />
        </section>
        <section className="shadow card">
          <div className="items-center card-body">
            <h2 className="card-title">Most Ordered Meal</h2>
            {loading ? (
              <span className="loading loading-dots loading-lg text-primary"></span>
            ) : (
              <span className="text-4xl font-bold">{mostOrderedMeal}</span>
            )}
          </div>
        </section>
        <section className="shadow card">
          <div className="items-center card-body">
            <h2 className="card-title">Average Rating</h2>
            {loading ? (
              <span className="text-4xl font-bold">{mostOrderedMeal}</span>
            ) : (
              <span className="inline-flex items-center text-4xl font-bold">
                <FaStar className="mr-2 text-yellow-500" /> {averageRating}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
