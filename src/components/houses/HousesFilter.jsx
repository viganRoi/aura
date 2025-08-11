import React, { useEffect } from 'react';
import { getRegularFilterType, getRegularSquareFilter, handleRegularFilterReset, handleRegularFilterType, maxSquare, minSquare, setRegularSquareFilter } from '../../features/filter/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import './style.css'
import { useLocation } from 'react-router-dom';


const HousesFilter = ({ setFilterState, available }) => {
    const squareFilter = useSelector(getRegularSquareFilter);
    const typeFilter = useSelector(getRegularFilterType);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(handleRegularFilterReset());
    }, [location.pathname]);

    const handleSizeChange = (event, newSizeRange) => {
        dispatch(setRegularSquareFilter(newSizeRange));
    };

    const handleTypeChange = (event) => {
        dispatch(handleRegularFilterType(event.target.name));
    };


    return (
        <div className='w-full h-full pt-12 md:py-24 flex items-center justify-center bg-primary apartmentfilter text-white'>
            <div className="w-11/12 h-full md:h-28 text-primary flex flex-col justify-between items-center gap-4 uppercase axiformaThin">
                <div className="w-full h-full flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-start">
                    <div className="w-auto flex flex-col items-start gap-1 md:gap-4 pr-12">
                        <h1 className="text-primary">type</h1>
                        <div className="w-full flex gap-2 justify-start valky">
                            {['A', 'B', 'C', 'D', 'E'].map((type) => (
                                <button
                                    key={type}
                                    name={type}
                                    onClick={handleTypeChange}
                                    className={`px-4 py-2 rounded-full border text-nowrap ${typeFilter.includes(type)
                                        ? 'bg-secondary border-secondary text-white'
                                        : 'bg-transparent border-white  text-white'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <a className='w-[1px] bg-secondary h-full' />
                    <div className="w-full flex flex-col items-start gap-1 px-24">
                        <h1 className="text-white">
                            size(M<sup>2</sup>)
                        </h1>
                        <div className="w-full flex flex-col justify-between">
                            <div className="w-full">
                                <Slider
                                    getAriaLabel={() => "Size range"}
                                    value={[squareFilter.startVal, squareFilter.endVal]}
                                    onChange={handleSizeChange}
                                    shiftStep={1}
                                    step={10}
                                    min={minSquare}
                                    max={maxSquare}
                                    color="var(--color-secondary)"
                                    sx={{
                                        color: "var(--color-secondary)",
                                        height: '1px',
                                        width: '100%',
                                    }}
                                />
                            </div>
                            <div className='w-full flex justify-between'>
                                <p className="text-white capitalize">
                                    {squareFilter.startVal}m2
                                </p>
                                <p className="text-white capitalize">
                                    {squareFilter.endVal}m2
                                </p>
                            </div>
                        </div>
                    </div>
                    <a className='w-[1px] bg-secondary h-full' />
                    <div className="w-full md:w-auto flex flex-col items-start justify-center pl-12">
                        <div className='flex flex-col items-start gap-2 md:gap-4 '>
                            <h1 className='md:text-lg text-white'>
                                available
                            </h1>
                            <h1 className='text-4xl md:text-7xl text-white'>
                                {available}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default HousesFilter;