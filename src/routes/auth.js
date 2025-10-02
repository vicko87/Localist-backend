const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');  


router.post('/register', authController.register);
router.post('/login', authController.login);

// Endpoint para obtener el perfil del usuario autenticadoS
router.get('/profile', auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;