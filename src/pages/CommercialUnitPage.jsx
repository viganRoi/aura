import React, { useEffect } from 'react'
import { CommercialUnit } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleCommercialStore } from '../features/commercialStore/CommercialStoreSlice';
import { fetchCommercialStoreById } from '../features/commercialStore/CommercialStoreApi';
import { useParams } from 'react-router-dom';

const CommercialUnitPage = () => {
    const unit = useSelector(getSingleCommercialStore);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchCommercialStoreById(id))
    }, [])
    return (
        <div>
            <div className="bg-[var(--brand-color)] w-full pt-20 md:pt-0 h-[200px] md:h-[300px] flex flex-col items-center justify-center relative">
                <div className="w-11/12 md:w-5/6 text-black flex relative">
                    <h1 className="certon text-2xl md:text-5xl text-[var(--brand2-color)]">
                        Afarizmi
                    </h1>
                </div>
            </div>
            <CommercialUnit unit={unit} />
        </div>
    )
}

export default CommercialUnitPage