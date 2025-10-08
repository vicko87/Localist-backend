
const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: String,
    location: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true}
    }, {timeseries: true})



module.exports = mongoose.model('Place', placeSchema)