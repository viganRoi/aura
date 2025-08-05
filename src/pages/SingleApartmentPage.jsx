import React, { useEffect, useState } from "react";
import { SingleApartment } from "../components";
import ApartmentsCarousel from "../components/cards/ApartmentsCarousel";
import { BASE_URL } from "../utils/consts";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getApartmentById } from "../features/apartment/ApartmentAPI";

const SingleApartmentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [relatedApartments, setRelatedApartments] = useState();

  useEffect(() => {
    if (id) {
      dispatch(getApartmentById(id));
    }
  }, [dispatch, id]);

  window.scrollTo({ top: 0 });
  return (
    <div>
      <SingleApartment />
      <ApartmentsCarousel />
    </div>
  );
};

export default SingleApartmentPage;
