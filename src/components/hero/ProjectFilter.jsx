import { getRegularFilterType, getRegularSquareFilter, handleRegularFilterReset, maxSquare, minSquare, handleRegularFilterType, setRegularSquareFilter } from '../../features/filter/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@mui/material';
import './style.css'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const ProjectFilter = ({ available }) => {
  const typeFilter = useSelector(getRegularFilterType);
  const squareFilter = useSelector(getRegularSquareFilter);
  const dispatch = useDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(false);


  const handleTypeChange = (event) => {
    dispatch(handleRegularFilterType(event.target.name));
  };

  const handleSizeChange = (event, newSizeRange) => {
    dispatch(setRegularSquareFilter(newSizeRange));
  };

  const handleReset = () => {
    dispatch(handleRegularFilterReset());
  };

  useEffect(() => {
    dispatch(handleRegularFilterReset());
  }, [location.pathname]);

  // Modal filter content
  const filterContent = (
    <div className="w-full h-full text-primary flex flex-col justify-between items-center gap-4 uppercase">
      <div className="w-full h-full flex flex-col gap-2 justify-between items-start">
        {/* Type */}
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-primary">type</h1>
          <div className="w-full flex gap-2 justify-start valky">
            {['A', 'B', 'C', 'D', 'E'].map((type) => (
              <button
                key={type}
                name={type}
                onClick={handleTypeChange}
                className={`px-4 py-2 rounded-full border border-primary text-nowrap ${typeFilter.includes(type)
                  ? 'bg-primary text-white'
                  : 'bg-brand text-primary'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full border-t border-primary my-2" />
        {/* Available */}
        <div className="w-full flex flex-col items-start justify-center gap-1">
          <div className="flex flex-col items-start gap-2">
            <h1 className="text-primary">available</h1>
            <h1 className="text-4xl valky text-primary">{available}</h1>
          </div>
        </div>
        <div className='w-full h-full flex justify-end items-end gap-4 mt-4'>
          <button
            className="px-6 py-2 bg-gray-200 text-primary rounded-full font-bold"
            onClick={handleReset}
          >
            reset
          </button>
          <button
            className="px-6 py-2 bg-gray-200 text-primary rounded-full font-bold"
            onClick={() => setOpen(false)}
          >
            apply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="absolute right-0 top-0 z-100 px-8 py-2 bg-primary text-white rounded-full text-base"
        onClick={() => setOpen(true)}
      >
        Filter
      </button>
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-[1001]"
            onClick={() => setOpen(false)}
          />
          {/* Modal content */}
          <div className="relative z-[1002] bg-white rounded-xl w-[95vw] max-w-[500px] h-[700px] max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-[modalIn_0.2s] flex flex-col">
            <button
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full w-9 h-9 flex items-center justify-center text-xl text-gray-700 z-[1003]"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectFilter;