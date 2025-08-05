import React, { useEffect, useRef, useState } from "react";
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

const Building = () => {
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

  const containerRef = useRef(null);

  useEffect(() => {
    if (isSmallDev && containerRef.current) {
      const container = containerRef.current;
      // Scroll to center: (scrollWidth - clientWidth) / 2
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 46;
    }
  }, []);

  const getSvgHeight = () => {
    return isSmallDev ? "100%" : "100%";
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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const selectionView = () => (
    <div
      className="relative   top-0 left-0 w-[100%] bg-brand flex  overflow-hidden mt-8 md:mt-0  items-center justify-center"
      style={{ height: getSvgHeight() }}
    >
      {buildingData?.map((building, index) => (
        <div
          ref={containerRef}
          key={building.buildingName}
          style={{
            height: index === currentIndex ? getSvgHeight() : "0px",
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
            width: isSmallDev ? "250%" : "100%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <svg
            width={"100%"}
            height={isSmallDev ? "100%" : "100%"}
            preserveAspectRatio="xMidYMid slice"
            style={{
              transform: isSmallDev && "scale(1.4) translateX(20px)",
            }}
            viewBox={building.viewBoxStyle}
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
                      e.preventDefault();
                      setPopup({
                        data: {
                          image: apartment.imageUrl,
                          title: apartment.title,
                          navigateTo: () =>
                            navigate(`/apartments/${apartment.id}`),
                          sqft: apartment.square,
                          bedroom: apartment.rooms,
                          floor: apartment.floorNumber,
                          name: apartment.name,
                        },
                        open: true,
                        x: e.clientX + 10,
                        y: e.clientY + 10,
                      });
                    }}
                    onMouseMove={handleMouseMove}
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
    </div>
  );
  const floorView = () => (
    <div
      className="absolute md:relative top-0 left-0 w-[100%] bg-brand flex items-center justify-center"
      style={{ height: getSvgHeight() }}
    >
      {buildingFloorData?.map((building, index) => (
        <div
          key={building.buildingName}
          style={{
            height: index === currentIndex ? getSvgHeight() : "0px",
            opacity: currentIndex === index ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
            width: "100%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <svg
            width={"100%"}
            height={isSmallDev ? "100%" : "100%"}
            preserveAspectRatio="xMidYMid slice"
            style={{ transform: isSmallDev && "scale(1.4) translateX(20px)" }}
            viewBox={building.viewBoxStyle}
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
                      e.preventDefault();
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
                        // navigate(`/buildings/${building.buildingNr}/floor/${apartment.id}`);
                        navigate(
                          `/buildings/${building.buildingNr}/floor/${apartment.id}`,
                          { state: { floorNumber: apartment.floorNumber } }
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
    </div>
  );

  return (
    <div className="relative w-full h-[65vh]  md:h-[120vh] flex flex-col items-center justify-center">
      <div className="absolute w-11/12 md:5/6 h-0 flex flex-col justify-center items-center bottom-8 md:top-10 z-10">
        <div className="flex items-center ">
          <div className="tabsB w-full flex justify-between  ">
            <input
              type="radio"
              id="radio-1"
              name="tabs"
              checked={selectedTab === "selection"}
            />
            <label
              className="tabB w-full"
              onClick={() => {
                handleTabClick("selection");
              }}
              htmlFor="radio-1"
              style={{
                fontSize: isSmallDev ? "12px" : "16px",
                width: "100%",
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
              className="tabB w-full"
              onClick={() => {
                handleTabClick("floor");
              }}
              htmlFor="radio-1"
              style={{
                fontSize: isSmallDev ? "12px" : "16px",
                width: "100%",
              }}
            >
              By Floor
            </label>
          </div>
        </div>
      </div>
      <div className="relative w-full h-full flex justify-center items-start  md:items-center">
        {selectedTab === "selection" ? selectionView() : floorView()}
        {selectedTab === "selection" && (
          <div className="absolute w-full left-0 bottom-12 md:top-1/2 h-0 flex justify-end md:justify-between gap-2 px-4">
            <button
              onClick={() => navigate("/apartments")}
              className="absolute md:hidden items-center justify-center text-sm border-brand border rounded-full h-[35px] w-2/3 text-white left-4"
            >
              Shiko të gjitha apartamentet
            </button>
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

      {selectedTab === "selection" && popup.open && (
        <ApartmentModal apartment={popup.data} mousePosition={mousePosition} />
      )}
      {selectedTab === "floor" && popup.open && (
        <>
          <FloorPopup
            anchorEl={popup.anchorEl}
            data={popup.data}
            open={popup.open}
          />
          <AvailableFloor
            anchorEl={popup.anchorEl}
            data={popup.data}
            open={popup.open}
          />
        </>
      )}
      {contextMenu.open && (
        <AuthProvider hide={true}>
          <ContextMenu menu={contextMenu} setMenu={setContextMenu} />
        </AuthProvider>
      )}
      <AdmApartmentModal />
    </div>
  );
};

export default Building;
