const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Alquiler = sequelize.define('Alquiler', {
  tenantName: { type: DataTypes.STRING, allowNull: false }, // nombre_inquilino -> tenantName
  startDate: { type: DataTypes.DATE, allowNull: false }, // fecha -> startDate
  endDate: { type: DataTypes.DATE, allowNull: false }, // fecha fin
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // precio -> price
  details: { type: DataTypes.TEXT, allowNull: true }, // detalles
});

module.exports = Alquiler;

