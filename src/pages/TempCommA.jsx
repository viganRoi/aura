import React from 'react'

const TempCommA = () => {
  return (
    <div>
      <div className="bg-[var(--brand-color)] w-full pt-20 md:pt-0 h-[200px] md:h-[300px] flex flex-col items-center justify-center relative">
        <div className="w-11/12 md:w-5/6 text-black flex relative">
          <h1 className="certon text-2xl md:text-5xl text-[var(--brand2-color)]">
            Hapësire Komerciale, Objekti: A
          </h1>
        </div>
      </div>
      <div className='bg-white w-full md:h-[800px]'>
        <img src="/assets/images/commercial/A.png" alt='' className="h-full w-full object-contain" />
      </div>
    </div>
  )
}

export default TempCommA