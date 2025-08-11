import {
    getRegularFilterType,
    handleRegularFilterReset,
    handleRegularFilterType
} from '../../features/filter/FilterSlice';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";

const HouseFilter = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const typeFilter = useSelector(getRegularFilterType);

    useEffect(() => {
        dispatch(handleRegularFilterReset());
    }, [location.pathname, dispatch]);

    const handleTypeClick = (type) => {
        dispatch(handleRegularFilterType(type));
    };

    const types = [180, 220, 240, 260, 300];

    return (
        <div className="w-full absolute z-100 text-white rounded-full text-base flex items-center justify-center gap-4">
            {types.map((type) => (
                <button
                    key={type}
                    onClick={() => handleTypeClick(type)}
                    className='w-full flex flex-col items-center gap-2 cursor-pointer'
                >
                    <FaHouse
                        className={`text-5xl ${typeFilter.includes(type) ? 'text-secondary scale-110' : 'text-primary'}`}
                    />
                    <h1 className='text-2xl'>Tipi {type}</h1>
                </button>
            ))}
        </div>
    );
};

export default HouseFilter;
