const express = require('express');
const {
  getAlquileres,
  getAlquilerById,
  createAlquiler,
  updateAlquiler,
  deleteAlquiler,
} = require('../controllers/alquileresController');

const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticateJWT, getAlquileres);
router.get('/:id', authenticateJWT, getAlquilerById); // Ruta nueva
router.post('/', authenticateJWT, createAlquiler);
router.put('/:id', authenticateJWT, updateAlquiler);
router.delete('/:id', authenticateJWT, deleteAlquiler);

module.exports = router;

