/**
 * Author: Bhavya Dave
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../config/axiosConfig";

function ReviewsManagement() {
  const { foodProviderId } = useParams();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState(
    new Array(5).fill({ value: 0 })
  );
  const [averageRating, setAverageRating] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({});
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(
          `/reviews/foodServiceProvider/${foodProviderId}`
        );
        const fetchedReviews = response.data.map((review) => ({
          ...review,
          user: {
            name: `${review.firstName} ${review.lastName}`,
            image: review.image || "path_to_default_image.jpg",
          },
          text: review.reviewDescription,
          rating: review.reviewStars,
        }));

        setReviews(
          fetchedReviews.sort((a, b) => b.rating - a.rating).slice(0, 3)
        );
        const totalStars = fetchedReviews.reduce(
          (acc, curr) => acc + curr.rating,
          0
        );
        setAverageRating(
          fetchedReviews.length > 0 ? totalStars / fetchedReviews.length : 0
        );

        const distribution = new Array(5).fill(0).map((_, index) => ({
          value:
            (fetchedReviews.filter((review) => review.rating === 5 - index)
              .length /
              fetchedReviews.length) *
              100 || 0,
        }));
        setRatingDistribution(distribution);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReviews();
  }, [foodProviderId]);

  const toggleReview = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const reviewTextStyle = (index) => ({
    cursor: "pointer",
    width: "100%",
  });

  return (
    <div className="w-full min-h-screen p-5 bg-white">
      <div className="grid grid-cols-1 gap-4 mx-auto max-w-7xl md:grid-cols-3">
        <div className="flex items-center justify-between col-span-1 mb-4 md:col-span-3">
          <button
            onClick={() => navigate(`/customer/add-review/${foodProviderId}`)}
            className="px-4 py-2 text-white bg-blue-500 rounded shadow btn hover:bg-blue-600"
          >
            Add a Review
          </button>
          <button
            onClick={() => navigate(`/customer/all-reviews/${foodProviderId}`)}
            className="px-4 py-2 text-white bg-green-500 rounded shadow hover:bg-green-600"
          >
            View All Reviews
          </button>
        </div>
        <div className="col-span-1 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center">Ratings Overview</h2>
          <div className="flex items-center justify-center mb-4">
            <span className="text-6xl font-bold text-gray-800">
              {averageRating.toFixed(1)}
            </span>
            <span className="ml-3 text-5xl text-yellow-500">★</span>
          </div>
          <div className="space-y-3">
            {ratingDistribution.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="text-lg font-semibold text-right text-gray-600 w-14">
                  {5 - index} stars
                </div>
                <div className="flex-1 h-3 ml-4 overflow-hidden bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="col-span-1 p-4 bg-white rounded-lg shadow-lg md:col-span-2"
          style={{ width: "100%" }}
        >
          <h2 className="mb-4 text-2xl font-bold text-center">Top Reviews</h2>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="py-4 overflow-hidden border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center space-x-4 overflow-hidden">
                <img
                  src={review.user.image}
                  alt={review.user.name}
                  className="object-cover w-12 h-12 rounded-full"
                />
                <div className="flex-grow overflow-hidden">
                  <h3 className="text-lg font-semibold">{review.user.name}</h3>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p
                    style={reviewTextStyle(index)}
                    onClick={() => toggleReview(index)}
                  >
                    {expandedReviews[index]
                      ? review.text
                      : `${review.text.split(" ").slice(0, 20).join(" ")}${
                          review.text.split(" ").length > 20 ? "..." : ""
                        }`}
                    {review.text.split(" ").length > 20 && (
                      <span className="text-blue-500">
                        {expandedReviews[index] ? " See less" : " See more"}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewsManagement;
