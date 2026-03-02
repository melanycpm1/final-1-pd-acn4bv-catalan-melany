const express = require('express');
const router = express.Router();
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

// GET /api/peliculas
router.get('/', async (req, res) => {
  try {
    const doc = await db.collection('peliculas').doc('principal').get();

    if (!doc.exists) {
      return res.status(404).json({ error: "No hay película" });
    }

    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;