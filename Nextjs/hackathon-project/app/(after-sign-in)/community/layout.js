"use client";
import Newpost from "@/app/Newpost";
import React, { useState } from "react";

const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #013220, #004d40)", // Dark Forest Green to Midnight Green
          minHeight: "100vh",
        }}
        className="flex flex-col items-center justify-center"
      >
        <div className="py-6 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Join Our <span className="text-green-300">Green Community</span>!
          </h1>
          <p className="mt-4 text-lg max-w-prose text-white">
            Welcome to Greenary Community. Every post in our community is shared
            by nature enthusiasts like you, fostering growth and sustainability.
          </p>
        </div>
        <div className="w-full px-4 flex-grow">{children}</div>
      </div>

      <button onClick={openModal} className="fixed bottom-8 right-8">
        <img
          className="w-32 h-32 text-white transform transition-transform duration-300 hover:scale-150"
          src="/newpost.png"
          alt="New Post"
        />
      </button>

      <Newpost isOpen={isModalOpen} onClose={closeModal} type="community" />
    </>
  );
};

export default Layout;
