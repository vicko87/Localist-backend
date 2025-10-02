
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Importa las rutas de autenticación
const authRoutes = require('./routes/auth');
// ...otros requires...
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Usa las rutas bajo /api/auth
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Localist API is running 🚀' });
});



module.exports = app;