const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    riderName:{type: String}
},{timestamps:true});

module.exports = mongoose.model('Riders', riderSchema)