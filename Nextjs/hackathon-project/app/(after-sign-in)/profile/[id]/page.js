"use client";
import {
  getBadges,
  getTotalNoOfPlants,
  getUserAnswers,
  getUserHarvests,
  getUserInfo,
  getUserJournals,
  getUserPlants,
  getUserPosts,
} from "@/app/functions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ChangeProfile from "@/app/ChangeProfile";

const ProfileID = ({ params }) => {
  const [userid, setUserid] = useState("");
  const [showstring, setShowstring] = useState("Loading.....");
  const [info, setInfo] = useState(null);
  const [username, setUsername] = useState("Loading username....");
  const [image, setImage] = useState("/1.jpg");
  const [userPlants, setUserPlants] = useState("0");
  const [harvestedTimes, setHarvestedTimes] = useState("0");
  const [communityPost, setCommunityPost] = useState("0");
  const [answeredQueries, setAnsweredQueries] = useState("0");
  const [earnedBadges, setEarnedBadges] = useState(0);
  const [userjournals, setuserjournals] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleModalClick = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const fetchData = async () => {
    setUserid(params.id);
    const result = await getUserInfo(parseInt(params.id));
    setInfo(result[0]);
    if (result[0].name) {
      setUsername(result[0].name);
    } else {
      setUsername("No user with this id");
    }
    setImage(result[0].image);

    try {
      const userPlantRows = await getTotalNoOfPlants(parseInt(params.id));
      setUserPlants(userPlantRows.length);

      const harvestedTimesRows = await getUserHarvests(parseInt(params.id));
      setHarvestedTimes(harvestedTimesRows.length);

      const communityPostRows = await getUserPosts(parseInt(params.id));
      setCommunityPost(communityPostRows.length);

      const answeredQueriesRows = await getUserAnswers(parseInt(params.id));
      setAnsweredQueries(answeredQueriesRows.length);

      const journals = await getUserJournals(parseInt(params.id));
      setuserjournals(journals.length);
    } catch (er) {
      console.log(er + " error");
    }

    setShowstring(JSON.stringify(result));
  };

  useEffect(() => {
    const b = getBadges(
      communityPost,
      harvestedTimes,
      answeredQueries,
      userPlants,
      userjournals
    );
    setEarnedBadges(b);
  }, [
    communityPost,
    harvestedTimes,
    answeredQueries,
    userPlants,
    userjournals,
  ]);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  // Render loading or placeholder content before fetching data
  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex bg-black" style={{ height: "370px" }}>
        <div
          className="w-full h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('/cover.png')", height: "60%" }}
        >
          <div className="h-32 w-full"></div>
          <div className="h-56 w-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <img
                src={image}
                className="rounded-full h-52 w-52 border-white border-8"
                alt="Profile Picture"
              />
              {parseInt(Cookies.get("userid")) === parseInt(params.id) ? (
                <button
                  className="text-center bg-green-400 text-white hover:bg-red-400 p-2 rounded-xl"
                  onClick={handleModalClick}
                >
                  Change profile picture
                </button>
              ) : null}
            </div>
            <div className="ml-16 lg:ml-16" style={{ paddingTop: "60px" }}>
              <h1 className="lg:text-3xl sm:text-3xl font-extrabold">
                {username}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:pl-20 sm:pr-20">
        <div className="flex flex-wrap w-full h-full bg-black overflow-y-auto justify-center items-center">
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6 transform transition-transform duration-300 hover:scale-110"
            style={{
              backgroundImage: "url('/plantedtrees.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col h-full w-full justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Planted {userPlants} Trees
              </h1>
              <a
                href="/plants"
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>
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
            <div className="flex flex-col h-full w-full justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Harvested {harvestedTimes} Times
              </h1>
              <a
                href={`/harvest/${params.id}`}
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>
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
            <div className="flex flex-col h-full w-full justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Answered {answeredQueries} Queries
              </h1>
              <a
                href="/forum"
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>
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
            <div className="flex flex-col h-full w-full justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Posted total {communityPost} Community Posts
              </h1>
              <a
                href={`/community/${params.id}`}
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>
          </div>
          <div
            className="w-96 h-96 bg-cover bg-center rounded-3xl m-6 transform transition-transform duration-300 hover:scale-110"
            style={{
              backgroundImage: "url('/messaging.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col h-full w-full justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Total {userjournals} plant journals
              </h1>
              <a
                href={"/plant-journal/" + parseInt(params.id)}
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>
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
            <div className="flex flex-col h-full w-full justify-end items-center">
              <h1 className="text-3xl text-black py-8 text-center font-bold">
                Earned {earnedBadges} Badges
              </h1>
              <a
                href={"/plant-challenge/" + parseInt(params.id)}
                className="bg-green-400 m-4 p-2 rounded-xl text-lg text-black border border-black hover:border-black hover:bg-white cursor-pointer transform transition-transform duration-300 hover:scale-110"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {showModal && <ChangeProfile onClose={closeModal} />}
    </>
  );
};

export default ProfileID;
