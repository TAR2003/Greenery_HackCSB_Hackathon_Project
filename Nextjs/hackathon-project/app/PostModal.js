import React, { useEffect, useRef, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import CommentFile from "./CommentFile";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

const PostModal = ({ elem, userinfo, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [comments, setcomments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(0);

  const fetchData = async () => {
    setcomments([1, 2, 3]);
    //onsole.log(comments);
  };

  useEffect(() => {
    // Function to handle clicks outside of the modal content
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener for clicks outside the modal
    document.addEventListener("mousedown", handleClickOutside);
    fetchData();

    // Manage visible comments increment
    if (visibleComments < comments.length) {
      const timeout = setTimeout(() => {
        setVisibleComments((prev) => prev + 1); // Increase visible comments one by one
      }, 200); // Delay before showing the next comment
      return () => {
        clearTimeout(timeout); // Clear the timeout on cleanup
        document.removeEventListener("mousedown", handleClickOutside); // Remove event listener on cleanup
      };
    } else {
      // Clean up the event listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [onClose, visibleComments, comments.length]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 py-12 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 overflow-auto"
      style={{ animation: `zoomIn 1s ease-in-out ${0}ms` }}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative max-h-screen overflow-y-auto"
      >
        {/* Close button */}
        <button
          className="absolute top-7  right-4 text-gray-600 hover:text-gray-900 text-2xl"
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

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex-1">
            React
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex-1">
            Comment
          </button>
        </div>
        <div className="bg-green-500 flex flex-col border-white text-white">
          {comments.slice(0, visibleComments).map((comment, index) => (
            <CommentFile
              key={index}
              elem={comment}
              className="transform transition-transform"
              style={{ animation: `zoomIn 1s ease-in-out ${0}ms` }} // Delay for each post
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostModal;
