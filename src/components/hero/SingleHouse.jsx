import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homepage, pdfPath, planmetricImageUrl } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { fetchHouseById } from "../../features/house/HouseApi";

const SingleHouse = () => {
  const isSmallDev = window.innerWidth < 700;
  const house = useSelector(fetchHouseById);
  const wishlist = useSelector(getWishlistModalData);
  const [selectedTab, setSelectedTab] = useState("2d");

  const [isPriceCardVisible, setIsPriceCardVisible] = useState(false);

  const isHeartActive = wishlist.some((item) => item.id === house.id);

  const wishListItemCount = useSelector(getWishlistCount);
  const isInWishlist = useSelector((state) =>
    isProductInWishlist(state, house.id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(selectedTab);
  }, [selectedTab]);

  const handleWishlistDataFunction = () => {
    dispatch(handleWishlistData(house));
  };

  const {
    isSold,
    imageUrl,
    image3dUrl,
    pdfUrl,
    square,
    floorNumber,
    name,
    balconySquare,
    subtitle,
    rooms,
    vtourUrl,
  } = house;

  const handleTabClick = (view) => {
    setSelectedTab(view);
  };

  const togglePriceCard = () => {
    setIsPriceCardVisible(!isPriceCardVisible);
  };

  const handleOpenPdf = (pdfUrl) => {
    window.open(`${pdfPath}${pdfUrl}`, "_blank");
  };

  const toggleWishlist = () => {
    if (isHeartActive) {
      dispatch(removeFromWishlist(house.id));
    } else {
      dispatch(addToWishlist(house));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center  overflow-x-hidden">
      <div className="w-full flex flex-col md:flex-row h-full justify-center mt-2 md:mt-0 bg-white items-start ">
        <div className="w-1/4 h-full bg-bck flex flex-col gap-2 px-4">
          <div className="w-full flex flex-col gap-2 ">
            <h1 className="text-3xl">{house.name}</h1>
            <h1 className="text-3xl">Features</h1>
            <div className="flex justify-between w-full  border-b py-4 border-slate-300  text-[16px] md:text-[18px] text-black items-center gap-2">
              <img src="" alt="" />
              <h2 className="font-semibold">Dhoma: {house.rooms}+1</h2>
            </div>
            <div className="flex justify-between w-full  border-b py-4 border-slate-300  text-[16px] md:text-[18px] text-black items-center gap-2">
              <img src="" alt="" />
              <h2 className="font-semibold">Tipi: {house.type}</h2>
            </div>
          </div>
          <div className="w-full flex flex-row-reverse md:flex-col gap-4">
            <button className="w-full px-4 py-2 bg-black text-brand hover:bg-brand hover:text-black transition-all duration-500 circe rounded-full">
              Rezervo një takim
            </button>
            <button
              onClick={() => window.open(`${pdfPath}${pdfUrl}`, "_blank")}
              className="w-full px-4 py-2 border border-brand text-black hover:bg-brand circe transition-all duration-500 rounded-full"
            >
              Shkarko PDF
            </button>
          </div>
        </div>
        <div className="w-3/4 h-full bg-white flex flex-col justify-start items-start gap-2 mt-6 md:mt-0 ">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div className="w-fit md:w-full flex gap-4 items-center">
              <button
                onClick={() => navigate(-1)}
                className="border border-brand  text-black rounded-full h-12 w-12 flex items-center justify-center"
              >
                <SlArrowLeft className="text-xl" />
              </button>
              <h3 className="text-black text-nowrap text-[14px] md:text-[18px] circe">
                Kthehu Pas
              </h3>
            </div>
            <div className="w-full flex justify-end md:justify-end items-center">
              <div className="w-full md:w-fit  md:px-2 flex items-center gap-2  md:justify-center">
                <button className="hidden md:block" onClick={toggleWishlist}>
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="24.5"
                      fill="white"
                      stroke="#E9E9E9"
                    />
                    <path
                      d="M20.8156 17.5616C21.5532 17.436 22.3095 17.4774 23.0289 17.6829C23.7483 17.8885 24.4124 18.2528 24.9723 18.7491L25.0031 18.7766L25.0314 18.7516C25.5658 18.2827 26.194 17.9331 26.8741 17.7262C27.5542 17.5193 28.2707 17.4598 28.9756 17.5516L29.1806 17.5816C30.0692 17.7351 30.8998 18.1259 31.5843 18.7129C32.2689 19.2998 32.782 20.0609 33.0693 20.9157C33.3566 21.7704 33.4074 22.6869 33.2164 23.5682C33.0253 24.4495 32.5995 25.2626 31.9839 25.9216L31.8339 26.0758L31.7939 26.11L25.5856 32.2591C25.4423 32.4009 25.2525 32.486 25.0513 32.4986C24.8502 32.5111 24.6512 32.4503 24.4914 32.3275L24.4131 32.2591L18.1689 26.0741C17.5075 25.4305 17.037 24.6164 16.8097 23.7219C16.5825 22.8273 16.6072 21.8874 16.8812 21.0061C17.1552 20.1247 17.6678 19.3365 18.3622 18.7285C19.0567 18.1206 19.9058 17.7167 20.8156 17.5616Z"
                      fill={isHeartActive ? "red" : "transparent"}
                      stroke={isHeartActive ? "red" : "black"}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start md:justify-center items-center gap-4 "></div>
          <div className="w-full  relative flex justify-center items-center">
            {selectedTab === "360" ? (
              <div className="h-[80vh] md:h-screen w-full bg-white relative text-white pl-20 py-20 ">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="10"
                  allow="xr-spatial-tracking; gyroscope; accelerometer"
                  src={vtourUrl}
                ></iframe>
              </div>
            ) : (
              <>
                {selectedTab === "3d" && (
                  <img
                    className="w-[90%]"
                    src={
                      house?.image3dUrl
                        ? `${homepage}${planmetricImageUrl}${house.image3dUrl}`
                        : "/projektet/assets/images/planimetria.png"
                    }
                    alt="3D View"
                  />
                )}
                {selectedTab === "2d" && (
                  <img
                    className="w-[70%]"
                    src={
                      house?.imageUrl
                        ? `${homepage}${planmetricImageUrl}${house.imageUrl}`
                        : "/projektet/assets/images/planimetria.png"
                    }
                    alt="2D View"
                  />
                )}
                {selectedTab === "onFloor" && (
                  <img
                    className="w-[100%] p-14"
                    src={
                      house?.name
                        ? `${homepage}${planmetricImageUrl}/floor/${house.name}-floor.jpg`
                        : "/projektet/assets/images/planimetria.png"
                    }
                    alt="On Floor View"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {isPriceCardVisible && <PriceCard onClose={togglePriceCard} />}
    </div>
  );
};

export default SingleHouse;
