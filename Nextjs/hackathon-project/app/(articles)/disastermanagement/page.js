import Image from "next/image";
import React from "react";

const disasterManagement = () => {
  return (
    <>
      <div className="flex flex-col px-56 bg-black text-white justify-center items-center">
        <div className="flex w-full h-96 justify-center items-center">
          <Image
            className="justify-center items-center"
            src="/sundarbans.jpg"
            alt="Image of sundarbans"
            width={1200}
            height={400}
          />
        </div>
        <h1
          className="text-center font-extrabold"
          style={{
            fontSize: "3rem",
          }}
        >
          Disaster Management By Trees
        </h1>
        <div className="px-20">
          <br></br>
          <br></br>
          <p>
            Trees are remarkable natural defenders that play a crucial role in
            disaster management, mitigating the impacts of various natural
            calamities and helping communities build resilience against
            environmental threats. Their contributions to stabilizing
            ecosystems, reducing the severity of natural disasters, and aiding
            in recovery are indispensable in creating safer and more sustainable
            environments.
          </p>
          <br></br>
          <p>
            One of the most significant ways trees contribute to disaster
            management is through soil stabilization and erosion control. Tree
            roots bind the soil, reducing the risk of landslides, especially in
            hilly and mountainous regions. During heavy rains, the presence of
            trees helps prevent soil from being washed away, maintaining the
            integrity of the landscape and protecting human settlements and
            infrastructure from damage. In coastal areas, mangrove forests act
            as natural barriers against storm surges and tsunamis, absorbing the
            impact of powerful waves and reducing the devastation to inland
            areas.
          </p>
        </div>{" "}
      </div>
    </>
  );
};

export default disasterManagement;
