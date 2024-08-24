import React, { useEffect, useState } from "react";
import { getHarvestComments, getPostComments, getUserInfo } from "./functions";
import { formatDistanceToNow, parseISO } from "date-fns";
import PostModal from "./PostModal"; // Import the PostModal component

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

const PostFrame = ({ elem, className, style, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userinfo, setuserinfo] = useState("");
  const [liked, setliked] = useState(false);
  const [disliked, setdisliked] = useState(false);
  const [comments, setComments] = useState([]);
  const [likeNumber, setLikeNumber] = useState(0);
  const [dislikeNumber, setDislikeNumber] = useState(0);

  const handleLikeClick = () => {
    setdisliked(false);
    setliked(!liked);
  };

  const handleDislikeClick = () => {
    setliked(false);
    setdisliked(!disliked);
  };
  const styles = {
    community: {
      background: "#E0F7FA",
      color: "#A8D5BA", // Pale Mint for primary text
      secondaryColor: "#D1D5DB", // Light Gray for secondary text
      buttonColor: "#D4AF37", // Muted Gold for buttons/links
    },
    harvest: {
      background: "#F5F5DC",
      color: "#FFD700", // Light Gold for primary text
      secondaryColor: "#FFDAB9", // Light Peach for secondary text
      buttonColor: "#FFA07A", // Soft Orange for buttons/links
    },
  };

  // Determine which style to apply
  const appliedStyle = type === "community" ? styles.community : styles.harvest;
  const fetchData = async () => {
    const info = await getUserInfo(elem.user_id);

    setuserinfo(info[0]);

    if (type === "community") {
      const commentInfo = await getPostComments(parseInt(elem.id));
      setComments(commentInfo);
    } else if (type === "harvest") {
      // console.log(JSON.stringify(elem));
      const commentInfo = await getHarvestComments(parseInt(elem.id));
      setComments(commentInfo);
    }
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
    <>
      <div
        className={`border border-gray-300  w-96 h-auto p-4 rounded-3xl shadow-lg flex flex-col m-4 transform transition-transform duration-300 hover:scale-110 ${className}`}
        style={{
          ...style,
          background: appliedStyle.background,
          color: appliedStyle.buttonColor,
        }}
      >
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
              <a href={`/profile/${userinfo.id}`}>{userinfo.name}</a>
            </h2>
            <p className="text-gray-500 text-sm">{formatDate(elem.time)}</p>
          </div>
        </div>

        {/* Caption above the image */}
        <div className="mb-2">
          <h1 className="text-gray-800 text-lg font-semibold text-center bg-white p-2 rounded-lg shadow-md">
            {elem.text.length > 40
              ? `${elem.text.substring(0, 40)}...`
              : elem.text}
          </h1>
          <button
            onClick={openModal}
            className="text-blue-500 text-sm mt-1 hover:underline"
          >
            See more
          </button>
        </div>

        {/* Image container */}
        <div className="relative w-full h-48">
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
            onClick={handleLikeClick}
            className={`${
              liked ? "bg-blue-600" : "bg-blue-300"
            } text-white flex justify-center border border-black items-center px-4 py-2 rounded-lg hover:bg-white flex-1 transform transition-transform duration-300 hover:scale-110`}
          >
            <img src="/like.png" className="w-6 h-6" />
          </button>

          <button
            onClick={handleDislikeClick}
            className={` ${
              disliked ? "bg-green-600" : "bg-green-300"
            } text-white flex border border-black justify-center items-center px-4 py-2 rounded-lg hover:bg-white flex-1 transform transition-transform duration-300 hover:scale-110`}
          >
            <img src="/dislike.png" className="w-6 h-6" />
          </button>

          <button
            className="bg-red-300 flex border gap-4 border-black justify-center text-black px-4 py-2 rounded-lg hover:bg-white flex-1 transform transition-transform duration-300 hover:scale-110"
            onClick={openModal}
          >
            {comments.length} <img src="/chat.png" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Modal for detailed post view */}
      <PostModal
        elem={elem}
        userinfo={userinfo}
        isOpen={isModalOpen}
        type={type}
        onClose={closeModal}
      />
    </>
  );
};

export default PostFrame;
