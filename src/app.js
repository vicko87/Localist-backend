const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(express.json()); // Para leer JSON en requests
app.use(cors());         // Permitir peticiones desde frontend
app.use(helmet());       // Seguridad (encabezados HTTP)
app.use(morgan("dev"));  // Logs en consola de cada petición

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});


module.exports = app;