import React from "react";

const layout = ({ children }) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #4B2E02, #3D1E1A)", // Deep Copper to Dark Mahogany
      }}
    >
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Celebrate the <span className="text-yellow-400">Harvest Season</span>!
        </h1>
        <p className="mt-6 text-lg max-w-prose text-white text-muted-foreground">
          Join us in honoring the bounty of nature. Our harvest celebration is a
          tribute to growth, abundance, and the shared joy of reaping what we
          sow.
        </p>
        <br></br>
      </div>
      {children}
    </div>
  );
};

export default layout;
