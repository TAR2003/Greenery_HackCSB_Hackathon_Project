import React from "react";
import { getname } from "@/app/functions";
import Image from "next/image";

const temparaturecontrol = () => {
  return (
    <>
      <div className="flex flex-col px-56 bg-black text-white justify-center items-center">
        <div className="flex w-full h-96 justify-center items-center">
          <Image
            className="justify-center items-center "
            src="/temparature.jpg"
            alt="Image of sundarbans"
            width={865}
            height={400}
          />
        </div>
        <div>
          <h1
            className="text-center font-extrabold"
            style={{
              fontSize: "3rem",
              paddingTop: "3rem",
            }}
          >
            Temparature Control
          </h1>
          <div
            className="px-20"
            style={{
              fontSize: "1.5rem",
            }}
          >
            <br></br>
            <br></br>
            <p>
              Trees play a vital role in controlling temperatures, making them
              essential for creating and maintaining a balanced climate. This
              natural ability to regulate temperature is particularly crucial in
              urban areas, where the heat island effect can lead to
              significantly higher temperatures. The heat island effect occurs
              when concrete, asphalt, and other man-made surfaces absorb and
              retain heat, causing urban areas to be warmer than their rural
              counterparts. Trees help counteract this effect through their
              cooling mechanisms, which include shading and evapotranspiration.
            </p>
            <br></br>
            <p>
              Shade provided by trees is one of the simplest yet most effective
              ways to reduce temperatures. By blocking direct sunlight, trees
              can lower the temperature of the surfaces beneath them by several
              degrees. This shading effect reduces the need for air conditioning
              in buildings, thereby decreasing energy consumption and lowering
              greenhouse gas emissions. In residential areas, the presence of
              trees can make outdoor spaces more comfortable and reduce the
              overall heat burden on the community.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default temparaturecontrol;
