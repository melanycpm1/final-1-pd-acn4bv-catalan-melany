const express = require('express');
const router = express.Router();
const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

// GET /api/lugares
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('lugares').get();
    const lugares = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(lugares);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
