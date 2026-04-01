import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouseById } from "../features/house/HouseApi";
import SingleHouse from "../components/hero/SingleHouse";
import { useNavigate } from "react-router-dom";

const SingleHousePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const house = useSelector((state) => state.HouseSlice.house);
  const [active, setActive] = useState("2d");
  const [vrOpen, setVrOpen] = useState(false);
  const [isPriceCardVisible, setIsPriceCardVisible] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchHouseById(id));
    }
  }, [dispatch, id]);

  window.scrollTo({ top: 0 });

  const togglePriceCard = () => {
    setIsPriceCardVisible(!isPriceCardVisible);
  };

  return (
    <div>
      <SingleHouse house={house} active={active} setActive={setActive} vrOpen={vrOpen} setVrOpen={setVrOpen} isPriceCardVisible={isPriceCardVisible} togglePriceCard={togglePriceCard} navigate={navigate} />
    </div>
  );
};

export default SingleHousePage;
