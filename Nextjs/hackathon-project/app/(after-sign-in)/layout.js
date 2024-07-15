"use client"; // layout.js
import { useEffect, useState } from "react";
import Image from "next/image";
import MenuOptions from "./MenuOptions"; // Import menu options
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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

  const handleLogOut = () => {
    Cookies.remove("userid");
  };

  useEffect(() => {
    if (Cookies.get("userid") === undefined) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <header
        className="flex fixed top-0 left-0 justify-between items-center h-20 w-full rounded bg-cover bg-center"
        style={{ backgroundImage: "url('/green-green.png')" }}
      >
        <div className="flex items-center">
          <div className="pl-8">
            {/* Adjust width and height of the Image component */}
            <button onClick={toggleMenu} className="focus:outline-none">
              <Image
                src="/hamburger.png"
                width={80} // Adjust width as needed
                height={80} // Adjust height as needed
                className="pl-0 hover:bg-gray-300"
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
            <a
              href="/"
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-24 md:w-32 h-10 text-center"
            >
              Notifications
            </a>
            <a
              href="/profile"
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-24 md:w-32 h-10 text-center"
            >
              Profile
            </a>
            <a
              href="/login"
              onClick={handleLogOut}
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-24 md:w-32 h-10 text-center"
            >
              LOG OUT
            </a>
          </div>
        </div>
      </header>

      {/* Menubar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "450px" }}
      >
        <button onClick={toggleMenu} className="pl-8 text-white">
          <Image
            src="/cross.png"
            width={80}
            height={80}
            className="hover:bg-gray-300"
            alt="Close"
          />
        </button>
        <nav className="p-4">
          <ul>
            <li className="py-2 pl-20 text-black">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-200 px-4 py-2 rounded w-full hover:scale-110 transition-transform duration-300"
              />
            </li>
            {MenuOptions.map((option, index) => (
              <li key={index} className="py-2">
                <a
                  href={option.href}
                  className="block py-2 pl-20 hover:bg-blue-500 hover:scale-110 transform text-white hover:text-yellow-500 transition-transform duration-300"
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
      <div className="py-20 text-white">{children}</div>

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
