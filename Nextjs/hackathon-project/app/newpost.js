import React, { useEffect, useRef } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

const PostModal = ({ userinfo, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside of the modal content
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

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
            <p className="text-gray-500 text-sm">{formatDate(elem.time)}</p>
          </div>
        </div>

        {/* Full Caption */}
        <div className="mb-4">
          <h1 className="text-gray-800 text-xl">{elem.text}</h1>
        </div>

        {/* Image */}
        <img
          src={elem.image}
          alt={elem.text}
          className="w-full h-auto object-cover rounded-lg mb-4"
        />
      </div>
    </div>
  );
};

export default PostModal;
