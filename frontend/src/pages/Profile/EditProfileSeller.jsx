/**
 * Author: Harsh Maisuri
 */

import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useProfile } from "../../context/ProfileContext";
import { useEffect, useState } from "react";

const EditProfileSeller = () => {
  const navigate = useNavigate();

  const { getSellerProfileInfo, profileInfo, editSellerProfileInfo } = useProfile();
  const [formData, setFormData] = useState({
    cityName: "",
    contact: "",
    email: "",
    firstname: "",
    lastname: "",
    companyPostalCode: "",
    provinceName: "",
    companyAddress: "",
    cuisineType: "",
    companyName: ""
  });

  console.log("profileInfo", profileInfo);

  // Fetch seller profile info when component mounts

  useEffect(() => {
    getSellerProfileInfo();
  }, []);


  console.log("profileInfo", profileInfo, formData);

  // Update formData state when profileInfo changes

  useEffect(() => {
    if (profileInfo) {
      setFormData({
        city: profileInfo.city || "",
        contact: profileInfo.contactNumber || "",
        email: profileInfo.email || "",
        firstname: profileInfo.firstname || "",
        lastname: profileInfo.lastname || "",
        companyPostalCode: profileInfo.companyZipCode || "",
        province: profileInfo.province || "",
        companyAddress: profileInfo.companyAddress,
        cuisineType: profileInfo.cuisine || "",
        companyName: profileInfo.companyName || ""
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
    console.log("Updated profile data:", formData);
    editSellerProfileInfo(formData);
  };

  return (
    <div className="max-w-5xl px-4 sm:px-10 py-6 rounded-lg mx-auto min-h-dvh">
      <h2 className="font-bold text-xl sm:text-2xl mb-6 py-3">Edit Profile</h2>
      <div className="py-4 flex flex-col space-x-0 lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="w-full">
          <form form onSubmit={handleSubmit}>
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
                  type="tel"
                  name="contact"
                  placeholder="Contact"
                  className="input input-bordered w-full mt-4"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col space-x-0 md:flex-row space-y-4 md:space-y-0 md:space-x-6  mt-4">
              <div className="w-full flex flex-col">
                <label htmlFor="address">Company Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  placeholder="Company Address"
                  className="input input-bordered w-full mt-4"
                  value={formData.companyAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="address">Company Name</label>
                <input
                  type="text"
                  name="companyAddress"
                  placeholder="Company Name"
                  className="input input-bordered w-full mt-4"
                  value={formData.companyName}
                  onChange={handleChange}
                  readOnly
                />
              </div>
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
                <label htmlFor="zipcode">Company zip code</label>
                <input
                  type="text"
                  name="companyPostalCode"
                  placeholder="Company zip code"
                  className="input input-bordered w-full mt-4"
                  value={formData.companyPostalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="zipcode">Cuisine</label>
                <input
                  type="text"
                  name="cuisineType"
                  placeholder="Cuisine"
                  className="input input-bordered w-full mt-4"
                  value={formData.cuisineType}
                  onChange={handleChange}
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
                className="btn absolute left-0 top-0"
                onClick={() => navigate(-1)}
              >
                <IoArrowBack />
                Back
              </button>
              <button type="submit" className="btn btn-secondary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileSeller;
