const express = require('express');
const {
  getAlquileresHandler,
  getAlquilerByIdHandler,
  createAlquilerHandler,
  updateAlquilerHandler,
  deleteAlquilerHandler,
} = require('../handlers/alquileresHandler');

const authenticateJWT = require('../middlewares/auth');

const router = express.Router();

router.get('/', authenticateJWT, getAlquileresHandler);
router.get('/:id', authenticateJWT, getAlquilerByIdHandler); // Ruta nueva
router.post('/', authenticateJWT, createAlquilerHandler);
router.put('/:id', authenticateJWT, updateAlquilerHandler);
router.delete('/:id', authenticateJWT, deleteAlquilerHandler);

module.exports = router;

