import React, { useEffect, useState } from 'react'
import { getRegularFloorFilter, getRegularSquareFilter, handleFilterState, handleRegularFilterReset, maxFloor, maxSquare, minFloor, minSquare, setRegularFloorFilter, setRegularSquareFilter } from '../../features/filter/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import { BASE_URL } from '../../utils/consts';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const floorLabelMapping = {
    0: "Përdhesa",
    "-1": "Suterren",
    "-2": "Bodrum",
};
const getFloorLabel = (floor) => {
    return floorLabelMapping[floor] || floor;
};


const CommercialFilter = () => {
    const [sizeRange, setSizeRange] = useState([minSquare, maxSquare]);
    const [floorRange, setFloorRange] = useState([minFloor, maxFloor]);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleFloorChange = (event, newFloorRange) => {
        setFloorRange(newFloorRange);
    };

    const handleSizeChange = (event, newSizeRange) => {
        setSizeRange(newSizeRange);
    };

    const setFilteredData = () => {

        dispatch(setRegularFloorFilter([floorRange[0], floorRange[1]]));
        dispatch(setRegularSquareFilter([sizeRange[0], sizeRange[1]]));
        dispatch(handleFilterState(true));
    };

    const resetFilters = () => {
        dispatch(handleRegularFilterReset());
    };

    useEffect(() => {
        axios.get(`${BASE_URL}/api/apartment/get/count/available/${id}`).then(
            res => {
                setTotal(res.data);
            }
        );
    }, [id]);

    return (
        <div className='w-full h-full pt-20 pb-12 md:py-32 flex items-center justify-center bg-brand'>
            <div className="w-11/12 h-full text-gold flex flex-col justify-between items-end gap-4 md:gap-0">
                <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
                    <div className="w-full md:w-2/6 flex flex-col items-start gap-4">
                        <h1 className="text-lg text-white font-semibold">Kati</h1>
                        <div className='w-full flex flex-col justify-between'>
                            <div className="w-full">
                                <Slider
                                    getAriaLabel={() => "Floor range"}
                                    value={[floorRange[0], floorRange[1]]}
                                    shiftStep={1}
                                    onChange={handleFloorChange}
                                    step={1}
                                    min={minFloor}
                                    max={maxFloor}
                                    color="var(--brand2-color)"
                                    sx={{
                                        color: "var(--brand2-color)",
                                        height: '1px',
                                        width: "98%",
                                    }}
                                />
                            </div>
                            <p className='text-lg'>
                                {getFloorLabel(floorRange[0])} - {getFloorLabel(floorRange[1])}
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-2/6 flex flex-col items-start gap-4">
                        <h1 className="text-lg text-white font-semibold">Sipërfaqja</h1>
                        <div className='w-full flex flex-col justify-between'>
                            <div className="w-full">
                                <Slider
                                    getAriaLabel={() => "Size range"}
                                    value={[sizeRange[0], sizeRange[1]]}
                                    onChange={handleSizeChange}
                                    shiftStep={1}
                                    step={10}
                                    min={minSquare}
                                    max={maxSquare}
                                    color="var(--brand2-color)"
                                    sx={{
                                        color: "var(--brand2-color)",
                                        height: '1px',
                                        width: "98%",
                                    }}
                                />
                            </div>
                            <p className='text-lg'>
                                {sizeRange[0]}m2 - {sizeRange[1]}m2
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center gap-4">
                    <button
                        onClick={resetFilters}
                        className="bg-brand text-white px-4 py-2 rounded-full border border-gold hover:bg-gold transition"
                    >
                        Reseto
                    </button>
                    <button
                        onClick={setFilteredData}
                        className="bg-gold text-white px-4 py-2 rounded-full border border-gold"
                    >
                        Apliko Ndryshimet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommercialFilter;