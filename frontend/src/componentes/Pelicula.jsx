import React from 'react';

const Pelicula = ({ pelicula }) => {
  if (!pelicula) return null;

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-3">
            {pelicula.titulo} ({pelicula.añoEstreno})
          </h2>
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>Título original:</strong> {pelicula.tituloOriginal}</p>
              <p><strong>Duración:</strong> {pelicula.duracionMinutos} minutos</p>
              <p><strong>Director:</strong> {pelicula.direccion}</p>
              <p><strong>Guion:</strong> {pelicula.guion.join(', ')}</p>
              <p><strong>Género:</strong> {pelicula.genero.join(', ')}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Productora:</strong> {pelicula.productora}</p>
              <p><strong>País:</strong> {pelicula.pais}</p>
              <p><strong>Idioma original:</strong> {pelicula.idiomaOriginal}</p>
              <p><strong>Clasificación:</strong> {pelicula.clasificacion}</p>
              <p><strong>Música:</strong> {pelicula.musica}</p>
            </div>
          </div>

          <div className="mb-3">
            <h4>Fechas de estreno</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>EE.UU.:</strong> {pelicula.fechaEstreno.eeuu}</li>
              <li className="list-group-item"><strong>Latinoamérica:</strong> {pelicula.fechaEstreno.latinoamerica}</li>
              <li className="list-group-item"><strong>España:</strong> {pelicula.fechaEstreno.españa}</li>
            </ul>
          </div>

          <div className="mb-3">
            <h4>Sinopsis</h4>
            <p>{pelicula.sinopsis}</p>
          </div>

          <div className="mb-3">
            <h4>Personajes principales</h4>
            <ul className="list-group list-group-flush">
              {pelicula.personajesPrincipales.map((p, i) => (
                <li key={i} className="list-group-item">{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pelicula;