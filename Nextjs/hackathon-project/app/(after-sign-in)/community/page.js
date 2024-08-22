"use client";
import { getAllCommunityPosts } from "@/app/functions";
import PostFrame from "@/app/postFrame";
import React, { useEffect, useState } from "react";

const CommunityID = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(0); // Track the number of visible posts

  const fetchData = async () => {
    const data = await getAllCommunityPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (visiblePosts < posts.length) {
      const timeout = setTimeout(() => {
        setVisiblePosts((prev) => prev + 1); // Increase visible posts one by one
      }, 200); // Delay before showing the next post
      return () => clearTimeout(timeout);
    }
  }, [visiblePosts, posts.length]);

  return (
    <>
      <div className="flex flex-wrap overflow-y-auto w-full">
        <div
          className={`border border-gray-300 bg-white w-96 h-92 p-4 rounded-3xl shadow-lg  m-4 transform transition-transform duration-300 hover:scale-110`}
          style={{ animation: `zoomIn 1s ease-in-out ${0}ms` }}
        >
          <h1>Click here to create new Community Post</h1>
        </div>
        {posts.slice(0, visiblePosts).map((post, index) => (
          <PostFrame
            key={index}
            elem={post}
            className="transform transition-transform"
            style={{ animation: `zoomIn 1s ease-in-out ${0}ms` }} // Delay for each post
          />
        ))}
      </div>
    </>
  );
};

export default CommunityID;
