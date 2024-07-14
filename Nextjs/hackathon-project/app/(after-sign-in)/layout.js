"use client"; // layout.js
import { useState } from "react";
import Image from "next/image";
import MenuOptions from "./MenuOptions"; // Import menu options
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className="flex fixed top-0 left-0 justify-between items-center h-20 w-full rounded bg-cover bg-center"
        style={{ backgroundImage: "url('/green-green.png')" }}
      >
        <div className="flex items-center">
          <div className=" pl-8">
            <button onClick={toggleMenu} className="focus:outline-none">
              <Image
                src="/hamburger.png"
                width={80}
                height={80}
                className="pl-0 hover:bg-yellow-500"
                alt="Menu"
              />
            </button>
          </div>
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
            {MenuOptions.map((option, index) => (
              <a
                key={index}
                href={option.href}
                className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-24 md:w-32 h-10 text-center"
                onClick={closeMenu}
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Menubar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "250px" }}
      >
        <button onClick={toggleMenu} className="p-4 text-white">
          Close
        </button>
        <nav className="p-4">
          <ul>
            {MenuOptions.map((option, index) => (
              <li key={index} className="pl-20 hover:bg-blue-500">
                <a
                  href={option.href}
                  className="text-white hover:text-yellow-500"
                  onClick={closeMenu}
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="py-20">{children}</div>

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
