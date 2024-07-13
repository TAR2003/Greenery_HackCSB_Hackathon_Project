"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClickToGlobalWarming = () => {
    router.push("/globalwarming");
  };

  const goToLogin = () => {
    router.push("/login");
  };
  return (
    <main>
      <header className="flex justify-between items-center h-24 bg-green-400 rounded">
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="/logo.png"
            width={50}
            height={50}
            className=""
            alt="Logo"
          />
        </div>
        <div className="flex-1 text-right">
          <div className="flex flex-row gap-2 justify-end items-end space-x-16 space-x-max-16 pr-20">
            <button className="bg-blue-500 hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-32 h-10">
              DOCS
            </button>
            <button className="bg-blue-500 hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-32 h-10">
              SIGN IN
            </button>
            <button className="bg-blue-500 hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded w-32 h-10 "
            onClick={goToLogin}>
              LOG IN
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col h-full w-full">
        <div
          className="w-full h-96 bg-cover bg-center"
          style={{ backgroundImage: "url('/tree4.jpg')" }}
        >
          {
            <>
              <div className="flex w-full h-48"></div>
              <div className="h-48 flex flex-col items-center justify-center space-y-4">
                <h1
                  className="text-white text-center"
                  style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  DISCOVER THE JOY OF GARDENING WITH US
                </h1>
                <button
                  onClick={handleClickToGlobalWarming}
                  className="bg-blue-500 hover:bg-white hover:text-black text-white text-2xl w-44 h-10 rounded-xl"
                >
                  Get Started
                </button>
              </div>
            </>

            /* Content inside the div */
          }
        </div>

        <div className="w-full flex flex-row bg-black">
          <div
            className="w-full h-96 text-center text-white font-bold bg-cover bg-center"
            style={{ backgroundImage: "url('/tree2.jpg')" }}
          >
            <h1
              className="text-white text-center py-48"
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Trees are the best fighters against climate change
            </h1>
          </div>

          <div className="w-full">
            <img className="w-full h-96" src="/tree3.jpg" />
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
