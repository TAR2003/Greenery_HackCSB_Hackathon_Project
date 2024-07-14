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
        className="flex fixed top-0 left-0 justify-between items-center h-20 w-full rounded"
        style={{ backgroundImage: "url('/green-green.png')" }}
      >
        <div className="flex-1 flex pl-28">
          <Image
            src="/logo.png"
            width={80}
            height={80}
            className="pl-0"
            alt="Logo"
          />
        </div>
        <div className="flex-1 text-right">
          <div className="flex flex-row gap-2 justify-end items-end space-x-16 space-x-max-16 pr-20">
            <button
              onClick={gotohome}
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-32 h-10"
            >
              DOCS
            </button>
            <button
              onClick={gotoSignin}
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-32 h-10"
            >
              SIGN IN
            </button>
            <button
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-32 h-10 "
              onClick={goToLogin}
            >
              LOG IN
            </button>
          </div>
        </div>
      </header>
      <div className="py-20">{children}</div>

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
