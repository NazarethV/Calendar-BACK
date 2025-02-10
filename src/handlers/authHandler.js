const authController = require('../controllers/authController');

exports.registerHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await authController.register(username, email, password);
    res.status(201).json({ message: 'Usuario registrado con éxito.', user: newUser });
  } catch (error) {
    console.error('Error en registerHandler:', error);
    res.status(error.status || 500).json({ message: error.message || 'Error en el registro.' });
  }
};

exports.loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authController.login(username, password);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en loginHandler:', error);
    res.status(error.status || 500).json({ message: error.message || 'Error al iniciar sesión.' });
  }
};
