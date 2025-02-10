const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = (sequelize) => { 
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
});

// Relación: Un usuario tiene muchos alquileres
//User.hasMany(Alquiler, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Relación: Un usuario tiene muchos alquileres
User.associate = (models) => {
    User.hasMany(models.Alquiler, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

return User;

};