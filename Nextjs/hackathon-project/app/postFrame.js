import React, { useEffect, useState } from "react";
import { getUserInfo } from "./functions";

import { format, formatDistanceToNow, parseISO } from "date-fns";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

const PostFrame = ({ elem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userinfo, setuserinfo] = useState("");

  const fetchData = async () => {
    //console.log(elem);
    const info = await getUserInfo(elem.user_id);
    setuserinfo(info[0]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border border-gray-300 bg-white w-96 h-auto p-4 rounded-lg shadow-lg flex flex-col m-4 transform transition-transform duration-300 hover:scale-110">
      {/* Poster Information */}
      <div className="flex items-center mb-2">
        {/* Profile Picture */}
        <img
          src={userinfo.image}
          alt="Profile Picture"
          className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
        />
        <div className="ml-3">
          <h2 className="text-gray-800 font-semibold text-lg">
            {userinfo.name}
          </h2>
          <p className="text-gray-500 text-sm">{formatDate(elem.time)}</p>
        </div>
      </div>

      {/* Caption above the image */}
      <div className="mb-2">
        <h1 className="text-gray-800 text-lg font-semibold text-center bg-white p-2 rounded-lg shadow-md">
          {elem.text}
        </h1>
      </div>

      {/* Image container */}
      <div className="relative w-full h-40">
        {/* Image */}
        <img
          src={elem.image}
          alt={elem.text}
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </div>

      {/* Buttons */}
      <div className="flex mt-4 space-x-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex-1 ttransform transition-transform duration-300 hover:scale-110"
          onClick={() => alert("React button clicked")}
        >
          React
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex-1 transform transition-transform duration-300 hover:scale-110"
          onClick={openModal}
        >
          Comment
        </button>
      </div>

      {/* Modal for comments */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-gray-800 text-lg font-semibold mb-4">
              Comments
            </h2>
            {/* Comment form */}
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write a comment..."
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostFrame;
