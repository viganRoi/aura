import React, { useEffect, useMemo, useState } from "react";
import { ProjectFilter, ViewProject } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getHouseData } from "../features/house/HouseSlice";
import { fetchAllHousesByNeighborhood } from "../features/house/HouseApi";
import { getRegularRoomFilter, getRegularSquareFilter, getFilterState } from "../features/filter/FilterSlice";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const houses = useSelector(getHouseData);
  const roomFilter = useSelector(getRegularRoomFilter);
  const squareFilter = useSelector(getRegularSquareFilter);
  const reduxFilterState = useSelector(getFilterState);
  const [filterState, setFilterState] = useState(false);

  useEffect(() => {
    dispatch(fetchAllHousesByNeighborhood());
  }, [dispatch]);

  // Flatten house list (if needed)
  const allHouses = useMemo(() => {
    if (!houses?.houseDtoList) return [];
    return houses.houseDtoList;
  }, [houses]);

  // Filtering logic (room and square)
  const filteredHouses = useMemo(() => {
    let filtered = allHouses;
    if (roomFilter.length && !roomFilter.includes("all")) {
      filtered = filtered.filter(house => roomFilter.includes(house.rooms));
    }
    if (squareFilter.startVal !== undefined && squareFilter.endVal !== undefined) {
      filtered = filtered.filter(house =>
        parseFloat(house.netoSquare) >= squareFilter.startVal &&
        parseFloat(house.netoSquare) <= squareFilter.endVal
      );
    }
    return filtered;
  }, [allHouses, roomFilter, squareFilter]);

  // Available count
  const available = filteredHouses.length;

  return (
    <div className="bg-bck pt-20">
      <ProjectFilter
        setFilterState={setFilterState}
        available={available}
      />
      <ViewProject filteredHouses={filteredHouses} />
    </div>
  );
};

export default ProjectPage;
