import Cookies from "js-cookie";
import React, { useState } from "react";

const ChangeProfile = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await convertImageToBase64(file);
      setSelectedImage(base64Image);
      setPreviewImage(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleUploadClick = async () => {
    if (selectedImage) {
      try {
        await uploadImagePost(selectedImage);
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        window.location.reload();
      }
    } else {
      alert("Please select an image first.");
    }
  };

  async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadImagePost(base64Image) {
    const base64Data = base64Image.split(",")[1]; // Remove the data URL part

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64Data,
        type: "ChangeProfile",
        userId: parseInt(Cookies.get("userid")),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const result = await response.json();
    console.log("Image URL: " + JSON.stringify(result)); // Log the image URL from Cloudinary
  }

  // Stops the click event from propagating to the backdrop
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose} // Clicking outside the modal triggers onClose
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        onClick={handleModalClick}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Change Profile Picture</h2>

        {/* File input for selecting an image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        {/* Display a 44x44 version of the selected image */}
        {previewImage && (
          <div className="mt-4">
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-11 h-11 rounded-full"
            />
          </div>
        )}

        {/* Button to upload the selected image */}
        <div className="mt-4">
          <button
            onClick={handleUploadClick}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>

        <button onClick={onClose} className="mt-4 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangeProfile;
