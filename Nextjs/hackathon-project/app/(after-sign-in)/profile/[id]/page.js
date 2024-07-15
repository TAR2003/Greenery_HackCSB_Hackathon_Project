"use client";
import { getUserInfo } from "@/app/functions";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const profileID = () => {
  const [userid, setuserid] = useState("");
  const [showstring, setshowstring] = useState("Loading.....");
  const fetchData = async () => {
    setuserid(Cookies.get("userid"));
    const result = await getUserInfo(Cookies.get("userid"));
    console.log(result);
    setshowstring(JSON.stringify(result));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const getauth = () => {};
  return (
    <>
      <h1>{userid} this is the userid</h1>
      <h1>ans hererr if the info {showstring}</h1>
    </>
  );
};

export default profileID;
