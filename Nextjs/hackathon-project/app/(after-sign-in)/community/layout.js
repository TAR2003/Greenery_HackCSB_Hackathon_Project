"use client";
import Newpost from "@/app/Newpost";
import React, { useState } from "react";

const layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {" "}
      <div
        style={{
          background: "linear-gradient(135deg, #013220, #004d40)", // Dark Forest Green to Midnight Green
        }}
      >
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Join Our <span className="text-green-300">Green Community</span>!
          </h1>
          <p className="mt-6 text-lg max-w-prose text-white text-muted-foreground">
            Welcome to Greenary Community. Every post in our community is shared
            by nature enthusiasts like you, fostering growth and sustainability.
          </p>
          <br></br>
        </div>
        {children}
      </div>
      <button onClick={openModal}>
        <img
          className="fixed w-32 h-32 bottom-8 right-8  text-white  transform transition-transform duration-300 hover:scale-150"
          src="/newpost.png"
        />
      </button>
      <Newpost isOpen={isModalOpen} onClose={closeModal} type={"community"} />
    </>
  );
};

export default layout;
