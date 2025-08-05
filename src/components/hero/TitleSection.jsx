import React from 'react'

const TitleSection = ({title, image}) => {
    return (
        <div className='bg-white w-full h-[250px] md:h-[400px] flex flex-col items-center justify-center relative'>
            <div className='absolute top-0 left-0 h-[250px] md:h-[400px] w-full'>
                <img src={image} alt="" className='h-full w-full object-cover bg-[var(--brand-color)]'/>
            </div>
            <div className='w-11/12 md:w-5/6 text-black text-center flex items-center justify-center relative'>
                <h1 className='certon text-2xl md:text-5xl text-center text-white'>
                    {title}
                </h1>
            </div>
        </div>
    )
}

export default TitleSection