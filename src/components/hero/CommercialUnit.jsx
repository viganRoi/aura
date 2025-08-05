import React from 'react'
import { homepage, planmetricImageUrl, STORE_IMAGE_PATH } from '../../utils/consts';

const CommercialUnit = ({ unit }) => {
    console.log(unit);


    return (
        <div className='w-full h-full bg-[var(--brand-color)] flex items-center justify-center'>
            {/* <h1>{unit?.name}</h1> */}
            <img src={`${homepage}${STORE_IMAGE_PATH}${unit?.twoDImageUrl}`} alt="" className='h-full w-full object-cover '/>
            {/* <img src="/assets/images/commercial/A-1.jpg" alt="" /> */}
        </div>
    )
}

export default CommercialUnit