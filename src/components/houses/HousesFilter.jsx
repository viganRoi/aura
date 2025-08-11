import { useEffect } from 'react';
import { getRegularFilterType, handleRegularFilterReset, handleRegularFilterType } from '../../features/filter/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { useLocation } from 'react-router-dom';
import { FaHouse } from 'react-icons/fa6';

const HousesFilter = ({ available }) => {
  const typeFilter = useSelector(getRegularFilterType);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(handleRegularFilterReset());
  }, [location.pathname, dispatch]);

  const handleTypeChange = (type) => {
    dispatch(handleRegularFilterType(type));
  };

  const types = ['180', '220', '240', '260', '300'];

  return (
    <div className="w-full h-full pt-12 md:py-24 flex items-center justify-center bg-bckS text-white">
      <div className="w-11/12 h-full md:h-28 text-primary flex flex-col justify-between items-center gap-4 uppercase axiformaThin">
        <div className="w-full h-full flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-start">
          <div className="w-auto flex flex-col items-start gap-1 md:gap-4 pr-12">
            <h1 className="text-primary text-2xl text-nowrap">Type</h1>
            <div className="w-full flex gap-2 justify-start valky">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className="w-full flex flex-col items-center gap-2 cursor-pointer"
                >
                  <FaHouse
                    className={`text-5xl ${typeFilter.includes(type) ? 'text-secondary scale-110' : 'text-primary'
                      }`}
                  />
                  <h1 className="text-2xl text-nowrap">Tipi {type}</h1>
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-auto flex flex-col items-start justify-center pl-12">
            <div className="flex flex-col items-start gap-2 md:gap-4">
              <h1 className="md:text-lg text-primary">Available</h1>
              <h1 className="text-4xl md:text-7xl text-primary">{available}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousesFilter;
