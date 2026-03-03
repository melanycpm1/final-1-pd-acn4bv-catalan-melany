import React from 'react';
import { Link } from "react-router-dom";

const PersonajeCard = ({ personaje }) => {
    return (
        <Link to={`/personajes/${encodeURIComponent(personaje.nombre)}`}>
            <div className="personaje-card">
                <div className="cntdor-img">
                    <img src={personaje.img} alt={personaje.nombre} className="img-personaje" />
                </div>
                <div className="cntendor_info-personajes">
                    <h3>{personaje.nombre}</h3>
                    <p><strong>Rol:</strong> {personaje.rol}</p>
                    <p><strong>Característica:</strong> {personaje.caracteristica}</p>
                    {personaje.frases && personaje.frases.length > 0 && (
                        <p><strong>Frases:</strong> {personaje.frases.join(', ')}</p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PersonajeCard;