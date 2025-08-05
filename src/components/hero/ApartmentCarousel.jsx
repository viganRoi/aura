import React, { useRef } from "react";
import { ApartmentCard } from "../";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const ApartmentCarousel = ({ data }) => {
  const swiperRef = useRef(null);
  const isSmallDev = window.innerWidth < 700;
  const navigate = useNavigate();

  const handleNext = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center content-center py-24 md:py-64  bg-brand">
      <div className="w-full md:w-full flex flex-col items-center justify-center">
        <div className="w-11/12 flex justify-between items-center mb-10">
          <div className="flex flex-col gap-8">
            <h1 className="text-gold font-bold text-xl md:text-5xl certon">
              Apartamente
            </h1>
            <p className="text-white text-sm md:text-xl montserrat">
              Çdo hapësirë është projektuar për të maksimizuar ndriçimin
              natyral, ventilimin dhe funksionalitetin,
              <br /> duke sjellë një atmosferë të ngrohtë dhe tërheqëse.
            </p>
          </div>
          <div className="mb-10 flex gap-2 h-full align-center justify-center">
            <button
              onClick={handlePrev}
              className="bg-gold transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
            >
              <SlArrowLeft color="#fff" />
            </button>
            <button
              onClick={handleNext}
              className="bg-gold  transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
            >
              <SlArrowRight color="#fff" />
            </button>
          </div>
        </div>
        <Swiper
          ref={swiperRef}
          breakpoints={{
            340: {
              slidesPerView: 1.7,
              spaceBetween: 4,
            },
            700: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          modules={[FreeMode]}
          loop={true}
          centeredSlides={true}
          style={{
            maxWidth: "100%",
          }}
        >
          {data?.slice(0, 8).map((el) => {
            return (
              <SwiperSlide id="swipeslides" key={el.id}>
                <ApartmentCard
                  key={el.id}
                  category={el.category}
                  image={el.image3dUrl}
                  title={el.name}
                  sqft={el.square}
                  bedroom={el.rooms}
                  floor={el.floorNumber}
                  navigateTo={() => navigate(`/apartments/${el.id}`)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ApartmentCarousel;
