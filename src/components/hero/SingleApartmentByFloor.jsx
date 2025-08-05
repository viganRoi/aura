import React, { useEffect, useState } from 'react'
import { getApartmentDetailModalData, getFloorSvgData } from '../../features/apartment/ApartmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllApartmentsByFloorId, getApartmentById } from '../../features/apartment/ApartmentAPI';
import { homepage, planmetricImageUrl } from '../../utils/consts';
import { useParams } from 'react-router-dom';
import { IoKey } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { FaVectorSquare } from "react-icons/fa6";
import { MdBalcony } from "react-icons/md";

const SingleApartmentByFloor = () => {
    const isSmallDev = window.innerWidth < 700;
    const [selectedTab, setSelectedTab] = useState('3d');

    const apartment = useSelector(getFloorSvgData);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getAllApartmentsByFloorId(id));
        }
    }, [dispatch, id]);

    const { isSold, imageUrl, image3dUrl, pdfUrl, square, floorNumber, name, balconySquare, subtitle, rooms, apartmentId, apartmentNumber, apartmentPositionImageUrl, vtourUrl } = apartment;


    const handleViewChange = (e) => {
        setView(e.target.value);
    };

    const handleTabClick = (view) => {
        setSelectedTab(view);
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className="w-full h-[40vh] bg-brand flex justify-center align-center text-white">
                <div className="w-11/12 md:w-5/6 flex flex-col align-center justify-center content-center gap-10">
                    <div className="w-full justify-between align-center flex">
                        <h1 className='text-gold text-xl md:text-5xl certon'>Apartamenti: {apartmentNumber}</h1>
                        <h1 className='text-xl md:text-5xl certon'>Objekti: {name}</h1>
                    </div>
                    <div className="flex flex-row justify-between align-center">
                        <div className="flex flex-col gap-4 text-center justify-center items-center">
                            <p className='text-xl'>Numer</p>
                            <img src="/assets/svgs/keys.png" alt="" className='h-12 md:h-20'/>
                            <h1 className='text-2xl'>{apartmentNumber}</h1>
                        </div>
                        <div className="flex flex-col gap-4 text-center justify-center items-center">
                            <p className='text-xl'>Size</p>
                            <img src="/assets/svgs/tot.png" alt="" className='h-12 md:h-20'/>
                            <h1 className='text-2xl'>{square}m<sup>2</sup></h1>
                        </div>
                        <div className="flex flex-col gap-4 text-center justify-center items-center">
                            <p className='text-xl'>Rooms</p>
                            <img src="/assets/svgs/type.png" alt="" className='h-12 md:h-20'/>
                            <h1 className='text-2xl'>{rooms}</h1>
                        </div>
                        <div className="flex flex-col gap-4 text-center justify-center items-center">
                            <p className='text-xl'>Balcony</p>
                            <img src="/assets/svgs/square.png" alt="" className='h-12 md:h-20'/>
                            <h1 className='text-2xl'>{balconySquare}m<sup>2</sup></h1>
                        </div>
                        <div className="flex flex-col gap-4 text-center justify-center items-center">
                            <p className='text-xl'>Object</p>
                            <img src="/assets/svgs/keys.png" alt="" className='h-12 md:h-20'/>
                            <h1 className='text-2xl'>{apartmentNumber}</h1>
                        </div>
                        <div className="flex flex-col gap-4 text-center justify-center items-center">
                            <p className='text-xl'>Kati</p>
                            <img src="/assets/svgs/floor.png" alt="" className='h-12 md:h-20'/>
                            <h1 className='text-2xl'>{floorNumber}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative w-11/12 md:w-5/6 flex flex-col flex align-center justify-center content-center mt-10">
                <div className="flex items-center justify-center">
                    <div className='tabs'>
                        <input type="radio" id='radio-1' name='tabs' checked={selectedTab === '3d'} />
                        <label
                            className='tab'
                            onClick={() => {
                                handleTabClick('3d');
                            }}
                            htmlFor='radio-1'
                            style={{ fontSize: '16px' }}
                        >
                            3D
                        </label>
                        <input type="radio" id='radio-2' name='tabs' checked={selectedTab === '2d'} />
                        <label
                            className='tab'
                            onClick={() => {
                                handleTabClick('2d');
                            }}
                            htmlFor='radio-1'
                            style={{ fontSize: '16px' }}
                        >
                            2D
                        </label>
                    </div>
                </div>
                <div className="absolute w-[350px] h-[200px] flex justify-center align-center top-0 right-0">
                <img src="/assets/images/apartments/1.jpg" alt="" className='h-full w-full cover' />
                </div>
                <img src={selectedTab === '2d' ? `/assets/images/apartments/f1.png` : `/assets/images/apartments/s1.png`} alt="Apartment view" className='h-[1000px] object-contain' style={{
                cursor: 'pointer'
                }} /> 
            </div>
            <div className="bg-brand w-full h-[50vh] flex-col align-center justify-center mt-10">
            </div>
        </div>
    )
}

export default SingleApartmentByFloor