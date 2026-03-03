import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { fetchData } from "./services/api";

import PersonajeCard from "./componentes/PersonajeCard";
import LugarCard from "./componentes/LugarCard";
import TemporadaCard from "./componentes/TemporadaCard";
import Pelicula from "./componentes/Pelicula";
import Creadores from "./componentes/Creadores";
import FormPersonaje from "./componentes/FormPersonaje";
import PersonajeDetalle from "./componentes/PersonajeDetalle";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [pelicula, setPelicula] = useState(null);
  const [creadores, setCreadores] = useState(null);
  const [busquedaTemporada, setBusquedaTemporada] = useState("");
  const [busquedaPersonaje, setBusquedaPersonaje] = useState("");

  const fetchPersonajes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/personajes");
      const data = await res.json();
      setPersonajes(data);
    } catch (err) {
      console.error("Error cargando personajes:", err);
    }
  };

  useEffect(() => {
    async function cargarDatos() {
      const data = await fetchData();
      setLugares(data.lugares || []);
      setTemporadas(data.temporadas || []);
      setPelicula(data.pelicula || null);
      setCreadores(data.creadores || null);
    }
    cargarDatos();
  }, []);

  useEffect(() => {
    fetchPersonajes();
  }, []);

  const handlePersonajeAgregado = (nuevo) => {
    setPersonajes([...personajes, nuevo]);
  };
const handleEliminar = async (nombre) => {
  try {
    await fetch(`http://localhost:3000/api/personajes/${encodeURIComponent(nombre)}`, {
      method: "DELETE",
    });

    setPersonajes(personajes.filter(p => p.nombre !== nombre));

  } catch (error) {
    console.error("Error eliminando:", error);
  }
};


  return (
    <div className="App container my-4 ">

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 rounded">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Wikison</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Personajes</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/temporadas">Temporadas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/lugares">Lugares</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/pelicula">Película</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/creadores">Creadores</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        {/* PERSONAJES */}
        <Route path="/" element={
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar personaje..."
                value={busquedaPersonaje}
                onChange={(e) => setBusquedaPersonaje(e.target.value)}
              />
            </div>

            <h2 className="text-center mb-3">Agregar Personaje</h2>
            <FormPersonaje onPersonajeAgregado={handlePersonajeAgregado} />

            <h1 className="text-center my-4">Personajes</h1>
            <div className="row g-3">
              {personajes
                .filter(p => p.nombre.toLowerCase().includes(busquedaPersonaje.toLowerCase()))
                .map((p) => (
                  <div className="col-md-4 col-sm-6" key={p.nombre}>
                    <PersonajeCard 
                          personaje={p} 
                          onEliminar={handleEliminar}
                        />
                  </div>
                ))
              }
            </div>
          </>
        }/>

        {/* DETALLE PERSONAJE */}
        <Route path="/personajes/:id" element={<PersonajeDetalle />} />

        {/* TEMPORADAS */}
        <Route path="/temporadas" element={
          <>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar temporada..."
                value={busquedaTemporada}
                onChange={(e) => setBusquedaTemporada(e.target.value)}
              />
            </div>

            <h1 className="text-center my-4">Temporadas</h1>
            <div className="row g-3">
              {temporadas
                .filter(t => t.temporada.toString().includes(busquedaTemporada))
                .map((t) => (
                  <div className="col-md-4 col-sm-6" key={t.temporada}>
                    <TemporadaCard temporada={t} />
                  </div>
                ))}
            </div>
          </>
        }/>

        {/* LUGARES */}
        <Route path="/lugares" element={
          <>
            <h1 className="text-center my-4">Lugares</h1>
            <div className="row g-3">
              {lugares.map(l => (
                <div className="col-md-4 col-sm-6" key={l.nombre}>
                  <LugarCard lugar={l} />
                </div>
              ))}
            </div>
          </>
        }/>

        {/* PELÍCULA */}
        <Route path="/pelicula" element={
          <>
            <h1 className="text-center my-4">Película</h1>
            <Pelicula pelicula={pelicula} />
          </>
        }/>

        {/* CREADORES */}
        <Route path="/creadores" element={
          <>
            <h1 className="text-center my-4">Creadores</h1>
            <Creadores creadores={creadores} />
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;