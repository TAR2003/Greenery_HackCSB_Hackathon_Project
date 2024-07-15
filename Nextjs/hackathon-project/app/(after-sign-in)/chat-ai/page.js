"use client";
import React, { useState, useEffect } from "react";
import { getinfo } from "@/app/functions"; // Import your async function

const ChatAI = () => {
  const [name, setName] = useState("Loading..."); // Initial state

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  // Async function to fetch data
  const fetchData = async () => {
    try {
      const data = await getinfo(); // Call your async function
      setName(data[0].name); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      setName("Failed to fetch data"); // Update state on error
    }
  };

  return (
    <div className="bg-black text-white">
      <h1>{name}</h1> {/* Display fetched data */}
      <button onClick={fetchData}>Fetch Data</button>{" "}
      {/* Button to trigger fetching */}
    </div>
  );
};

export default ChatAI;
