import React from "react";

const HeroView = () => {
  const isSmallDev = window.innerWidth < 700;

  return (
    <div className="relative w-full h-[90vh] flex items-start md:items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `${isSmallDev ? `url('/assets/images/hero/bck2M.jpg')`: `url('/assets/images/hero/bck2.jpg')`}`,
        }}
      ></div>
      <div className="relative w-11/12 md:w-5/6 px-6 py-6 md:py-12 flex flex-col items-start justify-center md:gap-10">
        <div className="h-24 md:h-52 w-40 md:w-96 p-6 gap-1 flex flex-col items-center justify-center ">
          <h1 className="text-brand certon text-2xl md:text-6xl">34,136 m<sup>2</sup></h1>
          <p className="text-gold text-lg md:text-2xl certon text-nowrap">Ndërtim</p>
        </div>
        <div className="h-24 md:h-52 w-40 md:w-96 p-6 gap-1 flex flex-col items-center justify-center">
          <h1 className="text-brand certon text-2xl md:text-6xl">2,627 m<sup>2</sup></h1>
          <p className="text-gold text-lg md:text-2xl certon text-nowrap">Hapsira Gjelbruse</p>
        </div>
        <div className="h-24 md:h-52 w-40 md:w-96 p-6 gap-1 flex flex-col items-center justify-center">
          <h1 className="text-brand certon text-2xl md:text-6xl">5,283 m<sup>2</sup></h1>
          <p className="text-gold text-lg md:text-2xl certon text-nowrap">Hapsira Komerciale</p>
        </div>
      </div>
    </div>
  );
};

export default HeroView;
