import { useEffect } from "react";
import { HouseFilter, Houses, ViewProject } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getHouseData } from "../features/house/HouseSlice";
import { fetchAllHousesByNeighborhood } from "../features/house/HouseApi";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const houses = useSelector(getHouseData);

  useEffect(() => {
    dispatch(fetchAllHousesByNeighborhood());
  }, [dispatch]);


  return (
    <div className="bg-bck h-screen w-full relative">
      <div className="w-1/2 absolute bottom-28 left-24">
        <HouseFilter available={100}/>
      </div>
      {/* <ViewProject filteredHouses={filteredHouses} /> */}
      <Houses
       houses={houses}
      />
    </div>
  );
};

export default ProjectPage;
