const Place = require('../models/Place');

exports.createPlace = async (req, res) => {
    try {
        console.log('=== CREATE PLACE DEBUG ===');
        console.log('User from token:', req.user);
        console.log('Request body:', req.body);
        console.log('File:', req.file); // La imagen
        const { name, description, notes, category, address, lat, lng } = req.body;
        const place = await Place.create({
            name,
            description,
            location: address,
            notes,
            coordinates: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            },
            imageUrl: req.file ? req.file.path : null,
            category,
            createdBy: req.user.userId
        });

        console.log('Place created:', place);
        res.status(201).json(place);
    } catch (error) {
        console.error('=== ERROR CREATING PLACE ===');
        console.error('Error message:', error.message);
        console.error('Full error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });

    }
}

exports.getPlaces = async (req, res) => {
    try {
        const places = await Place.find({ createdBy: req.user.userId }).populate('createdBy',
            'username email');
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}

exports.getPlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).populate
            ('createdBy', 'username email');
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.json(place);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.updatePlace = async (req, res) => {
    try {
        const place = await Place.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.json(place);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}
exports.deletePlace = async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.json({ message: 'Place deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};