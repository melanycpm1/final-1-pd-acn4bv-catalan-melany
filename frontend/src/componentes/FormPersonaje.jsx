import { useState } from "react";

function FormPersonaje({ onPersonajeAgregado }) {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [caracteristica, setCaracteristica] = useState("");
  const [img, setImg] = useState("");
  const [frase, setFrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validación simple
    if (!nombre || !rol || !caracteristica || !img) {
      setError("Todos los campos obligatorios deben completarse");
      setLoading(false);
      return;
    }

    const nuevoPersonaje = {
      nombre,
      rol,
      caracteristica,
      img,
      frases: frase ? [frase] : []
    };

    try {
      const res = await fetch("http://localhost:3000/api/personajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoPersonaje)
      });

      const data = await res.json();

      if (res.ok) {
        onPersonajeAgregado(data.data); // informar al padre
        setNombre("");
        setRol("");
        setCaracteristica("");
        setImg("");
        setFrase("");
      } else {
        setError(data.error || "Error al agregar personaje");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }

    setLoading(false);
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4">
        <h4 className="mb-3 text-center">Agregar Personaje</h4>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Característica"
              value={caracteristica}
              onChange={(e) => setCaracteristica(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="URL Imagen"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Frase"
              value={frase}
              onChange={(e) => setFrase(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Agregando..." : "Agregar Personaje"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormPersonaje;