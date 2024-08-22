/**
 * Author: Savan Patel
 */

import React, { useEffect, useState } from "react";
import { useCustomerMealContext } from "../../context/CustomerMealContext/CustomerMealContext.jsx";
import toast from "react-hot-toast";
import FoodProviderCard from "../../components/Customer/FoodProviderCard.jsx";
import { useNavigate } from "react-router-dom";

const CustomerHomePage = () => {
  const [searchData, setSearchData] = useState({
    city: "",
    cuisineType: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    foodServiceProviderList,
    getAllFoodServiceProviderwithSearch,
    getAllFoodServiceProvider,
  } = useCustomerMealContext();

  useEffect(() => {
    async function getFoodProviders() {
      setLoading(true);
      await getAllFoodServiceProvider();
      setLoading(false);
    }

    getFoodProviders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (searchData.city === "") {
      toast.error("Enter Search Query to Search");
    } else {
      await getAllFoodServiceProviderwithSearch(searchData);
      setLoading(false);
    }
  };

  const handleCardClick = (foodProviderId) => {
    navigate(`/customer/food-provider-page/${foodProviderId}`);
  };

  if (loading) {
    return (
      <div className="grid max-w-5xl mx-auto min-h-dvh place-content-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto min-h-dvh">
      <div className="mb-6">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            name="city"
            value={searchData.city}
            onChange={handleChange}
            className="w-full p-2 mx-2 border border-gray-300 rounded-lg"
            placeholder="Enter City to Search Meal Providers..."
          />
          <select
            id="cuisineType"
            name="cuisineType"
            value={searchData.cuisineType}
            required
            onChange={handleChange}
            className="input input-bordered w-[50%] mx-5"
          >
            <option value="">Select Cuisine Type</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Italian">Italian</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-orange-500 rounded-lg"
          >
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {foodServiceProviderList.map((provider, index) => (
          <FoodProviderCard
            key={index}
            provider={provider}
            handleClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerHomePage;
