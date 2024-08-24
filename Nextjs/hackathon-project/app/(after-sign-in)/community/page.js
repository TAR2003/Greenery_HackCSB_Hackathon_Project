"use client";
import { getAllCommunityPosts } from "@/app/functions";
import PostFrame from "@/app/postFrame";
import React, { useEffect, useState } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

const CommunityID = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(0);

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
        setVisiblePosts((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [visiblePosts, posts.length]);

  return (
    <>
      {/* Posts Section */}
      <div className="flex flex-wrap justify-around w-full">
        <div
          className={`border border-gray-300 bg-white w-96 h-92 p-4 rounded-3xl shadow-lg m-4 transform transition-transform duration-300 hover:scale-110`}
          style={{ animation: `zoomIn 1s ease-in-out ${0}ms` }}
        >
          <h1>Click here to create new Community Post</h1>
        </div>
        {posts.slice(0, visiblePosts).map((post, index) => (
          <PostFrame
            key={index}
            elem={post}
            type="community"
            className="transform transition-transform m-4"
            style={{
              animation: `zoomIn 1s ease-in-out ${index * 0}ms`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default CommunityID;
