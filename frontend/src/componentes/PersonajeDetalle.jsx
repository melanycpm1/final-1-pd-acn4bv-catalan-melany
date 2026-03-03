import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PersonajeDetalle = () => {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [rol, setRol] = useState("");
  const [caracteristica, setCaracteristica] = useState("");

  useEffect(() => {
    async function fetchPersonaje() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/personajes/${encodeURIComponent(id)}`
        );
        const data = await res.json();
        setPersonaje(data);
        setRol(data.rol);
        setCaracteristica(data.caracteristica);
      } catch (err) {
        console.error("Error cargando personaje:", err);
      }
    }
    fetchPersonaje();
  }, [id]);

  const handleActualizar = async () => {
    try {
      const personajeActualizado = {
        ...personaje,
        rol,
        caracteristica
      };

      await fetch(
        `http://localhost:3000/api/personajes/${encodeURIComponent(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(personajeActualizado),
        }
      );

      setPersonaje(personajeActualizado);
      setModoEdicion(false);

    } catch (error) {
      console.error("Error actualizando:", error);
    }
  };

  if (!personaje)
    return <p className="text-center mt-4">Cargando personaje...</p>;

  return (
    <div className="container my-4">
      <div className="card shadow-lg p-3">
        <div className="row g-3">

          <div className="col-md-4 text-center">
            <img
              src={personaje.img}
              alt={personaje.nombre}
              className="img-fluid rounded border border-secondary"
            />
          </div>

          <div className="col-md-8">
            <h2>{personaje.nombre}</h2>

            {!modoEdicion ? (
              <>
                <p><strong>Rol:</strong> {personaje.rol}</p>
                <p><strong>Característica:</strong> {personaje.caracteristica}</p>

                <button
                  className="btn btn-warning mt-2"
                  onClick={() => setModoEdicion(true)}
                >
                  Editar
                </button>
              </>
            ) : (
              <>
                <div className="mb-2">
                  <label className="form-label">Rol</label>
                  <input
                    className="form-control"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Característica</label>
                  <input
                    className="form-control"
                    value={caracteristica}
                    onChange={(e) => setCaracteristica(e.target.value)}
                  />
                </div>

                <button
                  className="btn btn-success me-2"
                  onClick={handleActualizar}
                >
                  Guardar
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setModoEdicion(false)}
                >
                  Cancelar
                </button>
              </>
            )}

            {personaje.frases && personaje.frases.length > 0 && (
              <div className="mt-3">
                <h5>Frases</h5>
                <ul className="list-group list-group-flush">
                  {personaje.frases.map((frase, idx) => (
                    <li key={idx} className="list-group-item">
                      {frase}
                    </li>
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