const { Op } = require('sequelize');
const Alquiler = require('../models/Alquiler');

exports.getAlquileres = async (req, res) => {
  try {
    const alquileres = await Alquiler.findAll();
    res.status(200).json(alquileres);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los alquileres.' });
  }
};

exports.getAlquilerById = async (req, res) => {
  try {
    const { id } = req.params;
    const alquiler = await Alquiler.findByPk(id);
    if (alquiler) {
      res.status(200).json(alquiler);
    } else {
      res.status(404).json({ error: 'Alquiler no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el alquiler.' });
  }
};

exports.createAlquiler = async (req, res) => {
  try {
    const nuevoAlquiler = await Alquiler.create(req.body);
    res.status(201).json(nuevoAlquiler);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el alquiler.' });
  }
};



exports.updateAlquiler = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Alquiler.update(req.body, { where: { id } });
    if (updated) {
      const alquilerActualizado = await Alquiler.findByPk(id);
      res.status(200).json(alquilerActualizado);
    } else {
      res.status(404).json({ error: 'Alquiler no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el alquiler.' });
  }
};

exports.deleteAlquiler = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Alquiler.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: 'Alquiler eliminado' });
    } else {
      res.status(404).json({ error: 'Alquiler no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el alquiler.' });
  }
};



// const Alquiler = require('../models/Alquiler');

// exports.getAlquileres = async (req, res) => {
//   try {
//     const alquileres = await Alquiler.findAll();
//     res.status(200).json(alquileres);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener los alquileres.' });
//   }
// };

// exports.createAlquiler = async (req, res) => {
//   try {
//     const nuevoAlquiler = await Alquiler.create(req.body);
//     res.status(201).json(nuevoAlquiler);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al crear el alquiler.' });
//   }
// };

// exports.updateAlquiler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const alquilerActualizado = await Alquiler.update(req.body, { where: { id } });
//     res.status(200).json(alquilerActualizado);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al actualizar el alquiler.' });
//   }
// };

// exports.deleteAlquiler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Alquiler.destroy({ where: { id } });
//     res.status(200).json({ message: 'Alquiler eliminado' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar el alquiler.' });
//   }
// };
