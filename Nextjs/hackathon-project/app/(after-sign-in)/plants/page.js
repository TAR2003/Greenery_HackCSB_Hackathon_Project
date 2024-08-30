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
  const [loading, setloading] = useState(true);

  // useEffect(() => {
  //   if (visibleplants < plants.length) {
  //     const timeout = setTimeout(() => {
  //       setvisibleplants((prev) => prev + 1);
  //     }, 200);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [visibleplants, plants.length]);

  const handleSearchChange = async (e) => {
    setShowSuggestions(true);
    if (e.target.value === "") {
      setSuggestions([]);
      setSearchText("");
      setShowSuggestions(false);
      await handleCLickAdvanced("");
      return;
    }

    setSearchText(e.target.value);
    const sg = await getPlantNamesStartingWith(e.target.value);
    setSuggestions(sg);
    await handleCLickAdvanced(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name);
    setShowSuggestions(false);
  };

  const handleCLickAdvanced = async (searchText) => {
    setloading(true);
    setPlants([]);
    setSuggestions(false);

    let pinfo;
    if (myPlantsChecked) {
      pinfo = await getUserPlants(parseInt(Cookies.get("userid")));
    } else {
      pinfo = await getAllPlantNames();
    }
    //setplantid(p[0].id);
    if (searchText === "") {
      setPlants(pinfo);
      setloading(false);
      return;
    }

    //starts

    const sortedPlants = pinfo.sort((a, b) => a.name.localeCompare(b.name));

    const lowercasedSearchText = searchText.toLowerCase();

    const startsWithMan = sortedPlants.filter((plant) =>
      plant.name.toLowerCase().startsWith(lowercasedSearchText)
    );

    const containsMan = sortedPlants.filter(
      (plant) =>
        plant.name.toLowerCase().includes(lowercasedSearchText) &&
        !plant.name.toLowerCase().startsWith(lowercasedSearchText)
    );

    // Step 4: Combine the two arrays, with 'startsWithMan' elements first
    const result = [...startsWithMan, ...containsMan];

    //ends

    setPlants(result);
    setloading(false);
  };

  const handleSearchClick = async () => {
    await handleCLickAdvanced(searchText);
  };

  const handleShowMyPlants = async () => {
    setloading(true);
    setSearchText("");
    setPlants([]);
    setMyPlantsChecked(true);
    setAllPlantsChecked(false);
    const userPlants = await getUserPlants(parseInt(Cookies.get("userid")));
    setPlants(userPlants);
    setloading(false);
    //setvisibleplants(0);
  };

  const handleShowAllPlants = async () => {
    setloading(true);
    setSearchText("");
    setPlants([]);
    setAllPlantsChecked(true);
    setMyPlantsChecked(false);
    const allPlants = await getAllPlantNames();
    setPlants(allPlants);
    setloading(false);
    //setvisibleplants(0);
  };

  const fetchData = async () => {
    setloading(true);
    const allPlants = await getAllPlantNames();
    setPlants(allPlants);
    setloading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-row items-center flex-wrap justify-center mb-8 gap-8">
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
        </div>
        <button
          onClick={handleSearchClick}
          className=" border border-black text-black hover:text-white p-4 rounded-2xl bg-white hover:bg-green-600 transform transition-transform hover:scale-125 duration-300"
        >
          Search
        </button>
      </div>

      <div className="flex flex-col items-center py-10">
        {loading ? (
          <div className="text-center mb-8">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full  border-t-white"></div>
            <p className="text-white text-xl mt-4">Searching plants...</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2">
              We have found {plants.length} plants
            </h1>
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {Array.isArray(plants) && plants.length > 0 ? (
                plants.map((plantName, index) => (
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
          </>
        )}
      </div>
    </>
  );
};

export default Greenery;
