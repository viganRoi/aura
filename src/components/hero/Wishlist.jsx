import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlistModalData,
  removeFromWishlist,
} from "../../features/wishList/WishlistSlice";
import ApartmentWishlistCard from "../cards/ApartmentWishlistCard";
import { TfiClose } from "react-icons/tfi";
import ApartmentCard from "../cards/ApartmentCard";
import HouseCard from "../houses/HouseCard";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishData = useSelector(getWishlistModalData);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="w-full min-h-[100vh] bg-bckS flex flex-col justify-center items-center text-white pt-4 pb-8 md:pb-24">
      <div className="w-11/12 md:w-6/7 flex items-center justify-center flex-col">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 right-10 md:right-20 p-2 text-sm md:text-base uppercase transition border text-nowrap bg-primary rounded-full border border-white"
        >
          <TfiClose className="fill-secondary text-lg sm:text-2xl"/>
        </button>
      </div>
      <div className="w-11/12 md:w-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {wishData.map((el) => {
          return (
            <HouseCard
              key={el.id}
              name={el.name}
              type={el.type}
              image={el.name}
              totalSquare={el.totalSquare}
              navigateTo={() => navigate(`/houses/${el.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
