/**
 * Author: Harsh Maisuri
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";

const ViewProfileSeller = () => {
  const { getSellerProfileInfo, profileInfo, updateProfileImage } =
    useProfile();
  const defaultAvatar =
    "https://res.cloudinary.com/dk1fim9hl/image/upload/v1722352694/TiffinBox/generic-profile-photo_ym4olv.png";
  const [avatar, setAvatar] = useState(defaultAvatar);

  const userId = localStorage.getItem("userId");
  console.log("profileInfo", profileInfo, userId);

  // Fetch seller profile info when component mounts

  useEffect(() => {
    getSellerProfileInfo(userId);
  }, []);

  // Update avatar state when profile info changes

  useEffect(() => {
    if (profileInfo.profileImage) {
      setAvatar(profileInfo.profileImage);
    }
  }, [profileInfo]);

  // Handle image change for profile picture

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    updateProfileImage(e.target.files[0]);
  };

  const handleReset = () => {
    setAvatar(defaultImage);
  };
  const navigate = useNavigate();

  return (
    <div>
      <div className="max-w-5xl px-5 py-6 mx-auto rounded-lg min-h-dvh">
        <h2 className="px-4 py-3 mb-6 text-xl font-bold text-center sm:text-2xl sm:text-left sm:ml-8">
          My Profile
        </h2>
        <div>
          <div className="flex flex-col py-4 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
            <div className="text-center md:px-10">
              <div className="avatar">
                <div className="relative w-48 rounded-xl">
                  <img
                    className="w-full h-full"
                    src={avatar}
                    alt={profileInfo.firstname + " " + profileInfo.lastname}
                  />
                </div>
              </div>
              <div className="relative mt-4">
                <input
                  type="file"
                  name="photo"
                  id="upload-photo"
                  className="absolute opacity-0 z-[-1]"
                  style={{ cursor: "pointer" }}
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <label
                  htmlFor="upload-photo"
                  className="px-4 py-2 font-medium text-black rounded-lg cursor-pointer btn btn-secondary"
                >
                  Change Avatar
                </label>
              </div>
            </div>
            <div className="pt-6 lg:w-3/4 lg:pt-0">
              <form>
                <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-6 ">
                  <div className="flex flex-col w-full">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      readOnly
                      value={profileInfo.firstname}
                      className="w-full mt-4 text-black border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      readOnly
                      value={profileInfo.lastname}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-4 space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                  <div className="flex flex-col w-full">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      readOnly
                      value={profileInfo.email}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="contact">Contact</label>
                    <input
                      type="tel"
                      name="contact"
                      placeholder="Contact"
                      readOnly
                      value={profileInfo.contactNumber}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-4 space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                  <div className="flex flex-col w-full">
                    <label htmlFor="address">Company Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      readOnly
                      value={profileInfo.companyAddress}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      readOnly
                      value={profileInfo.companyName}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                </div>

                <div className="flex flex-col mt-10 space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                  <div className="flex flex-col w-full">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      readOnly
                      value={profileInfo.city}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="zip code"> Company zip code</label>
                    <input
                      type="text"
                      name="zip code"
                      placeholder="Zip code"
                      readOnly
                      value={profileInfo.companyZipCode}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="zip code"> Cuisine</label>
                    <input
                      type="text"
                      name="cuisine"
                      placeholder="Cuisine"
                      readOnly
                      value={profileInfo.cuisine}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-4 space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                  <div className="flex flex-col w-full">
                    <label htmlFor="province">Province</label>
                    <input
                      type="text"
                      name="province"
                      placeholder="Province"
                      readOnly
                      value={profileInfo.province}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      readOnly
                      value={"Canada"}
                      className="w-full mt-4 border-0 bg-zinc-300 focus:outline-none input input-bordered"
                    />
                  </div>
                </div>
                <div className="flex mt-8 space-x-6 align-baseline">
                  <button
                    className="px-4 py-2 rounded-lg btn btn-secondary"
                    onClick={() => navigate("/foodprovider/edit-profile")}
                  >
                    Edit Profile
                  </button>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg btn btn-secondary"
                    onClick={() => navigate("/foodprovider/reset-password")}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileSeller;
