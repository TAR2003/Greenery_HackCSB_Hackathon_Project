"use client"; // layout.js
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <header
        className="flex fixed top-0 left-0 justify-between items-center h-20 w-full rounded bg-cover bg-center"
        style={{ backgroundImage: "url('/green-green.png')" }}
      >
        <div className="flex items-center">
          <div className="flex-1 flex justify-center md:justify-start mx-2 md:mx-4">
            <Image
              src="/logo.png"
              width={100}
              height={80}
              className="pl-8"
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex-1 text-right">
          <div className="flex flex-row gap-2 justify-end items-end pr-4 md:pr-20">
            <a
              href="/"
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-24 md:w-32 h-10 text-center"
            >
              DOCS
            </a>
            <a
              href="/signin"
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-24 md:w-32 h-10 text-center"
            >
              SIGN IN
            </a>
            <a
              href="/login"
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-24 md:w-32 h-10 text-center"
            >
              LOG IN
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="py-20 text-white text-3xl text-center">
        <h1>Sorry, the page you searched can not be found</h1>
      </div>

      {/* Footer */}
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

export default Layout;
