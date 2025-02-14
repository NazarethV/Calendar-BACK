const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const User = require('../models/User');
const { models } = require('../config/database');
const User = models.User;
require('dotenv').config();

exports.register = async (username, email, password) => {
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    const error = new Error('El usuario ya existe.');
    error.status = 400;
    throw error;
  }
  
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  
  return newUser;
};

exports.login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    const error = new Error('Credenciales incorrectas.');
    error.status = 401;
    throw error;
  }
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    const error = new Error('Datos incorrectos.');
    error.status = 401;
    throw error;
  }
  
  const tokenPayload = { id: user.id, username: user.username };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  return token;
};




// const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcrypt');
// const bcrypt = require('bcryptjs'); 
// const User = require('../models/User');
// const createError = require('http-errors');
// require('dotenv').config();

// exports.register = async (req, res, next) => {
//   try {
//     const { username, password, email } = req.body;
    
//     // Verifica si el usuario ya existe
//     const existingUser = await User.findOne({ where: { username }});
//     if (existingUser) {
//       return res.status(400).json({ message: 'El usuario ya existe.' });
//     }
    
//     // Encripta la contraseña
//     const saltRounds = 10;
//     //Le transformo en un valor irreconocible:
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
    
//     const newUser = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });
    
//     return res.status(201).json({ message: 'Usuario registrado con éxito.', user: newUser });
//   } catch (error) {
//     console.error('Error al registrar usuario:', error);
//     return res.status(500).json({ message: 'Error en el registro.' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     // Busca el usuario en la base de datos
//     const user = await User.findOne({ where: { username }});
//     if (!user) {
//       return res.status(401).json({ message: 'Credenciales incorrectas.' });
//     }
    
//     // Compara la contraseña ingresada con la almacenada (encriptada)
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ message: 'Credenciales incorrectas.' });
//     }
    
//     // Si es válido, genera el token
//     const tokenPayload = { id: user.id, username: user.username };
//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
//     return res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error en login:', error);
//     return res.status(500).json({ message: 'Error al iniciar sesión.' });
//   }
// };
