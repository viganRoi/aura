import React from 'react'

const SpecSection = () => {
    return (
        <div className="w-full h-full flex items-center justify-center py-6 md:py-12 bg-white">
            <div className="w-11/12 md:w-5/6 flex flex-col md:flex-row">
                <div className='w-full md:w-1/2'>
                    <h1 className='font-bold text-xl md:text-5xl certon'>Delivered Projects</h1>
                </div>
                <div className='w-full md:w-1/2 flex flex-col'>
                    <div className='flex border-b-2 border-gold h-12 align-center justify-around items-center'>
                        <h1 className='montserrat'>+ 4,000 Units</h1>
                        <p className='capitalize montserrat'>Total units delivered</p>
                    </div>
                    <div className='flex border-b-2 border-gold h-12 align-center justify-around items-center'>
                        <h1 className='montserrat'>+ 4,000 Units</h1>
                        <p className='capitalize montserrat'>Total units delivered</p>
                    </div>
                    <div className='flex border-b-2 border-gold h-12 align-center justify-around items-center'>
                        <h1 className='montserrat'>+ 4,000 Units</h1>
                        <p className='capitalize montserrat'>Total units delivered</p>
                    </div>
                    <div className='flex border-b-2 border-gold h-12 align-center justify-around items-center'>
                        <h1 className='montserrat'>+ 4,000 Units</h1>
                        <p className='capitalize montserrat'>Total units delivered</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecSection