import React from 'react'

const IconCard = ({ icon, text, iconHeight, title }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            {/* <div style={{ height: iconHeight, width: iconHeight }} className="flex items-center justify-center">
                {icon}
            </div> */}
            <h1 className='text-white certon text-5xl'>{title}</h1>
            <div className='w-1/2 border-gold my-2 border-[1px] rounded'>
            </div>
            <p className='text-2xl certon text-white'>{text}</p>
        </div>
    )
}

export default IconCard
