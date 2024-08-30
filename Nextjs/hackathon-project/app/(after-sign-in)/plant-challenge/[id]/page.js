"use client";
import {
  getBadges,
  getTotalNoOfPlants,
  getUserAnswers,
  getUserHarvests,
  getUserJournals,
  getUserPlants,
  getUserPosts,
} from "@/app/functions";
import React, { useEffect, useState } from "react";

const thresholds = {
  userplants: [0, 1, 10, 100, 1000, 10000, 100000, 1000000],
  harvestedtimes: [0, 1, 10, 100, 1000, 10000, 100000, 1000000],
  communitypost: [0, 1, 10, 100, 1000, 10000, 100000, 1000000],
  answeredqueries: [0, 1, 10, 100, 1000, 10000, 100000, 1000000],
  userjournals: [0, 1, 10, 100, 1000, 10000, 100000, 1000000],
};

const getAchievementStatus = (value, thresholds) => {
  let currentAchievement = thresholds[0];
  let nextGoal = thresholds[thresholds.length - 1];

  for (let i = 0; i < thresholds.length; i++) {
    if (value >= thresholds[i]) {
      currentAchievement = thresholds[i];
    } else {
      nextGoal = thresholds[i];
      break;
    }
  }

  return { currentAchievement, nextGoal };
};

const Challenge = ({ params }) => {
  const [userplants, setuserplants] = useState(0);
  const [harvestedtimes, setharvestedtimes] = useState(0);
  const [communitypost, setcommunitypost] = useState(0);
  const [answeredqueries, setansweredqueries] = useState(0);
  const [userjournals, setuserjournals] = useState(0);
  const [badges, setbadges] = useState(0);

  const fetchData = async () => {
    const userId = parseInt(params.id);
    setuserplants((await getTotalNoOfPlants(userId)).length);
    setharvestedtimes((await getUserHarvests(userId)).length);
    setcommunitypost((await getUserPosts(userId)).length);
    setansweredqueries((await getUserAnswers(userId)).length);
    setuserjournals((await getUserJournals(userId)).length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const b = getBadges(
      userplants,
      communitypost,
      harvestedtimes,
      answeredqueries,
      userjournals
    );
    setbadges(b);
  }, [
    communitypost,
    harvestedtimes,
    answeredqueries,
    userplants,
    userjournals,
  ]);

  const achievementSections = [
    { label: "Plants", value: userplants, thresholds: thresholds.userplants },
    {
      label: "Harvests",
      value: harvestedtimes,
      thresholds: thresholds.harvestedtimes,
    },
    {
      label: "Community Posts",
      value: communitypost,
      thresholds: thresholds.communitypost,
    },
    {
      label: "Answered Queries",
      value: answeredqueries,
      thresholds: thresholds.answeredqueries,
    },
    {
      label: "Journals",
      value: userjournals,
      thresholds: thresholds.userjournals,
    },
  ];

  return (
    <div className="p-6 bg-cyan-300 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        Overcome Challenges to Become Our Most Effective User
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievementSections.map((section, index) => {
          const { currentAchievement, nextGoal } = getAchievementStatus(
            section.value,
            section.thresholds
          );
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-5 shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {section.label}: {section.value}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Current Achievement:</strong> {currentAchievement} {"+"}
              </p>
              <p className="text-gray-600">
                <strong>Next Goal:</strong> {"Reaching "}
                {nextGoal}
              </p>
            </div>
          );
        })}
      </div>
      <h2 className="text-2xl font-bold mt-8 text-gray-800">
        Total Badges: {badges}
      </h2>
    </div>
  );
};

export default Challenge;
