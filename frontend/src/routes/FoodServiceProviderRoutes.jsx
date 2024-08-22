import { FoodProviderMealAppProvider } from "../context/FoodProviderMealContext/FoodProviderMealContext";
import { OrderProvider } from "../context/OrderContext/OrderContext";
import { OrderTrackAppProvider } from "../context/OrderTrackContext/OrderTrackContext";
import Sidebar from "../components/shared/Sidebar";
import { Route, Routes } from "react-router-dom";
import MealMenuManagement from "../pages/FoodProvider/MealMenuManagement";
import MealPage from "../pages/FoodProvider/MealPage";
import AddAMeal from "../pages/FoodProvider/AddAMeal";
import UpdateAMeal from "../pages/FoodProvider/UpdateAMeal";
import ViewReceivedOrdersPage from "../pages/Order/ViewReceivedOrdersPage";
import ViewOrderDetailsPage from "../pages/Order/ViewOrderDetailsPage";
import AcceptedOrders from "../pages/Order/AcceptedOrders";
import Footer from "../components/shared/Footer";
import ReviewAnalytics from "../pages/FoodProvider/ReviewAnalytics";
import ViewProfileSeller from "../pages/Profile/ViewProfileSeller";
import EditProfileSeller from "../pages/Profile/EditProfileSeller";
import ProfileAppProvider from "../context/ProfileContext";
import ResetPassword from "../pages/Profile/ResetPassword";
import Dashboard from "../pages/FoodProvider/Dashboard";
import { DashboardProvider } from "../context/DashboardContext/FoodProviderContext";

function FoodServiceProviderRoutes() {
  return (
    <DashboardProvider>
      <FoodProviderMealAppProvider>
        <OrderProvider>
          <OrderTrackAppProvider>
            <ProfileAppProvider>
              <Sidebar>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route
                    path="mealmenumanagement"
                    element={<MealMenuManagement />}
                  />
                  <Route path="meal-page/:mealId" element={<MealPage />} />
                  <Route path="add-a-meal" element={<AddAMeal />} />
                  <Route
                    path="update-a-meal/:mealId"
                    element={<UpdateAMeal />}
                  />
                  <Route
                    path="received-orders"
                    element={<ViewReceivedOrdersPage />}
                  />
                  <Route
                    path="received-orders/:orderId"
                    element={<ViewOrderDetailsPage />}
                  />
                  <Route path="accepted-orders" element={<AcceptedOrders />} />
                  <Route path="view-profile" element={<ViewProfileSeller />} />
                  <Route path="edit-profile" element={<EditProfileSeller />} />
                  <Route
                    path="review-analytics"
                    element={<ReviewAnalytics />}
                  />
                  <Route path="reset-password" element={<ResetPassword />} />
                </Routes>
                <Footer />
              </Sidebar>
            </ProfileAppProvider>
          </OrderTrackAppProvider>
        </OrderProvider>
      </FoodProviderMealAppProvider>
    </DashboardProvider>
  );
}

export default FoodServiceProviderRoutes;
