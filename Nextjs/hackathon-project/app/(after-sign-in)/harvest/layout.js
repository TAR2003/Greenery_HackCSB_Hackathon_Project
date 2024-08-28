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
          background: "linear-gradient(135deg, #4B2E02, #3D1E1A)", // Deep Copper to Dark Mahogany
          minHeight: "100vh",
        }}
        className="flex flex-col items-center justify-center"
      >
        <div className="py-6 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Celebrate the{" "}
            <span className="text-yellow-400">Harvest Season</span>!
          </h1>
          <p className="mt-4 text-lg max-w-prose text-white">
            Join us in honoring the bounty of nature. Our harvest celebration is
            a tribute to growth, abundance, and the shared joy of reaping what
            we sow.
          </p>
        </div>
        <div className="w-full px-4 flex-grow">{children}</div>
      </div>

      <button onClick={openModal} className="fixed bottom-8 right-8">
        <img
          className="w-28 h-28 rounded-3xl transform transition-transform duration-300 hover:scale-150"
          src="/newpostharvest.png"
          alt="New Post"
        />
      </button>

      <Newpost isOpen={isModalOpen} onClose={closeModal} type="harvest" />
    </>
  );
};

export default Layout;
