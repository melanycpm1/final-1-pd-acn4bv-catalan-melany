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

//routes

const personajesRoutes = require('./routes/personajes.routes');
const lugaresRoutes = require('./routes/lugares.routes');
const peliculasRoutes = require('./routes/peliculas.routes');
const temporadasRoutes = require('./routes/temporadas.routes');
const creadoresRoutes = require('./routes/creadores.routes');


app.use('/api/lugares', lugaresRoutes);
app.use('/api/personajes', personajesRoutes);
app.use('/api/temporadas', temporadasRoutes);
app.use('/api/peliculas', peliculasRoutes);
app.use('/api/creadores', creadoresRoutes);

// Sincronización inicial (opcional)
async function syncData() {
  const fetch = require('node-fetch'); 
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