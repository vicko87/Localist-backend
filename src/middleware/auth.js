const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
      console.log('=== AUTH MIDDLEWARE ===');
    console.log('Authorization header:', req.headers.authorization);
    // Obtener el token del header Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
           console.log('❌ No token provided');
        return res.status(401).json({message: 'No token provided'});
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
           console.log('✅ Token decoded:', decoded);
        req.user = decoded // Puedes acceder a req.user en tus rutas protegidas
        next();
    } catch (error){
                console.log('❌ Token verification failed:', error.message);
        return res.status(401).json({messsage: 'Invalid token'})
    }
    }

