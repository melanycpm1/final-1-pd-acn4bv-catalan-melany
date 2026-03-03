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

  if (!personaje) return <p className="text-center mt-4">Cargando personaje...</p>;

  return (
    <div className="container my-4">
      <div className="card shadow-lg p-3">
        <div className="row g-3">
          {/* Imagen */}
          <div className="col-md-4 text-center">
            <img 
              src={personaje.img} 
              alt={personaje.nombre} 
              className="img-fluid rounded border border-secondary" 
            />
          </div>

          {/* Información */}
          <div className="col-md-8">
            <h2 className="card-title">{personaje.nombre}</h2>
            <p><strong>Rol:</strong> {personaje.rol}</p>
            <p><strong>Característica:</strong> {personaje.caracteristica}</p>

            {personaje.frases && personaje.frases.length > 0 && (
              <div className="mt-3">
                <h5>Frases</h5>
                <ul className="list-group list-group-flush">
                  {personaje.frases.map((frase, idx) => (
                    <li key={idx} className="list-group-item">{frase}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonajeDetalle;