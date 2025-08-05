import React from "react";

const HeroTxt = () => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center py-20 bg-white">
      <div className="w-11/12 md:w-5/6 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:pr-12">
          <h3 className="uppercase certon text-xs md:text-sm tracking-widest text-gray-500 mb-4">
            Building Icons
          </h3>
          <p className="text-xl certon md:text-3xl font-serif leading-relaxed text-brand mb-4">
            At home at the heart of vibrant Dubai, Foleja Group has envisioned
            some of the most{" "}
            <span className="text-xl certon md:text-3xl font-serif leading-relaxed text-gold mb-4">
              prestigious residential developments
            </span>{" "}
            in this thriving location.
          </p>
        </div>
        <div className="w-full md:w-1/2 md:pl-12">
          <p className="text-sm md:text-base leading-relaxed text-gray-600 mb-12 montserrat">
            From contemporary apartments to elegant villas, soaring residential
            towers to charming low-rise communities, Foleja Group has brought
            an unprecedented level of innovation and experience to Dubai.
            Carving out a distinctive niche in this most dynamic city, Foleja
            Group continues at the cutting edge of architecture, design, and
            finish.
          </p>
          <button className="inline-flex items-center 
          px-6 py-2 text-sm font-medium 
          border-2 border-brand rounded-full 
          transition-all duration-300 transform
          hover:bg-brand hover:text-white hover:shadow-md montserrat">
            More about Foleja Group
            <span className="ml-2 text-lg">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroTxt;
