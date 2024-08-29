"use client";
import { useEffect, useState } from "react";
import {
  findPlant,
  getAllCommunityPosts,
  getPlantNamesStartingWith,
  getPlantPosts,
} from "@/app/functions";
import PostFrame from "@/app/postFrame";
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
  const [loading, setloading] = useState(true);

  const fetchData = async (relevant) => {
    setloading(true);
    if (relevant === false) {
      const data = await getAllCommunityPosts();
      setPosts(data);
    } else if (relevant === true) {
      const data = await getPlantPosts(parseInt(Cookies.get("userid")));
      setPosts(data);
    }
    setloading(false);
    setVisiblePosts(0);
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  useEffect(() => {
    if (visiblePosts < posts.length) {
      const timeout = setTimeout(() => {
        setVisiblePosts((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [visiblePosts, posts.length]);

  // useEffect(() => {
  //   // Update suggestions based on search text
  //   if (searchText) {
  //     // Simulate fetching suggestions
  //     // Replace this with actual API call or filter logic
  //     const filteredSuggestions = posts
  //       .filter((post) =>
  //         post.title.toLowerCase().includes(searchText.toLowerCase())
  //       )
  //       .map((post) => post.title);
  //     setSuggestions(filteredSuggestions);
  //     setShowSuggestions(true);
  //   } else {
  //     setSuggestions([]);
  //     setShowSuggestions(false);
  //   }
  // }, [searchText, posts]);

  const handleClickRelevant = () => {
    setloading(true);
    setSearchText("");
    setRelevant(true);
    setAll(false);
    fetchData(true);
    setloading(false);
  };

  const handleClickAll = () => {
    setloading(true);
    setSearchText("");
    setRelevant(false);
    setAll(true);
    fetchData(false);
    setloading(false);
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
    setShowSuggestions(false);
    if (searchText === "") {
      // setfilter(false);
      await fetchData(relevant);
      return;
    }
    setloading(true);
    //setfilter(true);
    let data;
    if (relevant === false) {
      data = await getAllCommunityPosts();
    } else if (relevant === true) {
      data = await getPlantPosts(parseInt(Cookies.get("userid")));
    }
    const p = await findPlant(searchText);
    let arr = [];
    if (p.length == 0) {
      //setplantid(0);
      setPosts(arr);
      setVisiblePosts(0);
      setloading(false);
      return;
    }
    console.log(JSON.stringify(p[0]));
    //setplantid(p[0].id);

    for (let i = 0; i < data.length; i++) {
      if (data[i].plant_id == p[0].id) arr.push(data[i]);
    }
    setPosts(arr);
    setVisiblePosts(0);
    setloading(false);
  };

  return (
    <>
      <div className="flex items-center flex-wrap justify-center gap-8 mb-4">
        <button
          onClick={handleClickRelevant}
          className={
            (relevant ? `bg-red-600 text-white` : `bg-white text-black`) +
            " border border-black p-4 rounded-2xl hover:bg-green-600 transform transition-transform hover:scale-125 duration-300"
          }
        >
          Relevant
        </button>
        <button
          onClick={handleClickAll}
          className={
            (all ? `bg-red-600 text-white` : `bg-white text-black`) +
            " border border-black p-4 rounded-2xl hover:bg-green-600 transform transition-transform hover:scale-125 duration-300"
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
      {loading ? (
        <div className="text-center mb-8">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full  border-t-white"></div>
          <p className="text-white text-xl mt-4">
            Searching community posts...
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-around w-full">
          {Array.isArray(posts) &&
            posts.slice(0, visiblePosts).map((post, index) => (
              <PostFrame
                key={index}
                elem={post}
                type="community"
                className="transform transition-transform m-4"
                style={{
                  animation: `zoomIn 1s ease-in-out ${index * 0}ms`,
                }}
              />
            ))}
          {posts.length == 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4">
                  No Post Available
                </h2>
                <p className="text-gray-400">
                  It looks like there are no community posts here with the
                  restrictions at the moment. Be the first to share something
                  with the community!
                </p>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default CommunityID;
