const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Alquiler = sequelize.define('Alquiler', {
  fecha: { type: DataTypes.DATE, allowNull: false },
  nombre_inquilino: { type: DataTypes.STRING, allowNull: true },
  duracion: { type: DataTypes.INTEGER, allowNull: true },
  senia: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  detalles: { type: DataTypes.TEXT, allowNull: true },
});

module.exports = Alquiler;
