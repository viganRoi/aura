import React, { useEffect, useState } from "react";
import { getApartmentDetailModalData } from "../../features/apartment/ApartmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getApartmentById } from "../../features/apartment/ApartmentAPI";
import { homepage, pdfPath, planmetricImageUrl } from "../../utils/consts";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TfiClose } from "react-icons/tfi";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { PiPhoneThin } from "react-icons/pi";
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
import { ArrowLeft, Key } from "@mui/icons-material";
import { SlArrowLeft } from "react-icons/sl";
import VrModal from "./VrModal";

const SingleApartment = () => {
  const isSmallDev = window.innerWidth < 700;
  const apartment = useSelector(getApartmentDetailModalData);
  const wishlist = useSelector(getWishlistModalData);
  const [selectedTab, setSelectedTab] = useState("2d");
  const [isVrModalOpen, setIsVrModalOpen] = useState(false);
  const [toggleVrModal] = useState(
    () => () => setIsVrModalOpen(!isVrModalOpen)
  );
  const [isPriceCardVisible, setIsPriceCardVisible] = useState(false);

  const isHeartActive = wishlist.some((item) => item.id === apartment.id);

  const wishListItemCount = useSelector(getWishlistCount);
  const isInWishlist = useSelector((state) =>
    isProductInWishlist(state, apartment.id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(selectedTab);
  }, [selectedTab]);

  const handleWishlistDataFunction = () => {
    dispatch(handleWishlistData(apartment));
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
    apartmentId,
    apartmentNumber,
    apartmentPositionImageUrl,
    vtourUrl,
  } = apartment;

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
      dispatch(removeFromWishlist(apartment.id));
    } else {
      dispatch(addToWishlist(apartment));
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center  overflow-x-hidden">
      <div className="w-full h-full bg-white flex justify-center text-brand pt-4 pb-8 md:pb-24">
        <div className="w-11/12 md:w-5/6 flex flex-col justify-center content-center gap-4 md:gap-10">
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
                <div className="w-fit hidden py-1 px-1  gap-2 bg-[#e9e9e9] md:flex items-center border-brand rounded-full justify-between md:justify-center">
                  <button
                    onClick={() => {
                      if (
                        !apartment.vtourUrl ||
                        apartment.vtourUrl === "null"
                      ) {
                        toast.warning(`Momentalisht nuk eshte ne dispozicion`);
                        return;
                      }
                      window.open(`${apartment.vtourUrl}`, "_blank");
                    }}
                    className="md:hidden border-dark border rounded-full py-2 px-6 text-sm text-nowrap circe text-text"
                  >
                    360° Vr Tour
                  </button>
                  <div
                    className="tabs gap-1"
                    style={{ backgroundColor: "#e9e9e9" }}
                  >
                    <input
                      type="radio"
                      id="radio-1"
                      name="tabsdsd"
                      checked={selectedTab === "3d"}
                    />
                    <label
                      className="tab circe"
                      onClick={() => {
                        handleTabClick("3d");
                      }}
                      htmlFor="radio-1"
                      style={{
                        fontSize: isSmallDev ? "12px" : "16px",
                      }}
                    >
                      3D
                    </label>
                    <input
                      type="radio"
                      id="radio-2"
                      name="tabs-deesktop"
                      checked={selectedTab === "2d"}
                      onClick={() => {
                        handleTabClick("2d");
                      }}
                    />
                    <label
                      className="tab circe"
                      
                      htmlFor="radio-2"
                      style={{ fontSize: isSmallDev ? "12px" : "16px" }}
                    >
                      2D
                    </label>

                    <input
                      type="radio"
                      id="radio-3"
                      name="tabsw"
                      checked={selectedTab === "onFloor"}
                    />
                    <label
                      className="tab circe mr-2 px-1"
                      onClick={() => {
                        handleTabClick("onFloor");
                      }}
                      htmlFor="radio-3"
                      style={{ fontSize: isSmallDev ? "12px" : "16px" }}
                    >
                      On Floor
                    </label>
                    {isSmallDev ? (
                      <></>
                    ) : (
                      <>
                        <input
                          type="radio"
                          id="radio-4"
                          name="tabs"
                          checked={selectedTab === "360"}
                        />
                        <label
                          className="tab certon"
                          onClick={() => {
                            if (
                              !apartment.vtourUrl ||
                              apartment.vtourUrl === "null"
                            ) {
                              toast.warning(
                                `Momentalisht nuk eshte ne dispozicion`
                              );
                              return;
                            }
                            // toggleVrModal(); // <-- Open modal instead of new tab
                            handleTabClick("360");
                      window.open(`${apartment.vtourUrl}`, "_blank");
                          }}
                          htmlFor="radio-4"
                          style={{ fontSize: isSmallDev ? "12px" : "16px" }}
                        >
                          360° Vr Tour
                        </label>
                      </>
                    )}
                  </div>
                </div>

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

          <div className="w-full flex flex-col md:flex-row h-full justify-center mt-2 px-2 md:mt-0 bg-white items-center ">
            <div className="w-full flex  flex-col gap-2 flex-[3]">
              <div className="flex   py-4 border-slate-300 text-[35px] md:text-[40px] font-semibold text-black montserrat items-center gap-2">
                {/* <img
                    className="w-[35px] "
                    src="/assets/icons/siptotal.svg"
                    alt=""
                  />{" "} */}
                <h1 className="montserrat font-thin">
                  <span className="text-black">Tipi </span>
                  {apartment.name} -{" "}
                </h1>
                <h1 className="text-black leading-none  text-[30px] md:text-[35px] montserrat font-bold">
                  {(
                    parseFloat(apartment.square) +
                    parseFloat(apartment.balconySquare)
                  ).toFixed(2)}{" "}
                  m<sup>2</sup>{" "}
                </h1>
                <button
                  className="block md:hidden ml-12"
                  onClick={toggleWishlist}
                >
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
              <div className="w-fit py-1 px-1  gap-2 bg-[#e9e9e9] flex md:hidden items-center border-brand rounded-full justify-between md:justify-center">
                <button
                  onClick={() => {
                    if (!apartment.vtourUrl || apartment.vtourUrl === "null") {
                      toast.warning(`Momentalisht nuk eshte ne dispozicion`);
                      return;
                    }
                    window.open(`${apartment.vtourUrl}`, "_blank");
                  }}
                  className="md:hidden border-dark border rounded-full py-2 px-6 text-sm text-nowrap circe text-text"
                >
                  360° Vr Tour
                </button>
                <div
                  className="tabs gap-1"
                  style={{ backgroundColor: "#e9e9e9" }}
                >
                  <input
                    type="radio"
                    id="radio-1"
                    name="tabs"
                    checked={selectedTab === "3d"}
                  />
                  <label
                    className="tab circe"
                    onClick={() => {
                      handleTabClick("3d");
                    }}
                    htmlFor="radio-2"
                    style={{
                      fontSize: isSmallDev ? "12px" : "16px",
                    }}
                  >
                    3D
                  </label>
                  <input
                    type="radio"
                    id="radio-2"
                    name="tabs"
                    checked={selectedTab === "2d"}
                  />
                  <label
                    className="tab circe"
                    onClick={() => {
                      handleTabClick("2d");
                    }}
                    htmlFor="radio-1"
                    style={{ fontSize: isSmallDev ? "12px" : "16px" }}
                  >
                    2D
                  </label>

                  <input
                    type="radio"
                    id="radio-3"
                    name="tabs"
                    checked={selectedTab === "onFloor"}
                  />
                  <label
                    className="tab circe mr-2 px-1"
                    onClick={() => {
                      handleTabClick("onFloor");
                    }}
                    htmlFor="radio-4"
                    style={{ fontSize: isSmallDev ? "12px" : "16px" }}
                  >
                    On Floor
                  </label>
                  {isSmallDev ? (
                    <></>
                  ) : (
                    <>
                      <input
                        type="radio"
                        id="radio-4"
                        name="tabs"
                        checked={selectedTab === "360"}
                      />
                      <label
                        className="tab circe pr-2"
                        onClick={() => {
                          if (!apartment.vtourUrl || apartment.vtourUrl === "null") {
                            toast.warning(`Momentalisht nuk eshte ne dispozicion`);
                            return;
                          }
                          // toggleVrModal(); // <-- Open modal instead of new tab
                          handleTabClick("360");
                        }}
                        // onClick={() => {
                        //   if (
                        //     !apartment.vtourUrl ||
                        //     apartment.vtourUrl === "null"
                        //   ) {
                        //     toast.warning(
                        //       `Momentalisht nuk eshte ne dispozicion`
                        //     );
                        //     return;
                        //   }
                        //   window.open(`${apartment.vtourUrl}`, "_blank");
                        // }}
                        htmlFor="radio-4"
                        style={{ fontSize: isSmallDev ? "12px" : "16px" }}
                      >
                        360° Vr Tour
                      </label>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full flex md:hidden h-full flex-col justify-start items-start gap-2 mt-6 md:mt-0 flex-[8]">
                <div className="w-full flex justify-start md:justify-center items-center gap-4 "></div>
                <div className="w-full  relative flex justify-center items-center">
                  {selectedTab === "360" ? (
                    <div className="h-[80vh] md:h-screen w-full bg-brandD relative text-white">
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
                            apartment?.image3dUrl
                              ? `${homepage}${planmetricImageUrl}${apartment.image3dUrl}`
                              : "/projektet/assets/images/planimetria.png"
                          }
                          alt="3D View"
                        />
                      )}
                      {selectedTab === "2d" && (
                        <img
                          className="w-[70%]"
                          src={
                            apartment?.imageUrl
                              ? `${homepage}${planmetricImageUrl}${apartment.imageUrl}`
                              : "/projektet/assets/images/planimetria.png"
                          }
                          alt="2D View"
                        />
                      )}
                      {selectedTab === "onFloor" && (
                        <img
                          className="w-[100%] p-14"
                          src={
                            apartment?.name
                              ? `${homepage}${planmetricImageUrl}/floor/${apartment.name}-floor.jpg`
                              : "/projektet/assets/images/planimetria.png"
                          }
                          alt="On Floor View"
                        />
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2 ">
                <div className="flex justify-between w-full  border-b py-4 border-slate-300  text-[16px] md:text-[18px] text-black items-center gap-2">
                  {/* <img
                    className="w-[35px] "
                    src="/assets/icons/key-s.svg"
                    alt=""
                  />{" "} */}
                  <h2 className="circe">Dhoma</h2>
                  <h2 className="font-semibold">{apartment.rooms}+1</h2>
                </div>

                <div className="flex w-full border-b py-4 border-slate-300 justify-between text-[16px] md:text-[18px] text-black items-center gap-2">
                  {/* <img
                    className="w-[35px] "
                    src="/assets/icons/floor.svg"
                    alt=""
                  />{" "} */}
                  <h2 className="circe">Kati</h2>
                  <h2 className="font-semibold">{apartment.floorNumber}</h2>
                </div>

                <div className="flex w-full border-b py-4 border-slate-300 justify-between text-[16px] md:text-[18px] text-black items-center gap-2">
                  {/* <img
                    className="w-[35px] "
                    src="/assets/icons/sip.svg"
                    alt=""
                  />{" "} */}
                  <h2 className="circe">Objekti</h2>
                  <h2 className="font-semibold">{apartment.apartmentNumber}</h2>
                </div>

                {/* <div className="flex  border-b py-4 border-slate-300 justify-between text-[16px] md:text-[18px] text-black items-center gap-2">
                  <img
                    className="w-[35px] "
                    src="/assets/icons/terrace.svg"
                    alt=""
                  />{" "}
                  <h2 className="circe">Terraca</h2>
                  <h2 className="font-semibold">
                    {apartment.balconySquare}m<sup>2</sup>
                  </h2>
                </div> */}
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
            <div className="w-full  h-full flex-col hidden md:flex justify-start items-start gap-2 mt-6 md:mt-0 flex-[8]">
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
                          apartment?.image3dUrl
                            ? `${homepage}${planmetricImageUrl}${apartment.image3dUrl}`
                            : "/projektet/assets/images/planimetria.png"
                        }
                        alt="3D View"
                      />
                    )}
                    {selectedTab === "2d" && (
                      <img
                        className="w-[70%]"
                        src={
                          apartment?.imageUrl
                            ? `${homepage}${planmetricImageUrl}${apartment.imageUrl}`
                            : "/projektet/assets/images/planimetria.png"
                        }
                        alt="2D View"
                      />
                    )}
                    {selectedTab === "onFloor" && (
                      <img
                        className="w-[100%] p-14"
                        src={
                          apartment?.name
                            ? `${homepage}${planmetricImageUrl}/floor/${apartment.name}-floor.jpg`
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
        </div>
      </div>

      {/* <div className="md:hidden bg-brand w-full h-full py-6 flex justify-center mt-0 md:mt-10">
        <div className="md:hidden w-11/12 flex gap-4 justify-between">
          <button className="p-2 border-gold border rounded-full text-gold">
            <PiPhoneThin className="text-3xl" />
          </button>
          <button
            onClick={() => {
              handleOpenPdf(pdfUrl);
            }}
            className="w-full py-2 border-gold border bg-brandD rounded-full text-gold text-nowrap montserrat flex items-center justify-center gap-4"
          >
            {" "}
            <img src="/assets/icons/pdf.png" alt="" className="h-6" /> Shkarko
            Pdf
          </button>
        </div>
      </div> */}
      {isPriceCardVisible && <PriceCard onClose={togglePriceCard} />}
      {isVrModalOpen && (
        <VrModal onClose={toggleVrModal} src={apartment.vtourUrl} />
      )}
    </div>
  );
};

export default SingleApartment;
