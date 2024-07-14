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
            <button className="bg-blue-500 border border-white hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-32 h-10">
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

      <div className="flex flex-col h-full w-full rounded-xl">
        <div
          className="w-full bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: "url('/tree4.jpg')", height: "700px" }}
        >
          {
            <>
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
                <button
                  onClick={gotoSignin}
                  className="bg-blue-500 hover:bg-white hover:text-black text-white text-2xl w-44 h-10 rounded-xl"
                >
                  Get Started
                </button>
              </div>
            </>

            /* Content inside the div */
          }
        </div>

        <div
          className="w-full flex flex-row "
          style={{
            height: "500px",
          }}
        >
          <div
            className="w-full flex flex-col text-center text-white font-bold bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: "url('/tree2.jpg')" }}
          >
            <div>
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
            <div className="flex-grow"></div>
            <div className="flex items-end justify-center py-16">
              <button
                onClick={handleClickToGlobalWarming}
                className="bg-blue-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              >
                Learn More
              </button>
            </div>
          </div>

          <div
            className="w-full flex flex-col text-center text-white font-bold bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: "url('/tree3.jpg')" }}
          >
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
            <div className="flex-grow"></div>
            <div className="flex items-end justify-center py-16">
              <button
                onClick={handleClickplantingtree}
                className="bg-blue-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div
          className="w-full flex flex-row "
          style={{
            height: "500px",
          }}
        >
          <div
            className="w-full flex flex-col text-center text-white font-bold bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: "url('/tree1.jpg')" }}
          >
            <div>
              <h1
                className="text-white text-center py-16"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Each tree you plant today can be natural oasis of tommorrow
              </h1>
            </div>
            <div className="flex-grow"></div>
            <div className="flex items-end justify-center py-16">
              <button
                onClick={handleClicktemparature}
                className="bg-blue-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              >
                Learn More
              </button>
            </div>
          </div>

          <div
            className="w-full flex flex-col text-center text-white font-bold bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: "url('/tree5.jpg')" }}
          >
            <h1
              className=" text-center py-16"
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Trees are like a shield against disasters.
            </h1>
            <div className="flex-grow"></div>
            <div className="flex items-end justify-center py-16">
              <button
                onClick={handleClickdisastermanagement}
                className="bg-blue-500 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              >
                Learn More
              </button>
            </div>
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