import React, { useState } from "react";
import { Parking, ParkingFilter } from "../components";

const ParkingPage = () => {
  window.scrollTo({ top: 0 })
  const [filter, setFilter] = useState(1);
  const [parkingNumber, setParkingNumber] = useState(1);


  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  return (
    <div>
      <div className="bg-[var(--brand-color)] w-full pt-20 md:pt-0 h-[200px] md:h-[300px] flex flex-col items-center justify-center relative">
        <div className="w-11/12 md:w-5/6 text-black flex relative">
          <h1 className="certon text-2xl md:text-5xl text-[var(--brand2-color)]">
            Parkingjet
          </h1>
        </div>
      </div>
      <ParkingFilter onFilterChange={handleFilterChange} onParkingNumberChange={(c) => setParkingNumber(c)} parkingNumber={parkingNumber} />
      <Parking parkingNumber={parkingNumber} />
    </div>
  );
};

export default ParkingPage;
