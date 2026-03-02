const express = require('express');
const router = express.Router();
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

// GET /api/creadores
router.get('/', async (req, res) => {
  try {
    const doc = await db.collection('creadores').doc('principal').get();

    if (!doc.exists) {
      return res.status(404).json({ error: "No hay creadores" });
    }

    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;