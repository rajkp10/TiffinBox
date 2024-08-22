/**
 * Author: Bhavya Dave
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../../config/axiosConfig";

function AllReviewsPage() {
  const { foodProviderId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [averageRating, setAverageRating] = useState(0);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(
          `/reviews/foodServiceProvider/${foodProviderId}`
        );
        console.log("Response data:", response.data);

        const fetchedReviews = response.data.map((review) => ({
          ...review,
          user: {
            name: `${review.firstName} ${review.lastName}`,
            image: "",
          },
          text: review.reviewDescription,
          rating: review.reviewStars,
        }));
        setReviews(fetchedReviews);

        const totalStars = fetchedReviews.reduce(
          (acc, curr) => acc + curr.rating,
          0
        );
        const avgRating = totalStars / fetchedReviews.length || 0;
        setAverageRating(avgRating.toFixed(1));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchReviews();
  }, [foodProviderId]); // Dependency on foodProviderId to re-fetch if it changes

  const toggleReview = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100">
      <div className="w-full max-w-4xl overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-bold text-center">All Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-center text-gray-600">No reviews available</p>
          ) : (
            reviews.map((review, index) => (
              <div
                key={index}
                className="py-4 border-b border-gray-300 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={review.user.image || "path_to_default_image.jpg"}
                    alt={review.user.name}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">
                      {review.user.name}
                    </h3>
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
                      className={`mt-2 text-gray-600 ${
                        expandedReviews[index] ? "" : "truncate"
                      }`}
                    >
                      {expandedReviews[index]
                        ? review.text
                        : `${review.text.split(" ").slice(0, 20).join(" ")}${
                            review.text.split(" ").length > 20 ? "..." : ""
                          }`}
                    </p>
                    {review.text.split(" ").length > 20 && (
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => toggleReview(index)}
                      >
                        {expandedReviews[index] ? "See less" : "See more"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllReviewsPage;
