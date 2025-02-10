const alquileresController = require('../controllers/alquileresController');

exports.getAlquileresHandler = async (req, res) => {
  try {
    const alquileres = await alquileresController.getAlquileres(req.user.id);
    res.status(200).json(alquileres);
  } catch (error) {
    console.error('Error en getAlquileresHandler:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al obtener los alquileres.' });
  }
};

exports.getAlquilerByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const alquiler = await alquileresController.getAlquilerById(id, req.user.id);
    res.status(200).json(alquiler);
  } catch (error) {
    console.error('Error en getAlquilerByIdHandler:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al obtener el alquiler.' });
  }
};

exports.createAlquilerHandler = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    const nuevoAlquiler = await alquileresController.createAlquiler(data);
    res.status(201).json(nuevoAlquiler);
  } catch (error) {
    console.error('Error en createAlquilerHandler:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al crear el alquiler.' });
  }
};

exports.updateAlquilerHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAlquiler = await alquileresController.updateAlquiler(id, req.user.id, req.body);
    res.status(200).json(updatedAlquiler);
  } catch (error) {
    console.error('Error en updateAlquilerHandler:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al actualizar el alquiler.' });
  }
};

exports.deleteAlquilerHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await alquileresController.deleteAlquiler(id, req.user.id);
    res.status(200).json({ message: 'Alquiler eliminado' });
  } catch (error) {
    console.error('Error en deleteAlquilerHandler:', error);
    res.status(error.status || 500).json({ error: error.message || 'Error al eliminar el alquiler.' });
  }
};

