const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const alquilerRoutes = require('./routes/alquileres');
const sequelize = require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/alquileres', alquilerRoutes);

// Conectar con la base de datos
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada.');
  app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));
}).catch(err => console.log(err));
