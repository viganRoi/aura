import React, { useEffect, useMemo, useState } from "react";
import {
  Building,
  BuildingFilter,
  BuildingFilterMobile,
  BuildingFilterModal,
  BuildingMobile,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegularRoomFilter,
  getRegularFloorFilter,
  getRegularSquareFilter,
  minSquare,
  maxSquare,
  maxFloor,
  minFloor,
} from "../features/filter/FilterSlice";
import { useParams } from "react-router-dom";
import { getAllApartmentSvgData } from "../features/apartment/ApartmentSlice";
import { apartments } from "../utils/server";
import { SlArrowLeft } from "react-icons/sl";
import BuildingTable from "../components/cards/BuildingTable";

const BuildingPage = () => {
  const isSmallDev = window.innerWidth < 700;
  window.scrollTo({ top: 0 });
  const [buildings, setBuildings] = useState([]);
  const [available, setAvailable] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const { id } = useParams();
  const buildingData = useSelector(getAllApartmentSvgData);
  const [sizeRange, setSizeRange] = useState([minSquare, maxSquare]);
  const [floorRange, setFloorRange] = useState([minFloor, maxFloor]);
  const [roomRange, setRoomRange] = useState("all");
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const roomFilter = useSelector(getRegularRoomFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const squareFilter = useSelector(getRegularSquareFilter);

  const buildingName = buildingData[0]?.buildingNr?.toUpperCase() || "";

  useEffect(() => {
    const newBuildings = buildingData.filter(
      (building) => building.buildingNr === id
    );
    setBuildings(newBuildings);
  }, [id, buildingData]);

  useEffect(() => {
    applyFilters(buildings);
  }, [buildings, filterState, roomFilter, floorFilter, squareFilter]);

  const applyFilters = (buildings) => {
    let filtered =
      buildings.flatMap((building) => building.apartmentList) || [];
    if (roomFilter.length && !roomFilter.includes("all")) {
      filtered = filtered.filter((building) =>
        roomFilter.includes(building.rooms)
      );
    }

    if (
      floorFilter.startVal !== undefined &&
      floorFilter.endVal !== undefined
    ) {
      filtered = filtered.filter(
        (building) =>
          parseInt(building.floorNumber) >= floorFilter.startVal &&
          parseInt(building.floorNumber) <= floorFilter.endVal
      );
    }

    if (
      squareFilter.startVal !== undefined &&
      squareFilter.endVal !== undefined
    ) {
      filtered = filtered.filter(
        (building) =>
          building.square >= squareFilter.startVal &&
          building.square <= squareFilter.endVal
      );
    }
    const availableCount =
      buildingData[0]?.apartmentList?.filter((apartment) => {
        const matchesRoom =
          roomFilter.includes(apartment.rooms) || roomFilter.includes("all");
        const matchesFloor =
          apartment.floorNumber >= (floorFilter.startVal || -Infinity) &&
          apartment.floorNumber <= (floorFilter.endVal || Infinity);
        const matchesSquare =
          apartment.square >= (squareFilter.startVal || -Infinity) &&
          apartment.square <= (squareFilter.endVal || Infinity);
        return matchesRoom && matchesFloor && matchesSquare;
      }).length || 0;

    setAvailable(availableCount);
    setFilteredBuildings(filtered);
  };

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
    <div className="flex flex-col ">
      {isSmallDev ? (
        <>
          <div className="flex md:hidden  mt-20 pl-4 ">
            <button
              onClick={() => window.history.back()}
              className="border border-brand rounded-full p-2 mr-4"
            >
              <SlArrowLeft color="#fff" />
            </button>
            <h1 className="text-white text-3xl">
              Objekti{" "}
              <span className="font-semibold text-brand">{buildingName}</span>
            </h1>
          </div>
          <div className="w-full flex justify-center items-center p-4 ">
            <button
              onClick={() => setShowModal(true)}
              className="text-white w-full border border-brand rounded-full py-2"
            >
              Filtro
            </button>
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
          <BuildingMobile filteredBuildings={filteredBuildings} />
          <BuildingTable apartments={filteredBuildings} />
        </>
      ) : (
        <>
          <BuildingFilter
            setFilterState={setFilterState}
            available={available}
          />
          <div className="p-12">
            <Building filteredBuildings={filteredBuildings} />
          </div>
          <BuildingTable apartments={filteredBuildings} />
        </>
      )}
      {/* <BuildingFilter setFilterState={setFilterState} available={available} />
      <Building filteredBuildings={filteredBuildings} />
      <div className="flex md:hidden p-4  ">
        <h1 className="text-white text-2xl">Objekti {apartments.name}</h1>
      </div> */}
    </div>
  );
};

export default BuildingPage;
