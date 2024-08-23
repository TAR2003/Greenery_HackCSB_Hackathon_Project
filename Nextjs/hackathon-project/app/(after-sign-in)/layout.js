"use client"; // layout.js
import { useEffect, useState } from "react";
import Image from "next/image";
import MenuOptions from "./MenuOptions"; // Import menu options
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUserInfo, searchUserByPrefix } from "../functions";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [userid, setuserid] = useState(0);
  const [newnotification, setnewnotification] = useState("/bell.png");
  const [userinfo, setuserinfo] = useState([]);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Update suggestions based on the current input value
    const searchRows = await searchUserByPrefix(value);
    setSuggestions(searchRows);
  };

  const handleSuggestionClick = (suggestion) => {
    setSuggestions([]);
    setIsMenuOpen(false);
    setSearchTerm("");
    router.push(`/profile/${suggestion}`);
  };

  const handleLogOut = () => {
    Cookies.remove("userid");
  };

  const fetchData = async () => {
    const info = await getUserInfo(parseInt(Cookies.get("userid")));
    setuserinfo(info[0]);
    console.log("info we got == " + info[0].image);
  };

  useEffect(() => {
    setuserid(Cookies.get("userid"));
    if (Cookies.get("userid") === undefined) {
      router.push("/login");
    } else {
      fetchData();
    }
  }, []);

  return (
    <>
      <header
        className="flex fixed justify-center items-center h-20 w-full rounded bg-cover bg-center z-40"
        style={{ backgroundImage: "url('/green-green.png')" }}
      >
        <div className="flex items-center">
          <div className="pl-0 sm:pl-8">
            <button onClick={toggleMenu} className="focus:outline-none">
              <Image
                src="/hamburger.png"
                width={80}
                height={80}
                className="pl-0 hover:bg-gray-300"
                alt="Menu"
              />
            </button>
          </div>
          <div className="flex-1 flex justify-center md:justify-start mr-2 md:mx-4">
            <Image
              src="/logo.png"
              width={70}
              height={60}
              className="pl-0"
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex-1 text-right">
          <div className="flex flex-row sm:gap-2 justify-end items-center pr-4 md:pr-16">
            <a
              href="/"
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold p-2 sm:m-2 rounded-full flex items-center justify-center"
            >
              <Image
                src={newnotification}
                alt="Notification Bell"
                width={44} // Adjust the width to match the height of the button
                height={44} // Adjust the height to match the width
                className="object-contain"
              />
            </a>

            <a
              href={userid == 0 ? "/profile" : `/profile/${userid}`}
              className="bg-blue-500 border border-spacing-12 border-black hover:bg-white p-1 text-white hover:text-black font-bold  sm:m-2 rounded-full flex items-center justify-center"
            >
              <Image
                src={userinfo.image}
                alt="Profile Picture"
                width={52} // Matches the height of the button
                height={52} // Matches the width of the button
                className="object-cover rounded-full"
              />
            </a>

            <a
              href="/login"
              onClick={handleLogOut}
              className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-1 sm:px-1 md:px-2 rounded-3xl w-16 h-14 sm:w-24 md:w-28 lg:w-32 text-center text-sm md:text-lg flex items-center justify-center"
            >
              Log Out
            </a>
          </div>
        </div>
      </header>

      {/* Menubar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-gray-800 text-white transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "80%", // Adjusted width for better responsiveness
          maxWidth: "450px", // Ensure the menu doesn't get too wide
          minWidth: "250px", // Ensure the menu doesn't get too narrow
        }}
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
        <nav className="p-4 relative">
          <ul>
            <li className="py-2 pl-20 text-black relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-gray-200 px-4 py-2 rounded w-full hover:scale-110 transition-transform duration-300"
              />
              {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-800 hover:text-white cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion.id)}
                    >
                      <div className="flex flex-row">
                        <Image
                          src={suggestion.image}
                          alt="pic"
                          className="rounded-full"
                          height={40}
                          width={40}
                        />
                        <h1 className="text-xl text-left pl-4">
                          {suggestion.name}
                        </h1>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {MenuOptions.map((option, index) => (
              <li key={index} className="py-1">
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
