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
        setIsDropdownOpen(false);
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
      className={`w-screen fixed top-0 z-50 transition-nav flex items-center justify-center ${isScrolled ? "bg-transparent" : "bg-transparent"
        }`}
      style={{
        maxWidth: '2560px'
      }}
    >
      <div className="w-11/12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <a
              href="https://flux-ks.com"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="/assets/images/brand/logo.png"
                alt="logo"
                className="h-10"
              />
            </a>
          </div>
          <div className="hidden xl:flex space-x-4 items-center text-xl montserrat">
            <div className="hidden md:flex items-center space-x-2">
              <NavLink
                to="/wishlist"
                className="relative w-[35px] h-[35px] rounded-[50px] border border-gold duration-75 flex items-center justify-center"
              >
                {wishListItemCount > 0 && (
                  <span className="absolute top-[-10px] right-[-5px] bg-red-500 text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishListItemCount}
                  </span>
                )}
                {wishListItemCount > 0 ? (
                  <IoIosHeart className="fill-primary text-2xl" />
                ) : (
                  <IoIosHeartEmpty className="fill-primary text-2xl" />
                )}
              </NavLink>
            </div>
          </div>
          <div className="flex xl:hidden gap-2">
            <NavLink
              to="/wishlist"
              className="relative w-8 h-8 sm:w-[35px] sm:h-[35px] rounded-full border border-gold duration-75 flex items-center justify-center"
            >
              {wishListItemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-[-10px] sm:right-[-5px] bg-red-500 text-primary text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {wishListItemCount}
                </span>
              )}
              {wishListItemCount > 0 ? (
                <IoIosHeart className="fill-primary text-lg sm:text-2xl" />
              ) : (
                <IoIosHeartEmpty className="fill-primary text-lg sm:text-2xl" />
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
