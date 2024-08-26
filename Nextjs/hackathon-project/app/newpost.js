import React, { useEffect, useRef, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { getUserInfo } from "./functions";
import Cookies from "js-cookie";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

const Newpost = ({ isOpen, onClose, type }) => {
  const modalRef = useRef(null);
  const [userinfo, setuserinfo] = useState([]);
  const [image, setimage] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadImage(file) {
    const base64String = await convertImageToBase64(file);
    const base64Data = base64String.split(",")[1]; // Remove the data URL part

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64Data,
        type: "newpost",
        userId: 6,
        text: "A new post insertion",
        advice_or_plantation: "advice",
        plantId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const result = await response.json();
    // console.log("Image URL: " + JSON.stringify(result)); // Log the image URL from Cloudinary
  }
  const handleSubmit = async () => {
    await uploadImage(file);
  };
  const checkit = () => {
    if (file === null) return <h1 className="text-black">IMage no got</h1>;
    else return <h1 className="text-black">IMage got</h1>;
  };

  const fetchData = async () => {
    const info = await getUserInfo(parseInt(Cookies.get("userid")));
    setuserinfo(info[0]);
  };

  const printUserInfo = () => {
    console.log(JSON.stringify(userinfo));
  };

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
        </div>

        {/* Full Caption */}
        <div className="mb-4">
          <h1 className="text-gray-800 text-xl">{"text box"}</h1>
          <input
            className="rounded-3xl w-full min-h-16 border border-gray-500 p-4 text-black"
            type="text"
            placeholder={`Type your ${type} post please`}
          ></input>
        </div>

        {/* Image */}

        <input type="file" onChange={handleFileChange} />
        <button
          type="submit"
          className="text-black border border-black"
          onClick={handleSubmit}
        >
          Upload Image
        </button>

        {checkit()}
      </div>
    </div>
  );
};

export default Newpost;
