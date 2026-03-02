const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());

// CONFIG FIREBASE ADMIN
const admin = require("firebase-admin");
const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH;
const serviceAccount = require("./" + serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_DB
});

// Obtenemos Firestore
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

// Middleware propio de validación simple
function validarPersonaje(req, res, next) {
  const { nombre, rol, caracteristica, img } = req.body;
  if (!nombre || !rol || !caracteristica || !img) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben completarse" });
  }
  next();
}

// Rutas básicas
app.get("/", (req, res) => {
  res.send("Backend Wikison funcionando 🚀");
});

// ENDPOINTS

// PERSONAJES
app.get('/api/personajes', async (req, res) => {
  try {
    const snapshot = await db.collection('personajes').get();
    const personajes = snapshot.docs.map(doc => doc.data());
    res.json(personajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/personajes', validarPersonaje, async (req, res) => {
  try {
    const nuevo = req.body;
    const personajesRef = db.collection('personajes');
    await personajesRef.doc(nuevo.nombre).set(nuevo); // nombre como ID
    res.json({ mensaje: "Personaje agregado correctamente", data: nuevo });
  } catch (error) {
    console.error("Error agregando personaje:", error);
    res.status(500).json({ error: "Error al agregar personaje" });
  }
});

// LUGARES
app.get('/api/lugares', async (req, res) => {
  try {
    const snapshot = await db.collection('lugares').get();
    const lugares = snapshot.docs.map(doc => doc.data());
    res.json(lugares);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TEMPORADAS
app.get('/api/temporadas', async (req, res) => {
  try {
    const snapshot = await db.collection('temporadas').get();
    const temporadas = snapshot.docs.map(doc => doc.data());
    res.json(temporadas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PELICULAS
app.get('/api/peliculas', async (req, res) => {
  try {
    const doc = await db.collection('peliculas').doc('principal').get();
    if (!doc.exists) return res.status(404).json({ error: "No hay película" });
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREADORES
app.get('/api/creadores', async (req, res) => {
  try {
    const doc = await db.collection('creadores').doc('principal').get();
    if (!doc.exists) return res.status(404).json({ error: "No hay creadores" });
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sincronización inicial (opcional)
async function syncData() {
  const fetch = require('node-fetch'); // si no lo tienes, instalar con npm i node-fetch
  try {
    const res = await fetch('https://api.npoint.io/0b93dfeea9f6f27cfd98');
    const data = await res.json();

    // Guardar personajes
    const personajesRef = db.collection('personajes');
    for (const p of data.personajes) {
      if (p.nombre && p.nombre.trim() !== "") {
        await personajesRef.doc(p.nombre).set(p);
      }
    }

    // Guardar lugares
    const lugaresRef = db.collection('lugares');
    for (const l of data.lugares) {
      if (l.nombre && l.nombre.trim() !== "") {
        await lugaresRef.doc(l.nombre).set(l);
      }
    }

    // Guardar temporadas
    const temporadasRef = db.collection('temporadas');
    for (const t of data.temporadas) {
      if (t.temporada != null) {
        await temporadasRef.doc(`Temporada_${t.temporada}`).set(t);
      }
    }

    // Guardar película
    if (data.pelicula && Object.keys(data.pelicula).length > 0) {
      const peliculaRef = db.collection('peliculas').doc('principal');
      await peliculaRef.set(data.pelicula);
    }

    // Guardar creadores
    if (data.creadores && Object.keys(data.creadores).length > 0) {
      const creadoresRef = db.collection('creadores').doc('principal');
      await creadoresRef.set({
        creadorPrincipal: data.creadores.creadorPrincipal || {},
        historia: data.creadores.historia || "",
        curiosidades: data.creadores.curiosidades || [],
        premiosYReconocimientos: data.creadores.premiosYReconocimientos || []
      });
    }

    console.log('Datos sincronizados en Firebase correctamente.');
  } catch (error) {
    console.error('Error sincronizando datos:', error);
  }
}

// Ejecutar syncData al iniciar (opcional)
syncData();

// Iniciar servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});