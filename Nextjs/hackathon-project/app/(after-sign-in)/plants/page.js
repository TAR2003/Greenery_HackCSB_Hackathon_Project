"use client";
import {
  findPlant,
  getAllPlantNames,
  getPlantInfo,
  getPlantNamesStartingWith,
  getUserPlants,
} from "@/app/functions";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import PlantFrame from "./PlantFrame";

const Greenery = () => {
  const [plants, setPlants] = useState([]);
  const [myPlantsChecked, setMyPlantsChecked] = useState(false);
  const [allPlantsChecked, setAllPlantsChecked] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [visibleplants, setvisibleplants] = useState(0);

  useEffect(() => {
    if (visibleplants < plants.length) {
      const timeout = setTimeout(() => {
        setvisibleplants((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [visibleplants, plants.length]);

  const handleSearchChange = async (e) => {
    setShowSuggestions(true);
    if (e.target.value === "") {
      setSuggestions([]);
      setSearchText("");
      setShowSuggestions(false);
      return;
    }

    setSearchText(e.target.value);
    const sg = await getPlantNamesStartingWith(e.target.value);
    setSuggestions(sg);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name);
    setShowSuggestions(false);
  };

  const handleSearchClick = async () => {
    setPlants([]);
    setSuggestions(false);
    //setfilter(true);
    const p = await findPlant(searchText);
    if (p.length == 0) {
      //setplantid(0);
      return;
    }
    //console.log(JSON.stringify(p[0]));
    let pinfo;
    if (myPlantsChecked) {
      pinfo = await getUserPlants(parseInt(Cookies.get("userid")));
    } else {
      pinfo = await getAllPlantNames();
    }
    //setplantid(p[0].id);
    let arr = [];
    for (let i = 0; i < pinfo.length; i++) {
      if (pinfo[i].id == p[0].id) arr.push(pinfo[i]);
    }
    setPlants(arr);
    setvisibleplants(0);
  };

  const handleShowMyPlants = async () => {
    setSearchText("");
    setPlants([]);
    setMyPlantsChecked(true);
    setAllPlantsChecked(false);
    const userPlants = await getUserPlants(parseInt(Cookies.get("userid")));
    setPlants(userPlants);
    setvisibleplants(0);
  };

  const handleShowAllPlants = async () => {
    setSearchText("");
    setPlants([]);
    setAllPlantsChecked(true);
    setMyPlantsChecked(false);
    const allPlants = await getAllPlantNames();
    setPlants(allPlants);
    setvisibleplants(0);
  };

  const fetchData = async () => {
    const allPlants = await getAllPlantNames();
    setPlants(allPlants);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center py-10">
      <div className="flex items-center justify-center mb-8 space-x-4">
        <button
          className={`${
            myPlantsChecked
              ? "bg-red-500 border border-yellow-300"
              : "bg-green-500"
          } text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110`}
          onClick={handleShowMyPlants}
        >
          My Plants
        </button>
        <button
          className={`${
            allPlantsChecked
              ? "bg-red-500 border border-yellow-300"
              : "bg-green-500"
          } text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-110`}
          onClick={handleShowAllPlants}
        >
          All Plants
        </button>
        <div className="relative flex flex-col items-center mb-4 w-72 text-black">
          <input
            type="text"
            placeholder="Search tree...."
            value={searchText}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {Array.isArray(suggestions) && showSuggestions && (
            <div className="absolute border border-gray-300 bg-white w-full mt-12 rounded shadow-lg z-10">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer text-black"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No suggestions</div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={handleSearchClick}
          className=" border border-black text-black hover:text-white p-4 rounded-2xl bg-white hover:bg-green-600 transform transition-transform hover:scale-125 duration-300"
        >
          Search
        </button>
      </div>
      <h1 className="text-3xl text-bold mb-2">
        We have found {plants.length} plants{" "}
      </h1>
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {Array.isArray(plants) && plants.length > 0 ? (
          plants.slice(0, visibleplants).map((plantName, index) => (
            <PlantFrame
              key={index}
              plantName={plantName}
              style={{
                animation: `zoomIn 1s ease-in-out ${index * 0}ms`,
              }}
            />
          ))
        ) : (
          <p className="text-gray-300 text-lg">No plants available</p>
        )}
      </div>
    </div>
  );
};

export default Greenery;
