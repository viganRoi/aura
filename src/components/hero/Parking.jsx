import React, { useState, useEffect } from "react";
import ParkingModal from "./ParkingModal";
import { PriceCard } from "../";
import AdmParkingModal from "../admin/parking/AdmParkingModal";
import ContextMenuParking from "../contextMenu/ContextMenuParking";
import axios from "axios";
import { BASE_URL, imagePath } from "../../utils/consts";
import { useMediaQuery } from "@mui/material";

const Parking = ({ parkingNumber }) => {
  const isSmallDev = window.innerWidth < 700;
  const isMidDev = useMediaQuery("(max-width:1024px)");
  const [parkingData, setParkingData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState({
    anchorEl: null,
    open: false,
    data: {},
  });
  const [popup, setPopup] = useState({
    anchorEl: null,
    data: {},
    open: false,
  });
  const [limited, setLimited] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const [isPriceCardVisible, setIsPriceCardVisible] = useState(false);

  const currentParkingArea = parkingNumber[currentIndex];

  const handlePathClick = (point) => {
    setSelectedParking(point);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedParking(null);
  };

  const togglePriceCard = () => {
    setIsPriceCardVisible(!isPriceCardVisible);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/parking?id=parking${parkingNumber}`)
      .then((res) => setParkingData(res.data))
      .catch((err) => console.log(err));
  }, [parkingNumber]);

  const getSvgHeight = () => {
    return isSmallDev ? "auto" : isMidDev ? "auto" : "auto";
  };

  const handleContextMenu = (e, data) => {
    e.preventDefault();
    setContextMenu({
      anchorEl: e.currentTarget,
      open: true,
      data: data,
    });
  };

  return (
    <div className="bg-white w-full h-[50vh] md:h-[40vh] flex flex-col items-center justify-center overflow-auto md:overflow-hidden relative my-20">
      {parkingData?.map((building, index) => {
        return (
          <div
            key={building.buildingName}
            style={{
              height: index === currentIndex ? getSvgHeight() : "100%",
              opacity: currentIndex === index ? 1 : 0,
              transition: "opacity 0.1s ease-in-out",
              width: isSmallDev ? "300%" : "100%",
              position: isMidDev ? "" : "absolute",
              display: "flex",
              overflow: "hidden",
            }}
          >
            <svg
              width={isSmallDev ? "300%" : "100%"}
              height={"100%"}
              objectFit="cover"
              preserveAspectRatio="none"
              style={{
                borderRadius: "5px",
                paddingLeft: isSmallDev ? "420px" : "0px",
              }}
              viewBox={building.viewBoxStyle}
            >
              <image
                xlinkHref={`${imagePath}${building.buildingNr}-${building.buildingSide}.png`}
                alt=""
                width={building.imgWidth}
                height={building.imgHeight}
                transform={building.imgTransform}
                objectFit="cover"
              />
              {building?.parkingList?.map((apartment) => {
                if (apartment.pointsType === "path") {
                  return (
                    <path
                      d={apartment.path}
                      onContextMenu={(e) => handleContextMenu(e, apartment)}
                      className={
                        apartment.isSold
                          ? 'st1'
                          : apartment.isRent
                          ? "rent-class"
                          : apartment.isReserved
                          ? "parking-reserved"
                          : "st0"
                      }
                      id={apartment.apartmentId}
                      onMouseEnter={(e) => {
                        e.preventDefault();
                        setPopup({
                          data: apartment,
                          anchorEl: e.currentTarget,
                          open: true,
                        });
                      }}
                      onMouseLeave={(e) => {
                        e.preventDefault();
                        setPopup({
                          anchorEl: null,
                          data: {},
                          open: false,
                        });
                      }}
                      onClick={() => {
                        setSelectedParking(apartment);
                        setShowModal(true);
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
                      onClick={() => {
                        setSelectedParking(apartment);
                        setShowModal(true);
                      }}
                    />
                  );
                }
              })}
            </svg>
          </div>
        );
      })}

      <ContextMenuParking menu={contextMenu} setMenu={setContextMenu} />
      <AdmParkingModal />
      {showModal && (
        <ParkingModal
          onClose={handleCloseModal}
          parkingData={selectedParking}
          onTogglePriceCard={togglePriceCard}
        />
      )}
      {isPriceCardVisible && <PriceCard onClose={togglePriceCard} />}
    </div>
  );
};

export default Parking;
