"use client";
import Newpost from "@/app/Newpost";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #2C3E50, #1C1C1C)", // Dark Slate Blue to Deep Charcoal Gray
        minHeight: "100vh",
      }}
      className="flex flex-col items-center justify-between"
    >
      <div className="py-6 w-full text-center flex flex-col items-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
          Find all the <span className="text-green-300">Beautiful Plants</span>{" "}
          inside our app !
        </h1>
        <p className="mt-4 text-lg max-w-prose text-gray-200">
          Explore the vibrant world of greenery with us. Our plant collection is
          a celebration of life, growth, and the natural wonders that surround
          us every day.
        </p>
      </div>
      <div className="w-full px-4 mt-6 flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
