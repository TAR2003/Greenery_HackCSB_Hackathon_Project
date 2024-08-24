import React from "react";

const layout = ({ children }) => {
  return (
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
  );
};

export default layout;
