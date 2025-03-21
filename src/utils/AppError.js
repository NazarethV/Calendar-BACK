// Utilidades para Manejo de Errores Asíncronos y Errores Personalizados

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true; // Para diferenciar errores operativos
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;