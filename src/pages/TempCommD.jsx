import React, { useState } from 'react';

const TempCommD = () => {
  const [activeFilter, setActiveFilter] = useState('Suterreni');

  const images = {
    'Suterreni -1': '/assets/images/commercial/-D.png',
    'Suterreni': '/assets/images/commercial/D.png',
    'Përdhesa': '/assets/images/commercial/D1.png',
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <div className="bg-[var(--brand-color)] w-full pt-20 md:pt-0 h-[200px] md:h-[300px] flex flex-col items-center justify-center relative">
        <div className="w-11/12 md:w-5/6 text-black flex relative">
          <h1 className="certon text-2xl md:text-5xl text-[var(--brand2-color)]">
            Hapësire Komerciale, Objekti: D
          </h1>
        </div>
      </div>
      <div className='bg-white w-full h-full flex flex-col items-center justify-center'>
        <div className='flex mt-4'>
          {Object.keys(images).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`transition-all duration-300 transform px-6 md:px-6 py-1 md:py-2 m-1 md:m-4 inline
                bg-brand text-gold rounded-full text-nowrap ${activeFilter === filter
                  ? 'bg-gold text-white shadow-md scale-105 md:scale-110'
                  : 'hover:bg-gold hover:text-white hover:shadow-md hover:scale-110'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className='bg-white w-full md:h-[800px]'>
          <img src={images[activeFilter]} alt={activeFilter} className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default TempCommD;