"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
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

      <div className="flex flex-col w-full rounded-xl mt-20">
        <div
          className="w-full bg-cover bg-center rounded-3xl flex justify-center items-center"
          style={{ backgroundImage: "url('/tree4.jpg')", minHeight: "700px" }}
        >
          <div className="text-center text-white p-4 justify-center flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
              DISCOVER THE JOY OF PLANTING WITH US
            </h1>
            <a
              href="/signin"
              className="bg-blue-500 hover:bg-white hover:text-black text-white text-lg sm:text-xl md:text-2xl w-36 sm:w-44 h-8 sm:h-10 mt-4 rounded-xl flex items-center justify-center text-center"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Sections */}
        {[
          {
            image: "/tree2.jpg",
            text: "Trees are our main weapon against climate change.",
            link: "/globalwarming",
          },
          {
            image: "/tree3.jpg",
            text: "Each tree planted is a seed of unity, growing into a global forest that connects us all.",
            link: "/plantingtree",
          },
          {
            image: "/tree1.jpg",
            text: "Each tree you plant today can be a natural oasis of tomorrow.",
            link: "/temperaturecontrol",
          },
          {
            image: "/tree5.jpg",
            text: "Trees are like a shield against disasters.",
            link: "/disastermanagement",
          },
        ].map((section, index) => (
          <div
            key={index}
            className="w-full flex flex-col justify-center text-center text-white font-bold bg-cover bg-center"
            style={{
              backgroundImage: `url(${section.image})`,
              minHeight: "600px",
            }}
          >
            <div className="flex flex-grow justify-center items-center p-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                {section.text}
              </h1>
            </div>
            <div className="flex items-end justify-center pb-8">
              <a
                href={section.link}
                className="bg-blue-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>

      <footer className="w-full bg-slate-500 text-white flex flex-col h-16 mt-2">
        <div className="flex flex-col justify-center items-center h-full">
          <h3 className="text-center">
            Terms and conditions | Privacy Policy | Legal
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center h-full">
          <h3 className="text-center">
            Copyright, LOGO, 2024, All Rights Reserved
          </h3>
        </div>
      </footer>
    </main>
  );
}
