import { getname } from "@/app/functions";
import Image from "next/image";
import React from "react";

async function f() {
  return await getname();
}

const globalwarming = () => {
  return (
    <>
      <div className="flex flex-col px-56 bg-black text-white justify-center items-center">
        <div className="flex w-full h-96 justify-center items-center">
          <Image
            className="justify-center items-center "
            src="/globalwarming.jpg"
            alt="Image of sundarbans"
            width={1000}
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
            {" "}
            Importance of trees against global warming
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
              In the battle against global warming, trees stand as one of our
              most powerful allies. These silent guardians of the Earth play a
              crucial role in mitigating the effects of climate change through
              their ability to absorb carbon dioxide, a significant greenhouse
              gas contributing to global warming. Trees, through the process of
              photosynthesis, absorb carbon dioxide from the atmosphere and
              store it in their biomass trunks, branches, leaves, and roots.
              This process not only reduces the concentration of greenhouse
              gases in the atmosphere but also releases oxygen, which is vital
              for life on Earth.
            </p>
            <br></br>
            <p>
              {" "}
              The cooling effect provided by trees is another vital aspect of
              their role in combating global warming. In urban areas, the shade
              from trees can lower temperatures significantly, reducing the need
              for air conditioning and thereby decreasing energy consumption.
              This, in turn, reduces the amount of fossil fuels burned to
              generate electricity, leading to lower emissions of carbon dioxide
              and other greenhouse gases. Furthermore, the presence of trees in
              cities helps combat the urban heat island effect, where concrete
              and asphalt absorb and retain heat, leading to higher
              temperatures.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default globalwarming;
