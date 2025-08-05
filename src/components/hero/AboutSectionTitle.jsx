import React from 'react'

const AboutSectionTitle = () => {
    return (
        <div className='bg-white w-full h-full flex items-center py-6 md:py-12 justify-center'>
            <div className='w-5/6 text-black text-start py-10 relative hover:scale-110 transition-transform duration-300'>
                <div
                    className="absolute inset-0 bg-cover bg-center "
                    style={{
                        backgroundImage: `url('/assets/images/brand/logo.png')`,
                    }}
                ></div>
                <div className='relative'>
                    <p className='certon text-sm md:text-lg text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ad aliquid, voluptate officia inventore officiis, veritatis exercitationem nihil ipsam beatae eligendi? Sapiente temporibus magni repellat sed commodi enim quibusdam numquam?</p>
                </div>
            </div>
        </div>
    )
}

export default AboutSectionTitle