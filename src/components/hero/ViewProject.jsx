import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { imagePath } from "../../utils/consts";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHousesByNeighborhood } from "../../features/house/HouseApi";
import { getHouseData } from "../../features/house/HouseSlice";
import { HouseHoverModal } from "../";

const ViewProject = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const houses = useSelector(getHouseData);
  const isSmallDev = window.innerWidth < 700;
  const [popup, setPopup] = useState({
    anchorEl: null,
    open: false,
    data: {}
  });

  const getSvgHeight = () => {
    return "100%";
  };

  useEffect(() => {
    dispatch(fetchAllHousesByNeighborhood())
  }, [dispatch]);


  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative bg-bck w-full h-[120vh] flex flex-col items-center justify-center">
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
              href={`${imagePath}${houses?.neighborhoodName}-general.png`}
              alt={houses?.neighborhoodName}
              width="100%"
              height="100%"
            />
            {houses?.houseDtoList.map((point) => (
              <path
                key={point.id}
                className={point.type === "commercial" ? 'sold' : 'available'}
                d={point.points}
                onMouseEnter={(e) => {
                  e.preventDefault();
                  setPopup({
                    data: {
                      title: point.name,
                      navigateTo: () => navigate(`/house/${point.id}`),
                      sqft: point.totalSquare,
                      type: point.type,
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
                onClick={() => navigate(`/house/${point.id}`)}
              />
            ))}
          </svg>
        </div>
      </div>
      {popup.open && <HouseHoverModal house={popup.data} mousePosition={mousePosition} />}
    </div>
  );
};

export default ViewProject;
