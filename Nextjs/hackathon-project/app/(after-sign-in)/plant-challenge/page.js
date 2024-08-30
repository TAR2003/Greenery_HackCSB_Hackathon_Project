"use client";
import React, { useEffect, useState } from "react";
import JournalList from "./[id]/page";
import { Cookie } from "next/font/google";
import Cookies from "js-cookie";
import Challenge from "./[id]/page";

const page = () => {
  const [uid, setuid] = useState(0);
  useEffect(() => {
    const uuid = parseInt(Cookies.get("userid"));
    setuid(uuid);
  }, []);

  return <>{uid != 0 ? <Challenge params={{ id: uid }} /> : null}</>;
};

export default page;
