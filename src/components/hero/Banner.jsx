import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { banners } from "../../utils/server";

const Banner = () => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full h-[100vh]  relative">
      <Swiper
        ref={swiperRef}
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: "0px",
          },
          700: {
            slidesPerView: 1,
            spaceBetween: "0px",
          },
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        style={{
          maxWidth: "100%",
          backgroundColor: "var(--bck-color)",
        }}
      >
        {banners.map((el, index) => (
          <SwiperSlide
            style={{ height: "100vh" }}
            id="swipeslides"
            key={el.id || index}
          >
            <div className="h-full w-full relative flex items-center">
              <img
                src={el.image}
                alt={"banner"}
                className="h-full w-full object-cover"
                style={{ maxHeight: "100vh" }}
              />
              <div className="absolute  left-10 flex items-center justify-center">
                <div className="bg-transparent p-4 text-start rounded text-white flex flex-col gap-2">
                  <h1 className="certon text-4xl sm:text-5xl md:text-7xl text-white">
                    Më shumë se një <br />
                    kompleks banimi
                  </h1>
                </div>
              </div>
              <div className="absolute bottom-10 left-10 flex items-center justify-center">
                <div className="bg-transparent p-4 text-start rounded text-white flex flex-col gap-2">
                  <p className="certon">Prishtinë, Kosovë</p>
                  <h1 className="certon">{el.title}</h1>
                  <a href={el.link} style={{ textDecoration: "none" }}>
                    <button className="border-2 border-white rounded-full py-2 px-10 w-full">
                      Blej Tani
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
