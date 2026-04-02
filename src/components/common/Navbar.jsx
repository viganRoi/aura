import { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const isSmallDev = window.innerWidth < 768;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside drawer
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full flex items-center z-50 transition-all duration-300
        ${isScrolled ? "bg-white shadow-lg  h-20 " : "bg-transparent  h-24 "}`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-20 flex items-center justify-between">

          {/* LOGO */}
          <a href="/">
            <img
              src="/projektet/assets/svgs/Regina Palasë.svg"
              alt="logo"
              className="h-6"
            />
          </a>
          {/* RIGHT SIDE */}
            {/* CTA */}
            <a
              href="/kontakti"
              className="px-6 py-2 rounded-full bg-secondary text-white text-sm border border-secondary hover:bg-white hover:text-secondary transition-colors duration-300"
            >
              Kontaktoni
            </a>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="text-white text-2xl"
            style={{
              display: isSmallDev ? "block" : "none",
            }}
          >
            <AiOutlineMenu />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Drawer */}
        <div
          ref={drawerRef}
          className={`absolute right-0 top-0 h-full w-[80%] bg-white p-6 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Close */}
          <div className="flex justify-end">
            <AiOutlineClose
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl cursor-pointer"
            />
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6 mt-10 text-white text-lg">
            <NavLink to="/" onClick={() => setIsOpen(false)}>Ballina</NavLink>
          </div>

          {/* Bottom actions */}
          <div className="mt-10 flex items-center justify-between">

            <a
              href="/kontakti"
              className="px-6 py-2 rounded-full bg-secondary text-primary"
            >
              Kontaktoni
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;