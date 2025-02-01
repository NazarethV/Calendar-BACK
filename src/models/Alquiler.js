const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Alquiler = sequelize.define('Alquiler', {
  
  tenantName: { type: DataTypes.STRING, allowNull: false }, // nombre_inquilino
  
  startDate: { 
    //type: DataTypes.DATEONLY, //Esto evitará que Sequelize agregue automáticamente una zona horaria.
    type: DataTypes.DATEONLY, 
    allowNull: false,
    // validate: {
    //   isDate: true,
    //   notEmpty: true,
    // }
  }, 
 
  endDate: { 
    //type: DataTypes.DATEONLY, //Esto evitará que Sequelize agregue automáticamente una zona horaria.
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
  
  price: { 
    type: 
    DataTypes.DECIMAL(10, 2), 
    allowNull: false 
  }, 
  
  deposit: { 
    type: 
    DataTypes.DECIMAL(10, 2), 
    allowNull: true 
  }, 
  
  phoneNumber: { 
    type: 
    DataTypes.STRING, 
    allowNull: true 
  }, 
  
  checkInTime: { 
    type: 
    DataTypes.TIME, 
    allowNull: true 
  }, 
  
  checkOutTime: { 
    type: DataTypes.TIME, 
    allowNull: true 
  }, 
  
  details: { 
    type: 
    DataTypes.TEXT, 
    allowNull: true 
  }, 
});

module.exports = Alquiler;

