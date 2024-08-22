/**
 * Author: Harsh Maisuri
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthenticationContext/AuthContext";
import { UserRoles } from "../../utils/UserRoles";

const ResetPassword = () => {
  const { userData } = useAuthContext();
  const { userRole } = userData;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { handleResetPassword } = useAuthContext();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await handleResetPassword(data);
      console.log('Password reset response:', response);
      if (response && response.success) {
        if (userRole === UserRoles.CUSTOMER) {
          navigate("/customer/view-profile");
        } else if (userRole === UserRoles.FOOD_SERVICE_PROVIDER) {
          navigate("/foodprovider/view-profile");
        }
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full px-10 mx-auto mb-10 lg:w-2/5">
      <h4
        className="mt-20 text-4xl font-medium text-center"
        style={{ color: "#FFA500" }}
      >
        Reset Password
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="flex flex-col w-full gap-4 ">
          <div className="w-full">
            <label
              htmlFor="old_password"
              className="mb-2 text-lg text-gray-800"
            >
              Old Password
            </label>
            <input
              type="password"
              name="old_password"
              {...register("old_password", {
                required: "* This is required",
                onChange: handleChange,
              })}
              className={`${getValues("old_password")
                ? "border-orange-300"
                : "border-gray-300"
                } border px-3 py-2 mt-2 rounded-sm text-md w-full focus:outline-orange-400 ${errors.old_password ? "border-red-400" : "border-gray-300"
                }`}
              value={formData.old_password || ""}
            />
            {errors.old_password && (
              <span className="block mt-2 text-red-400">
                {errors.old_password.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="new_password"
              className="mb-2 text-lg text-gray-800"
            >
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              {...register("new_password", {
                required: "* This is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])[a-zA-Z\d\S]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one number, and one special character",
                },
                onChange: handleChange,
              })}
              className={`${getValues("new_password")
                ? "border-orange-300"
                : "border-gray-300"
                } ${errors.new_password ? "border-red-400" : "border-gray-300"
                } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
              value={formData.new_password || ""}
            />
            {errors.new_password && (
              <span className="block mt-2 text-red-400">
                {errors.new_password.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="confirm_password"
              className="mb-2 text-lg text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              {...register("confirm_password", {
                required: "* This is required",
                validate: {
                  matchesPassword: (value) => {
                    const { new_password } = getValues();
                    return new_password === value || "Passwords do not match";
                  },
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])[a-zA-Z\d\S]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one number, and one special character",
                },
                onChange: handleChange,
              })}
              className={`${getValues("confirm_password")
                ? "border-orange-300"
                : "border-gray-300"
                } ${errors.confirm_password ? "border-red-400" : "border-gray-300"
                } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
              value={formData.confirm_password || ""}
            />
            {errors.confirm_password && (
              <span className="block mt-2 text-red-400">
                {errors.confirm_password.message}
              </span>
            )}
          </div>

          <div className="relative flex items-center justify-center mt-8 space-x-8s">
            <button
              type="button"
              className="absolute top-0 left-0 btn"
              onClick={() => navigate(-1)}
            >
              <IoArrowBack />
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg btn btn-secondary"
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
