import React from 'react';
import { Link } from "react-router-dom";

const PersonajeCard = ({ personaje }) => {
    return (
        <Link to={`/personajes/${encodeURIComponent(personaje.nombre)}`} className="text-decoration-none text-dark">
            <div className="card h-100 shadow-sm">
                <img
                    src={personaje.img}
                    alt={personaje.nombre}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{personaje.nombre}</h5>
                    <p className="card-text"><strong>Rol:</strong> {personaje.rol}</p>
                    <p className="card-text"><strong>Característica:</strong> {personaje.caracteristica}</p>
                    {personaje.frases && personaje.frases.length > 0 && (
                        <p className="card-text"><strong>Frases:</strong> {personaje.frases.join(', ')}</p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PersonajeCard;