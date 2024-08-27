"use client";
import {
  findPlant,
  getAllCommunityPosts,
  getAllHarvestPosts,
  getPlantHarvests,
  getPlantNamesStartingWith,
} from "@/app/functions";

import PostFrame from "@/app/postFrame";
import React, { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import Cookies from "js-cookie";

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

const CommunityID = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(0);
  const [relevant, setRelevant] = useState(true);
  const [all, setAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchData = async (relevant) => {
    //console.log("the type " + all + "  " + relevant);
    if (relevant == false) {
      const data = await getAllHarvestPosts();
      setPosts(data);
      setVisiblePosts(0);
    } else if (relevant == true) {
      const data = await getPlantHarvests(parseInt(Cookies.get("userid")));
      //console.log(JSON.stringify(data));
      setPosts(data);
      setVisiblePosts(0);
    }
    // Reset visiblePosts when new data is fetched
  };

  useEffect(() => {
    fetchData(true); // Fetch data on component mount
  }, []); // Empty dependency array ensures this runs only once

  const handleClickRelevant = () => {
    setSearchText("");
    setRelevant(true);
    setAll(false);
    fetchData(true);
  };

  const handleClickAll = () => {
    setSearchText("");
    setRelevant(false);
    setAll(true);
    fetchData(false);
  };

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
    if (searchText === "") {
      // setfilter(false);
      await fetchData(relevant);
      return;
    }
    // setfilter(true);
    const p = await findPlant(searchText);
    if (p.length == 0) {
      //setplantid(0);
      return;
    }
    console.log(JSON.stringify(p[0]));
    //setplantid(p[0].id);
    let arr = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].plant_id == p[0].id) arr.push(posts[i]);
    }
    setPosts(arr);
    setVisiblePosts(0);
  };

  useEffect(() => {
    if (visiblePosts < posts.length) {
      const timeout = setTimeout(() => {
        setVisiblePosts((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [visiblePosts, posts.length]);

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-8">
        <button
          onClick={handleClickRelevant}
          className={
            (relevant ? `bg-red-600 text-white` : `bg-white text-black`) +
            " border border-black p-4 rounded-2xl hover:bg-green-600 transfrom transition-transform hover:scale-125 duration-300"
          }
        >
          Relevant
        </button>
        <button
          onClick={handleClickAll}
          className={
            (all ? `bg-red-600 text-white` : `bg-white text-black`) +
            " border border-black p-4 rounded-2xl hover:bg-green-600 transfrom transition-transform hover:scale-125 duration-300"
          }
        >
          All Posts
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
      {/* Posts Section */}
      <div className="flex flex-wrap justify-around w-full">
        {Array.isArray(posts) &&
          posts
            .slice(0, visiblePosts)
            .map((post, index) => (
              <PostFrame
                key={index}
                elem={post}
                type="harvest"
                className="transform transition-transform m-4"
                style={{ animation: `zoomIn 1s ease-in-out ${index * 0}ms` }}
              />
            ))}
      </div>
    </>
  );
};

export default CommunityID;
