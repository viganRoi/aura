import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApartmentModal, AvailableFloor, FloorPopup } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllApartmentSvgData,
  getAllFloorSvgData,
} from "../../features/apartment/ApartmentSlice";
import {
  getFilterState,
  getRegularFloorFilter,
  getRegularRoomFilter,
  getRegularSquareFilter,
} from "../../features/filter/FilterSlice";
import {
  getAllApartmentsByFloorId,
  getFloorSelectionSvg,
  getObjectSvgDataAll,
} from "../../features/apartment/ApartmentAPI";
import { imagePath } from "../../utils/consts";
import ContextMenu from "../contextMenu/ContextMenu";
import AdmApartmentModal from "../admin/apartments/AdmApartmentModal";
import { AuthProvider } from "../auth/AuthProvider";
import "./tabs.css";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const BuildingMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const buildingData = useSelector(getAllApartmentSvgData);
  const buildingFloorData = useSelector(getAllFloorSvgData);
  const isSmallDev = window.innerWidth < 700;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("selection");
  const sizeRange = useSelector(getRegularSquareFilter);
  const floorRange = useSelector(getRegularFloorFilter);
  const roomRange = useSelector(getRegularRoomFilter);
  const filterState = useSelector(getFilterState);
  const [contextMenu, setContextMenu] = useState({
    anchorEl: null,
    open: false,
    data: {},
  });
  const [popup, setPopup] = useState({
    anchorEl: null,
    open: false,
    data: {},
  });

  useEffect(() => {
    if (id) {
      dispatch(getObjectSvgDataAll(id));
      dispatch(getFloorSelectionSvg(id));
    }
    console.log(buildingData);
  }, [dispatch, id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buildingData.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + buildingData.length) % buildingData.length
    );
  };

  const getSvgHeight = () => {
    return "100%";
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    setContextMenu({
      anchorEl: e.currentTarget,
      open: true,
      data: data,
    });
  };
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setCurrentIndex(0);
  };

  const selectionView = () => (
    <>
      {buildingData?.map((building, index) => (
        <div
          key={building.buildingName}
          style={{
            height: index === currentIndex ? getSvgHeight() : "0px",
            width: "250%",
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "hidden",
            overflowX: "auto",
            backgroundColor: "black",
          }}
        >
          <svg
            x="0px"
            y="0px"
            viewBox="0 0 1920 1080"
            width={"100%"}
            xmlSpace="preserve"
            preserveAspectRatio="xMidYMid slice"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
          >
            <image
              xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.jpg`}
              alt=""
              width={building.imgWidth}
              height={building.imgHeight}
              transform={building.imgTransform}
            />
            {building?.apartmentList?.map((apartment) => {
              if (apartment.pointsType === "path") {
                return (
                  <path
                    d={apartment.path}
                    onContextMenu={(e) => handleContextMenu(e, apartment)}
                    className={
                      parseInt(apartment.floorNumber) >= floorRange.startVal &&
                      parseInt(apartment.floorNumber) <= floorRange.endVal &&
                      (roomRange.includes(apartment.rooms) ||
                        roomRange.includes("all")) &&
                      parseInt(apartment.square) >= sizeRange.startVal &&
                      parseInt(apartment.square) <= sizeRange.endVal
                        ? apartment.isSold
                          ? "st1"
                          : filterState
                          ? "st2"
                          : "st0"
                        : "st3"
                    }
                    id={apartment.apartmentId}
                    onMouseEnter={(e) => {
                      setPopup({
                        data: {
                          image: apartment.image3dUrl,
                          title: apartment.title,
                          navigateTo: () =>
                            navigate(`/apartments/${apartment.id}`),
                          sqft: apartment.square,
                          bedroom: apartment.rooms,
                          floor: apartment.floorNumber,
                        },
                        open: true,
                        x: e.clientX + 10,
                        y: e.clientY + 10,
                      });
                    }}
                    onMouseLeave={() => {
                      setPopup({
                        x: 0,
                        y: 0,
                        open: false,
                        data: {},
                      });
                    }}
                    onClick={() => {
                      if (
                        parseInt(apartment.floorNumber) >=
                          floorRange.startVal &&
                        parseInt(apartment.floorNumber) <= floorRange.endVal &&
                        (roomRange.includes(apartment.rooms) ||
                          roomRange.includes("all")) &&
                        parseInt(apartment.square) >= sizeRange.startVal &&
                        parseInt(apartment.square) <= sizeRange.endVal &&
                        !apartment.isSold
                      ) {
                        navigate(`/apartments/${apartment.id}`);
                      }
                    }}
                  />
                );
              }
              if (apartment.pointsType === "polygon") {
                return (
                  <polygon
                    key={apartment.id}
                    points={apartment.path}
                    className={"st0"}
                    id={apartment.apartmentId}
                    onClick={() => navigate(`/apartment/${apartment.id}`)}
                  />
                );
              }
            })}
          </svg>
        </div>
      ))}
    </>
  );
  const floorView = () => (
    <>
      {buildingFloorData?.map((building, index) => (
        <div
          key={building.buildingName}
          style={{
            height: index === currentIndex ? getSvgHeight() : "0px",
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
            width: "250%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
            top: 0,
            left: 0,
            backgroundColor: "#fff",
          }}
        >
          <svg
            // width={"100%"}
            // height={"100%"}
            // preserveAspectRatio="xMidYMid slice"
            // style={{ transform: isSmallDev && 'scale(1.9) translateX(20px)' }}
            // viewBox={building.viewBoxStyle}
            x="0px"
            y="0px"
            viewBox="0 0 1920 1080"
            width={"100%"}
            xmlSpace="preserve"
            preserveAspectRatio="xMidYMid slice"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
          >
            <image
              xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.jpg`}
              alt=""
              width={building.imgWidth}
              height={building.imgHeight}
              transform={building.imgTransform}
            />
            {building?.floorList?.map((apartment) => {
              if (apartment.pointsType === "path") {
                return (
                  <path
                    d={apartment.path}
                    onContextMenu={(e) => handleContextMenu(e, apartment)}
                    className={
                      parseInt(apartment.floorNumber) >= floorRange.startVal &&
                      parseInt(apartment.floorNumber) <= floorRange.endVal
                        ? "st2"
                        : "st3"
                    }
                    id={apartment.apartmentId}
                    onMouseEnter={(e) => {
                      setPopup({
                        anchorEl: e.currentTarget,
                        open: true,
                        data: apartment,
                      });
                    }}
                    onMouseLeave={() => {
                      setPopup({
                        anchorEl: null,
                        open: false,
                        data: apartment,
                      });
                    }}
                    onClick={() => {
                      if (
                        parseInt(apartment.floorNumber) >=
                          floorRange.startVal &&
                        parseInt(apartment.floorNumber) <= floorRange.endVal
                      ) {
                        navigate(
                          `/buildings/${building.buildingNr}/floor/${apartment.floorNumber}`
                        );
                      }
                    }}
                  />
                );
              }
              if (apartment.pointsType === "polygon") {
                return (
                  <polygon
                    key={apartment.id}
                    points={apartment.path}
                    className={"st0"}
                    id={apartment.apartmentId}
                    onClick={() =>
                      navigate(
                        `/buildings/${building.buildingNr}/floor/${apartment.floorNumber}`
                      )
                    }
                  />
                );
              }
            })}
          </svg>
        </div>
      ))}
    </>
  );

  return (
    <div className="relative w-full h-[65vh] flex items-start justify-center ">
      <div className="absolute w-11/12 flex flex-row justify-center items-center bottom-4  z-10">
        <div className="w-full flex items-center ">
          <div className="tabsB ">
            <input
              type="radio"
              id="radio-1"
              name="tabs"
              checked={selectedTab === "selection"}
            />
            <label
              className="tabB certon"
              onClick={() => {
                handleTabClick("selection");
              }}
              htmlFor="radio-1"
              style={{
                fontSize: "16px",
                width: isSmallDev ? "140px" : "",
              }}
            >
              By Apartment
            </label>
            <input
              type="radio"
              id="radio-2"
              name="tabs"
              checked={selectedTab === "floor"}
            />
            <label
              className="tabB certon"
              onClick={() => {
                handleTabClick("floor");
              }}
              htmlFor="radio-1"
              style={{
                fontSize: "16px",
                width: isSmallDev ? "100px" : "",
              }}
            >
              By Floor
            </label>
          </div>
          {selectedTab === "selection" && (
            <div className="right-0 top-12 flex justif-center items-center gap-4 pl-4">
              <button
                onClick={handlePrevious}
                className="bg-brand transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
              >
                <SlArrowLeft color="black" />
              </button>
              <button
                onClick={handleNext}
                className="bg-brand transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
              >
                <SlArrowRight color="black" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative w-screen bg-brand h-full flex flex-col justify-center items-center overflow-x-auto overflow-y-hidden">
        {selectedTab === "selection" ? selectionView() : floorView()}
      </div>
      {selectedTab === "floor" && popup.open && (
        <>
          <AvailableFloor
            anchorEl={popup.anchorEl}
            data={popup.data}
            open={popup.open}
          />
        </>
      )}
    </div>
  );
};

export default BuildingMobile;
