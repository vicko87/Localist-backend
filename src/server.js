const app = require('./app');
const connectDB = require('./config/database');


const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
});