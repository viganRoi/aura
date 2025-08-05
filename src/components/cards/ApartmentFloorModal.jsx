import React from "react";

const ApartmentFloorModal = ({ apartment, mousePosition }) => {
  if (!apartment) {
    return null;
  }

  return (
    <div
      className="relative z-10 h-80 w-80 px-8 py-4 bg-brand"
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: mousePosition.y - 30 + "px",
        left: mousePosition.x + 40 + "px",
      }}
    >
      <div className="absolute -left-3 top-3 w-10 h-10 bg-brand rotate-45 -z-1 "></div>
      <div className="relative flex flex-col justify-between items-end w-full h-full">
        <div className="text-right">
          <p className="text-2xl text-black mb-2">Tipi: {apartment.name}</p>
          <p className="text-xl opacity-60 text-white">
            Objekti: {apartment.apartmentNumber}
          </p>
        </div>
        <div className="flex flex-col">
          <h1 className="montserrat font-semibold text-5xl text-black">
            {apartment.square}m<sup>2</sup>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ApartmentFloorModal;
