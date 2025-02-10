// Función que envuelve funciones asíncronas y pasa errores al middleware global
module.exports = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  