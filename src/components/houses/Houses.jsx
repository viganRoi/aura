import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { imagePath } from "../../utils/consts";
import { getRegularFilterType } from "../../features/filter/FilterSlice";
import { useState, useMemo } from "react";
import ContextMenu from "../contextMenu/ContextMenu";
import AdmHouseModal from "../admin/apartments/AdmHouseModal";
import HouseHoverModal from './HouseHoverModal';

const Houses = ({
  houses
}) => {
  const navigate = useNavigate();
  const typeFilter = useSelector(getRegularFilterType);
  const [contenxtMenu, setContextMenu] = useState({
    open: false,
    anchorEl: null,
    data: {},
  });
  const [currentIndex, setCurrentIndex] = useState(1);
  const filterState = false;

  const allHouses = useMemo(() => {
    if (!houses?.houseDtoList) return [];
    return houses.houseDtoList;
  }, [houses]);

  const filteredHouses = useMemo(() => {
    let filtered = allHouses;

    if (typeFilter.length && !typeFilter.includes("all")) {
      filtered = filtered.filter(house => typeFilter.includes(house.type));
    }

    return filtered;
  }, [allHouses, typeFilter]);

  const available = filteredHouses.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < 5 ? prevIndex + 1 : 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 1 ? prevIndex - 1 : 5
    );
  };

  const [popup, setPopup] = useState({
    open: false,
    x: 0,
    y: 0,
    data: {},
  });

  const handleMouseMove = (e) => {
    setPopup((prev) => ({
      ...prev,
      x: e.clientX + 10,
      y: e.clientY + 10,
    }));
  };

  const handleContextMenu = (e, house) => {
    e.preventDefault();
    setContextMenu({
      open: true,
      anchorEl: e.currentTarget,
      data: house,
    });
  };

  const getSvgHeight = () => "100%";

  return (
    <div className="relative w-full h-[110vh] flex flex-col items-center justify-center">
      <div className="w-11/12 h-0 absolute z-[99999] flex justify-between gap-4">
        <button
          onClick={handlePrevious}
          className="h-12 w-12 bg-primary text-white rounded-full"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="h-12 w-12 bg-primary text-white rounded-full"
        >
          Next
        </button>
      </div>
      <div
        className="absolute md:relative w-full flex items-center justify-center"
        style={{ height: getSvgHeight() }}
      >
        <div
          style={{
            height: getSvgHeight(),
            opacity: 1,
            transition: "opacity 0.1s ease-in-out",
            width: "100%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <svg
            // width={"100%"}
            // height={"100%"}
            // viewBox={building.viewBoxStyle}
            x="0px"
            y="0px"
            viewBox="0 0 1920 1080"
            width="100%"
            xmlSpace="preserve"
            preserveAspectRatio="xMidYMid slice"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
          >
            <image
              xlinkHref={`${imagePath}${currentIndex}.jpg`}
              alt=""
              // width={building.imgWidth}
              // height={building.imgHeight}
              width="100%"
              height="100%"
            // transform={'houses'}
            />
            {filteredHouses?.map((apartment) => {
              // Check only typeFilter
              console.log(apartment.type)
              const isInType =
                !typeFilter.length ||
                typeFilter.includes("all") ||
                typeFilter.includes(apartment.type);

              const isClickable = isInType && !apartment.isSold;

              const commonProps = {
                onContextMenu: (e) => handleContextMenu(e, apartment),
                className: isInType
                  ? apartment.isSold
                    ? "sold"
                    : apartment.isReserved
                      ? "reserved"
                      : filterState
                        ? "filtered"
                        : "available"
                  : "disabled",
                id: apartment.apartmentId,
                onMouseEnter: (e) => {
                  e.preventDefault();
                  setPopup({
                    data: {
                      image: apartment.image3dUrl,
                      title: apartment.name,
                      navigateTo: () =>
                        navigate(`/apartments/${apartment.id}`),
                      sqft: apartment.netoSquare,
                      bedroom: apartment.rooms,
                      floor: apartment.floorNumber,
                      type: apartment.type,
                    },
                    open: true,
                    x: e.clientX + 10,
                    y: e.clientY + 10,
                  });
                },
                onMouseMove: handleMouseMove,
                onMouseLeave: () => {
                  setPopup({
                    x: 0,
                    y: 0,
                    open: false,
                    data: {},
                  });
                },
                onClick: () => {
                  if (isClickable) {
                    navigate(`/houses/${apartment.id}`);
                  }
                },
              };
              if (apartment.side === currentIndex) {
                if (apartment.pointType === "path") {
                  return (
                    <path
                      key={apartment.id}
                      d={apartment.points}
                      {...commonProps}
                    />
                  );
                }
                if (apartment.pointsType === "polygon") {
                  return (
                    <polygon
                      key={apartment.id}
                      points={apartment.path}
                      {...commonProps}
                    />
                  );
                }
              }
              return null;
            })}
          </svg>
        </div>
      </div>
      {popup.open && (
        <HouseHoverModal
          house={popup.data}
          mousePosition={{ x: popup.x, y: popup.y }}
        />
      )}
      <ContextMenu
        menu={contenxtMenu}
        setMenu={setContextMenu}
        setPopup={setPopup}
      />
      <AdmHouseModal />
    </div>
  );
};

export default Houses;
