const express = require('express');
const router = express.Router();
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

// Middleware de validación
function validarPersonaje(req, res, next) {
  const { nombre, rol, caracteristica, img } = req.body;
  if (!nombre || !rol || !caracteristica || !img) {
    return res.status(400).json({
      error: "Todos los campos obligatorios deben completarse"
    });
  }
  next();
}

// GET /api/personajes
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('personajes').get();
    const personajes = snapshot.docs.map(doc => doc.data());
    res.json(personajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/personajes/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db.collection('personajes').doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    res.json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/personajes
router.post('/', validarPersonaje, async (req, res) => {
  try {
    const nuevo = req.body;
    await db.collection('personajes').doc(nuevo.nombre).set(nuevo);
    res.json({
      mensaje: "Personaje agregado correctamente",
      data: nuevo
    });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar personaje" });
  }
});


router.put('/:id', async (req, res) => {
  try {
    await db.collection('personajes')
      .doc(req.params.id)
      .update(req.body);

    res.json({ mensaje: "Personaje actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.collection('personajes').doc(req.params.id).delete();
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;