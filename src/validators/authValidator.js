//express-validator: Para validar los datos que llegan en las peticiones 
//Permite definir reglas y capturar errores de forma centralizada.

const { check, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

// Validaciones para el registro de usuario
exports.validateRegister = [
  // username no debe estar vacío
  check('username')
    .notEmpty()
    .withMessage('El nombre de usuario es requerido.'),
  
  // email debe tener formato de correo válido
  check('email')
    .isEmail()
    .withMessage('El email no es válido.'),
  
  // password debe tener al menos 6 caracteres
  check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres.'),
  
  // Middleware que revisa los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Se unen todos los mensajes de error en una sola cadena
      const errorMsg = errors.array().map(err => err.msg).join(', ');
      return next(new AppError(errorMsg, 400));
    }
    next();
  }
];

// Validaciones para el login de usuario
exports.validateLogin = [
  check('username')
    .notEmpty()
    .withMessage('El nombre de usuario es requerido.'),
  check('password')
    .notEmpty()
    .withMessage('La contraseña es requerida.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array().map(err => err.msg).join(', ');
      return next(new AppError(errorMsg, 400));
    }
    next();
  }
];




// Explicación sencilla de las validaciones de entrada:

// Definición de Reglas:
// Utilizamos la función check para definir reglas sobre cada campo.

// Por ejemplo, check('username').notEmpty().withMessage('El nombre de usuario es requerido.') verifica que el campo username no esté vacío.
// Para el campo email usamos isEmail() que valida el formato de correo.
// Para el password, usamos isLength({ min: 6 }) para que tenga al menos 6 caracteres.
// Captura de Errores:
// Luego de las reglas, definimos una función middleware que utiliza validationResult(req) para obtener los errores.

// Si existen errores, se concatenan los mensajes y se crea un error (usando AppError) que se pasa al siguiente middleware (el de errores global).
// Si no hay errores, se llama a next() para continuar con el flujo de la petición.
// Uso en Rutas:
// En las rutas se inserta este middleware antes del handler correspondiente, de modo que la validación se ejecuta antes de llegar a la lógica de negocio.