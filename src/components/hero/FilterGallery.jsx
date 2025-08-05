import React, { useState } from "react";

const FilterGallery = ({ onFilterChange }) => {
  const [activeButton, setActiveButton] = useState("all");

  const handleButtonClick = (filter) => {
    setActiveButton(filter);
    onFilterChange(filter);
  };

  const buttons = [
    { label: "Të gjitha", filter: "all" },
    { label: "Arkitektura", filter: "architecture" },
    { label: "Koridoret", filter: "hallways" },
    { label: "Apartamentet", filter: "apartment" },
    { label: "Parkingjet", filter: "parkings" },
  ];

  const getButtonClasses = (filter) =>
    `transition-all duration-300 transform px-6 md:px-6 py-1 md:py-2 m-1 md:m-4 inline
      border-1 border-brand rounded-full text-nowrap ${activeButton === filter
      ? "bg-gold text-white shadow-md scale-105 md:scale-110"
      : "hover:bg-gold hover:text-white hover:shadow-md hover:scale-110"
    }`;

  return (
    <div className="bg-white w-full h-full flex flex-col items-center justify-center py-6 md:py-12">
      <div className="w-11/12 md:w-1/2 text-brand text-start flex flex-row overflow-x-auto items-center justify-between montserrat">
        {buttons.map(({ label, filter }) => (
          <button
            key={filter}
            onClick={() => handleButtonClick(filter)}
            className={getButtonClasses(filter)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterGallery;