import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getWishlistCount } from "../../features/wishList/WishlistSlice";
import { useSelector } from "react-redux";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { PiTextAlignRightThin } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { PiPlayThin } from "react-icons/pi";
import "./style.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        className={`w-screen fixed top-0 z-50 transition-nav ${
          isScrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="max-w-11/12 px-4 sm:px-6 lg:px-8">
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
              <a
                href="https://flux-ks.com" // <-- replace with your desired URL
                rel="noopener noreferrer" // recommended for security
                className="text-white text-nowrap uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Ballina
              </a>
              <a
                href="https://flux-ks.com/rreth-nesh/" // <-- replace with your desired URL
                rel="noopener noreferrer" // recommended for security
                className="text-white text-nowrap uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Rreth Nesh
              </a>
              <a
                href="https://flux-ks.com/rreth-nesh/" // <-- replace with your desired URL
                rel="noopener noreferrer" // recommended for security
                className="text-white text-nowrap uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                NA KONTAKTONI
              </a>
              <NavLink
                to="/360-virtual"
                className={`text-white text-nowrap uppercase `}
              >
                360 Virtual
              </NavLink>

              <div className="hidden md:flex items-center space-x-2">
                <NavLink
                  to="/wishlist"
                  className="relative w-[35px] h-[35px] rounded-[50px] border border-gold duration-75 flex items-center justify-center"
                >
                  {wishListItemCount > 0 && (
                    <span className="absolute top-[-10px] right-[-5px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishListItemCount}
                    </span>
                  )}
                  {wishListItemCount > 0 ? (
                    <IoIosHeart className="fill-white text-2xl" />
                  ) : (
                    <IoIosHeartEmpty className="fill-white text-2xl" />
                  )}
                </NavLink>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-brand border w-9 h-9 flex justify-center items-center border-brand p-0   rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32 "
                  width={22}
                  height={42}
                >
                  <g id="Layer_13" data-name="Layer 13">
                    <path d="m30 7a1 1 0 0 1 -1 1h-26a1 1 0 0 1 0-2h26a1 1 0 0 1 1 1zm-5 8h-22a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2zm-9 9h-13a1 1 0 0 0 0 2h13a1 1 0 0 0 0-2z" />
                  </g>
                </svg>
              </button>
            </div>

            <div className="flex xl:hidden gap-2">
              <NavLink
                to="/wishlist"
                className="relative w-8 h-8 sm:w-[35px] sm:h-[35px] rounded-full border border-gold duration-75 flex items-center justify-center"
              >
                {wishListItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:top-[-10px] sm:right-[-5px] bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {wishListItemCount}
                  </span>
                )}

                {wishListItemCount > 0 ? (
                  <IoIosHeart className="fill-white text-lg sm:text-2xl" />
                ) : (
                  <IoIosHeartEmpty className="fill-white text-lg sm:text-2xl" />
                )}
              </NavLink>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-brand border flex w-8 h-8 rounded-full justify-center items-center border-brand"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32 "
                  width={17}
                  height={42}
                >
                  <g id="Layer_13" data-name="Layer 13">
                    <path d="m30 7a1 1 0 0 1 -1 1h-26a1 1 0 0 1 0-2h26a1 1 0 0 1 1 1zm-5 8h-22a1 1 0 0 0 0 2h22a1 1 0 0 0 0-2zm-9 9h-13a1 1 0 0 0 0 2h13a1 1 0 0 0 0-2z" />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-full bg-black z-[9999] flex flex-col items-center">
          <div className="w-full flex justify-end items-center p-4">
            <NavLink
              to="/wishlist"
              className="relative w-8 h-8 sm:w-[35px] sm:h-[35px] rounded-full border border-white duration-75 flex items-center justify-center"
            >
              {wishListItemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-[-10px] sm:right-[-5px] bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {wishListItemCount}
                </span>
              )}

              {wishListItemCount > 0 ? (
                <IoIosHeart className="fill-white text-lg sm:text-2xl" />
              ) : (
                <IoIosHeartEmpty className="fill-white text-lg sm:text-2xl" />
              )}
            </NavLink>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-brand text-4xl "
            >
              <IoCloseOutline />
            </button>
          </div>
          <div className=" w-11/12 flex flex-col items-start">
            <div className="w-full flex flex-col items-start gap-8 md:gap-2 pt-24  md:pt-12  p-2">
              <a
                href="https://flux-ks.com" // <-- replace with your desired URL
                rel="noopener noreferrer" // recommended for security
                className="text-white text-2xl md:text-7xl uppercase font-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                Ballina
              </a>
              <a
                href="https://flux-ks.com/projektet/" // <-- replace with your desired URL
                rel="noopener noreferrer" // recommended for security
                className="text-white text-2xl md:text-7xl uppercase font-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                Projektet
              </a>
              <a
                href="https://flux-ks.com/galeria/" // <-- replace with your desired URL
                rel="noopener noreferrer" // recommended for security
                className="text-white text-2xl md:text-7xl uppercase font-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                Galeria
              </a>
              <a
                href="https://flux-ks.com/rreth-nesh/" // <-- replace with your desired URL
                rel="noopener noreferrer" // recommended for security
                className="text-white text-2xl md:text-7xl uppercase font-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                Rreth Nesh
              </a>
              <a
                href="https://flux-ks.com/na-kontaktoni/" // <-- replace with your desired URL
                rel="noopener noreferrer" // recommended for security
                className="text-white text-2xl md:text-7xl uppercase font-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                Na Kontaktoni
              </a>
              <NavLink
                to="/360-virtual"
                className="text-white text-2xl md:text-7xl uppercase font-normal"
                onClick={() => setIsMenuOpen(false)}
              >
                360 Virtual
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
