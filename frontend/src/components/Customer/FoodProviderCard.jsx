/**
 * Author: Savan Patel
 */

import React from "react";

const FoodProviderCard = ({ provider, handleClick }) => {
  return (
    <div
      className="overflow-hidden bg-white rounded-lg shadow-md cursor-pointer"
      onClick={() => handleClick(provider.foodServiceProviderId)}
    >
      <img
        src={
          provider.profileImage ||
          "https://res.cloudinary.com/dk1fim9hl/image/upload/v1722358736/TiffinBox/Food_Provider_eesnwt.png"
        }
        alt={provider.name}
        className="object-cover w-full h-48 border-b-2"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{provider.companyName}</h3>
        <p className="text-gray-600">
          {provider.firstName} {provider.lastName}
        </p>
        <p className="text-gray-600">
          {provider.companyAddress}, {provider.city}
        </p>
        <p className="text-gray-600">{provider.province}</p>
        <p className="text-gray-600">{provider.contact}</p>
      </div>
    </div>
  );
};

export default FoodProviderCard;
