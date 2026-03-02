const express = require('express');
const router = express.Router();
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

// GET /api/temporadas
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('temporadas').get();
    const temporadas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(temporadas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;