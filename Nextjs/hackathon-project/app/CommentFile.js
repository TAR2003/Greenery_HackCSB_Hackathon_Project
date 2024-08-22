"use client";
import React, { useEffect } from "react";

const CommentFile = ({ elem, className, style }) => {
  useEffect(() => {
    console.log("in the comment section " + elem);
  }, []);
  return (
    <div
      className={`bg-green-500 text-white border-red h-12 ${className}`}
      style={style}
    >
      <h1>We are at the comment file </h1>
      commentFile
    </div>
  );
};

export default CommentFile;
