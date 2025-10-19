const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');
const auth = require('../middleware/auth');//solo usuarios autenticados pueden crear/editar/borrar
const upload = require('../middleware/upload');

// Todas protegidas por autenticación
router.post('/', auth, upload.single('image'), placesController.createPlace);
router.get('/', placesController.getPlaces);
router.get('/:id', placesController.getPlace);
router.put('/:id', auth, upload.single('image'), placesController.updatePlace);//actualizar un lugar
router.delete('/:id', auth, placesController.deletePlace);

module.exports = router;