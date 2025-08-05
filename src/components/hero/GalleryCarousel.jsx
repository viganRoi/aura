import React, { useRef } from 'react'
import { GalleryCard } from '../';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { gallery } from '../../utils/server';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const GalleryCarousel = () => {
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
        <div className='w-full h-full bg-brand flex flex-col items-center justify-center content-center pb-12 md:pb-32'>
            <div className='relative w-full flex flex-col align-center items-center justify-center'>
                <div className="absolute w-11/12 md:w-5/6 h-0 flex justify-between p-4 z-10">
                    <button onClick={handlePrev} className='bg-gold transition-all duration-.3s hover:bg-opacity-80 hover:text-bck w-[35px] md:w-[80px] h-[35px] md:h-[80px] radius-50 rounded-[50px] flex items-center justify-center'>
                        <SlArrowLeft color='#fff' />
                    </button>
                    <button onClick={handleNext} className='bg-gold transition-all duration-.3s hover:bg-opacity-80 hover:text-bck w-[35px] md:w-[80px] h-[35px] md:h-[80px] radius-50 rounded-[50px] flex items-center justify-center'>
                        <SlArrowRight color='#fff' />
                    </button>
                </div>
                <Swiper
                    ref={swiperRef}
                    breakpoints={{
                        340: {
                            slidesPerView: 1.2,
                            spaceBetween: 6
                        },
                        700: {
                            slidesPerView: 1.4,
                            spaceBetween: 20
                        }
                    }}
                    modules={[FreeMode]}
                    loop={true}
                    centeredSlides={true}
                    loopFillGroupWithBlank={true}
                    slidesPerGroup={1}
                    style={{
                        maxWidth: "100%",
                    }}
                >
                    {gallery
                        ?.map((el) => {
                            return (
                                <SwiperSlide id='swipeslides' key={el.id}>
                                    <GalleryCard 
                                    key={el.id} 
                                    image={el.image} 
                                    title={el.title} 
                                    mdHeight={"[80vh]"} 
                                    navigateTo={() => navigate(`/apartments/${el.id}`)} />
                                </SwiperSlide>
                            )
                        })}
                </Swiper>
            </div>
        </div>
    )
}

export default GalleryCarousel