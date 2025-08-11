import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homepage, pdfPath, planmetricImageUrl } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  getWishlistCount,
  getWishlistModalData,
  handleWishlistData,
  isProductInWishlist,
  removeFromWishlist,
} from "../../features/wishList/WishlistSlice";
import { PriceCard } from "../";
import "./style.css";
import { SlArrowLeft } from "react-icons/sl";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { FaRegBuilding } from "react-icons/fa";

const SingleHouse = () => {
  const isSmallDev = window.innerWidth < 700;
  const [isPriceCardVisible, setIsPriceCardVisible] = useState(false);
  const [active, setActive] = useState("2d");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const house = useSelector((state) => state.HouseSlice.house);
  const wishlist = useSelector(getWishlistModalData);
  const isInWishlist = useSelector((state) =>
    house ? isProductInWishlist(state, house.id) : false
  );
  const isHeartActive = house && wishlist.some((item) => item.id === house.id);

  if (!house) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }

  const {
    type,
    pdfUrl,
    totalSquare,
    numberOfRooms,
    name,
    totalNetoSquare,
    vtourUrl,
  } = house;

  const togglePriceCard = () => {
    setIsPriceCardVisible(!isPriceCardVisible);
  };

  const toggleWishlist = () => {
    if (isHeartActive) {
      dispatch(removeFromWishlist(house.id));
    } else {
      dispatch(addToWishlist(house));
    }
  };


  const buttons = [
    { label: "2" },
    { label: "1" },
    { label: "b" },
  ];


  return (
    <div className="w-full h-screen flex flex-col items-center justify-start text-primary overflow-x-hidden">
      <div className="w-full flex flex-col md:flex-row h-full justify-center bg-white items-start ">
        <div className="w-5/24 h-full bg-bckS flex flex-col gap-36 px-4">
          <div className="w-full flex flex-col items-start gap-4 mt-4">
            <img src="/assets/images/buildings/top.jpg" alt="" className="rounded-lg h-42 w-full object-cover" />
            <h1 className="text-3xl mb-12">{name}</h1>
            <div className="py-6 flex justify-start w-full border-b py-4 border-secondary text-sm md:text-lg text-primary items-center gap-2">
              <FaRegBuilding />
              <h2 className="font-semibold">Tipi: {type}</h2>
            </div>
            <div className="py-6 flex justify-start w-full border-b py-4 border-secondary text-sm md:text-lg text-primary items-center gap-2">
              <FaRegBuilding />
              <h2 className="font-semibold">Dhoma: {numberOfRooms}</h2>
            </div>
            <div className="py-6 flex justify-start w-full border-b py-4 border-secondary text-sm md:text-lg text-primary items-center gap-2">
              <FaRegBuilding />
              <h2 className="font-semibold">Siperfaqja: {totalSquare}</h2>
            </div>
            <div className="py-6 flex justify-start w-full border-b py-4 border-secondary text-sm md:text-lg text-primary items-center gap-2">
              <FaRegBuilding />
              <h2 className="font-semibold">Siperfaqja neto: {totalNetoSquare}m<sup>2</sup></h2>
            </div>
          </div>
          <div className="w-full flex flex-row-reverse md:flex-col gap-4">
            <button className="w-full px-4 py-2 border border-white bg-primary text-white  hover:bg-secondary hover:border-secondary transition-all duration-500 rounded-full">
              Rezervo një takim
            </button>
            <button
              onClick={() => window.open(`${pdfPath}${pdfUrl}`, "_blank")}
              className="w-full px-4 py-2 border border-secondary text-secondary hover:bg-primary hover:text-white transition-all duration-500 rounded-full"
            >
              Shkarko PDF
            </button>
          </div>
        </div>
        <div className="w-18/24 h-full bg-bck flex flex-col justify-start items-center gap-2">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2 p-4">
            <div className="flex gap-4 justify-center  items-center">
              <button
                onClick={() => navigate(-1)}
                className="border border-secondary text-white rounded-full h-10 w-10 flex items-center justify-center"
              >
                <SlArrowLeft className="text-xl" />
              </button>
              <h3 className="text-white text-nowraptext-sm md:text-lg">
                Kthehu Pas
              </h3>
            </div>
            <div className="flex justify-center items-center gap-2">
              <button className="w-full text-nowrap px-4 py-2 border border-white bg-primary text-white  hover:bg-secondary hover:border-secondary transition-all duration-500 rounded-full">
                3D Tour
              </button>
              <button className="w-full px-4 py-2 border border-white bg-primary text-white  hover:bg-secondary hover:border-secondary transition-all duration-500 rounded-full">
                Gallery
              </button>
              <button
                className={`p-2 text-sm md:text-base uppercase transition border text-nowrap bg-primary rounded-full border border-white`}
                onClick={toggleWishlist}
              >
                {isInWishlist ?
                  <IoIosHeart className="fill-secondary text-lg sm:text-2xl" />
                  :
                  <IoIosHeartEmpty className="fill-secondary text-lg sm:text-2xl" />
                }
              </button>
            </div>
          </div>
          <div className="w-full flex justify-start md:justify-center items-center gap-4 "></div>
          <div className="w-full relative flex justify-center items-center">
            {active === "360" ? (
              <div className="h-full w-full bg-tertiary relative text-black">
                <iframe width="100%" height="100%" frameborder="10" allow="xr-spatial-tracking; gyroscope; accelerometer" src={vtourUrl}></iframe>
              </div>
            ) : (
              <img src={
                // active === "2"
                //   ? `${homepage}${planmetricImageUrl}${name}-2floor.jpg`
                //   : active === "1"
                //     ? `${homepage}${planmetricImageUrl}${name}-1floor.jpg`
                //     : `${homepage}${planmetricImageUrl}${name}-base.png`
                active === "2"
                  ? `/assets/images/renderat/b.png`
                  : active === "1"
                    ? `/assets/images/renderat/1.png`
                    : `/assets/images/renderat/b.png`
              }
                alt={
                  active === "2"
                    ? "2floor"
                    : active === "1"
                      ? "1floor"
                      : "base"
                }
                className="h-[500px] md:h-[700px] object-contain text-black"
                style={{
                  cursor: "pointer",
                }}
              />
            )}
          </div>
        </div>
        <div className="w-1/24 h-full bg-bckS flex flex-col items-center px-2 pt-4">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => setActive(btn.label)}
              className={`w-full p-3 text-sm md:text-base uppercase transition  rounded-full
                ${active === btn.label
                  ? "bg-secondary text-white rounded-full"
                  : "text-white bg-primary rounded-full"
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      {isPriceCardVisible && <PriceCard onClose={togglePriceCard} />}
    </div>
  );
};

export default SingleHouse;
