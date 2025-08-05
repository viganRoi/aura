import React from 'react'

const DownloadSection = () => {

    const pdfLink = '/assets/pdf/File.pdf';
    const downloadPdf = () => {
        window.open(pdfLink, '_blank');
    }
    return (
        <div className='w-full h-full flex items-center justify-center relative bg-[var(--brand-color)]'>
            <div className='w-11/12 md:w-5/6 py-6 md:py-20 flex flex-col items-center justify-center text-center'>
                <button className='py-2 px-10 text-xl md:text-2xl flex align-center justify-center rounded-full bg-[var(--brand2-color)]' onClick={() => downloadPdf()}>Download Foleja</button>
                <p className='mt-10 text-sm md:text-base montserrat'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla dolor voluptas ut temporibus provident cupiditate.</p>
            </div>
        </div>
    )
}

export default DownloadSection