import React, { useEffect, useRef, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import CommentFile from "./CommentFile";
import {
  addReactPost,
  getDislikeNumberPost,
  getHarvestComments,
  getLikeNumberPost,
  getPostComments,
  getReactStatePost,
  insertNewCommentinHarvest,
  insertNewCommentinPost,
  removeReactPost,
} from "./functions";
import Cookies from "js-cookie";

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

const PostModal = ({ elem, userinfo, isOpen, onClose, type }) => {
  const [comments, setComments] = useState([]); //The comments
  const [visibleComments, setVisibleComments] = useState(0); // Track visible comments
  const modalRef = useRef(null); // for the current modal
  const [liked, setliked] = useState(false);
  const [disliked, setdisliked] = useState(false);
  const [writeComment, setwriteComment] = useState("");
  const [likeNumber, setLikeNumber] = useState(0);
  const [dislikeNumber, setDislikeNumber] = useState(0);

  const handleLikeClick = async () => {
    if (disliked) {
      await removeReactPost(parseInt(Cookies.get("userid")), elem.id, type);
      setdisliked(false);
    }
    if (liked) {
      await removeReactPost(parseInt(Cookies.get("userid")), elem.id, type);
      setliked(false);
    } else {
      await addReactPost(
        parseInt(Cookies.get("userid")),
        elem.id,
        "like",
        type
      );
      setliked(true);
    }
    await countNumbers();
  };

  const handleDislikeClick = async () => {
    if (liked) {
      await removeReactPost(parseInt(Cookies.get("userid")), elem.id, type);
      setliked(false);
    }
    if (disliked) {
      await removeReactPost(parseInt(Cookies.get("userid")), elem.id, type);
      setdisliked(false);
    } else {
      await addReactPost(
        parseInt(Cookies.get("userid")),
        elem.id,
        "dislike",
        type
      );
      setdisliked(true);
    }

    await countNumbers();
  };

  const countNumbers = async () => {
    const likes = await getLikeNumberPost(parseInt(elem.id), type);
    const dislikes = await getDislikeNumberPost(parseInt(elem.id), type);
    // console.log(likes[0].count + " " + JSON.stringify(dislikes));
    setLikeNumber(likes[0].count);
    setDislikeNumber(dislikes[0].count);
    const likeinfo = await getReactStatePost(
      parseInt(Cookies.get("userid")),
      elem.id,
      type
    );
    if (likeinfo.length == 0) {
      setliked(false);
      setdisliked(false);
    } else if (likeinfo[0].react === "like") {
      setliked(true);
    } else {
      setdisliked(true);
    }
  };

  // Fetch comments when the modal is opened
  const fetchData = async () => {
    // Replace this with your actual data fetching logic
    // console.log(elem);
    //console.log(type + " is the type of content");
    if (type === "community") {
      const commentInfo = await getPostComments(parseInt(elem.id));
      setComments(commentInfo);
    } else if (type === "harvest") {
      // console.log(JSON.stringify(elem));
      const commentInfo = await getHarvestComments(parseInt(elem.id));
      setComments(commentInfo);
    }
    setVisibleComments(0);
    await countNumbers();
    //console.log(commentInfo);
  };

  const handleInputChange = (e) => {
    setwriteComment(e.target.value);
    //console.log(writeComment + " is the writeten one ");
  };

  const handleAddComment = async () => {
    //console.log("Write comment " + writeComment);
    if (writeComment === "") return;
    if (type == "community") {
      await insertNewCommentinPost(
        parseInt(Cookies.get("userid")),
        parseInt(elem.id),
        writeComment,
        null
      );
    }
    if (type == "harvest") {
      await insertNewCommentinHarvest(
        parseInt(Cookies.get("userid")),
        parseInt(elem.id),
        writeComment,
        null
      );
    }
    setwriteComment("");
    fetchData();
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
      setVisibleComments(0); // Reset visible comments
    }
  }, [isOpen]);

  useEffect(() => {
    // Function to handle clicks outside of the modal content
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener for clicks outside the modal
    document.addEventListener("mousedown", handleClickOutside);

    // Manage visible comments increment
    if (visibleComments < comments.length) {
      const timeout = setTimeout(() => {
        setVisibleComments((prev) => prev + 1); // Increase visible comments one by one
      }, 200); // Delay before showing the next comment

      return () => {
        clearTimeout(timeout); // Clear the timeout on cleanup
      };
    }

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, visibleComments, comments.length]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 py-12 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 overflow-auto"
      style={{ animation: `zoomIn 0.5s ease-in-out ${0}ms` }}
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
            src={
              userinfo === undefined
                ? "/user/masnoon.png"
                : `${userinfo.image}`
            }
            alt="Profile Picture"
            className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
          />
          <div className="ml-4">
            <h2 className="text-gray-800 font-semibold text-lg">
              <a href={`/profile/${userinfo.id}`}>{userinfo.name}</a>
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
        <div className="flex mt-4 space-x-4">
          <button
            onClick={handleLikeClick}
            className={`${
              liked ? "bg-blue-600" : "bg-blue-300"
            }  flex justify-center border text-black gap-4 border-black items-center px-4 py-2 rounded-lg hover:bg-white flex-1 transform transition-transform duration-300 hover:scale-110`}
          >
            {likeNumber}
            <img src="/like.png" className="w-6 h-6" />
          </button>

          <button
            onClick={handleDislikeClick}
            className={` ${
              disliked ? "bg-green-600" : "bg-green-300"
            } text-black flex border border-black gap-4 justify-center items-center px-4 py-2 rounded-lg hover:bg-white flex-1 transform transition-transform duration-300 hover:scale-110`}
          >
            {dislikeNumber}
            <img src="/dislike.png" className="w-6 h-6" />
          </button>

          <button className="bg-red-300 flex gap-4 border border-black justify-center text-black px-4 py-2 rounded-lg hover:bg-white flex-1 transform transition-transform duration-300 hover:scale-110">
            {comments.length} <img src="/chat.png" className="w-6 h-6" />
          </button>
        </div>

        <div className="m-4 bg-gradient-to-r from-blue-100 to-teal-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Leave a Comment
          </h2>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
            placeholder="Write your comment..."
            onChange={handleInputChange}
            value={writeComment}
          ></textarea>
          <button
            onClick={handleAddComment}
            className="mt-4 w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition-all duration-300"
          >
            Submit
          </button>
        </div>
        {Array.isArray(comments) &&
          comments.slice(0, visibleComments).map((comment, index) => (
            <CommentFile
              key={index}
              elem={comment}
              className="transform transition-transform"
              style={{ animation: `zoomIn 1s ease-in-out ${0}ms` }} // Delay for each post
            />
          ))}
      </div>
    </div>
  );
};

export default PostModal;
