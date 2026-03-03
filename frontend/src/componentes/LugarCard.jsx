import React from 'react';

const LugarCard = ({ lugar }) => {
  return (
    <div className="card mb-3 shadow-sm" style={{ width: '18rem' }}>
      <img 
        src={lugar.img} 
        className="card-img-top" 
        alt={lugar.nombre} 
        style={{ objectFit: 'cover', height: '200px' }} 
      />
      <div className="card-body">
        <h5 className="card-title text-center">{lugar.nombre}</h5>
      </div>
    </div>
  );
};

export default LugarCard;