"use client";

import { useState } from "react";

export default function PlantIdentification() {
  const [file, setFile] = useState(null);
  const [organ, setOrgan] = useState("leaf"); // Default organ type
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(""); // State for error message

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(""); // Clear error when a file is selected
  };

  const handleOrganChange = (e) => {
    setOrgan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if file is provided
    if (!file) {
      setError("Please upload an image before identifying the plant.");
      return;
    }

    setLoading(true); // Set loading to true when the request starts
    setError(""); // Clear any previous error message

    const formData = new FormData();
    formData.append("file", file);
    formData.append("organ", organ); // Append the selected organ type

    const res = await fetch("/api/plant-identification", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false); // Set loading to false when the request completes
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Enhanced Aesthetic Message at the top of the page */}
      <header className="w-full bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 text-white p-8 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-2xl">
          🌿 Welcome to the Plant Identification Tool 🌱
        </h1>
        <p className="text-xl font-semibold italic drop-shadow-lg">
          Upload an image of a plant, select the organ type (leaf, flower,
          etc.), and let us help identify the plant.
        </p>
      </header>

      <div className="flex flex-col items-center justify-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-screen-md">
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer mb-4"
            />

            <select
              value={organ}
              onChange={handleOrganChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 mb-4"
            >
              <option value="leaf">Leaf</option>
              <option value="flower">Flower</option>
              <option value="fruit">Fruit</option>
              <option value="bark">Bark</option>
              <option value="auto">Auto</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Identify Plant
            </button>
          </form>

          {/* Display error message */}
          {error && (
            <div className="text-red-500 mb-4 text-center font-medium">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center mt-6">
              <div className="loader"></div>
            </div>
          )}

          {!loading && result && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Plant Identification Result:
              </h3>
              <div className="bg-green-50 p-4 rounded-lg shadow-lg">
                <h4 className="text-lg text-black font-bold mb-2">
                  Best Match:
                </h4>
                <p className="text-gray-800">
                  <strong>Scientific Name:</strong> {result.bestMatch}
                </p>

                <h4 className="text-lg text-black font-bold mt-4 mb-2">
                  Top Results:
                </h4>
                <div className="space-y-4">
                  {result.results.map((res, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <h5 className="text-md font-semibold text-gray-700">
                        {res.species.commonNames?.join(", ") ||
                          "No Common Name"}
                      </h5>
                      <p className="text-sm text-gray-600">
                        <strong>Scientific Name:</strong>{" "}
                        {res.species.scientificName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Family:</strong>{" "}
                        {res.species.family.scientificName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Confidence:</strong>{" "}
                        {(res.score * 100).toFixed(2)}%
                      </p>

                      {/* Display plant images */}
                      <div className="flex flex-wrap mt-2">
                        {res.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image.url.o}
                            alt={res.species.scientificName}
                            className="w-24 h-24 object-cover rounded-lg mr-2 mb-2"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
