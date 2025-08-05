import React from "react";

const VideoSection = () => {
  return (
    <div className="relative w-full h-[40vh] md:h-[100vh] flex items-center justify-center text-white">
      <video
        src="/assets/videos/bck.webm"
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt=""
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative w-11/12 md:w-5/6 ml-0 md:ml-36 px-6  flex flex-col gap-6 z-10">
        <h1 className="text-white certon text-5xl ">Foleja Living</h1>
      </div>
    </div>
  );
};

export default VideoSection;
