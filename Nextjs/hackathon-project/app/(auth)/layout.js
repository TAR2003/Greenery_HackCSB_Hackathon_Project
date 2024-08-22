"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const layout = ({ children }) => {
  const router = useRouter();
  const gotohome = () => {
    router.push("/");
  };
  const gotoSignin = () => {
    router.push("/signin");
  };

  const goToLogin = () => {
    router.push("/login");
  };
  return (
    <>
      <header
        className="flex fixed top-0 left-0 justify-between items-center h-20 w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/green-green.png')" }}
      >
        <div className="flex-1 flex pl-4 md:pl-28">
          <Image
            src="/logo.png"
            width={80}
            height={80}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
            alt="Logo"
          />
        </div>
        <div className="flex-1 text-right">
          <div className="flex flex-row gap-2 justify-end items-center pr-4 md:pr-20">
            <a
              href="/"
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-2 sm:px-3 md:px-4 rounded w-20 h-8 sm:w-24 sm:h-10 md:w-28 md:h-12 lg:w-32 lg:h-12 text-center text-xs sm:text-sm md:text-lg"
            >
              DOCS
            </a>
            <a
              href="/signin"
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-2 sm:px-3 md:px-4 rounded w-20 h-8 sm:w-24 sm:h-10 md:w-28 md:h-12 lg:w-32 lg:h-12 text-center text-xs sm:text-sm md:text-lg"
            >
              SIGN IN
            </a>
            <a
              href="/login"
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-2 sm:px-3 md:px-4 rounded w-20 h-8 sm:w-24 sm:h-10 md:w-28 md:h-12 lg:w-32 lg:h-12 text-center text-xs sm:text-sm md:text-lg"
            >
              LOG IN
            </a>
          </div>
        </div>
      </header>
      <div className="">{children}</div>

      <footer>
        <div className="w-full bg-slate-500 text-white flex flex-col h-16">
          <div className="flex flex-col justify-center items-center h-full">
            <h3 className="text-center">
              Terms and conditions | Privacy Policy | Legal
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            <h3 className="text-center">
              Copyright , LOGO, 2024, All Rights Reserved
            </h3>
          </div>
        </div>
      </footer>
    </>
  );
};
export default layout;
