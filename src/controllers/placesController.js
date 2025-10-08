const Place = require('../models/Place');

exports.createPlace = async(req, res) => {
    try {
        const {name, description, location} = req.body;
        const place = await Place.create({
            name,
            description,
            location,
            createdBy: req.user.userId
        });
        res.status(201).json(place);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    
    }
    }
  
    exports.getPlaces = async (req, res) => {
        try {
            const places = await Place.find().populate('createdBy', 
                'username email');
                res.json(places);
            } catch (error) {
                res.status(500).json({message: 'Server error', error: error.message})
            }
            }
            
            exports.getPlace = async (req, res)  =>  {
                try {
                    const place = await Place.findById(req.params.id).populate
                    ('createdBy', 'username email');
                    if (!place) return res.status(404).json({message: 'Place not found'});
                    res.json(place);
                } catch (error) {
                    res.status(500).json({message: 'Server error', error: error.message});
                }
                }
            
                exports.updatePlace = async (req, res)  =>  {
                    try {
                        const place = await Place.findByIdAndUpdate(
                            req.params.id,
                            req.body,
                            {new: true}     
                        );
                        if (!place) return res.status(404).json({message:'Place not found'});
                        res.json(place);
                    } catch (error) {
                        res.status(500).json({message: 'Server error', error: error.message})
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