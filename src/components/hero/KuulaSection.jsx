import React from "react";

const KuulaSection = () => {
  const isSmallDev = window.innerWidth < 700;
  return (
    <div className="h-[20vh] md:h-[80vh] relative">
      {isSmallDev && <img src="/assets/images/hero/bck.jpg" alt="" className='absolute top-0 left-0 w-full h-full object-cover z-0' />}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <a href="kuula.com">
          <img
            src="/assets/images/hero/3d.png"
            alt=""
            className="duration-300 transition-all hover:scale-110 hover:cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
};

export default KuulaSection;
