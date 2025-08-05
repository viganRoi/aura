import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllApartmentsByFloorId,
  getObjectSvgDataAll,
} from "../../features/apartment/ApartmentAPI";
import {
  getAllApartmentSvgData,
  getAllFloorSvgData,
} from "../../features/apartment/ApartmentSlice";
import { getWishlistCount } from "../../features/wishList/WishlistSlice";
import { getFilterState } from "../../features/filter/FilterSlice";
import { imagePath } from "../../utils/consts";
import ContextMenu from "../common/contextMenu/ContextMenu";
import AdmApartmentModal from "../admin/apartments/AdmApartmentModal";
import Toparrow from "../../assets/svg/Toparrow";
import Bottomarrow from "../../assets/svg/Bottomarrow";
import { useTransition, animated } from "@react-spring/web";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { isAuthorized } from "../../features/auth/AuthSlice";

const maxFloor = 14;
const minFloor = 1;
const maxSquare = 720;
const minSquare = 40;

const FloorSvg = ({ floorId }) => {
  const dispatch = useDispatch();
  const buildingData = useSelector(getAllFloorSvgData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sizeRange, setSizeRange] = useState([minSquare, maxSquare]);
  const [floorRange, setFloorRange] = useState([minFloor, maxFloor]);
  const [roomRange, setRoomRange] = useState("all");
  const filterState = useSelector(getFilterState);
  const [contextMenu, setContextMenu] = useState({
    anchorEl: null,
    open: false,
    data: {},
  });
  const [popup, setPopup] = useState({
    x: 0,
    y: 0,
    open: false,
    data: {},
  });
  const [limited, setLimited] = useState(false);

  useEffect(() => {
    if (floorId) {
      dispatch(getAllApartmentsByFloorId(floorId));
    }
  }, [dispatch, floorId]);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + (limited ? 2 : 1)) % buildingData.length
    ); 
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - (limited ? 2 : 1) + buildingData.length) %
        buildingData.length
    );
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
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

  //Diari

  const totalFloors = 15;
  const floors = Array.from({ length: totalFloors }, (_, i) => totalFloors - i); 
  const [activeFloor, setActiveFloor] = useState(floors[0]); 
  const visibleRange = 5;
  const [startIndex, setStartIndex] = useState(0);

  const updateVisibleFloors = (newActiveFloor) => {
    const newStartIndex = Math.max(
      0,
      Math.min(
        floors.indexOf(newActiveFloor) - Math.floor(visibleRange / 2),
        floors.length - visibleRange
      )
    );
    setStartIndex(newStartIndex);
  };

  const scrollUp = () => {
    const currentIndex = floors.indexOf(activeFloor);
    if (currentIndex < floors.length - 1) {
      const newActiveFloor = floors[currentIndex + 1];
      setActiveFloor(newActiveFloor);
      updateVisibleFloors(newActiveFloor);
    }
  };

  const scrollDown = () => {
    const currentIndex = floors.indexOf(activeFloor);
    if (currentIndex > 0) {
      const newActiveFloor = floors[currentIndex - 1];
      setActiveFloor(newActiveFloor);
      updateVisibleFloors(newActiveFloor);
    }
  };

  const floorContent = floors.reduce((acc, floor) => {
    acc[floor] = {
      title: `Kati ${floor}`,
      image: `path_to_floor_${floor}_image`,
    };
    return acc;
  }, {});

  const transitions = useTransition(
    floors.slice(startIndex, startIndex + visibleRange),
    {
      from: { opacity: 0, transform: "translateY(20px)" },
      enter: { opacity: 1, transform: "translateY(0px)" },
      leave: { opacity: 0, transform: "translateY(-20px)" },
      config: { tension: 0, friction: 0 },
    }
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        width="20%"
        bgcolor="#1D1D3A"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={0}
        height={"71vh"}
        maxHeight={"71vh"}
        position={"absolute"}
        overflow={"hidden"}
        top={"10%"}
      >
        <Button
          onClick={scrollDown}
          disabled={activeFloor === floors[0]}
          sx={{
            width: "50px",
            minWidth: "0px",
            height: "50px",
            border: "1px solid #c1ac40",
            backgroundColor: "#C1AC40",
            color: "#1D1D3A",
            borderRadius: "50px",
            "&:hover": {
              backgroundColor: "#1D1D3A",
              color: "#C1AC40",
            },
          }}
        >
          <Toparrow />
        </Button>
        <List>
          {transitions((style, floor) => (
            <animated.div style={style} key={floor}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setActiveFloor(floor)}
                  sx={{
                    backgroundColor:
                      activeFloor === floor ? "#C1AC40" : "transparent",
                    color: activeFloor === floor ? "#1D1D3A" : "#C1AC40",
                    borderRadius: "50px",
                    minWidth: "0px",
                    width: "50px",
                    height: "50px",
                    marginBottom: "8px",
                    fontWeight: activeFloor === floor ? "bold" : "normal",
                    fontFamily: "poppins",
                  }}
                >
                  <ListItemText
                    primary={floor}
                    primaryTypographyProps={{
                      align: "center",
                      color: "white",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </animated.div>
          ))}
        </List>
        <Button
          onClick={scrollUp}
          disabled={activeFloor === floors[floors.length - 1]} // Disable if no lower floors
          sx={{
            width: "50px",
            minWidth: "0px",
            height: "50px",
            border: "1px solid #c1ac40",
            backgroundColor: "#C1AC40",
            color: "#1D1D3A",
            borderRadius: "50px",
            "&:hover": {
              backgroundColor: "#1D1D3A",
              color: "#C1AC40",
            },
          }}
        >
          <Bottomarrow />
        </Button>
      </Box>
      <div
        key={buildingData?.buildingName}
        style={{
          height: getSvgHeight(),
          transition: "opacity 0.1s ease-in-out",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          left: "28%",
        }}
      >
        <svg
          x="0px"
          y="0px"
          viewBox="0 0 1920 1080"
          xmlSpace="preserve"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsSvg="http://www.w3.org/2000/svg"
        >
          <image
            width="1920"
            height="1080"
            xlinkHref={`${imagePath}a1-f1.jpg`}
          ></image>
          {buildingData?.apartmentDTO?.map((apartment) => {
            return (
              <path
                className={
                  apartment.isSold ? (isAuthorized() ? "st1" : "ft0") : "ft0"
                }
                d={apartment.path}
              />
            );
          })}
        </svg>
      </div>
      <ContextMenu menu={contextMenu} setMenu={setContextMenu} />
      <AdmApartmentModal />
    </Box>
  );
};

export default FloorSvg;
