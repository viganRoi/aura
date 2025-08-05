import React from "react";

const AboutSection = () => {
  return (
    <div className="w-full h-full pt-16 bg-brand">
      <div className="w-full h-full bg-white flex items-center justify-center ">
      <div className="w-11/12 md:w-5/6 text-black text-start py-6 md:py-64">
        <div className="w-full md:w-1/2">
          <h1 className="certon text-xl md:text-5xl">
            {" "}
            Një Vend për të Jetuar, Jo Thjesht për të Banuar
          </h1>
          <p className="mt-2 text-sm md:text-base montserrat text-text">
          Foleja Living sjell mundësi të jashtëzakonshme për ata që kërkojnë një vend të veçantë dhe të rehatshëm për të jetuar. Ndërtesat tona janë pozicionuar në një nga zonat më të preferuara të Prishtinës, afër Fshatin Ndërkombëtar. Ky vend ofron qasje të lehtë në qendrën e qytetit, ndërkohë që siguron një ambient të qetë dhe të sigurt për banorët e tij.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutSection;
