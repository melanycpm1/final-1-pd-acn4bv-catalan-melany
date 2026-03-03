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

import "./styles/style.css";

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [lugares, setLugares] = useState([]);
  const [temporadas, setTemporadas] = useState([]);
  const [pelicula, setPelicula] = useState(null);
  const [creadores, setCreadores] = useState(null);
  const [busquedaTemporada, setBusquedaTemporada] = useState("");
  const [busquedaPersonaje, setBusquedaPersonaje] = useState("");

  // Personajes desde backend
  const fetchPersonajes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/personajes");
      const data = await res.json();
      setPersonajes(data);
    } catch (err) {
      console.error("Error cargando personajes:", err);
    }
  };

  //  Datos generales
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

  return (
    <div className="App">

      {/* NAVBAR (mismos colores que antes) */}
      <nav className="navbar">
        <Link to="/">Personajes</Link>{" "}
        <Link to="/temporadas">Temporadas</Link>{" "}
        <Link to="/lugares">Lugares</Link>{" "}
        <Link to="/pelicula">Película</Link>{" "}
        <Link to="/creadores">Creadores</Link>
      </nav>
<Routes>
  {/* PERSONAJES */}
  <Route
    path="/"
    element={
      <>
      <div className="buscador-personajes">
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={busquedaPersonaje}
          onChange={(e) => setBusquedaPersonaje(e.target.value)}
        />
      </div>
        <h2 className="text-center">Agregar Personaje</h2>
        <FormPersonaje onPersonajeAgregado={handlePersonajeAgregado} />

        <h1 className="text-center">Personajes</h1>
        <div id="contenedorPersonajes">
          {personajes
            .filter(p =>
              p.nombre.toLowerCase().includes(busquedaPersonaje.toLowerCase())
            )
            .map((p) => (
              <PersonajeCard key={p.nombre} personaje={p} />
            ))
          }
        </div>
      </>
    }
  />

  {/* DETALLE PERSONAJE */}
  <Route path="/personajes/:id" element={<PersonajeDetalle />} />

  {/* TEMPORADAS */}
  <Route
    path="/temporadas"
    element={
      <>
      <div className="buscador-temporadas">
        <input
          type="text"
          placeholder="Ingrese numero de temporada..."
          value={busquedaTemporada}
          onChange={(e) => setBusquedaTemporada(e.target.value)}
          />
      </div>
        <h1 className="text-center">Temporadas</h1>
        <div id="contenedorTemporadas">
          {temporadas
          .filter(t => t.temporada.toString().includes(busquedaTemporada))
          .map((t) => (
            <TemporadaCard key={t.temporada} temporada={t} />
          ))
          }
      </div>
      </>
    }
  />

  {/* LUGARES */}
  <Route
    path="/lugares"
    element={
      <>
        <h1 className="text-center">Lugares</h1>
        <div id="contenedorLugares">
          {lugares.map((l) => (
            <LugarCard key={l.nombre} lugar={l} />
          ))}
        </div>
      </>
    }
  />

  {/* PELÍCULA */}
  <Route
    path="/pelicula"
    element={
      <>
        <h1 className="text-center">Película</h1>
        <Pelicula pelicula={pelicula} />
      </>
    }
  />

  {/* CREADORES */}
  <Route
    path="/creadores"
    element={
      <>
        <h1 className="text-center">Creadores</h1>
        <Creadores creadores={creadores} />
      </>
    }
  />
</Routes>
    </div>
  );
}

export default App;