const Alquiler = require('../models/Alquiler');

exports.getAlquileres = async (req, res) => {
  try {
    const alquileres = await Alquiler.findAll({
      where: { userId: req.user.id} //Los alquileres del User correspondiente
    });
    res.status(200).json(alquileres);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los alquileres.' });
  }
};

// exports.getAlquilerById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const alquiler = await Alquiler.findByPk(id);
//     if (alquiler) {
//       res.status(200).json(alquiler);
//     } else {
//       res.status(404).json({ error: 'Alquiler no encontrado.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener el alquiler.' });
//   }
// };


exports.getAlquilerById = async (req, res) => {
  try {
    const { id } = req.params;
    const alquiler = await Alquiler.findByPk(id);
    if (!alquiler) {
      return res.status(404).json({ error: 'Alquiler no encontrado.' });
    }
    // Verifica que el alquiler pertenezca al usuario autenticado
    if (alquiler.userId !== req.user.id) {
      return res.status(403).json({ error: 'No autorizado.' });
    }
    res.status(200).json(alquiler);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el alquiler.' });
  }
};

exports.createAlquiler = async (req, res) => {
  try {
    console.log('DATOS RECIBIDOS PARA CREAR ALQUILER: ', req.body);
    // Agrega el userId del usuario autenticado a los datos del alquiler
    const data = {
      ...req.body,
      userId: req.user.id,
    }

    const nuevoAlquiler = await Alquiler.create(data);
    res.status(201).json(nuevoAlquiler);

  } catch (error) {
    console.error('Error al crear el alquiler:', error);
    res.status(500).json({ error: 'Error al crear el alquiler.' });
  }
};



// exports.updateAlquiler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [updated] = await Alquiler.update(req.body, { where: { id } });
//     if (updated) {
//       const alquilerActualizado = await Alquiler.findByPk(id);
//       res.status(200).json(alquilerActualizado);
//     } else {
//       res.status(404).json({ error: 'Alquiler no encontrado.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al actualizar el alquiler.' });
//   }
// };


exports.updateAlquiler = async (req, res) => {
  try {
    const { id } = req.params;
    // Primero se busca el alquiler para verificar la pertenencia
    const alquiler = await Alquiler.findByPk(id);
    if (!alquiler) {
      return res.status(404).json({ error: 'Alquiler no encontrado.' });
    }
    if (alquiler.userId !== req.user.id) {
      return res.status(403).json({ error: 'No autorizado para actualizar este alquiler.' });
    }
    // Se actualiza el alquiler (evitando modificar el userId)
    const [updated] = await Alquiler.update(req.body, {
      where: { id, userId: req.user.id },
    });
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


// exports.deleteAlquiler = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Alquiler.destroy({ where: { id } });
//     if (deleted) {
//       res.status(200).json({ message: 'Alquiler eliminado' });
//     } else {
//       res.status(404).json({ error: 'Alquiler no encontrado.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al eliminar el alquiler.' });
//   }
// };

exports.deleteAlquiler = async (req, res) => {
  try {
    const { id } = req.params;
    // Se busca el alquiler para verificar si pertenece al usuario
    const alquiler = await Alquiler.findByPk(id);
    if (!alquiler) {
      return res.status(404).json({ error: 'Alquiler no encontrado.' });
    }
    if (alquiler.userId !== req.user.id) {
      return res.status(403).json({ error: 'No autorizado para eliminar este alquiler.' });
    }
    const deleted = await Alquiler.destroy({ where: { id, userId: req.user.id } });
    if (deleted) {
      res.status(200).json({ message: 'Alquiler eliminado' });
    } else {
      res.status(404).json({ error: 'Alquiler no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el alquiler.' });
  }
};

