import React, { useCallback, useEffect, useRef, useState } from "react";
import { buildings } from "../../utils/server";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { imagePath } from "../../utils/consts";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHousesByNeighborhood } from "../../features/house/HouseApi";
import { getHouseData, getHouseLoading } from "../../features/house/HouseSlice";
import ContextMenu from "../contextMenu/ContextMenu";
import AdmHouseModal from "../admin/apartments/AdmHouseModal";

const ViewProject = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [menu, setMenu] = useState({ open: false, anchorEl: null });
  const modalState = useSelector((state) => state.HouseSlice.houseEditModal);
  const dispatch = useDispatch();
  const houses = useSelector(getHouseData);
  const loading = useSelector(getHouseLoading)
  const isSmallDev = window.innerWidth < 700;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [activeButton, setActiveButton] = useState("building");
  const [selectedTab, setSelectedTab] = useState("3d");

  const handleButtonClick = (filter) => {
    setActiveButton(filter);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % buildings.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + buildings.length) % buildings.length
    );
  };

  const currentBuilding =
    buildings.find((b) => b.name === selectedTab) || buildings[0];

  const handleTabClick = (view) => {
    setSelectedTab(view);
  };

  const getSvgHeight = () => {
    return "100%";
  };

  // useEffect(function () {
  //   setTimeout(function () {
  //     ref.current.scrollLeft = 1000;
  //   }, 1000);
  // }, []);

  useEffect(() => {
    dispatch(fetchAllHousesByNeighborhood())
  }, [dispatch]);

  return (
    <div onContextMenu={(e) => e.preventDefault()} className="relative bg-black w-full h-[85vh] md:h-[100vh] flex flex-col items-center justify-center">
      <div className="relative w-screen bg-black h-full flex flex-col justify-center items-center overflow-x-auto md:overflow-x-hidden">
        <div
          className="absolute md:relative w-full flex items-center justify-center "
          style={{ height: getSvgHeight() }}
        >
          <div
            ref={ref}
            style={{
              transition: "opacity 0.1s ease-in-out",
              height: getSvgHeight(),
              width: isSmallDev ? "350%" : "100%",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: isSmallDev ? "auto" : "hidden",
              top: 0,
              left: 0,
              zIndex: 1,
              // backgroundColor: 'var(--brand-color)',
            }}
          >
            <svg
              x="0px"
              y="0px"
              viewBox="0 0 1920 1080"
              // height={isSmallDev ? "" : "100%"}
              width={"100%"}
              xmlSpace="preserve"
              preserveAspectRatio="xMidYMid slice"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
            >
              <image
                href={`${imagePath}${houses?.neighborhoodName}-general.png`}
                alt={currentBuilding.name}
                width="100%"
                height="100%"
              />
              {houses?.houseDtoList.map((point) => (
                <path
                  key={point.id}
                  className={point.type === "commercial" ? "cm0" : "st0"}
                  d={point.points}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setMenu({
                      open: true,
                      anchorEl: e.currentTarget,
                      data: point,
                    });
                  }}
                  onMouseEnter={() => setHoveredId(point.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`/${point.type}/${point.name}`)}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute w-11/12 md:5/6 flex justify-end items-center text-center  right-2/3 translate-x-1/2 md:right-4/5 top-20 md:top-24 z-10">
        <div className="tabsB">
          <input
            type="radio"
            id="radio-1"
            name="tabs"
            checked={selectedTab === "3d"}
          />
          <label
            className="tab certon"
            onClick={() => {
              handleTabClick("3d");
            }}
            htmlFor="radio-1"
            style={{ fontSize: isSmallDev ? "12px" : "16px" }}
          >
            PLANI 3D
          </label>
          <input
            type="radio"
            id="radio-2"
            name="tabs"
            checked={selectedTab === "top"}
          />
          <label
            className="tab certon"
            onClick={() => {
              handleTabClick("top");
            }}
            htmlFor="radio-1"
            style={{ fontSize: isSmallDev ? "12px" : "16px" }}
          >
            PAMJA NGA LART
          </label>
        </div>
      </div>
      <ContextMenu menu={menu} setMenu={setMenu}/>
      {modalState && (<AdmHouseModal />)}
    </div>
  );
};

export default ViewProject;
