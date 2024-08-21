"use client";
import { getAllCommunityPosts } from "@/app/functions"; // Adjust this path based on your project structure
import PostFrame from "@/app/postFrame"; // Adjust this path based on your project structure
import React, { useEffect, useState } from "react";

const CommunityID = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const data = await getAllCommunityPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Community</h1>
      <div className="flex flex-wrap overflow-y-auto w-full">
        {posts.map((post, index) => (
          <PostFrame key={index} elem={post} />
        ))}
      </div>
    </>
  );
};

export default CommunityID;
