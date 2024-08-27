"use client";
import { getAllPlantNames, getPlantInfo, getUserPlants } from "@/app/functions";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import PlantFrame from "./PlantFrame";

const greenery = () => {
  const [string, setstring] = useState("lodaing");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [plants, setplants] = useState([]);
  const [myplantschecked, setmyplantschecked] = useState(false);
  const [allplantschecked, setallplantschecked] = useState(true);

  const handleShowMyPlants = async () => {
    setmyplantschecked(true);
    setallplantschecked(false);
    const ps = await getUserPlants(parseInt(Cookies.get("userid")));
    setplants(ps);
  };

  const handleShowAllPlants = async () => {
    setallplantschecked(true);
    setmyplantschecked(false);
    const ps = await getAllPlantNames();
    setplants(ps);
  };
  const fetchData = async () => {
    const info = await getPlantInfo("Mango");
    setstring(JSON.stringify(info));
    //console.log(string);
    setdescription(info.description);
    setimage(info.image);
    const ps = await getAllPlantNames();
    setplants(ps);
  };
  useEffect(() => {
    fetchData();
  }, [string]);
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          className={`${
            myplantschecked
              ? "bg-red-500 border border-yellow-300"
              : "bg-green-500"
          } text-white transform transition-transform duration-300 hover:scale-110 p-4 rounded-xl mr-2 sm:mr-12`}
          onClick={handleShowMyPlants}
        >
          My Plants
        </button>
        <button
          className={`${
            allplantschecked
              ? "bg-red-500 border border-yellow-300"
              : "bg-green-500"
          } text-white transform transition-transform duration-300 hover:scale-110 p-4 rounded-xl mr-2 sm:mr-12`}
          onClick={handleShowAllPlants}
        >
          All Plants
        </button>
      </div>
      <div>greenery</div>
      <div>
        {Array.isArray(plants) && plants.length > 0
          ? plants.map((plantName, index) => (
              <PlantFrame plantName={plantName} />
            ))
          : null}
      </div>

      <h1>{description} </h1>
      {image === "No image available" ? null : <img src={image} />}
    </>
  );
};

export default greenery;
