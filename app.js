const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const alquilerRoutes = require('./routes/alquileres');
const sequelize = require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/v1/rentals', alquilerRoutes); // Cambia la ruta base para que coincida con el frontend

// Conectar con la base de datos
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada.');
  app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));
}).catch(err => console.log(err));
