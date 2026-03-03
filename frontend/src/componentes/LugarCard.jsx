import React from 'react';

const LugarCard = ({ lugar }) => {
    return (
        <div className="lugar-card">
            <img src={lugar.img} alt={lugar.nombre} className='img-lugar'/>
            <h3>{lugar.nombre}</h3>
        </div>
    );
};

export default LugarCard;