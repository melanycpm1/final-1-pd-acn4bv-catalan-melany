import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PersonajeDetalle = () => {
    const { id } = useParams(); // id dinámico de la URL
    const [personaje, setPersonaje] = useState(null);

    useEffect(() => {
        async function fetchPersonaje() {
            try {
                const res = await fetch(`http://localhost:3000/api/personajes/${encodeURIComponent(id)}`);
                const data = await res.json();
                setPersonaje(data);
            } catch (err) {
                console.error("Error cargando personaje:", err);
            }
        }

        fetchPersonaje();
    }, [id]);

    if (!personaje) return <p>Cargando personaje...</p>;

    return (
        <div className="personaje-detalle">
            <h1>{personaje.nombre}</h1>
            <img src={personaje.img} alt={personaje.nombre} />
            <p><strong>Rol:</strong> {personaje.rol}</p>
            <p><strong>Característica:</strong> {personaje.caracteristica}</p>
            {personaje.frases && (
                <div>
                    <strong>Frases:</strong>
                    <ul>
                        {personaje.frases.map((frase, idx) => (
                            <li key={idx}>{frase}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PersonajeDetalle;