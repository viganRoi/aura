import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFloorByBuilding } from "../../features/apartment/ApartmentAPI";
import { imagePath } from "../../utils/consts";
import {
  getFloorApartmentsSvgData,
  getFloorStatus,
} from "../../features/apartment/ApartmentSlice";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { AuthProvider } from "../auth/AuthProvider";
import ContextMenu from "../contextMenu/ContextMenu";
import AdmApartmentModal from "../admin/apartments/AdmApartmentModal";
import { ApartmentFloorModal } from "../";

const Floor = () => {
  const isSmallDev = window.innerWidth < 700;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const floorData = useSelector(getFloorApartmentsSvgData);
  const { id, floorId } = useParams();
  const status = useSelector(getFloorStatus);
  const [contextMenu, setContextMenu] = useState({
    anchorEl: null,
    open: false,
    data: {},
  });

  useEffect(() => {
    dispatch(getFloorByBuilding(id));
  }, [dispatch, floorId]);

  const getSvgHeight = () => {
    return "100%";
  };

  const location = useLocation();
  const floorNumberFromState = location.state?.floorNumber;
  const initialFloor =
    floorNumberFromState !== undefined ? parseInt(floorNumberFromState, 10) : 0;

  // const floors = Array.from(
  //   { length: totalFloors },
  //   (_, i) => totalFloors - i
  // ).reverse();
  const totalFloors = 9;
  const floors = Array.from({ length: totalFloors }, (_, i) => i + 1);
  // const [activeFloor, setActiveFloor] = useState(floors[0]);
  const [activeFloor, setActiveFloor] = useState(initialFloor);
  const visibleRange = 5;
  const [startIndex, setStartIndex] = useState(0);

  // const updateVisibleFloors = (newActiveFloor) => {
  //   const newStartIndex = Math.max(
  //     0,
  //     Math.min(
  //       floors.indexOf(newActiveFloor) - Math.floor(visibleRange / 2),
  //       floors.length - visibleRange
  //     )
  //   );
  //   setStartIndex(newStartIndex);
  // };
  const updateVisibleFloors = (newActiveFloor) => {
    let newStartIndex =
      floors.indexOf(newActiveFloor) - Math.floor(visibleRange / 2);
    if (newStartIndex < 0) newStartIndex = 0;
    if (newStartIndex > floors.length - visibleRange) {
      newStartIndex = Math.max(floors.length - visibleRange, 0);
    }
    setStartIndex(newStartIndex);
  };

  useEffect(() => {
    updateVisibleFloors(initialFloor);
    setActiveFloor(initialFloor);
    // eslint-disable-next-line
  }, [initialFloor, floors.length]);

  const minusFloor = () => {
    const currentIndex = floors.indexOf(activeFloor);
    if (currentIndex < floors.length - 1) {
      const newActiveFloor = floors[currentIndex + 1];
      setActiveFloor(newActiveFloor);
      updateVisibleFloors(newActiveFloor);
    }
  };

  const plusFloor = () => {
    const currentIndex = floors.indexOf(activeFloor);
    if (currentIndex > 0) {
      const newActiveFloor = floors[currentIndex - 1];
      setActiveFloor(newActiveFloor);
      updateVisibleFloors(newActiveFloor);
    }
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    console.log(data);
    setContextMenu({
      anchorEl: e.currentTarget,
      open: true,
      data: data,
    });
  };

  const [hoveredId, setHoveredId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const hoveredApartment = floorData
    ?.flatMap((floor) => floor.apartmentList || [])
    .find((apartment) => apartment.id === hoveredId);

  if (!floorData || !floorData[activeFloor]) {
    console.warn(
      "floorData or activeFloor is invalid:",
      floorData,
      activeFloor
    );
  }

  return (
    <>
      <div className="bg-[var(--brand-color)] w-full pt-20 md:pt-0 h-[200px] md:h-[300px] flex flex-col items-center justify-center relative">
        <div className="w-11/12 md:w-5/6 text-black flex relative">
          <h1 className="montserrat text-2xl md:text-5xl text-[var(--brand2-color)]">
            Objekti:{" "}
            {floorData?.[0]?.apartmentList?.[0]?.apartmentNumber || "N/A"}
          </h1>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center content-center py-24 md:pt-24 md:pb-0 bg-white">
        <div className="w-full flex flex-col align-center justify-center gap-4">
          <div className="w-full flex flex-row justify-center items-center gap-1 md:gap-4">
            <button
              onClick={plusFloor}
              className="bg-white border border-slate-300 transition-all duration-.3s hover:bg-opacity-80 hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
            >
              <SlArrowUp className="-rotate-90" color="black" />
            </button>
            <div className="flex flex-row justify-center items-center gap-1 md:gap-4">
              {floors
                .slice(startIndex, startIndex + visibleRange)
                .map((floor) => (
                  <button
                    key={floor}
                    className={`${
                      floor === activeFloor
                        ? "bg-black text-brand"
                        : "bg-brand text-black"
                    } border border-gold text-4xl montserrat p-2  w-12 md:w-14 h-12 md:h-14 m-2 rounded-full flex items-center justify-center`}
                    onClick={() => {
                      setActiveFloor(floor);
                      updateVisibleFloors(floor);
                    }}
                  >
                    {floor}
                  </button>
                ))}
            </div>
            <button
              onClick={minusFloor}
              className="bg-white border border-slate-300 transition-all duration-.3s hover:bg-opacity-80 hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
            >
              <SlArrowDown className="-rotate-90" color="black" />
            </button>
          </div>
          <div className="relative w-full h-[350px] md:h-screen overflow-auto flex justify-center items-center">
            <div
              key={floorData?.buildingName}
              style={{
                transition: "opacity 0.1s ease-in-out",
                height: "100%",
                width: isSmallDev ? "160%" : "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              {floorData?.find((it) => it.floorNumber === activeFloor) ? (
                <svg
                  x="0px"
                  y="0px"
                  width={"100%"}
                  height={"100%"}
                  viewBox={"0 0 1920 1080"}
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsSvg="http://www.w3.org/2000/svg"
                >
                  <image
                    width={floorData && floorData[activeFloor - 1]?.imageWidth}
                    height={
                      floorData && floorData[activeFloor - 1]?.imageHeight
                    }
                    transform={
                      floorData && floorData[activeFloor - 1]?.imageTransform
                    }
                    xlinkHref={`${imagePath}f-${id}-${activeFloor}.jpg`}
                  ></image>
                  {floorData?.map((floor) => {
                    console.log(``);
                    if (parseInt(floor.floorNumber) === activeFloor) {
                      return floor.apartmentList?.map((apartment) => {
                        if (apartment.pointsType === "polygon") {
                          return (
                            <polygon
                              key={apartment.id}
                              onClick={() => {
                                if (apartment.isSold) return;
                                navigate(`/apartments/${apartment.id}`);
                              }}
                              onContextMenu={(e) =>
                                handleContextMenu(e, apartment)
                              }
                              className={apartment.isSold ? "st1" : "ft0"}
                              points={apartment.path}
                              onMouseEnter={() => setHoveredId(apartment.id)}
                              onMouseMove={handleMouseMove}
                              onMouseLeave={() => setHoveredId(null)}
                            />
                          );
                        }
                        if (apartment.pointsType === "path") {
                          return (
                            <path
                              onClick={() => {
                                if (apartment.isSold) return;
                                navigate(`/apartments/${apartment.id}`);
                              }}
                              onContextMenu={(e) =>
                                handleContextMenu(e, apartment)
                              }
                              className={apartment.isSold ? "st1" : "ft0"}
                              d={apartment.path}
                              onMouseEnter={() => setHoveredId(apartment.id)}
                              onMouseMove={handleMouseMove}
                              onMouseLeave={() => setHoveredId(null)}
                            />
                          );
                        }
                      });
                    } else return <h1>{floor.floorNumber}</h1>;
                  })}
                </svg>
              ) : (
                <h1 className="text-3xl text-gold">
                  Ky kati nuk ekziston në këtë objekt
                </h1>
              )}
            </div>
          </div>
        </div>
        {contextMenu.open && (
          <AuthProvider hide={true}>
            <ContextMenu menu={contextMenu} setMenu={setContextMenu} />
          </AuthProvider>
        )}
        <AdmApartmentModal />
        <ApartmentFloorModal
          apartment={hoveredApartment}
          mousePosition={mousePosition}
        />
      </div>
    </>
  );
};

export default Floor;
