import React from 'react'

const HouseHoverModal = ({ house, mousePosition }) => {
    if (!house) return null;
    const { title, sqft, type } = house;
    const style = mousePosition
        ? {
            position: 'fixed',
            left: mousePosition.x - 125,
            top: mousePosition.y +30,
            zIndex: 999999,
            pointerEvents: 'none',
        }
        : {};
    return (
        <div className='w-64 rounded-lg bg-primary p-6 shadow-lg text-white' style={style}>
            <div className='w-full flex flex-col gap-2 items-center'>
                <h1 className='font-bold'>{title}</h1>
                <div className='w-full border-y border-secondary py-2 flex items-center justify-center gap-1'>
                    <span>type: {type}</span>
                </div>
            </div>
        </div>
    )
}

export default HouseHoverModal