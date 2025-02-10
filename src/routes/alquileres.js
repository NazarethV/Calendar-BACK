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

router.get('/', authenticateJWT, getAlquileresHandler);
router.get('/:id', authenticateJWT, getAlquilerByIdHandler); // Ruta nueva
router.post('/', authenticateJWT, createAlquilerHandler);
router.put('/:id', authenticateJWT, updateAlquilerHandler);
router.delete('/:id', authenticateJWT, deleteAlquilerHandler);

module.exports = router;

