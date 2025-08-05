import { Box } from '@mui/material';
import React, { useState } from 'react';
import { mainUrl, STORE_IMAGE_PATH } from '../../utils/consts';
import { useParams } from 'react-router-dom';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import AdmCommercialStoreModal from '../admin/commercialStore/AdmCommercialStoreModal';
import ContextMenuCommercialStore from '../contextMenu/ContextMenuCommercialStore';

const CommercialMobile = ({ filteredCommercial }) => {
  const isSmallDev = window.innerWidth < 700;
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState({
    open: false,
    anchorEl: null,
    data: {}
  });
  const [popup, setPopup] = useState({
    x: 0,
    y: 0,
    open: false,
    data: {},
  });
  const handlePrev = () => {
    setCurrentIndex((prevIdx) => Math.max(prevIdx - 1, 0));
    if (currentIndex === 0) {
      setCurrentIndex(filteredCommercial.length - 1);
    }
  };
  const handleNext = () => {
    setCurrentIndex((prevIdx) => Math.min(prevIdx + 1, filteredCommercial.length - 1));
    if (currentIndex === filteredCommercial.length - 1) {
      setCurrentIndex(0);
    }
  };

  const handleContextMenu = (e, apartment) => {
    e.preventDefault();
    setContextMenu({
      open: true,
      anchorEl: e.currentTarget,
      data: apartment
    });
  }; const getSvgHeight = () => {
    return '100%';
  };
  return (
    <div className='relative w-full h-[80vh] md:h-[90vh] flex items-start justify-center'>
      <div className="absolute w-11/12 h-full flex justify-between items-center">
        <button
          onClick={handlePrev}
          className="z-10 bg-gold transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
        >
          <SlArrowLeft color="#fff" />
        </button>
        <button
          onClick={handleNext}
          className="z-10 bg-gold transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
        >
          <SlArrowRight color="#fff" />
        </button>
      </div>
      <div className='relative w-screen bg-brand h-full flex flex-col justify-center items-center overflow-x-auto'>
        <div className="absolute md:relative top-0 left-0 w-full h-full bg-brand flex items-center justify-center" style={{}}>
          {filteredCommercial?.map((building, index) => (
            <div
              key={building.buildingName + building.id}
              style={{
                height: index === currentIndex ? getSvgHeight() : "0px",
                width: "250%",
                opacity: currentIndex === index ? 1 : 0,
                transition: "opacity 0.1s ease-in-out",
                position: "absolute",
                top: 0,
                // left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                backgroundColor: "#21434B",
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
                {/* <image
                xlinkHref={`${mainUrl}${STORE_IMAGE_PATH}${id}-${currentIndex + 1}.jpg`}
                alt=""
                width={'100%'}
                height={'100%'}
              /> */}
                <image
                  xlinkHref={`${mainUrl}${STORE_IMAGE_PATH}${id}-${currentIndex + 1}.jpg`}
                  alt=""
                  width={building.imgWidth}
                  height={building.imgHeight}
                  transform={building.imgTransform}
                />
                {building?.commercialStoreList.map((apartment) => {
                  if (apartment.pointsType === "path") {
                    return (
                      <path
                        d={apartment.path}
                        onContextMenu={(e) => handleContextMenu(e, apartment)}
                        className={
                          !apartment.isAvailable ? apartment.isRent ? 'rent-class' : 'st0' : 'st1'
                        }
                        // className='st0'
                        id={apartment.apartmentId}
                        onMouseEnter={(e) =>
                          setPopup({
                            data: apartment,
                            open: true,
                            x: e.clientX + 10,
                            y: e.clientY + 10,
                          })
                        }
                        onMouseLeave={() =>
                          setPopup({
                            x: 0,
                            y: 0,
                            open: false,
                            data: {},
                          })
                        }
                        onClick={() => {
                          navigate(`/afarizmi/page/${apartment.id}`);
                        }}
                      />
                    );
                  }
                  if (apartment.pointsType === "polygon") {
                    return (
                      <polygon
                        key={apartment.id}
                        points={apartment.path}
                        className={"st2"}
                        id={apartment.apartmentId}
                        onClick={() => navigate(`/afarizmi/page/${apartment.id}`)}
                      />
                    );
                  }
                })}
              </svg>
            </div>
          ))}
        </div>
      </div>
      <ContextMenuCommercialStore menu={contextMenu} setMenu={setContextMenu} />
      <AdmCommercialStoreModal />
    </div>
  );
};

export default CommercialMobile;