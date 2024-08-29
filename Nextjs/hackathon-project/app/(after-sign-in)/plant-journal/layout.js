"use client";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #a8d5e2, #e2f4c6)", // Nature-Inspired Gradient
        minHeight: "100vh",
      }}
      className="flex flex-col items-center justify-between"
    >
      <div className="py-6 w-full text-center flex flex-col items-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-black">
          Cultivate Your <span className="text-green-700">Garden Journey</span>!
        </h1>
        <p className="mt-4 text-lg max-w-prose text-black">
          Document, Grow, Flourish. Your daily guide to nurturing and tracking
          your plant’s progress, ensuring a vibrant and thriving garden
          year-round.
        </p>
      </div>
      <div className="w-full px-4 mt-6 flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
