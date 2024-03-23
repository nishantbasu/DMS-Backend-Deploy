const mongoose = require('mongoose');

const hubSchema = new mongoose.Schema({
    hubName:{type: String},
    regionName: {type: String},
    stateName:{type: String},
    cityName: {type: String},
    hubTier: {type: String}
},{timestamps:true});

module.exports = mongoose.model('Hubs', hubSchema)