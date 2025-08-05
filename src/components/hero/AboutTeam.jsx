import React from "react";

const AboutTeam = () => {
  return (
    <div className="bg-[var(--brand-color)] w-full h-full flex items-center justify-center">
      <div className="w-11/12 md:w-5/6 text-white text-start py-16 md:py-12 h-auto md:h-[60vh] flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-0">
        <div className="w-full md:w-1/2">
          <h1 className="certon text-2xl md:text-3xl text-[var(--brand2-color)]">
            Një Komunitet i Bashkuar dhe i Gjelbër
          </h1>
        </div>
        <div className="w-full md:w-1/2">
          <p className="montserrat text-sm md:text-base ">
          Foleja Living është vendi ku ju mund të krijoni kujtime të paharrueshme, të jetoni në komoditet dhe siguri, dhe të shijoni një balancë perfekte mes natyrës dhe jetës moderne, një hapësirë ku çdo ditë është mundësi për të jetuar më mirë.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutTeam;
