import React from 'react';

const Creadores = ({ creadores }) => {
  if (!creadores) return null;

  const c = creadores.creadorPrincipal;

  return (
    <div className="container my-4">
      <div className="card shadow-lg p-3">
        <div className="row">
          {/* Imagen del creador */}
          <div className="col-md-4 text-center mb-3">
            <img 
              src={c.img} 
              alt={c.nombre} 
              className="img-fluid rounded-circle border border-secondary" 
              style={{ maxWidth: "200px" }}
            />
            <h3 className="mt-3">{c.nombre}</h3>
            <p><strong>Nacimiento:</strong> {c.nacimiento}</p>
            <p><strong>Lugar:</strong> {c.lugarNacimiento}</p>
          </div>

          {/* Información detallada */}
          <div className="col-md-8">
            <div className="mb-3">
              <h5>Profesión</h5>
              <ul className="list-group list-group-flush">
                {c.profesion.map((p, i) => <li key={i} className="list-group-item">{p}</li>)}
              </ul>
            </div>

            <div className="mb-3">
              <h5>Roles en la serie</h5>
              <ul className="list-group list-group-flush">
                {c.rolesEnLaSerie.map((r, i) => <li key={i} className="list-group-item">{r}</li>)}
              </ul>
            </div>

            <div className="mb-3">
              <h5>Otras obras</h5>
              <ul className="list-group list-group-flush">
                {c.obrasAdicionales.map((o, i) => <li key={i} className="list-group-item">{o}</li>)}
              </ul>
            </div>

            <div className="mb-3">
              <h5>Historia</h5>
              <p>{creadores.historia}</p>
            </div>

            <div className="mb-3">
              <h5>Curiosidades</h5>
              <ul className="list-group list-group-flush">
                {creadores.curiosidades.map((cur, i) => <li key={i} className="list-group-item">{cur}</li>)}
              </ul>
            </div>

            <div className="mb-3">
              <h5>Premios y reconocimientos</h5>
              <ul className="list-group list-group-flush">
                {creadores.premiosYReconocimientos.map((p, i) => <li key={i} className="list-group-item">{p}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creadores;