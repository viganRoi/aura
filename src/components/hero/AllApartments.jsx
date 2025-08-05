import React from "react";
import { ApartmentCard } from "../";
import { useNavigate } from "react-router-dom";

const AllApartments = ({ filteredApartments }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center content-center py-12 md:py-24  "
      style={{
        background: "linear-gradient(to right, black, #F6CE3E33 20%)",
      }}
    >
      <div className="w-11/12 flex-col align-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-6">
          {filteredApartments.map((el) => {
            return (
              <ApartmentCard
                key={el.id}
                category={el.category}
                image={el.image3dUrl}
                title={el.name}
                sqft={el.square}
                bedroom={el.rooms}
                floor={el.floorNumber}
                navigateTo={() => navigate(`/apartments/${el.id}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllApartments;
