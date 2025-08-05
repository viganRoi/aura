import React from 'react'
import { IoBusOutline } from "react-icons/io5";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaWalking } from "react-icons/fa";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineHeatPump } from "react-icons/md";
import { MdDirectionsBike } from "react-icons/md";
import IconCard from '../cards/IconCard';

const IconSection = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-28 bg-brand">
            <div className="w-11/12 md:w-5/6 flex flex-col md:flex-row">
                <IconCard icon={<IoBusOutline className="h-20 w-20" style={{ color: 'var(--brand2-color)' }} />} text="Ndërtim" title='25,000 m2' iconHeight="50px" />
                <IconCard icon={<IoFastFoodOutline className="h-20 w-20" style={{ color: 'var(--brand2-color)' }} />} text="Hapsira Gjelbruse" title='12,000 m2' />
                {/* <IconCard icon={<FaWalking className="h-20 w-20" style={{ color: 'var(--brand2-color)' }} />} text="Walking side" title='12,000 m2' /> */}
                <IconCard icon={<FaWalking className="h-20 w-20" style={{ color: 'var(--brand2-color)' }} />} text="Hapsira Komerciale" title='5,000 m2' />
            </div>
        </div>
    )  
}

export default IconSection