"use client";
import {
  getUserAnswers,
  getUserHarvests,
  getUserPlants,
  getUserPosts,
} from "@/app/functions";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const challenge = () => {
  const [userplants, setuserplants] = useState("...");
  const [harvestedtimes, setharvestedtimes] = useState("...");
  const [communitypost, setcommunitypost] = useState("...");
  const [answeredqueries, setansweredqueries] = useState("...");

  const fetchData = async () => {
    let up;
    up = await getUserPlants(parseInt(Cookies.get("userid")));
    console.log(up.length);
    up = await getUserHarvests(parseInt(Cookies.get("userid")));
    console.log(up.length);
    up = await getUserPosts(parseInt(Cookies.get("userid")));
    console.log(up.length);
    up = await getUserAnswers(parseInt(Cookies.get("userid")));
    console.log(up.length);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h1>Overcome Challenges to become our most effective user</h1>
    </>
  );
};

export default challenge;
