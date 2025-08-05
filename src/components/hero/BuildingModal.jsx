import React from 'react';

const BuildingModal = ({ building }) => {
    if (!building) {
        return null;
    }
    console.log(building)
    return (
        <div className='absolute top-10 left-10 w-[250px] h-[350px] rounded bg-white border-2 border-white' style={{
            pointerEvents: 'none'
        }}>
            <div className="w-full h-[250px]">
                <img src={building.image} alt="Apartment" className='w-full h-full ' />
            </div>
            <div className="w-full h-[100px] flex align-center justify-center">
                <div className="flex flex-col w-full h-full p-3">
                    <div className="flex content-end align-center">
                        <button className='absolute right-2 top-2 flex align-center justify-center gap-10 px-3 py-1 text-sm rounded-full' style={{
                            backgroundColor: building.available ? '#337c3d5d' : '#d12f2f6b',
                            color: building.available ? '#337C3D' : 'red'
                        }}>
                            {building.available ? 'Available' : 'Sold'}
                            <div className='h-4 w-4 rounded-full' style={{
                                backgroundColor: building.available ? '#337C3D' : 'red'
                            }}></div>
                        </button>
                    </div>
                    <div className="flex flex-col w-full h-full">
                        <div className="w-full">
                            <h1>Apartment: <span>{`${building.title}`}</span></h1>
                            <h1>Apartment: <span>{`${building.address}`}</span></h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildingModal;
