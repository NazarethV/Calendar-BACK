const authController = require('../controllers/authController');

//Uso el helper 'catchAsync' para simplificar el manejo de errores
const catchAsync = require('../utils/catchAsync')

  exports.registerHandler = catchAsync (async (req, res, next) => {

    const { username, email, password } = req.body;
    const newUser = await authController.register(username, email, password);
    res.status(201).json({ message: 'Usuario registrado con éxito.', user: newUser });
  });

  // exports.registerHandler = async (req, res) => {
  //   try {
  //     const { username, email, password } = req.body;
  //     const newUser = await authController.register(username, email, password);
  //     res.status(201).json({ message: 'Usuario registrado con éxito.', user: newUser });
  //   } catch (error) {
  //     console.error('Error en registerHandler:', error);
  //     res.status(error.status || 500).json({ message: error.message || 'Error en el registro.' });
  //   }
  // };


  exports.loginHandler = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
    const token = await authController.login(username, password);
    res.status(200).json({ token });
  });

// exports.loginHandler = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const token = await authController.login(username, password);
//     res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error en loginHandler:', error);
//     res.status(error.status || 500).json({ message: error.message || 'Error al iniciar sesión.' });
//   }
// };
