/**
 * Author: Raj Kamlesh Patel
 * Banner ID: B00978721
 * Email: rj227488@dal.ca
 */

import React from "react";

function SubscriptionCard({ subscription }) {
  console.log(subscription);
  return (
    <section className={`shadow card md:card-side bg-base-100`}>
      <figure className="h-60">
        <img
          src={subscription.mealImage}
          alt="Album"
          className="w-full h-full object-fit md:w-80"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-3xl card-title">{subscription.companyName}</h2>
        <p className="flex flex-col gap-2">
          <p className="font-bold">
            Meal Name:{" "}
            <span className="font-normal">{subscription.mealName}</span>
          </p>
          <p className="font-bold">
            Provider Email:{" "}
            <a
              href={`mailto:${subscription.contactEmail}`}
              className="font-normal border-b-2 border-b-primary"
            >
              {subscription.contactEmail}
            </a>
          </p>
          <p className="font-bold">
            Provider Phone:{" "}
            <a
              href={`phoneto:${subscription.contactNumber}`}
              className="font-normal border-b-2 border-b-primary"
            >
              {subscription.contactNumber}
            </a>
          </p>
          <p className="font-bold">
            Start Date:{" "}
            <span className="font-normal text-gray-500 text-md">
              {subscription.startDate}
            </span>
          </p>
          <p className="font-bold">
            End Date:{" "}
            <span className="font-normal text-gray-500 text-md">
              {subscription.endDate}
            </span>
          </p>
        </p>
      </div>
    </section>
  );
}

export default SubscriptionCard;
