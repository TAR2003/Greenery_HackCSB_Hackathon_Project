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
          Rise to the Challenge!{" "}
        </h1>
        <p className="mt-4 text-lg max-w-prose text-black">
          Join the Greenary Community's challenge and track your journey as a
          nature enthusiast. Every milestone you reach brings you closer to
          becoming a champion of sustainability. Let's grow together!
        </p>
      </div>
      <div className="w-full px-4 mt-6 flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
