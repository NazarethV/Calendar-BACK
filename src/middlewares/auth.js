const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
  // Se espera el token en el header "Authorization" con el formato: Bearer <token>
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido o expirado.' });
      }
      
      // Agrega la información del usuario a la request para usarla en los handlers
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token no proporcionado.' });
  }
};

module.exports = authenticateJWT;


  // const authHeader = req.headers.authorization;
  // if (authHeader) {
  //   const token = authHeader.split(' ')[1];
  //   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //     if (err) {
  //       return res.status(403).json({ message: 'Token inválido o expirado.' });
  //     }
  //     // Agrega la información del usuario a la request para usarla en los controladores
  //     req.user = user;
  //     next();
  //   });
  // } else {
  //   res.status(401).json({ message: 'Token no proporcionado.' });
  // }
//};

// module.exports = authenticateJWT;
