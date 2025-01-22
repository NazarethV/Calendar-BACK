const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa con la base de datos.'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = sequelize;
