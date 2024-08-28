"use client";
import { getPlantInfo, getPlantName } from "@/app/functions";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [image, setImage] = useState("/tree.png");
  const [description, setDescription] = useState("No description available");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const n = await getPlantName(parseInt(params.id));
    setName(n[0].name);
    if (n === undefined || n[0].name === undefined) {
      setImage("/noimage.png");
      setDescription("Sorry, No description available for this plant");
      setLoading(false);
      return;
    }
    const info = await getPlantInfo(n[0].name);

    if (
      info !== undefined &&
      info.image !== undefined &&
      info.image.startsWith("https")
    ) {
      setImage(info.image);
      setDescription(info.description);
    } else {
      setImage("/noimage.png");
      setDescription("Sorry, No description available for this plant");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center mb-8">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-green-500"></div>
          <p className="text-white text-xl mt-4">Searching for the plant...</p>
        </div>
      ) : (
        <div className="bg-green-100 flex flex-col items-center justify-center p-2">
          <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-widest text-center text-black border border-black mb-2 bg-green-300 p-4 rounded-3xl">
            {name.toUpperCase()}
          </h1>
          <div className="mx-8 sm:mx-20 flex bg-white shadow-lg items-center justify-center rounded-3xl overflow-hidden border border-gray-300">
            <div className="flex flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 md:space-x-4">
              <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-3xl p-1 shadow-lg flex-shrink-0">
                <img
                  src={image}
                  alt={name}
                  className="w-64 h-64 object-cover bg-gray-100  border-4 border-white shadow-md"
                />
              </div>
              <div className="bg-gradient-to-r from-blue-300 to-blue-500 rounded-3xl p-1 shadow-lg flex-grow">
                <div className="flex-1 bg-white min-h-64 max-h-64 overflow-y-auto p-4 rounded-3xl">
                  <p className="text-gray-800  text-left ">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
