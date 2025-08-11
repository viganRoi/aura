import { useEffect } from "react";
import { SingleHouse } from "../components";
import ApartmentsCarousel from "../components/cards/ApartmentsCarousel";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchHouseById } from "../features/house/HouseApi";

const SingleHousePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchHouseById(id));
    }
  }, [dispatch, id]);

  window.scrollTo({ top: 0 });
  return (
    <div className="">
      <SingleHouse />
      {/* <ApartmentsCarousel /> */}
    </div>
  );
};

export default SingleHousePage;
