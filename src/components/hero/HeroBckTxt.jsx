import React from "react";

const HeroBckTxt = ({
  bckColor,
  text,
  textSpan,
  text2,
  textSpan2,
  textColor,
}) => {
  return (
    <div
      className={`w-full  flex items-center bg-${bckColor} justify-center py-12 md:py-64 text-white`}
    >
      <div className={`w-11/12 md:w-8/12 text-center text-${textColor}`}>
        {/* <p className='montserrat'>Bespole build</p> */}
        <h1 className="text-xl md:text-5xl certon mt-6">
          {text}
          <span className="text-gold certon">{textSpan}</span>
          {text2}
          <span className="text-gold certon">{textSpan2}</span>
        </h1>
      </div>
    </div>
  );
};

export default HeroBckTxt;
