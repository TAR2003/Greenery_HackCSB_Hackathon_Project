"use client";
import {
  getUserAnswers,
  getUserHarvests,
  getUserInfo,
  getUserPlants,
  getUserPosts,
} from "@/app/functions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileID = ({ params }) => {
  const [userid, setUserid] = useState("");
  const [showstring, setShowstring] = useState("Loading.....");
  const [info, setinfo] = useState(null);
  const [username, setusername] = useState("Loading username....");
  const [image, setimage] = useState("/1.jpg");
  const [userplants, setuserplants] = useState("...");
  const [harvestedtimes, setharvestedtimes] = useState("...");
  const [communitypost, setcommunitypost] = useState("...");
  const [answeredqueries, setansweredqueries] = useState("...");
  const [earnedbadges, setearnedbadges] = useState(5);

  const fetchData = async () => {
    setUserid(params.id);
    console.log(params.id);
    const result = await getUserInfo(parseInt(params.id));
    setinfo(result[0]);
    if (result[0].name !== null) {
      setusername(result[0].name);
    } else setusername("No user with this id");
    setimage(result[0].image);
    const userplantrows = await getUserPlants(parseInt(params.id));
    setuserplants(userplantrows.length);
    const harvestedtimesrows = await getUserHarvests(parseInt(params.id));
    setharvestedtimes(harvestedtimesrows.length);
    const communitypostrows = await getUserPosts(parseInt(params.id));
    setcommunitypost(communitypostrows.length);
    const answeredqueriesrows = await getUserAnswers(parseInt(params.id));
    setansweredqueries(answeredqueriesrows.length);
    console.log(answeredqueriesrows);
    setearnedbadges(1);
    //console.log(userplantrows);
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
                className="rounded-full h-52 w-52  border-white border-8"
                alt="Profile Picture"
              />
            </div>
            <div
              className="ml-16 lg:ml-16 "
              style={{
                paddingTop: "60px",
              }}
            >
              <h1 className="lg:text-3xl sm:text-3xl font-extrabold">
                {username}
              </h1>
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
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6 transform transition-transform duration-300 hover:scale-110"
            style={{
              backgroundImage: "url('/plantedtrees.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col h-full w-full  justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Planted {userplants} Trees
              </h1>
              <a
                href="/greenery"
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>

            {/* Content inside the div */}
          </div>
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6 transform transition-transform duration-300 hover:scale-110"
            style={{
              backgroundImage: "url('/harvestedtimes.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col h-full w-full  justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Harvested {harvestedtimes} Times
              </h1>
              <a
                href={`/harvest/${params.id}`}
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>

            {/* Content inside the div */}
          </div>
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6 transform transition-transform duration-300 hover:scale-110"
            style={{
              backgroundImage: "url('/answeredqueries.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col h-full w-full  justify-end items-center">
              <h1 className="text-3xl text-black py-8 tet-center font-bold">
                Answered {answeredqueries} Queries
              </h1>
              <a
                href={"/forum"}
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>

            {/* Content inside the div */}
          </div>
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6 transform transition-transform duration-300 hover:scale-110"
            style={{
              backgroundImage: "url('/communitypost.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col h-full w-full  justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Posted total {communitypost} Community Posts
              </h1>
              <a
                href={`/community/${params.id}`}
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>

            {/* Content inside the div */}
          </div>
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6 transform transition-transform duration-300 hover:scale-110"
            style={{
              backgroundImage: "url('/earnedbadges.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col h-full w-full  justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Earned {earnedbadges} Badges
              </h1>
              <a
                onClick={""}
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>

            {/* Content inside the div */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileID;
