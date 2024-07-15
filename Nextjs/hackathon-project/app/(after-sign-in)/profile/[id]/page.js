"use client";
import { getUserInfo } from "@/app/functions";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const ProfileID = ({ params }) => {
  const [userid, setUserid] = useState("");
  const [showstring, setShowstring] = useState("Loading.....");
  const [info, setinfo] = useState(null);
  const [username, setusername] = useState("Loading username....");
  const [image, setimage] = useState("/1.jpg");

  const fetchData = async () => {
    setUserid(params.id);
    console.log(params.id);
    const result = await getUserInfo(parseInt(params.id));
    setinfo(result[0]);
    if (result[0].name !== null) {
      setusername(result[0].name);
    } else setusername("No user with this id");
    setimage(result[0].image);

    setShowstring(JSON.stringify(result));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className="flex  bg-black"
        style={{
          height: "370px",
        }}
      >
        <div
          className="w-full h-96 bg-cover bg-center"
          style={{
            backgroundImage: "url('/cover.png')",
            height: "60%", // Adjust height as needed
          }}
        >
          <div className="h-32 w-full "></div>
          <div className="h-56 w-full flex items-center justify-center">
            <div className="">
              <img
                src={image}
                className="rounded-full h-52 w-52"
                alt="Profile Picture"
              />
            </div>
            <div
              className="ml-16 lg:ml-16 "
              style={{
                paddingTop: "60px",
              }}
            >
              <h1 className="lg:text-3xl sm:text-3xl">{username}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-20 pr-20">
        <div
          className="flex flex-wrap w-full h-full bg-black overflow-y-auto justify-center items-center"
          style={{}}
        >
          {" "}
          {/*started the list  from here */}
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6"
            style={{
              backgroundImage: "url('/plantedtrees.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* Content inside the div */}
          </div>
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6"
            style={{
              backgroundImage: "url('/harvestedtimes.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* Content inside the div */}
          </div>
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6"
            style={{
              backgroundImage: "url('/answeredqueries.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* Content inside the div */}
          </div>
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6"
            style={{
              backgroundImage: "url('/communitypost.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* Content inside the div */}
          </div>
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6"
            style={{
              backgroundImage: "url('/earnedbadges.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {/* Content inside the div */}
          </div>
        </div>
      </div>

      <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl">
        {userid} this is the userid
      </h1>
      <h1 className="flex text-base md:text-lg lg:text-xl xl:text-2xl">
        ans hererr if the info {showstring}
      </h1>
    </>
  );
};

export default ProfileID;
