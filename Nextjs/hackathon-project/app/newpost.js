import React, { useEffect, useRef, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  getPlantNamesStartingWith,
  getUserInfo,
  insertPlant,
} from "./functions";
import Cookies from "js-cookie";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

const Newpost = ({ isOpen, onClose, type }) => {
  const modalRef = useRef(null);
  const [userinfo, setuserinfo] = useState([]);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // State for image preview
  const [caption, setCaption] = useState("");
  const [adviceOrPlantation, setAdviceOrPlantation] = useState("plantation");
  const [plantName, setPlantName] = useState("");
  const [plantSuggestions, setPlantSuggestions] = useState([]); // For plant name suggestions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adviceChecked, setAdviceChecked] = useState(false);
  const [plantationChecked, setPlantationChecked] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const textareaRef = useRef(null);

  const toggleSuggestions = () => {
    setShowSuggestions((prev) => !prev); // Toggle visibility
  };

  const handleAdviceChange = () => {
    setAdviceChecked(!adviceChecked);
    // Ensure only one checkbox is checked
    if (plantationChecked) {
      setPlantationChecked(false);
    }
  };

  const handlePlantationChange = () => {
    setPlantationChecked(!plantationChecked);
    // Ensure only one checkbox is checked
    if (adviceChecked) {
      setAdviceChecked(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Generate a URL for the selected file and update the preview
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setAdviceOrPlantation(event.target.checked ? "advice" : "plantation");
  };

  const handlePlantNameChange = async (event) => {
    const inputValue = event.target.value;
    setPlantName(inputValue);
    //console.log(plantName);
    //console.log(inputValue.length + " is the lenthg");
    // Fetch plant name suggestions based on input
    if (inputValue.length > 0) {
      const response = await getPlantNamesStartingWith(inputValue);
      const suggestions = response;
      setPlantSuggestions(suggestions);
    } else {
      setPlantSuggestions([]);
    }
    //console.log(plantName);
  };

  const handleSuggestionClick = (suggestion) => {
    setPlantName(suggestion);
    setPlantSuggestions([]);
  };

  async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadImagePost(file) {
    const base64String = await convertImageToBase64(file);
    const base64Data = base64String.split(",")[1]; // Remove the data URL part

    const plantinfo = await insertPlant(plantName);
    console.log(plantName + " i the name searhed ");
    const plantId = plantinfo.plantId;
    console.log(JSON.stringify(plantinfo));

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64Data,
        type: "newpost",
        userId: parseInt(Cookies.get("userid")),
        text: caption,
        plantId: plantId, // You'll need to map plantName to plantId
        advice_or_plantation: plantationChecked ? "plantation" : "advice",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const result = await response.json();
    console.log("Image URL: " + JSON.stringify(result)); // Log the image URL from Cloudinary
  }

  async function uploadImageHarvest(file) {
    const base64String = await convertImageToBase64(file);
    const base64Data = base64String.split(",")[1]; // Remove the data URL part

    const plantinfo = await insertPlant(plantName);
    console.log(plantName + " i the name searhed ");
    const plantId = plantinfo.plantId;
    console.log(JSON.stringify(plantinfo));

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64Data,
        type: "newharvest",
        userId: parseInt(Cookies.get("userid")),
        text: caption,
        plantId: plantId, // You'll need to map plantName to plantId
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const result = await response.json();
    console.log("Image URL: " + JSON.stringify(result)); // Log the image URL from Cloudinary
  }

  useEffect(() => {
    console.log(plantName);
  }, [plantName]);

  const handleSubmit = async () => {
    console.log(plantName);
    setIsSubmitting(true);
    try {
      if (type === "community") await uploadImagePost(file);
      else if (type === "harvest") await uploadImageHarvest(file);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setCaption("");
      setFile(null);
      setPlantName("");
      setPlantationChecked(true);
      setAdviceChecked(false);
      onClose();
    }
    console.log("posting done ");
    window.location.reload();
  };

  const fetchData = async () => {
    const info = await getUserInfo(parseInt(Cookies.get("userid")));
    setuserinfo(info[0]);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [caption]);

  useEffect(() => {
    // Function to handle clicks outside of the modal content
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    fetchData();
    // Add event listener for clicks outside the modal
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  // Check if all required fields are filled
  const isFormComplete = caption && file && plantName && adviceOrPlantation;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 overflow-auto">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative max-h-screen overflow-y-auto"
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Profile Information */}
        <div className="flex items-center mb-4">
          <img
            src={userinfo.image}
            alt="Profile Picture"
            className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
          />
          <div className="ml-4">
            <h2 className="text-gray-800 font-semibold text-lg">
              {userinfo.name}
            </h2>
            <p className="text-gray-500 text-sm">{`new ${type} post`}</p>
          </div>
          <div className="border flex items-center justify-center text-black p-2 border-black rounded-lg ml-auto mr-8">
            <img
              src={
                type === "harvest"
                  ? "wheat.png"
                  : plantationChecked == true
                  ? `tree.png`
                  : "idea.png"
              }
              className="w-auto h-12"
            />
            <h1 className="text-xl">
              {type === "harvest"
                ? "Harvest Post"
                : plantationChecked == true
                ? `Plantation Post`
                : "Advice Post"}
            </h1>
          </div>
        </div>

        {/* Caption */}
        <div className="mb-4">
          <h1 className="text-gray-800 text-xl">Caption</h1>
          <textarea
            ref={textareaRef}
            className="rounded-3xl w-full min-h-16 border border-gray-500 p-4 text-black resize-none overflow-hidden"
            placeholder={`Type your ${type} post`}
            value={caption}
            onChange={handleCaptionChange}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <h1 className="text-gray-800 text-xl">Upload Image</h1>
          <input type="file" onChange={handleFileChange} />

          {/* Display Image Preview */}
          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Image Preview"
                className="w-40 h-auto border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>
        {type === "community" ? (
          <div className="flex flex-row gap-8 mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="advice"
                checked={adviceChecked}
                onChange={handleAdviceChange}
                className="mr-2"
              />
              <label htmlFor="advice" className="text-gray-800 text-xl">
                Advice
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="plantation"
                checked={plantationChecked}
                onChange={handlePlantationChange}
                className="mr-2"
              />
              <label htmlFor="plantation" className="text-gray-800 text-xl">
                Plantation
              </label>
            </div>
          </div>
        ) : null}

        {/* Plant Name Input with Suggestions */}
        <div className="mb-4 relative">
          <h1 className="text-gray-800 text-xl">Plant Name</h1>
          <input
            className="rounded-3xl w-full min-h-16 border border-gray-500 p-4 text-black"
            type="text"
            placeholder="Type the plant name"
            value={plantName}
            onChange={handlePlantNameChange}
          />
          <button
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
            onClick={toggleSuggestions}
          >
            {showSuggestions ? "Hide Suggestions" : "Show Suggestions"}
          </button>
          {showSuggestions && plantSuggestions.length > 0 && (
            <ul className="absolute bg-white text-black border border-gray-300 rounded-lg mt-2 w-full z-10">
              {plantSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion.name)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <button
          className={`rounded-3xl w-full p-4 text-white ${
            isFormComplete
              ? "bg-blue-500 hover:bg-green-500 transform transition-transform duration-300 hover:scale-105"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={isFormComplete ? handleSubmit : undefined}
          disabled={!isFormComplete}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Newpost;
