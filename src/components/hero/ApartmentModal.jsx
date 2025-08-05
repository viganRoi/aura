import React from 'react';

import { homepage, planmetricImageUrl } from '../../utils/consts';

const ApartmentModal = ({ building }) => {
    return (
        <div className='absolute' style={{
            pointerEvents: 'none'
        }} >
            <div className="modal-img">
                <button className='available-btn' style={{
                    backgroundColor: !building.isSold ? '#337c3d5d' : '#d12f2f6b',
                    color: !building.isSold ? '#337C3D' : 'red'
                }}>
                    {!building.isSold ? 'Available' : 'Sold'}
                    <div className='icon' style={{
                        backgroundColor: !building.isSold ? '#337C3D' : 'red'
                    }}></div>
                </button>
                <img src={`${homepage}${planmetricImageUrl}${building?.image3dUrl}`} alt="Apartment" />
            </div>
            <div className="modal-container">
                <div className="modal-content">
                    <div className="info">
                        <div className="title">
                            <h1>Apartment: <span>{building?.name}</span></h1>
                        </div>
                        <div className="box">
                            <img src="/projekti/assets/images/icons/m2.png" alt="icon" />
                            <p>{building?.square} m<sup>2</sup></p>
                        </div>
                        <div className="box">
                            <img src="/projekti/assets/images/icons/room.png" alt="icon" />
                            <p>{building?.rooms}</p>
                        </div>
                        <div className="box">
                            <img src="/projekti/assets/images/icons/plan.png" alt="icon" />
                            <p>{building?.balconySquare} m<sup>2</sup></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentModal;