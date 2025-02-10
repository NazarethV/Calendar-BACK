const Alquiler = require('../models/Alquiler');

exports.getAlquileres = async (userId) => {
  return await Alquiler.findAll({ where: { userId } });
};

exports.getAlquilerById = async (alquilerId, userId) => {
  const alquiler = await Alquiler.findByPk(alquilerId);
  if (!alquiler) {
    const error = new Error('Alquiler no encontrado.');
    error.status = 404;
    throw error;
  }
  if (alquiler.userId !== userId) {
    const error = new Error('No autorizado.');
    error.status = 403;
    throw error;
  }
  return alquiler;
};

exports.createAlquiler = async (data) => {
  return await Alquiler.create(data);
};

exports.updateAlquiler = async (alquilerId, userId, updateData) => {
  const alquiler = await Alquiler.findByPk(alquilerId);
  if (!alquiler) {
    const error = new Error('Alquiler no encontrado.');
    error.status = 404;
    throw error;
  }
  if (alquiler.userId !== userId) {
    const error = new Error('No autorizado para actualizar este alquiler.');
    error.status = 403;
    throw error;
  }
  
  // Evitar que se modifique el userId
  if (updateData.userId && updateData.userId !== userId) {
    delete updateData.userId;
  }
  
  await Alquiler.update(updateData, { where: { id: alquilerId, userId } });
  return await Alquiler.findByPk(alquilerId);
};

exports.deleteAlquiler = async (alquilerId, userId) => {
  const alquiler = await Alquiler.findByPk(alquilerId);
  if (!alquiler) {
    const error = new Error('Alquiler no encontrado.');
    error.status = 404;
    throw error;
  }
  if (alquiler.userId !== userId) {
    const error = new Error('No autorizado para eliminar este alquiler.');
    error.status = 403;
    throw error;
  }
  await Alquiler.destroy({ where: { id: alquilerId, userId } });
};


