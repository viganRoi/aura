import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ParkingModal = ({ onClose, parkingData, onTogglePriceCard }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
        <div className="w-full h-full flex items-center justify-end">
          <div
            className={`bg-[var(--brand-color)] w-full md:w-[500px] h-full p-6  relative text-white transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              className="absolute top-4 right-4 text-white"
              onClick={handleClose}
            >
              <IoCloseOutline size={24} />
            </button>
            <div className="flex flex-col md:flex-row justify-between text-sm uppercase mb-4 mt-10 opacity-80 gap-2 md:gap-0">
              <div className="text-start flex flex-col gap-2 md:gap-4">
                <span className="montserrat">Lloji</span>
                <span className="certon text-3xl">{parkingData.isWarehouse === true ? 'Depo' : 'Parking'}</span>
              </div>
              <div className="text-start flex flex-col gap-2 md:gap-4">
                <span className="montserrat">Numër</span>
                <span className="certon text-3xl">{parkingData.parkingNumber}</span>
              </div>
              <div className="text-start flex flex-col gap-2 md:gap-4">
                <span className="montserrat">{parkingData.isWarehouse === true ? 'Sipërfaqja' : 'Mbushje elektrike'}</span>
                <span className="certon text-3xl">
                  {parkingData.electric === true ? "Po" : (parkingData.isWarehouse === true ?(parkingData.square).toFixed(2) + " m²" : "-")}
                </span>
              </div>
            </div>
            <hr className="border-light mb-4" />
            <div className="flex justify-center mb-4">
              <img
                src={parkingData.isWarehouse === true ? "/assets/images/parkings/boxes.png" : "/assets/images/parkings/car.png"}
                alt="Parking Dimensions"
                className="w-1/2"
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                className="w-full md:w-1/2 bg-brand border border-gold text-white text-sm md:text-lg hover:bg-gold hover:text-brand cursor-pointer py-3 rounded-md montserrat"
                onClick={onTogglePriceCard}
              >
                NA KONTAKTONI
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ParkingModal;
