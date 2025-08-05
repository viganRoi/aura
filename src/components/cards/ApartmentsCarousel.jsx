import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import ApartmentWishlistCard from "./ApartmentWishlistCard";
import { useSelector } from "react-redux";
import { getApartmentDetailModalData } from "../../features/apartment/ApartmentSlice";
import { BASE_URL } from "../../utils/consts";
import ApartmentCard from "./ApartmentCard";

const ApartmentsCarousel = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [relatedApartments, setRelatedApartments] = React.useState([]);
  const apartment = useSelector(getApartmentDetailModalData);

  useEffect(() => {
    if (apartment && apartment.rooms) {
      fetch(`${BASE_URL}/api/apartment/get/related?type=${apartment.rooms}`)
        .then(async (res) => {
          const data = await res.json();
          setRelatedApartments(data);
        })
        .catch((err) =>
          console.error("Failed to fetch related apartments", err)
        );
    }
  }, [apartment]);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center content-center  bg-white">
      <div className="w-full md:w-11/12 flex flex-col items-start justify-center gap-4 bg-white py-12 px-4 md:px-12 z-20">
        <h1 className="text-brand text-2xl montserrat font-semibold ml-0 md:ml-4">
          Apartamente te ngjashme
        </h1>
        <Swiper
          ref={swiperRef}
          breakpoints={{
            340: {
              slidesPerView: 1.5,
              spaceBetween: 4,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[FreeMode]}
          style={{
            maxWidth: "100%",
          }}
        >
          {relatedApartments?.map((el) => {
            return (
              <SwiperSlide id="swipeslides" key={el.id}>
                <ApartmentCard
                  key={el.id}
                  object={el.apartmentNumber}
                  category={el.category}
                  image={el.imageUrl}
                  title={el.name}
                  floor={el.floorNumber}
                  sqft={el.square}
                  bedroom={el.rooms}
                  navigateTo={() => navigate(`/apartments/${el.id}`)}
                  id={el.id}
                  apartment={el}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ApartmentsCarousel;
