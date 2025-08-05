import React, { useState } from "react";
import { Slider } from "@mui/material";
import { IoCloseOutline } from "react-icons/io5";
import {
  handleFilterState,
  handleRegularFilterReset,
  maxFloor,
  maxSquare,
  minFloor,
  minSquare,
  setRegularFloorFilter,
  setRegularRoomFilter,
  setRegularSquareFilter,
} from "../../features/filter/FilterSlice";
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllApartmentSvgData } from "../../features/apartment/ApartmentSlice";

const BuildingFilterModal = ({
  // id,
  available,
  // sizeRange,
  // floorRange,
  // roomRange,
  // handleRoomChange,
  // handleFloorChange,
  // handleSizeChange,
  // setFilteredData,
  // resetFilters,
  onClose,
}) => {
  const floorLabelMapping = {
    0: "Përdhesa",
    "-1": "Suterren",
    "-2": "Bodrum",
  };
  const getFloorLabel = (floor) => {
    return floorLabelMapping[floor] || floor;
  };

  const navigate = useNavigate();
  const [sizeRange, setSizeRange] = useState([minSquare, maxSquare]);
  const [floorRange, setFloorRange] = useState([minFloor, maxFloor]);
  const [roomRange, setRoomRange] = useState("all");
  const dispatch = useDispatch();
  const { id } = useParams();
  const isSmallDev = window.innerWidth < 700;
  const buildingData = useSelector(getAllApartmentSvgData);

  const handleRoomChange = (event) => {
    setRoomRange(event.target.name);
  };

  const handleFloorChange = (event, newFloorRange) => {
    setFloorRange(newFloorRange);
  };

  const handleSizeChange = (event, newSizeRange) => {
    setSizeRange(newSizeRange);
  };

  const setFilteredData = () => {
    dispatch(setRegularFloorFilter([floorRange[0], floorRange[1]]));
    dispatch(setRegularRoomFilter(roomRange));
    dispatch(setRegularSquareFilter([sizeRange[0], sizeRange[1]]));
    dispatch(handleFilterState(true));
  };

  const resetFilters = () => {
    setSizeRange([minSquare, maxSquare]);
    setFloorRange([minFloor, maxFloor]);
    setRoomRange("all");
    dispatch(handleRegularFilterReset());
  };

  return (
    <div className="fixed w-full h-full top-0 bg-brand bg-opacity-50 flex items-center justify-center p-0 z-50">
      <div className=" w-full h-full pt-20 pb-14 gap-14 flex flex-col items-center justify-center bg-black border-b border-brand">
        {/* <button
          className="absolute top-10 right-4 text-white text-2xl z-50"
          onClick={onClose}
        >
          <IoCloseOutline />
        </button> */}
        <div className="w-11/12 h-full grid grid-cols-1 md:grid-cols-3 text-white  justify-between items-start gap-4 border-b border-white pb-6">
          <div className="w-full flex items-center justify-start gap-4">
            <button
              onClick={onClose}
              className="bg-transparent border-brand border transition-all duration-300 hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
            >
              <SlArrowLeft color="#fff" />
            </button>
          </div>
          <div className="w-full flex items-center justify-start md:justify-center">
            <h1 className="font-bold text-4xl circe rounded-full text-white uppercase">
              Ndertesa <span className="text-brand montserrat">{id}</span>
            </h1>
          </div>
          <div className="w-full flex items-center justify-start md:justify-end">
            <button
              onClick={() => navigate("/apartments")}
              className="text-sm md:text-md border-brand border bg-transparent hover:bg-brand px-8 py-2 rounded-full duration-300"
            >
              Shiko të gjitha apartamentet
            </button>
          </div>
        </div>
        <div className="w-11/12 h-full text-gold  flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-5/6 grid grid-cols-1 md:grid-cols-3 gap-8 border-r  border-white border-none md:border-1 pr-12">
            <div className="w-full flex flex-col items-start gap-4">
              <h1 className="text-lg text-white circe font-semibold">Tipi</h1>
              <div className="w-full flex gap-2 justify-start">
                <button
                  name="1"
                  onClick={handleRoomChange}
                  className={`text-nowrap w-fit px-4 py-2 rounded-full border border-gold ${roomRange.includes("1")
                      ? "bg-brand text-black"
                      : "bg-transparent text-white"
                    }`}
                >
                  1 + 1
                </button>
                <button
                  name="2"
                  onClick={handleRoomChange}
                  className={`text-nowrap w-fit px-4 py-2 rounded-full border border-gold ${roomRange.includes("2")
                      ? "bg-brand text-black"
                      : "bg-transparent text-white"
                    }`}
                >
                  2 + 1
                </button>
                <button
                  name="3"
                  onClick={handleRoomChange}
                  className={`text-nowrap w-fit px-4 py-2 rounded-full border border-gold ${roomRange.includes("3")
                      ? "bg-brand text-black"
                      : "bg-transparent text-white"
                    }`}
                >
                  3 + 1
                </button>
                <button
                  name="penthouse"
                  onClick={handleRoomChange}
                  className={`text-nowrap w-fit px-4 py-2 rounded-full border border-gold ${roomRange.includes("penthouse")
                      ? "bg-brand text-black"
                      : "bg-transparent text-white"
                    }`}
                >
                  Penthouse
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col items-start gap-4">
              <h1 className="text-lg text-white circe font-semibold">
                Sipërfaqja
              </h1>
              <div className="w-full flex flex-col justify-between">
                <div className="w-full ml-3">
                  <Slider
                    getAriaLabel={() => "Size range"}
                    value={[sizeRange[0], sizeRange[1]]}
                    onChange={handleSizeChange}
                    shiftStep={1}
                    step={10}
                    min={minSquare}
                    max={maxSquare}
                    sx={{
                      color: "var(--brand-color)", // This affects the track and rail color
                      height: 2,
                      "& .MuiSlider-thumb": {
                        height: 12,
                        width: 20,
                        backgroundColor: "#fff",
                        border: "1px solid var(--brand-color)",
                        "&:hover, &.Mui-focusVisible, &.Mui-active": {
                          boxShadow: "0 0 0 6px rgba(0,0,0,0.1)",
                        },
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "var(--brand-color)",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "#ccc", // optional, for contrast
                      },
                    }}
                  />
                </div>
                <div className="flex items-center gap-4 w-full">
                  <p className="text-lg py-1 px-8 text-white border border-gold rounded-full">
                    {sizeRange[0]} m<sup>2</sup>
                  </p>
                  <p className="text-lg py-1 px-8 text-white border border-gold rounded-full">
                    {sizeRange[1]} m<sup>2</sup>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col items-start gap-4">
              <h1 className="text-lg text-white circe font-semibold">Kati</h1>
              <div className="w-full flex flex-col justify-between">
                <div className="w-full  ml-3">
                  <Slider
                    getAriaLabel={() => "Floor range"}
                    value={[floorRange[0], floorRange[1]]}
                    shiftStep={1}
                    onChange={handleFloorChange}
                    step={1}
                    min={minFloor}
                    max={maxFloor}
                    color="var(--brand-color)"
                    sx={{
                      color: "var(--brand-color)", // This affects the track and rail color
                      height: 2,
                      "& .MuiSlider-thumb": {
                        height: 12,
                        width: 20,
                        backgroundColor: "#fff",
                        border: "1px solid var(--brand-color)",
                        "&:hover, &.Mui-focusVisible, &.Mui-active": {
                          boxShadow: "0 0 0 6px rgba(0,0,0,0.1)",
                        },
                      },
                      "& .MuiSlider-track": {
                        backgroundColor: "var(--brand-color)",
                      },
                      "& .MuiSlider-rail": {
                        backgroundColor: "#ccc", // optional, for contrast
                      },
                    }}
                  />
                </div>
                <div className="flex items-center gap-4 w-full">
                  <p className="text-lg py-1 px-8 text-white border border-gold rounded-full">
                    {getFloorLabel(floorRange[0])}
                  </p>
                  <p className="text-lg py-1 px-8 text-white border border-gold rounded-full">
                    {getFloorLabel(floorRange[1])}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-11/12 md:w-1/6 flex flex-row md:flex-col mt-6 justify-between items-center gap-4">
            <button
              onClick={resetFilters}
              className="bg-transparent text-white text-sm md:text-md w-full py-2 px-2 rounded-full border border-brand hover:bg-brand transition"
            >
              Reseto
            </button>
            <button
              onClick={() => {
                setFilteredData();
                onClose();
              }}
              className="text-nowrap bg-brand text-white text-sm md:text-md w-full py-2 px-2 rounded-full border border-gold"
            >
              Apliko Ndryshimet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildingFilterModal;
