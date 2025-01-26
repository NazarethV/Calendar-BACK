const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Alquiler = sequelize.define('Alquiler', {
  
  tenantName: { type: DataTypes.STRING, allowNull: false }, // nombre_inquilino
  
  startDate: { 
    type: DataTypes.DATE, 
    allowNull: false,
    // validate: {
    //   isDate: true,
    //   notEmpty: true,
    // }
  }, 
 
  endDate: { 
    type: DataTypes.DATE, 
    allowNull: false,
    // validate:{
    //   isDate: true,
    //   notEmpty: true,
    //   isAfterStart(value){
    //     if(value <= this.startDate) {
    //       throw new Error("La fecha de fin debe ser posterior a la fecha de inicio")
    //     }
    //   },
    // }
  }, 
  
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // precio
  
  deposit: { type: DataTypes.DECIMAL(10, 2), allowNull: true }, // seña
  
  phoneNumber: { type: DataTypes.STRING, allowNull: true }, // número de celular
  
  checkInTime: { type: DataTypes.TIME, allowNull: true }, // hora de entrada
  
  checkOutTime: { type: DataTypes.TIME, allowNull: true }, // hora de salida
  
  details: { type: DataTypes.TEXT, allowNull: true }, // detalles
});

module.exports = Alquiler;

