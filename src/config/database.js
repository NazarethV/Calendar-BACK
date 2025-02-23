//DB MYSQL
const { Sequelize } = require('sequelize');
const path = require('path'); 
const fs = require('fs'); 
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // Cambiar el puerto a 3306 para MySQL
    dialect: 'mysql',
    logging: false, // Oculta los logs de SQL en la consola
  }
);

// Cargar los modelos dinámicamente
const models = {};
const modelsPath = path.join(__dirname, '../models');
fs.readdirSync(modelsPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(modelsPath, file))(sequelize);
    models[model.name] = model;
  });

// Ejecutar asociaciones
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

sequelize.authenticate()
  .then(() => console.log('✅ Conexión exitosa con la base de datos MySQL'))
  .catch(err => console.error('❌ Error al conectar a MySQL:', err));

module.exports = { sequelize, models };



// RENDER POSTGREST
// const { Sequelize } = require('sequelize');
// const path = require('path'); 
// const fs = require('fs'); 
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME, 
//   process.env.DB_USER, 
//   process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 5432, // Cambia el puerto a 5432 para PostgreSQL
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true, // Habilitar SSL (útil en algunos entornos de producción)
//         rejectUnauthorized: false, // Desactiva la validación del certificado
//       },
//     },
//   }
// );

// // Cargar los modelos dinámicamente
// const models = {};  // Crear un objeto para almacenar los modelos
// const modelsPath = path.join(__dirname, '../models');
// fs.readdirSync(modelsPath)
//   .filter(file => file.endsWith('.js'))
//   .forEach(file => {
//     const model = require(path.join(modelsPath, file))(sequelize);
//     models[model.name] = model;
//   });
// //
// // Ahora, debes ejecutar las asociaciones después de cargar los modelos
// // Object.keys(models).forEach(modelName => {
// //   if (models[modelName].associate) {
// //     models[modelName].associate(models);
// //   }
// Object.values(models).forEach(model => {
//   if (model.associate) {
//     model.associate(models);
//   }
// });

// sequelize.authenticate()
//   .then(() => console.log('Conexión exitosa con la base de datos.'))
//   .catch(err => console.error('Error al conectar a la base de datos:', err));

// module.exports = {sequelize, models};

