import React from "react";
import { getname } from "@/app/functions";
import Image from "next/image";

const plantingtree = () => {
  return (
    <>
      <div className="flex flex-col px-56 bg-black text-white justify-center items-center">
        <div className="flex w-full h-96 justify-center items-center">
          <Image
            className="justify-center items-center "
            src="/plantingtree.jpg"
            alt="planting tree"
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
            Tree Plantation
          </h1>
          <div className="px-20">
            <br></br>
            <br></br>
            <p>
              Tree plantation is one of the most effective and sustainable ways
              to combat environmental challenges and foster a healthier planet.
              By planting trees, we can address issues such as climate change,
              air pollution, loss of biodiversity, and soil erosion. This
              article explores the importance of tree plantation, its benefits,
              and how individuals and communities can contribute to this green
              movement.
            </p>
            <br></br>
            <p>
              Trees play a crucial role in maintaining the balance of our
              ecosystem. They act as the lungs of the Earth, absorbing carbon
              dioxide and releasing oxygen, which is essential for life. The
              process of photosynthesis not only helps reduce greenhouse gases
              but also mitigates the effects of climate change by lowering
              temperatures.
              <br /> In urban areas, trees are particularly valuable as they
              help combat the heat island effect, where concrete and asphalt
              absorb and retain heat, leading to higher temperatures. The shade
              provided by trees can reduce the need for air conditioning, thus
              conserving energy and reducing carbon emissions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default plantingtree;
