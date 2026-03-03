import React from 'react';

const TemporadaCard = ({ temporada }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Temporada {temporada.temporada}</h5>
        <p className="card-text"><strong>Episodios:</strong> {temporada.episodios}</p>
        <p className="card-text"><strong>Primera emisión:</strong> {temporada.primeraEmision}</p>
        <p className="card-text"><strong>Última emisión:</strong> {temporada.ultimaEmision}</p>
        <p className="card-text"><strong>Audiencia promedio:</strong> {temporada.audienciaPromedio} millones</p>
        <p className="card-text"><strong>Década:</strong> {temporada.decada}</p>
        {temporada.descripcion && <p className="card-text">{temporada.descripcion}</p>}
        {temporada.notas && <p className="card-text"><em>{temporada.notas}</em></p>}
      </div>
    </div>
  );
};

export default TemporadaCard;