import React, { useState } from "react";

const ParkingFilter = ({
  onFilterChange,
  onParkingNumberChange,
  parkingNumber,
}) => {
  const [selectedType, setSelectedType] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("-1");
  const [selectedFunctionality, setSelectedFunctionality] = useState([]);

  const handleTypeChange = (type) => {
    setSelectedType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
  };

  const handleFunctionalityChange = (func) => {
    setSelectedFunctionality((prev) =>
      prev.includes(func) ? prev.filter((f) => f !== func) : [...prev, func]
    );
  };

  const resetFilters = () => {
    setSelectedType([]);
    setSelectedFloor("-1");
    setSelectedFunctionality([]);
  };

  return (
    <div className="bg-white w-full h-full flex flex-col md:flex-row items-center justify-center pt-6">
      <div className="w-11/12 md:w-5/6 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between relative">
        <div className="flex flex-col items-start">
          <h3 className="text-base font-semibold montserrat mb-2">Tipi</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedType.includes("Parkingjet")}
                onChange={() => handleTypeChange("Parkingjet")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 border rounded-md ${
                  selectedType.includes("Parkingjet")
                    ? "bg-[var(--brand-color)]"
                    : "bg-white"
                }`}
              />
              <span className="montserrat">Parkingjet</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedType.includes("Depo")}
                onChange={() => handleTypeChange("Depo")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 border rounded-md ${
                  selectedType.includes("Depo")
                    ? "bg-[var(--brand-color)]"
                    : "bg-white"
                }`}
              />
              <span className="montserrat">Depo</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-base font-semibold montserrat mb-2">Kati</h3>
          <div className="flex space-x-2">
            {["-1", "-2"].map((floor) => (
              <button
                key={floor}
                className={`px-4 py-2 border rounded-md ${
                  `-${parkingNumber}` === floor
                    ? "bg-[var(--brand2-color)] text-white"
                    : "bg-white"
                }`}
                onClick={() => {
                  onParkingNumberChange(floor.replace("-", ""));
                }}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start">
          {/* <h3 className="text-base font-semibold montserrat mb-2">
            Funksionaliteti
          </h3>
          <div className="flex items-center space-x-4">
            <label className="flex  items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFunctionality.includes("Tek Ashensori")}
                onChange={() => handleFunctionalityChange("Tek Ashensori")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 border rounded-md ${
                  selectedFunctionality.includes("Tek Ashensori")
                    ? "bg-[var(--brand-color)]"
                    : "bg-white"
                }`}
              />
              <span className="montserrat text-nowrap">Tek Ashensori</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFunctionality.includes("Me mbushje elektrike")}
                onChange={() =>
                  handleFunctionalityChange("Me mbushje elektrike")
                }
                className="hidden"
              />
              <div
                className={`w-5 h-5 border rounded-md ${
                  selectedFunctionality.includes("Me mbushje elektrike")
                    ? "bg-[var(--brand-color)]"
                    : "bg-white"
                }`}
              />
              <span className="montserrat text-nowrap">Me mbushje elektrike</span>
            </label>
          </div> */}
        </div>
        <button
          onClick={resetFilters}
          className="px-6 py-2 bg-[var(--brand-color)] text-[var(--brand2-color)] text-sm uppercase montserrat rounded-md"
        >
          RESETO FILTERN
        </button>
      </div>
    </div>
  );
};

export default ParkingFilter;
