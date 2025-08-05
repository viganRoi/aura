import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFloorSvgData } from '../features/apartment/ApartmentSlice';
import { useParams } from 'react-router-dom';
import { getAllApartmentsByFloorId } from '../features/apartment/ApartmentAPI';
import { imagePath } from '../utils/consts';

const FloorSvgPage = () => {
    const building = useSelector(getFloorSvgData);
    const isSmallDev = false;
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getAllApartmentsByFloorId(id));
        }
    }, [dispatch, id]);
    return (
      <div className='w-full h-screen'>
        <svg
          width={"100%"}
          preserveAspectRatio="xMidYMax meet"
          height={"100%"}
          viewBox={building.viewBoxStyle}
        >
          <image
            xlinkHref={`${imagePath}${building.imageUrl}`}
            alt=""
            width={building.imageWidth}
            height={building.imageHeight}
            transform={building.imageTransform}
          />
          {building?.apartmentDTO?.map((apartment) => {
            if (apartment.pointsType === "path") {
              return (
                <path
                  d={apartment.path}
                  onContextMenu={(e) => handleContextMenu(e, apartment)}
                  className={
                    "st2"
                  }
                  id={apartment.apartmentId}
                  onMouseEnter={(e) => {
                    setPopup({
                      data: apartment,
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
                      !parseInt(apartment.floorNumber) >= floorRange[0] &&
                      !parseInt(apartment.floorNumber) <= floorRange[1]
                    ) {
                      navigate(`/apartments/floor/${apartment.id}`);
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
    );
}

export default FloorSvgPage