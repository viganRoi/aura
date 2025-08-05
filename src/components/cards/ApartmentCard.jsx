import React from "react";
import { homepage, planmetricImageUrl } from "../../utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { getApartmentDetailModalData } from "../../features/apartment/ApartmentSlice";
import {
  addToWishlist,
  getWishlistCount,
  getWishlistModalData,
  isProductInWishlist,
  removeFromWishlist,
} from "../../features/wishList/WishlistSlice";
import { building } from "../../utils/server";

const ApartmentCard = ({ image, title, navigateTo, floor, bedroom, sqft, id, apartment }) => {
  
  const wishlist = useSelector(getWishlistModalData);
  const dispatch = useDispatch();

  const isHeartActive = wishlist.some((item) => item.id === id);
  const wishListItemCount = useSelector(getWishlistCount);
  const isInWishlist = useSelector((state) =>
    isProductInWishlist(state, id)
  );

  const toggleWishlist = () => {
    if (isHeartActive) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(apartment));
    }
  };

  return (
    <div className="w-full h-[480px] md:h-[585px] flex flex-col justify-between p-8 relative rounded-lg overflow-hidden border border-[#8B8B8BCC] shadow-lg bg-white hover:cursor-pointer">
      <div className="w-full flex flex-col gap-1">
        <h2 className="text-[16px] text-black montserrat">
          Apartamenti {title}
        </h2>
        <h2 className="text-[16px] text-black montserrat">
          {bedroom} Dhoma
        </h2>
        <h2 className="text-[16px] text-black montserrat">
          Kati {floor}
        </h2>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h1 className="text-2xl text-black font-semibold">
          {sqft}m<sup>2</sup>
        </h1>
      </div>
      {/* Image Section */}
      <img
        className="absolute w-[250px] h-[250px] top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2"
        src={`${homepage}${planmetricImageUrl}${image}`}
        alt=""
      />
      <button className="absolute top-8 right-8" onClick={toggleWishlist}>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="25" cy="25" r="24.5" fill="white" stroke="#E9E9E9" />
          <path
            d="M20.8156 17.5616C21.5532 17.436 22.3095 17.4774 23.0289 17.6829C23.7483 17.8885 24.4124 18.2528 24.9723 18.7491L25.0031 18.7766L25.0314 18.7516C25.5658 18.2827 26.194 17.9331 26.8741 17.7262C27.5542 17.5193 28.2707 17.4598 28.9756 17.5516L29.1806 17.5816C30.0692 17.7351 30.8998 18.1259 31.5843 18.7129C32.2689 19.2998 32.782 20.0609 33.0693 20.9157C33.3566 21.7704 33.4074 22.6869 33.2164 23.5682C33.0253 24.4495 32.5995 25.2626 31.9839 25.9216L31.8339 26.0758L31.7939 26.11L25.5856 32.2591C25.4423 32.4009 25.2525 32.486 25.0513 32.4986C24.8502 32.5111 24.6512 32.4503 24.4914 32.3275L24.4131 32.2591L18.1689 26.0741C17.5075 25.4305 17.037 24.6164 16.8097 23.7219C16.5825 22.8273 16.6072 21.8874 16.8812 21.0061C17.1552 20.1247 17.6678 19.3365 18.3622 18.7285C19.0567 18.1206 19.9058 17.7167 20.8156 17.5616Z"
            fill={isHeartActive ? "red" : "transparent"}
            stroke={isHeartActive ? "red" : "black"}
          />
        </svg>
      </button>
    </div>
  );
};

export default ApartmentCard;
