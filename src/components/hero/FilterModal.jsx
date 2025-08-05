import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getRegularFloorFilter, getRegularRoomFilter, getRegularSquareFilter, handleFilterState, handleRegularFilterReset, setRegularFloorFilter, setRegularRoomFilter, setRegularSquareFilter } from '../../features/filter/FilterSlice';
import axios from 'axios'
import { BASE_URL } from '../../utils/consts';

const maxFloor = 6;
const minFloor = -2;
const maxSquare = 720;
const minSquare = 140;


const floorLabelMapping = {
  0: "Përdhesa",
  "-1": "Suterren",
  "-2": "Bodrum",
};

const getFloorLabel = (floor) => {
  return floorLabelMapping[floor] || floor;
};


const FilterModal = ({ onClose, setRoomRange, setFloorRange, setSizeRange, buildingData }) => {
  const dispatch = useDispatch();
  const roomFilter = useSelector(getRegularRoomFilter);
  const floorFilter = useSelector(getRegularFloorFilter);
  const squareFilter = useSelector(getRegularSquareFilter);
  const [total, setTotal] = useState([]);
  const { id } = useParams();

  const handleSizeChange = (event, newSizeRange) => {
    dispatch(setRegularSquareFilter(newSizeRange));
  };

  const handleFloorChange = (event, newFloorRange) => {
    dispatch(setRegularFloorFilter(newFloorRange));
  };

  const handleRoomChange = (event) => {
    dispatch(setRegularRoomFilter(event.target.name));
  };

  const setFilteredData = () => {
    setFloorRange([floorFilter.startVal, floorFilter.endVal]);
    setRoomRange(roomFilter);
    setSizeRange([squareFilter.startVal, squareFilter.endVal]);
    dispatch(handleFilterState(true));
  }

  const resetFilters = () => {
    setSizeRange([minSquare, maxSquare]);
    setFloorRange([minFloor, maxFloor]);
    setRoomRange('all');
    dispatch(handleRegularFilterReset());
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/apartment/get/count/available/${id}`).then(
      res => {
        setTotal(res.data)
      }
    )
  }, [])

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Filter</h1>
          <button onClick={onClose} className="text-red-500">X</button>
        </div>
        <div className="mb-4">
          <h1 className="text-lg font-semibold">Dhoma</h1>
          <div className='flex space-x-2 mb-2'>
            <button name='1+1' onClick={handleRoomChange} className={`px-4 py-2 rounded ${roomFilter.includes('1+1') ? 'bg-gold text-black' : 'bg-brand text-white'}`}>1</button>
            <button name='2+1' onClick={handleRoomChange} className={`px-4 py-2 rounded ${roomFilter.includes('2+1') ? 'bg-gold text-black' : 'bg-brand text-white'}`}>2</button>
            <button name='3+1' onClick={handleRoomChange} className={`px-4 py-2 rounded ${roomFilter.includes('3+1') ? 'bg-gold text-black' : 'bg-brand text-white'}`}>3</button>
          </div>
        </div>
        <div className="mb-4">
          <div className="info">
          <h1 className="text-lg font-semibold">Kati</h1>
            <div>
              <p>
                {getFloorLabel(floorFilter.startVal)} - {getFloorLabel(floorFilter.endVal)}
              </p>
            </div>
          </div>
          <div className="slider">
            <Slider
              getAriaLabel={() => "Floor range"}
              value={[floorFilter.startVal, floorFilter.endVal]}
              shiftStep={1}
              onChange={handleFloorChange}
              step={1}
              min={minFloor}
              max={maxFloor}
              color="var(--primary-color)"
              sx={{
                color: "var(--primary-color)",
                height: '1px',
                width: '85%'
              }}
            />
          </div>
        </div>
        <div className="section">
          <div className="info">
          <h1 className="text-lg font-semibold">Sipërfaqja</h1>
            <div>
              <p>
                {squareFilter.startVal}m2 - {squareFilter.endVal}m2
              </p>
            </div>
          </div>
          <div className="slider">
            <Slider
              getAriaLabel={() => "Size range"}
              value={[squareFilter.startVal, squareFilter.endVal]}
              onChange={handleSizeChange}
              shiftStep={1}
              step={10}
              min={minSquare}
              max={maxSquare}
              color="var(--primary-color)"
              sx={{
                color: "var(--primary-color)",
                height: '1px',
                width: '85%'
              }}
            />
          </div>
        </div>
        <div className="f-btns">
          <div className="flex justify-between">
          <button onClick={resetFilters} className="bg-brand text-white px-4 py-2 rounded">Reset</button>
          <button onClick={() => {
            setFilteredData()
            onClose()
          }} className="bg-gold text-white px-4 py-2 rounded">Apply</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
