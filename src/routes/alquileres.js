const express = require('express');
const {
  getAlquileres,
  getAlquilerById,
  createAlquiler,
  updateAlquiler,
  deleteAlquiler,
} = require('../controllers/alquileresController');

const router = express.Router();

router.get('/', getAlquileres);
router.get('/:id', getAlquilerById); // Ruta nueva
router.post('/', createAlquiler);
router.put('/:id', updateAlquiler);
router.delete('/:id', deleteAlquiler);

module.exports = router;

//