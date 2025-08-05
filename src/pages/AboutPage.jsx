import React from "react";
import {
  AboutProject,
  AboutProjectTwo,
  AboutSection,
  AboutSectionTitle,
  AboutTeam,
  DownloadSection,
  HeroView,
  KuulaSection,
  StreetSection,
  VideoSection,
} from "../components";
import "./style.css";

const AboutPage = () => {
  window.scrollTo({ top: 0 })
  return (
    <div className="relative w-full flex items-center justify-center bg-black/30 text-white">
      <div className="static-bg"></div>
      <div className="relative w-full">
        <AboutSection />
        <div className="h-0 md:h-[70vh] bg-gray-transparent "></div>
        <AboutProject />
        <HeroView />
        <AboutProjectTwo />
        {/* <AboutSectionTitle /> */}
        <KuulaSection />
        <StreetSection />
        <AboutTeam />
        {/* <DownloadSection/> */}
        <VideoSection />
      </div>
    </div>
  );
};

export default AboutPage;
