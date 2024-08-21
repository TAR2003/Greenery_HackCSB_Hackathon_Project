"use client";
import { getAllCommunityPosts } from "@/app/functions";
import React, { useEffect, useState } from "react";

const CommunityID = () => {
  const [strings, getstrings] = useState();
  useEffect(() => {}, []);
  return <>{JSON.stringify(strings)}</>;
};

export default CommunityID;
