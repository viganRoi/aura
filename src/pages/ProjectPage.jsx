import { useEffect, useMemo, useState } from "react";
import { HouseFilter, Houses, ViewProject } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getHouseData } from "../features/house/HouseSlice";
import { fetchAllHousesByNeighborhood } from "../features/house/HouseApi";
import { getFilterState, getRegularFilterType } from "../features/filter/FilterSlice";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const houses = useSelector(getHouseData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const typeFilter = useSelector(getRegularFilterType);
  const reduxFilterState = useSelector(getFilterState);

  useEffect(() => {
    dispatch(fetchAllHousesByNeighborhood());
  }, [dispatch]);

  const allHouses = useMemo(() => {
    if (!houses?.houseDtoList) return [];
    return houses.houseDtoList;
  }, [houses]);

  const filteredHouses = useMemo(() => {
    let filtered = allHouses;

    if (typeFilter.length && !typeFilter.includes("all")) {
      filtered = filtered.filter(house => typeFilter.includes(house.type));
    }

    return filtered;
  }, [allHouses, typeFilter]);

  const available = filteredHouses.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buildingData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + buildingData.length) % buildingData.length);
  };

  return (
    <div className="bg-bck h-screen w-full relative">
      <div className="w-1/2 absolute bottom-28 left-24">
        <HouseFilter available={available}/>
      </div>
      {/* <ViewProject filteredHouses={filteredHouses} /> */}
      <Houses
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        currentIndex={currentIndex}
        filterState={reduxFilterState}
        filteredHouses={filteredHouses}
      />
    </div>
  );
};

export default ProjectPage;
