const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');
const auth = require('../middleware/auth');//solo usuarios autenticados pueden crear/editar/borrar

// Todas protegidas por autenticación
router.post('/', auth, placesController.createPlace);
router.get('/', placesController.getPlaces);
router.get('/:id', placesController.getPlace);
router.put('/:id', auth, placesController.updatePlace);//actualizar un lugar
router.delete('/:id', auth, placesController.deletePlace);

module.exports = router;