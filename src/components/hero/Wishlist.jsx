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

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishData = useSelector(getWishlistModalData);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="w-full min-h-[100vh] bg-black flex flex-col justify-center items-center text-white pt-4 pb-8 md:pb-24">
      <div className="w-11/12 md:w-6/7 flex items-center justify-center flex-col">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 right-10 md:right-20 bg-brand transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center mb-2"
        >
          <TfiClose className="fill-black" />
        </button>
      </div>
      <div className="w-11/12 md:w-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {wishData.map((el) => {
          return (
            <ApartmentCard
              key={el.id}
              id={el.id}
              category={el.category}
              image={el.imageUrl}
              title={el.name}
              sqft={el.square}
              bedroom={el.rooms}
              floor={el.floorNumber}
              navigateTo={() => navigate(`/apartments/${el.id}`)}
              onRemove={handleRemove}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
