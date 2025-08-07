import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@mui/material";
import { BASE_URL } from "../../utils/consts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAllApartmentSvgData } from "../../features/apartment/ApartmentSlice";
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
import BuildingFilterModal from "./BuildingFilterModal";

const floorLabelMapping = {
  0: "Përdhesa",
  "-1": "Suterren",
  "-2": "Bodrum",
};
const getFloorLabel = (floor) => {
  return floorLabelMapping[floor] || floor;
};

const BuildingFilterMobile = ({ available, setFilterState }) => {
  const [sizeRange, setSizeRange] = useState([minSquare, maxSquare]);
  const [floorRange, setFloorRange] = useState([minFloor, maxFloor]);
  const [roomRange, setRoomRange] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
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
    setFilterState(true);
    setShowModal(false);
  };

  const resetFilters = () => {
    setSizeRange([minSquare, maxSquare]);
    setFloorRange([minFloor, maxFloor]);
    setRoomRange("all");
    dispatch(handleRegularFilterReset());
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/apartment/get/count/available/${id}`)
      .then((res) => {
        setTotal(res.data);
      });
  }, [id]);

  return (
    <div className="w-full h-full bg-brand py-0 pt-16 flex flex-col items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center bg-brand py-5">
        <div className="w-11/12 h-full text-gold flex justify-between items-center gap-4">
          <h1 className="text-xl certon text-gold text-nowrap">
            Objekti:{" "}
            <span className="text-white certon">
              {buildingData[0]?.buildingNr?.toUpperCase()}
            </span>
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="py-2 px-6 w-full border-gold border bg-brandD rounded-full text-gold text-nowrap certon hidden md:flex justify-center items-center gap-4"
          >
            {" "}
            <img src="/assets/icons/filter.png" alt="" className="h-6" /> Filtro
          </button>

          <div className="md:hidden w-full h-full bg-brand ">
            <div className="w-11/12 flex justify-end items-center">
              <h1 className="text-xl certon text-white text-nowrap">
                Të lira: {available}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="  w-full h-full bg-brand py-4 px-4">
        <div className="hidden  w-11/12 md:flex justify-end">
          <h1 className="text-xl certon text-white text-nowrap">
            Të lira: {available}
          </h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="py-2 px-6 w-full border-gold border bg-brandD rounded-full text-gold text-nowrap certon flex justify-center items-center gap-4"
        >
          {" "}
          <img src="/assets/icons/filter.png" alt="" className="h-6" /> Filtro
        </button>
      </div>
      {showModal && (
        <BuildingFilterModal
          available={available}
          sizeRange={sizeRange}
          floorRange={floorRange}
          roomRange={roomRange}
          handleRoomChange={handleRoomChange}
          handleFloorChange={handleFloorChange}
          handleSizeChange={handleSizeChange}
          setFilteredData={setFilteredData}
          resetFilters={resetFilters}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default BuildingFilterMobile;
