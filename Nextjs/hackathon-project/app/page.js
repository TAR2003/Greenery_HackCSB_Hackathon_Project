"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClickToGlobalWarming = () => {
    router.push("/globalwarming");
  };
  const handleClicktemparature = () => {
    router.push("/temparaturecontrol");
  };
  const handleClickplantingtree = () => {
    router.push("/plantingtree");
  };
  const handleClickdisastermanagement = () => {
    router.push("/disastermanagement");
  };
  const gotoSignin = () => {
    router.push("/signin");
  };

  const goToLogin = () => {
    router.push("/login");
  };
  return (
    <main>
      <header
        className="flex fixed top-0 left-0 justify-between items-center h-20 w-full rounded bg-cover bg-center"
        style={{ backgroundImage: "url('/green-green.png')" }}
      >
        <div className="flex-1 flex pl-4 md:pl-28">
          <Image
            src="/logo.png"
            width={80}
            height={80}
            className="pl-0"
            alt="Logo"
          />
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

      <div className="flex flex-col h-full w-full rounded-xl">
        <div
          className="w-full h-full bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: "url('/tree4.jpg')" }}
        >
          <div className="flex w-full h-80"></div>
          <div className="h-96 flex flex-col items-center justify-center space-y-4">
            <h1
              className="text-white text-center"
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              DISCOVER THE JOY OF PLANTING WITH US
            </h1>
            <a
              href="/signin"
              className="bg-blue-500 hover:bg-white hover:text-black text-white text-2xl w-44 h-10 rounded-xl flex items-center justify-center"
            >
              Get Started
            </a>
          </div>
        </div>

        <div
          className="w-full flex flex-col md:flex-row"
          style={{ height: "700px" }}
        >
          <div
            className="w-full flex flex-col text-center text-white font-bold bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: "url('/tree2.jpg')" }}
          >
            <div className="flex-grow">
              <h1
                className="text-white text-center py-16"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Trees are our main weapon against climate change.
              </h1>
            </div>
            <div className="flex items-end justify-center pb-16">
              <a
                href="/globalwarming"
                className="bg-blue-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div
          className="w-full flex flex-col text-center text-white font-bold bg-cover bg-center rounded-3xl"
          style={{ height: "700px", backgroundImage: "url('/tree3.jpg')" }}
        >
          <div className="flex-grow">
            <h1
              className="text-black text-center py-16"
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Each tree planted is a seed of unity, growing into a global forest
              that connects us all.
            </h1>
          </div>
          <div className="flex items-end justify-center pb-16">
            <a
              href="/plantingtree"
              className="bg-blue-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
            >
              Learn More
            </a>
          </div>
        </div>

        <div
          className="w-full flex flex-col md:flex-row"
          style={{ height: "700px" }}
        >
          <div
            className="w-full flex flex-col text-center text-white font-bold bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: "url('/tree1.jpg')" }}
          >
            <div className="flex-grow">
              <h1
                className="text-white text-center py-16"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Each tree you plant today can be a natural oasis of tomorrow.
              </h1>
            </div>
            <div className="flex items-end justify-center pb-16">
              <a
                href="/temperaturecontrol"
                className="bg-blue-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div
          className="w-full flex flex-col text-center text-white font-bold bg-cover bg-center rounded-3xl"
          style={{ height: "700px", backgroundImage: "url('/tree5.jpg')" }}
        >
          <div className="flex-grow">
            <h1
              className="text-center py-16"
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Trees are like a shield against disasters.
            </h1>
          </div>
          <div className="flex items-end justify-center pb-16">
            <a
              href="/disastermanagement"
              className="bg-blue-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

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
    </main>
  );
}
