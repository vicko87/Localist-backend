const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // ¿Ya existe el usuario?
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({
            message: 'User registered',
            user: { id: user._id, username, email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validación simple 
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Buscar usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Crear token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
      });

    res.json({
    token,
   user: { userId: user._id, name: user.username, email: user.email }
     });
   
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};