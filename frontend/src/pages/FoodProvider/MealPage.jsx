/**
 * Author: Savan Patel
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFoodProviderMealContext } from "../../context/FoodProviderMealContext/FoodProviderMealContext.jsx";

const MealPage = () => {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { meal, getMealFromId, deleteAMeal } = useFoodProviderMealContext();

  const { mealId } = useParams();
  useEffect(() => {
    console.log("Hello from comp");
    async function getMeal() {
      await getMealFromId(mealId);
      setLoading(false);
      console.log(meal);
    }
    getMeal();
  }, [mealId]);

  /*const meal = {
    mealName: "Ras puri",
    mealDescription: "Great Lighweight Dish that can lighten up your mood",
    mealType: "Vegetarian",
    cuisineType: "Indian",
    mealPrice: 12,
    mealImage:
      "https://www.google.com/imgres?q=ras%20puri&imgurl=https%3A%2F%2Fstatic.toiimg.com%2Fthumb%2F54693305.cms%3Fimgsize%3D159261%26width%3D800%26height%3D800&imgrefurl=https%3A%2F%2Frecipes.timesofindia.com%2Frecipes%2Faamras-poori%2Frs54693305.cms&docid=LlSbuWK85row6M&tbnid=cgfTd84YC-tlgM&vet=12ahUKEwjkmeHEq8eHAxVHEGIAHdubGJQQM3oECBkQAA..i&w=800&h=800&hcb=2&ved=2ahUKEwjkmeHEq8eHAxVHEGIAHdubGJQQM3oECBkQAA"
  };*/
  const handleDeletion = async (e) => {
    e.preventDefault();
    await deleteAMeal(mealId);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    navigate(`/foodprovider/update-a-meal/${mealId}`);
  };

  const handleToggling = (e) => {
    e.preventDefault();

    setToggleDialog(!toggleDialog);
  };

  if (loading) {
    return (
      <div className="grid max-w-5xl mx-auto min-h-dvh place-content-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  console.log(meal);
  return (
    <div className="container min-h-screen px-6 py-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-950">Meal Details</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <img
            src={meal.mealImage}
            alt={meal.mealName}
            className="rounded-lg shadow-md w-96"
          />
        </div>
        <div className="flex flex-col space-y-6">
          <div>
            <p className="text-xl font-bold text-gray-800">Meal Name</p>
            <p className="text-gray-700">{meal.mealName}</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">Meal Description</p>
            <p className="text-gray-700">{meal.mealDescription}</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">Meal Type</p>
            <p className="text-gray-700">{meal.mealType}</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">Cuisine Type</p>
            <p className="text-gray-700">{meal.cuisineType}</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">Meal Price</p>
            <p className="text-gray-700">$(CAD) {meal.mealPrice}</p>
          </div>
          <div className="flex mt-6 space-x-4">
            <button
              className="btn btn-success"
              onClick={(e) => handleUpdateClick(e)}
            >
              Update
            </button>
            <button
              className="btn btn-error"
              onClick={(e) => handleToggling(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {toggleDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 text-center bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this item?</p>
            <div className="flex space-x-4">
              <div className="flex justify-center w-[50%]">
                <button
                  onClick={handleDeletion}
                  className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
              <div className="flex justify-center w-[50%]">
                <button
                  onClick={handleToggling}
                  className="px-4 py-2 text-black bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPage;
