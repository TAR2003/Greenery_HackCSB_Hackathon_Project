"use client";
import { getAllCommunityPosts, getUserPosts } from "@/app/functions";
import PostFrame from "@/app/postFrame";
import React, { useEffect, useState } from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

const CommunityID = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(0);

  const fetchData = async () => {
    const data = await getUserPosts(parseInt(params.id));
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
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Join Our <span className="text-green-300">Green Community</span>!
        </h1>
        <p className="mt-6 text-lg max-w-prose text-gray-500 text-muted-foreground">
          Welcome to Greenary Community. Every post in our community is shared
          by nature enthusiasts like you, fostering growth and sustainability.
        </p>
        <br></br>
      </div>

      {/* Posts Section */}
      <div className="flex flex-wrap justify-around w-full">
        {posts.slice(0, visiblePosts).map((post, index) => (
          <PostFrame
            key={index}
            elem={post}
            type="community"
            className="transform transition-transform m-4"
            style={{ animation: `zoomIn 1s ease-in-out ${index * 0}ms` }}
          />
        ))}
      </div>
    </>
  );
};

export default CommunityID;
