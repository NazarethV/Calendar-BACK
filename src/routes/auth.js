const express = require('express');
const router = express.Router();
const { registerHandler, loginHandler } = require('../handlers/authHandler');
const { validateRegister, validateLogin } = require('../validators/authValidator');

router.post('/register', validateRegister, registerHandler);
router.post('/login', validateLogin, loginHandler);

module.exports = router;
