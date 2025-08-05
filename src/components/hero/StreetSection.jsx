import React from "react";

const StreetSection = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[120vh] flex items-end justify-start text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/images/hero/street.png')`,
        }}
      ></div>
      <div className="absolute bottom-6 md:bottom-20 w-full md:w-1/3 lg:w-[80%] xl:w-[40%]  left-0 md:left-20 w-full px-6 py-6 md:py-12  gap-10">
        <p className="certon text-sm md:text-base">
          E vendosur në një zonë të zhvilluar dhe me akses të lehtë në pikat
          kryesore të qytetit, Foleja Living ofron një kombinim perfekt midis
          qetësisë dhe lehtësirave urbane. Shkolla, qendra tregtare, ambiente
          argëtimi dhe shërbime të tjera janë vetëm disa minuta larg.
        </p>
      </div>
      <div className="absolute top-12 md:top-24 right-10 md:right-20  md:right-20">
        <h1 className="certon text-gold text-5xl md:text-7xl">2,4 Ha</h1>
      </div>
      <div className="absolute top-28 md:top-64 right-10 flex gap-6 md:gap-12">
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/svgs/city.svg" alt="" className="h-12 md:h-24" />
          <p className="certon text-lg md:text-3xl mt-2">2.6km</p>
          <p className="text-white text-sm md:text-xl">Qendra</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/svgs/airplane.svg" alt="" className="h-12 md:h-24" />
          <p className="certon text-lg md:text-3xl mt-2">2.6km</p>
          <p className="text-white text-sm md:text-xl">Aeroport</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src="/assets/svgs/shopping.svg" alt="" className="h-12 md:h-24" />
          <p className="certon text-lg md:text-3xl mt-2">2.6km</p>
          <p className="text-white text-sm md:text-xl">Albi Mall</p>
        </div>
      </div>
    </div>
  );
};

export default StreetSection;
