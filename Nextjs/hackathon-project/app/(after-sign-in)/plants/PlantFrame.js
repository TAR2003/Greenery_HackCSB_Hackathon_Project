import React from "react";

const PlantFrame = ({ plantName }) => {
  return (
    <>
      <div>
        {" "}
        <h1>{plantName.name}</h1>
      </div>
    </>
  );
};

export default PlantFrame;
