/**
 * Author : Kunj Hiteshkumar Pathak
 * Dalhousie Email : kn743706@dal.ca
 * Commit Email : kunjpathak1212@gmail.com
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthenticationContext/AuthContext";

const SellerRegisterPage = () => {
  const [formData, setFormData] = useState({});
  const { handleSellerRegistration, userData } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await handleSellerRegistration(data);
    if (userData.isRegistered) {
      navigate("/login");
      toast.success("Register successfully");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlecontact_numberChange = (e) => {
    const value = e.target.value.replace(/[^+\d\sx]/g, "").replace(/\s+/g, " ");
    const formattedValue = formatPhoneNumber(value);
    setValue("contact_number", formattedValue);
  };

  const formatPhoneNumber = (value) => {
    // Remove any previous formatting
    value = value.replace(/[^\d+]/g, "");

    // Check for country code and extensions
    let countryCode = "";
    let ext = "";

    // Handling country code
    if (value.startsWith('1')) {
      countryCode = '+1';
      value = value.substring(1);
    } else if (value.startsWith('+1')) {
      countryCode = '+1';
      value = value.substring(2);
    }

    // Handling extensions
    let extIndex = value.indexOf("ext");
    if (extIndex !== -1) {
      ext = value.substring(extIndex + 3); // Getting the digits after "ext"
      value = value.substring(0, extIndex); // Getting the number part
    }

    // Extract area code, first part, and second part of the phone number
    let areaCode = value.substring(0, 3);
    let firstPart = value.substring(3, 6);
    let secondPart = value.substring(6, 10);

    // Format the phone number
    let formattedNumber = `${countryCode}(${areaCode})-${firstPart}(${secondPart})`;

    if (ext) {
      formattedNumber += ` ext ${ext}`;
    }

    return formattedNumber;
  };

  return (
    <div>
      <div className="w-full px-10 mx-auto mt-6 md:w-1/2 min-h-dvh">
        <h4
          className="text-4xl font-medium text-center"
          style={{ color: "#FFA500" }}
        >
          Register as a Seller
        </h4>

        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="flex flex-col w-full gap-4 ">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="mb-2 text-lg text-gray-800"
                  >
                    First name
                  </label>
                  <input
                    {...register("first_name", {
                      required: "* This is required",
                      onChange: handleChange,
                    })}
                    className={`${getValues("first_name")
                        ? "border-orange-300"
                        : "border-gray-300"
                      } ${errors.first_name ? "border-red-400" : "border-gray-300"
                      } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
                  />

                  {errors.first_name && (
                    <span className="block mt-2 text-red-400">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="last_name"
                    className="mb-2 text-lg text-gray-800"
                  >
                    Last name
                  </label>
                  <input
                    {...register("last_name", {
                      required: "* This is required",
                      onChange: handleChange,
                    })}
                    className={`${getValues("last_name")
                        ? "border-orange-300"
                        : "border-gray-300"
                      } ${errors.first_name ? "border-red-400" : "border-gray-300"
                      } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
                  />
                  {errors.last_name && (
                    <span className="block mt-2 text-red-400">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-full">
                  <label htmlFor="email" className="mb-2 text-lg text-gray-800">
                    Email address
                  </label>
                  <input
                    type="email"
                    {...register("email_id", {
                      required: "* This is required",
                      onChange: handleChange,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
                        message: "Invalid email address format",
                      },
                    })}
                    className={`${getValues("email_id")
                        ? "border-orange-300"
                        : "border-gray-300"
                      } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400 ${errors.email_id ? "border-red-400" : "border-gray-300"
                      }`}
                  />
                  {errors.email_id && (
                    <span className="block mt-2 text-red-400">
                      {errors.email_id.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="contact_number"
                    className="mb-2 text-lg text-gray-800"
                  >
                    Contact number
                  </label>
                  <input
                    onChangeCapture={handlecontact_numberChange}
                    {...register("contact_number", {
                      required: "* This is required",
                      onChange: handleChange,
                    })}
                    className={`${getValues("contact_number")
                        ? "border-orange-300"
                        : "border-gray-300"
                      } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400 ${errors.contact_number
                        ? "border-red-400"
                        : "border-gray-300"
                      }
                            `}
                  />

                  {errors.contact_number && (
                    <span className="block mt-2 text-red-400">
                      {errors.contact_number.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="company_address"
                  className="mb-2 text-lg text-gray-800"
                >
                  Company/Restaurant Address
                </label>
                <input
                  {...register("company_address", {
                    required: "* This is required",
                    onChange: handleChange,
                  })}
                  className={`${getValues("company_address")
                      ? "border-orange-300"
                      : "border-gray-300"
                    } ${errors.company_address
                      ? "border-red-400"
                      : "border-gray-300"
                    } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
                />
                {errors.company_address && (
                  <span className="block mt-2 text-red-400">
                    {errors.company_address.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-full">
                  <label
                    htmlFor="company_name"
                    className="mb-2 text-lg text-gray-800"
                  >
                    Company/Restaurant Name
                  </label>
                  <input
                    {...register("company_name", {
                      required: "* This is required",
                      onChange: handleChange,
                    })}
                    className={`${getValues("company_name")
                        ? "border-orange-300"
                        : "border-gray-300"
                      } ${errors.company_name ? "border-red-400" : "border-gray-300"
                      } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
                  />
                  {errors.company_name && (
                    <span className="block mt-2 text-red-400">
                      {errors.company_name.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="company_postal_code"
                    className="mb-2 text-lg text-gray-800"
                  >
                    Company/Restaurant Postal Code
                  </label>
                  <input
                    type="text"
                    {...register("company_postal_code", {
                      required: "* This is required",
                      onChange: handleChange,
                      pattern: {
                        value: /^[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]$/,
                        message: "Please enter valid postal code eg.(B9J1K8)",
                      },
                    })}
                    className={`${getValues("company_postal_code")
                        ? "border-orange-300"
                        : "border-gray-300"
                      } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-600 ${errors.company_postal_code
                        ? "border-red-400"
                        : "border-gray-300"
                      }
                    `}
                  />

                  {errors.company_postal_code && (
                    <span className="block mt-2 text-red-400">
                      {errors.company_postal_code.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-full">
                  <div className="relative w-full">
                    <label
                      htmlFor="city"
                      className="mb-2 text-lg text-gray-800"
                    >
                      City name
                    </label>
                    <input
                      className={`w-full text-black focus:outline-orange-400 appearance-none px-3 py-2 mt-2 bg-white border border-gray-200 rounded-sm ${getValues("city")
                          ? "border-orange-300"
                          : "border-gray-300"
                        }`}
                      {...register("city", {
                        required: "* This is required",
                        onChange: handleChange,
                      })}
                    />
                  </div>
                  {errors.city && (
                    <span className="block mt-2 text-red-400">
                      {errors.city.message}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <div className="relative w-full">
                    <label
                      htmlFor="province"
                      className="mb-3 text-lg text-gray-800"
                    >
                      Province name
                    </label>
                    <select
                      className={`${getValues("province")
                          ? "border-orange-300"
                          : "border-gray-300"
                        } w-full text-black  focus:outline-orange-400 appearance-none px-3 py-2 mt-2 bg-white border border-gray-200 rounded-sm`}
                      {...register("province", {
                        required: "* This is required",
                        onChange: handleChange,
                      })}
                    >
                      {/* this value should be blank this is use for title add province from down*/}

                      <option className="pt-4 " value="">
                        select
                      </option>

                      <option className='pt-4 ' value="Ontario">Alberta</option >
                      <option className='pt-4 ' value="British Columbia">British Columbia</option >
                      <option className='pt-4 ' value="Manitoba">Manitoba</option >
                      <option className='pt-4 ' value="New Brunswick">New Brunswick</option >
                      <option className='pt-4 ' value="Newfoundland">Newfoundland</option >
                      <option className='pt-4 ' value="Northwest Territories">Northwest Territories</option >
                      <option className='pt-4 ' value="Nova Scotia">Nova Scotia</option >
                      <option className='pt-4 ' value="Nunavut">Nunavut</option >
                      <option className='pt-4 ' value="Ontario">Ontario</option >
                      <option className='pt-4 ' value="Prince Edward Island">Prince Edward Island</option >
                      <option className='pt-4 ' value="Quebec">Quebec</option >
                      <option className='pt-4 ' value="Saskatchwan">Saskatchwan</option >
                      <option className='pt-4 ' value="Yukon">Yukon</option >
                    </select>
                    <IoIosArrowDown className="absolute top-[62%] right-6 text-xl text-gray-500" />
                  </div>

                  {errors.province && (
                    <span className="block mt-2 text-red-400">
                      {errors.province.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="lic_number"
                  className="mb-2 text-lg text-gray-800"
                >
                  CFCR License Number
                </label>
                <input
                  {...register("lic_number", {
                    required: "* This is required",
                    pattern: {
                      value: /^\d{16}$/,
                      message: "License number must be exactly 16 digits",
                    },
                    onChange: handleChange,
                    maxLength: {
                      value: 16,
                      message: "License number cannot exceed 16 digits",
                    },
                  })}
                  maxLength={16}
                  className={`${getValues("lic_number")
                    ? "border-orange-300"
                    : "border-gray-300"
                    } ${errors.lic_number ? "border-red-400" : "border-gray-300"
                    } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
                />
                {errors.lic_number && (
                  <span className="block mt-2 text-red-400">
                    {errors.lic_number.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-6 md:flex-row">
                {/* <div className="w-full">
                  <label
                    htmlFor="lice_cert_file"
                    className="mb-2 text-lg text-gray-800"
                  >
                    FSSAI License Certifcate
                  </label>
                  <input
                    type="file"
                    {...register("lice_cert_file", {
                      required: "* This is required",
                      onChange: handleChange,
                    })}
                    className={`${hasFile ? "border-orange-300" : "border-gray-300"
                      } ${errors.lice_cert_file
                        ? "border-red-500"
                        : "border-gray-300"
                      } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-600`}
                  />
                  {errors.lice_cert_file && (
                    <span className="block mt-2 text-red-500">
                      {errors.lice_cert_file.message}
                    </span>
                  )}
                </div> */}

                <div className="w-full">
                  <label
                    htmlFor="cuisine_type"
                    className="mb-2 text-lg text-gray-800"
                  >
                    Cuisine Type
                  </label>
                  <input
                    {...register("cuisine_type", {
                      required: "* This is required",
                      onChange: handleChange,
                    })}
                    className={`${getValues("cuisine_type")
                        ? "border-orange-300"
                        : "border-gray-300"
                      } ${errors.cuisine_type ? "border-red-400" : "border-gray-300"
                      } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
                  />
                  {errors.cuisine_type && (
                    <span className="block mt-2 text-red-400">
                      {errors.cuisine_type.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="mb-2 text-lg text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
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
                  className={`${getValues("password")
                      ? "border-orange-300"
                      : "border-gray-300"
                    } ${errors.password ? "border-red-400" : "border-gray-300"
                    } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
                />
                {errors.password && (
                  <span className="block mt-2 text-red-400">
                    {errors.password.message}
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
                  {...register("confirm_password", {
                    required: "* This is required",
                    validate: {
                      matchesPassword: (value) => {
                        const { password } = getValues();
                        return password === value || "Passwords do not match";
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
                    } ${errors.confirm_password
                      ? "border-red-400"
                      : "border-gray-300"
                    } border px-3 py-2 rounded-sm text-md mt-2 w-full focus:outline-orange-400`}
                />
                {errors.confirm_password && (
                  <span className="block mt-2 text-red-400">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="block py-3 mx-auto mt-6 mb-8 font-semibold text-white rounded-md btn btn-secondary min-w-48"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerRegisterPage;
