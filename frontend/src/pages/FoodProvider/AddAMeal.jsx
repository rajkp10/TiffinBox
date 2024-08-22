/**
 * Author: Savan Patel
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFoodProviderMealContext } from "../../context/FoodProviderMealContext/FoodProviderMealContext";

const AddAMeal = () => {
  const [mealData, setMealData] = useState({
    mealImage: null,
    mealName: "",
    mealDescription: "",
    mealType: "",
    cuisineType: "",
    mealPrice: "",
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { addAMeal } = useFoodProviderMealContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setMealData({ ...mealData, mealImage: file });
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[+-]?([0-9]*[.])?[0-9]+$/;
    const price = mealData.mealPrice;
    if (!regex.test(price)) {
      setError(true);
    } else {
      const formData = new FormData();
      formData.append("mealName", mealData.mealName);
      formData.append("mealDescription", mealData.mealDescription);
      formData.append("mealPrice", mealData.mealPrice);
      formData.append("mealImage", mealData.mealImage);
      formData.append("mealType", mealData.mealType);
      formData.append("cuisineType", mealData.cuisineType);
      console.log(formData);
      await addAMeal(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealData({ ...mealData, [name]: value });
  };

  return (
    <div className="container min-h-screen px-6 py-6 mx-auto">
      <h1 className="text-3xl font-bold text-gray-950">Add a New Meal</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="font-bold label-text">
              Upload the Image of the Meal
            </span>
          </label>
          <input
            type="file"
            id="mealImage"
            onChange={handleImageChange}
            required
            className="w-full file-input file-input-bordered"
          />
          {preview && (
            <div className="mt-4">
              <p className="font-bold text-gray-600 text-md">Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="border border-gray-300 rounded-lg w-96"
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="form-control">
            <label className="label">
              <span className="font-bold label-text">Meal Name</span>
            </label>
            <input
              type="text"
              name="mealName"
              id="mealName"
              placeholder="Enter Name of the Meal"
              value={mealData.mealName}
              required
              onChange={handleChange}
              className="w-full input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-bold label-text">Meal Description</span>
            </label>
            <textarea
              id="mealDescription"
              name="mealDescription"
              placeholder="Enter Description for the meal"
              value={mealData.mealDescription}
              required
              onChange={handleChange}
              className="w-full input input-bordered"
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-bold label-text">Meal Type</span>
            </label>
            <select
              id="mealType"
              name="mealType"
              value={mealData.mealType}
              required
              onChange={handleChange}
              className="w-full input input-bordered"
            >
              <option value="">Select Meal Type</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="font-bold label-text">Cuisine Type</span>
            </label>
            <select
              id="cuisineType"
              name="cuisineType"
              value={mealData.cuisineType}
              required
              onChange={handleChange}
              className="w-full input input-bordered"
            >
              <option value="">Select Cuisine Type</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Italian">Italian</option>
            </select>
          </div>
          <div className="form-control col-span-full">
            <label className="label">
              <span className="font-bold label-text">Meal Price</span>
            </label>
            <div className="flex">
              <span className="flex items-center px-3 text-black bg-gray-200 border border-r-0 rounded-l">
                $(CAD)
              </span>
              <input
                type="text"
                id="mealPrice"
                name="mealPrice"
                placeholder="Enter Price of the Meal"
                value={mealData.mealPrice}
                required
                onChange={handleChange}
                className="w-full input input-bordered"
              />
            </div>
            <span className={`${error ? "block" : "hidden"} text-red-500`}>
              * This field should be numbers only
            </span>
          </div>
        </div>
        <div className="flex mt-4 space-x-4">
          <button type="submit" className="btn btn-success">
            Add
          </button>
          <button
            type="button"
            onClick={() => navigate("/foodprovider/mealmenumanagement")}
            className="btn btn-neutral"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAMeal;
