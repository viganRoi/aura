import React from "react";

const AboutProject = () => {
  return (
    <div className="bg-white w-full h-full flex flex-col items-center justify-center py-6 md:py-48">
      <div className="w-11/12 md:w-5/6 text-black text-start flex flex-col-reverse md:flex-row justify-between">
        <div className="w-full md:w-1/2  p-4 flex flex-col justify-center gap-4">
          <h1 className="certon text-xl md:text-5xl mb-6">
            Një Investim për të Ardhmen
          </h1>
          <p className="text-sm md:text-base montserrat text-text">
            Foleja Living është një hapësirë ku çdo element është i menduar me
            kujdes për të ofruar një jetesë të qetë, komode dhe të balancuar.
            Këtu, moderniteti dhe funksionaliteti nuk janë thjesht përkufizime,
            por pjesë të jetës së përditshme, që bashkohen për të krijuar një
            ambient ku çdo banor mund të ndiejë rehatinë dhe sigurinë që
            meriton. Çdo detaj është i hartuar për të siguruar kushte optimale
            për jetesë, duke ofruar hapësira të bollshme, të ndriçuara natyrshëm
            dhe të përshtatshme për çdo nevojë të përditshme.
          </p>
          <button className="px-12 py-2 border border-brand transition-nav bg-brand text-gold rounded-full w-1/2 text-nowrap">
            Shiko Projektet
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="/assets/images/renderat/020pp.jpg"
            alt=""
            className="w-full rounded-xl contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
