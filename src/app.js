const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const alquilerRoutes = require('./routes/alquileres');
const authRoutes = require('./routes/auth');
const sequelize = require('./config/database');
const User = require('./models/User');
const Alquiler = require('./models/Alquiler');

const app = express();

//Middlewares globales y de seguridad
app.use(cors());
app.use(helmet()); // Protección contra vulnerabilidades comunes
app.use(bodyParser.json());

// Limitar intentos en /login (previene ataques de fuerza bruta)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos por IP
  message: 'Demasiados intentos de inicio de sesión. Inténtalo más tarde.',
});

// Ruta raíz para confirmar que el backend está activo
app.get('/', (req, res) => {
  res.send('Servidor backend en ejecución.');
});

// Rutas de la API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rentals', alquilerRoutes); // Cambia la ruta base para que coincida con el frontend

// //RELACIÓN ENTRE MODELOS
// // Un usuario tiene muchos alquileres
// User.hasMany(Alquiler, { foreignKey: 'userId' });

// // Un alquiler pertenece a un usuario
// Alquiler.belongsTo(User, { foreignKey: 'userId' });


// Manejo global de errores (middleware al final de las rutas)
app.use((err, req, res, next) => {
  console.error('Error capturado:', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});


// Conectar con la base de datos y arranque del servidor
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada.');
  app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));
}).catch(err => console.log(err));
