import { getPlantInfo, getPlantNamesStartingWith } from "@/app/functions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PlantFrame = ({ plantName, style }) => {
  const [picture, setPicture] = useState("/tree.png");
  const router = useRouter();
  const handleClick = async () => {
    router.push("/plants/" + plantName.id);
  };
  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <button onClick={handleClick}>
      <div
        style={style}
        className="relative bg-green-300 text-gray-800 rounded-lg shadow-lg overflow-hidden w-52 h-14 mt-1 transform transition-transform duration-300 hover:scale-150 hover:shadow-2xl hover:bg-red-300"
      >
        {/* Content */}
        <div className="relative flex items-center justify-center h-full px-4 py-2">
          {/* Tree Image in Circle */}
          <div className="absolute left-2 w-14 h-14 rounded-full overflow-hidden">
            <img
              src={picture}
              alt="Tree"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Plant Name */}
          <h1 className="text-lg font-bold text-center z-10 ml-16">
            {plantName.name}
          </h1>
        </div>
      </div>
    </button>
  );
};

export default PlantFrame;
