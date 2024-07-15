"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const profileID = () => {
  const [userid, setuserid] = useState("");
  const fetchData = async () => {
    setuserid(Cookies.get("userid"));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const getauth = () => {};
  return (
    <>
      <h1>{userid} this is the userid</h1>
    </>
  );
};

export default profileID;
