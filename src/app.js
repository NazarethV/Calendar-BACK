const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const alquilerRoutes = require('./routes/alquileres');
const authRoutes = require('./routes/auth');
const sequelize = require('./config/database');
const User = require('./models/User');
const Alquiler = require('./models/Alquiler');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Ruta raíz para confirmar que el backend está activo
app.get('/', (req, res) => {
  res.send('Servidor backend en ejecución.');
});
// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rentals', alquilerRoutes); // Cambia la ruta base para que coincida con el frontend

//DEFINIR LA RELACIÓN ENTRE MODELOS
// Un usuario tiene muchos alquileres
User.hasMany(Alquiler, { foreignKey: 'userId' });

// Un alquiler pertenece a un usuario
Alquiler.belongsTo(User, { foreignKey: 'userId' });


// Conectar con la base de datos
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada.');
  app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));
}).catch(err => console.log(err));
