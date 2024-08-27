"use client";
import { getPlantInfo } from "@/app/functions";
import React, { useEffect, useState } from "react";

const greenery = () => {
  const [string, setstring] = useState("lodaing");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const fetchData = async () => {
    const info = await getPlantInfo("Mango");
    setstring(JSON.stringify(info));
    console.log(string);
    setdescription(info.description);
    setimage(info.image);
  };
  useEffect(() => {
    fetchData();
  }, [string]);
  return (
    <>
      <div>greenery</div>
      <h1>{description} </h1>
      {image === "No image available" ? null : <img src={image} />}
    </>
  );
};

export default greenery;
