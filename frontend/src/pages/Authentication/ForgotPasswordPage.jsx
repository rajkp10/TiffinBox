/**
 * Author : Kunj Hiteshkumar Pathak
 * Dalhousie Email : kn743706@dal.ca
 * Commit Email : kunjpathak1212@gmail.com
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthenticationContext/AuthContext'; // Update the path as needed

const ForgotPasswordPage = () => {
  const { handleForgotSubmit } = useAuthContext(); // Use the context hook here

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="lg:w-2/5 px-10 w-full mx-auto mb-10">
        <h4 className="text-center text-4xl font-medium" style={{ color: '#FFA500' }}>
          Forgot Password
        </h4>
        <p className="text-center leading-8 my-4 text-black text-2xl font-semibold">
          Please enter your registered email.
        </p>
        <p className="text-center leading-8 my-4 text-black text-2xl font-semibold">
          An email with a temporary password will be sent to the registered email. Please follow the instructions mentioned in the mail carefully.
        </p>
        <div>
          <form onSubmit={handleSubmit(handleForgotSubmit)} className="mt-10">
            <div className="w-full">
              <label htmlFor="email" className="mb-2 text-lg text-gray-800">
                Email address
              </label>
              <input
                type="email"
                {...register("email_id", {
                  required: "* This is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address format",
                  },
                })}
                className={`border px-3 py-2 mt-2 rounded-sm text-md w-full focus:outline-orange-400 ${errors.email_id ? "border-red-400" : "border-gray-300"}`}
              />
              {errors.email_id && (
                <span className="text-red-400 mt-2 block">
                  {errors.email_id.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-secondary block py-3 min-w-48 mx-auto mt-6 rounded-md text-white font-semibold"
            >
              RECOVERY PASSWORD
            </button>
            <Link to='/' className="text-center text-xl block my-6 font-medium underline text-blue-500">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
