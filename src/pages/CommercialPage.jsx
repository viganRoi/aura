import React, { useEffect, useState } from "react";
import { Commercial, CommercialFilter, CommercialMobile, } from "../components";
import { commercialArea } from "../utils/server";
import { fetchAllCommercialStoreByBuilding } from "../features/commercialStore/CommercialStoreApi";
import { getCommercialStoresData } from "../features/commercialStore/CommercialStoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CommercialPage = () => {
  window.scrollTo({ top: 0 });
  const isSmallDev = window.innerWidth < 700;
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector(getCommercialStoresData);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (id) {
      dispatch(fetchAllCommercialStoreByBuilding(id));
    }
  }, [dispatch, id]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  return (
    <div>
      {/* <CommercialFilter onFilterChange={handleFilterChange} /> */}
      {isSmallDev ? (
        <>
          <CommercialMobile filteredCommercial={data} />
        </>
      ) : (
        <>
          <Commercial filteredCommercial={data} />
        </>
      )}
    </div>
  );
};

export default CommercialPage;
