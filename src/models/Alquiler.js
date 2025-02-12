const { DataTypes } = require('sequelize');
//const sequelize = require('../config/database');

module.exports = (sequelize) => { 
const Alquiler = sequelize.define('Alquiler', {
  
  tenantName: { type: DataTypes.STRING, allowNull: false }, // nombre_inquilino
  
  startDate: { 
    type: DataTypes.DATEONLY, 
    allowNull: false,
  }, 
 
  endDate: { 
    type: DataTypes.DATEONLY, 
    allowNull: false,
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

  //Para relacionar los alquileres con el User dueño
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Relación: Un alquiler pertenece a un usuario
//Alquiler.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });


// Relación: Un alquiler pertenece a un usuario
Alquiler.associate = (models) => {
  Alquiler.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
};

return Alquiler;

};

