import React, { useState } from "react";
import { buildings } from "../../utils/server";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { imagePath } from "../../utils/consts";

const ViewCommercial = () => {
    const navigate = useNavigate();
    const isSmallDev = window.innerWidth < 700;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredId, setHoveredId] = useState(null);
    const [activeButton, setActiveButton] = useState("building");

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

    const currentBuilding = buildings[currentIndex];

    const getSvgHeight = () => {
        return "100%";
    };

    return (
        <div className="relative bg-brand w-full h-[65vh] md:h-[100vh] flex flex-col items-center justify-center">
            <div className="relative w-screen bg-brand h-full flex flex-col justify-center items-center overflow-x-auto md:overflow-x-hidden">
                <div
                    className="absolute md:relative w-full flex items-center justify-center"
                    style={{ height: getSvgHeight() }}
                >
                    <div
                        style={{
                            transition: "opacity 0.1s ease-in-out",
                            height: getSvgHeight(),
                            width: isSmallDev ? "250%" : "100%",
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
                                href={currentBuilding.image}
                                alt={currentBuilding.name}
                                width="100%"
                                height="100%"
                            />
                            {currentBuilding.points
                                .filter((point) => point.type === "commercial")
                                .map((point) => (
                                    <path
                                        key={point.id}
                                        className="st0"
                                        d={point.path}
                                        onMouseEnter={() => setHoveredId(point.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        onClick={() => navigate(`/temp/${point.type}/${point.name}`)}
                                    />
                                ))}
                        </svg>
                    </div>
                </div>
            </div>
            <div className="absolute w-screen h-48 bg-brand bottom-0 z-0"></div>
            <div className="absolute w-11/12 flex justify-end items-center bottom-10 z-10">
                <div className="right-0 top-12 flex justif-center items-center gap-2 md:gap-4">
                    <button
                        onClick={handlePrevious}
                        className="bg-gold transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
                    >
                        <SlArrowLeft color="#fff" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-gold transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
                    >
                        <SlArrowRight color="#fff" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCommercial;
