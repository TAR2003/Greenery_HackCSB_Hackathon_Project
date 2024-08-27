"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const PlantSuggestion = () => {
  const [plants, setPlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlants = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api", {
          type: "getallplants",
          page: currentPage,
        });
        setPlants(response.data.plantDetailsFromWikipedia);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
      setLoading(false);
    };

    fetchPlants();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-extrabold text-center my-10 text-green-600">
        🌿 Discover Plants
      </h1>

      <p className="text-lg text-center text-gray-700 dark:text-gray-300 mb-10 ml-10">
        Explore the diverse range of plant species found in Bangladesh 🌱
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative flex flex-col items-center">
             {/* Animated plant icon */}
          <div className="animate-grow h-16 w-16 mb-4">
            <img
              src="/loading.jpg"  // Path to your image in the public folder
              alt="Loading Plant Icon"
              className="h-full w-full"
            />
          </div>
            <div className="text-2xl font-medium text-gray-500 animate-pulse">
              Loading plants...
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map((plant, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 p-6 flex flex-col items-center text-center"
              >
                <img
                  src={plant.wikipediaDetails.imageUrl}
                  alt={plant.scientificName}
                  className="w-48 h-48 object-cover rounded-full mb-6"
                />
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {plant.scientificName}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {plant.wikipediaDetails.details}
                </p>
                <a
                  href={plant.wikipediaDetails.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:underline font-semibold"
                >
                  Read more on Wikipedia
                </a>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-10 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-5 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 transition-all duration-300"
            >
              Previous
            </button>
            <span className="text-lg text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-5 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:opacity-50 transition-all duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlantSuggestion;