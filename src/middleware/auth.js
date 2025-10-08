const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Obtener el token del header Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({message: 'No token provided'});
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded // Puedes acceder a req.user en tus rutas protegidas
        next();
    } catch (error){
        return res.status(401).json({messsage: 'Invalid token'})
    }
    }

