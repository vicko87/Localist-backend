const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');  


router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta protegida de ejemplo
router.get('/private', auth, (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});

module.exports = router;