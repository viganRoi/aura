import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getWishlistCount } from "../../features/wishList/WishlistSlice";
import { useSelector } from "react-redux";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import "./style.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const wishListItemCount = useSelector(getWishlistCount);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <nav
      className={`w-screen fixed top-0 h-30 z-50 transition-nav flex items-center justify-center ${isScrolled ? "bg-transparent" : "bg-transparent"
        }`}
      style={{
        maxWidth: '2560px'
      }}
    >
      <div className="w-11/12">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <NavLink
              to="/">
              <img
                src="/assets/images/brand/logo.png"
                alt="logo"
                className="h-20"
              />
            </NavLink>
          </div>
          <div className="hidden xl:flex space-x-4 items-center text-xl montserrat">
            <div className="hidden md:flex items-center space-x-2">
              <NavLink to='/houses' className="w-full px-4 py-2 border border-secondary bg-primary text-white  hover:bg-secondary hover:border-secondary transition-all duration-500 rounded-full">
              Houses
            </NavLink>
              <NavLink
                to="/wishlist"
                className="p-3 text-sm md:text-base uppercase transition border border-secondary text-nowrap bg-primary rounded-full"
              >
                {wishListItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:top-[-10px] sm:right-[-5px] bg-red-500 text-[10px] sm:text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishListItemCount}
                  </span>
                )}
                {wishListItemCount > 0 ? (
                  <IoIosHeart className="fill-secondary text-lg sm:text-2xl" />
                ) : (
                  <IoIosHeartEmpty className="fill-secondary text-lg sm:text-2xl" />
                )}
              </NavLink>
            </div>
          </div>
          <div className="flex xl:hidden gap-2">
            <NavLink
              to="/wishlist"
              className="p-3 text-sm md:text-base uppercase transition border text-nowrap bg-primary rounded-full"
            >
              {wishListItemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-[-10px] sm:right-[-5px] bg-red-500 text-primary text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {wishListItemCount}
                </span>
              )}
              {wishListItemCount > 0 ? (
                <IoIosHeart className="fill-secondary text-lg sm:text-2xl" />
              ) : (
                <IoIosHeartEmpty className="fill-secondary text-lg sm:text-2xl" />
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
