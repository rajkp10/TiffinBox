/**
 * Author: Harsh Maisuri
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useProfile } from "../../context/ProfileContext";

const EditProfileCustomer = () => {
  const navigate = useNavigate();
  const { getProfileInfo, profileInfo, editProfileInfo } = useProfile();
  const [formData, setFormData] = useState({
    cityName: "",
    contactNumber: "",
    email: "",
    firstname: "",
    lastname: "",
    postalCode: "",
    provinceName: "",
    streetAddress: "",
  });

  const userId = localStorage.getItem('userId');

  // Fetch profile info when component mounts

  useEffect(() => {
    getProfileInfo(userId);
  }, []);

  // Update formData state when profileInfo changes

  useEffect(() => {
    if (profileInfo) {
      setFormData({
        city: profileInfo.city || "",
        contactNumber: profileInfo.contact || "",
        email: profileInfo.email || "",
        firstname: profileInfo.firstname || "",
        lastname: profileInfo.lastname || "",
        postalCode: profileInfo.postalCode || "",
        province: profileInfo.province || "",
        streetAddress: profileInfo.streetAddress,
      });
    }
  }, [profileInfo]);

  // Handle form field changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    editProfileInfo(formData);
  };

  return (
    <div className="max-w-5xl px-4 sm:px-10 py-6 rounded-lg min-h-dvh mx-auto">
      <h2 className="font-bold text-xl sm:text-2xl mb-6 py-3">Edit Profile</h2>
      <div className="py-4 flex flex-col space-x-0 lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-x-0 md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-full flex flex-col">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  className="input input-bordered w-full mt-4"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="input input-bordered w-full mt-4"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col space-x-0 md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4">
              <div className="w-full flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  readOnly
                  className="input input-bordered w-full mt-4"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  name="contactNumber"
                  placeholder="Contact"
                  className="input input-bordered w-full mt-4"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  maxLength="10"
                />
              </div>
            </div>

            <div className="w-full flex flex-col mt-10">
              <label htmlFor="streetAddress">Address</label>
              <input
                type="text"
                name="streetAddress"
                placeholder="Address"
                className="input input-bordered w-full mt-4"
                value={formData.streetAddress}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col space-x-0 md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-10">
              <div className="w-full flex flex-col">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="input input-bordered w-full mt-4"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="postalCode">Zip code</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Zip code"
                  className="input input-bordered w-full mt-4"
                  value={formData.postalCode}
                  onChange={handleChange}
                  maxLength="6"
                />
              </div>
            </div>

            <div className="flex flex-col space-x-0 md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4">
              <div className="w-full flex flex-col">
                <label htmlFor="province">Province</label>
                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  className="input input-bordered w-full mt-4"
                  value={formData.province}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center space-x-8 mt-8 justify-center relative">
              <button
                type="button"
                className="btn absolute left-0 top-0"
                onClick={() => navigate(-1)}
              >
                <IoArrowBack />
                Back
              </button>
              <button type="submit" className="btn btn-secondary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileCustomer;
