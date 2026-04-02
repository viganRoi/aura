import { useEffect } from "react";
import { Houses } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getHouseData } from "../features/house/HouseSlice";
import { fetchAllHousesByNeighborhood } from "../features/house/HouseApi";

const ProjectPage = ( { type = 'standard'} ) => {
  const dispatch = useDispatch();
  const houses = useSelector(getHouseData);

  useEffect(() => {
    dispatch(fetchAllHousesByNeighborhood(type));
  }, [dispatch]);


  return (
    <div className="bg-bck h-screen w-full relative">
      <Houses
        houses={houses}
      />
    </div>
  );
};

export default ProjectPage;
