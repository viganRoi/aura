import React from 'react'

const HouseHoverModal = ({ house, mousePosition }) => {
    if (!house) return null;
    const { title, sqft, type } = house;
    const style = mousePosition
        ? {
            position: 'fixed',
            left: mousePosition.x - 125,
            top: mousePosition.y +30,
            zIndex: 9999,
            pointerEvents: 'none',
        }
        : {};
    return (
        <div className='w-64 rounded-lg bg-white p-6 shadow-lg' style={style}>
            <div className='flex flex-col gap-2 items-center'>
                <h1 className='font-bold'>{title}</h1>
                <div className='border-y border-grey-400 py-2 flex items-center justify-center gap-1'>
                    <span>Sqft: {sqft}m2</span>
                    <span>type: {type}</span>
                </div>
            </div>
        </div>
    )
}

export default HouseHoverModal