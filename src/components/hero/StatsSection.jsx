import React from "react";

const StatsSection = () => {
  const isSmallDev = window.innerWidth < 700;

  return (
    <div className="relative w-full h-[70vh] md:h-[100vh] flex md:items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `${isSmallDev ? `url('/assets/images/hero/bckM.jpg')`: `url('/assets/images/hero/bck.jpg')`}`,
        }}
      ></div>
      <div className="relative w-11/12 md:w-7/12 ml-0 mt-10 md:mt-0 md:ml-36 px-6 py-6 md:py-12 flex flex-col gap-6 text-center items-center">
        {/* <div className="bg-brand bg-opacity-90 h-48 w-48 rounded-full flex items-center justify-center">
          <h1 className='text-gold certon text-5xl'>
            2,4Ha
          </h1>
        </div>
        <div className="bg-brand bg-opacity-90 h-48 w-48 rounded-full flex items-center justify-center">
          <h1 className='text-gold certon text-5xl'>
            2,4Ha
          </h1>
        </div>
        <div className="bg-brand bg-opacity-90 h-48 w-48 rounded-full flex items-center justify-center">
          <h1 className='text-gold certon text-5xl'>
            2,4Ha
          </h1>
        </div> */}
        <h1 className="text-brand certon text-xl md:text-5xl">
          {" "}
          Një Vend për të Jetuar, Jo Thjesht për të Banuar
        </h1>
        <p className="text-brand flex items-center text-sm md:text-lg">
          <span className="text-gold certon text-5xl md:text-9xl">98 </span>Njësi banesore
        </p>
        {/* <button>Choose your apartment</button> */}
      </div>
    </div>
  );
};

export default StatsSection;
