"use client";
import React, { useEffect, useState } from "react";
import { getUserInfo, timeAgo } from "./functions";
import Image from "next/image";
import { formatDistanceToNow, parseISO } from "date-fns";

const formatDate = (dateString) => {
  const date = timeAgo(parseISO(dateString));
  return date;
};

const CommentFile = ({ elem, className, style }) => {
  const [userinfo, setuserinfo] = useState([]);

  const fetchData = async () => {
    const info = await getUserInfo(elem.user_id);
    setuserinfo(info[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`bg-gradient-to-r from-blue-100 to-teal-100 text-gray-800 border border-gray-200 m-4 rounded-xl p-6 shadow-lg ${className}`}
      style={style}
    >
      <div className="flex items-center">
        <img
          src={
            userinfo === undefined ? "/user/masnoon.png" : `${userinfo.image}`
          }
          alt="profile picture of the commenter"
          width={52}
          height={52}
          className="rounded-full"
        />
        <div className="ml-4">
          <a href={`/profile/${userinfo.id}`}>
            <h3 className="font-semibold text-lg">{userinfo.name}</h3>
          </a>

          <p className="text-sm text-gray-600">{formatDate(elem.time)}</p>
        </div>
      </div>

      <p className="mt-4 text-base">{elem.text}</p>
    </div>
  );
};

export default CommentFile;
