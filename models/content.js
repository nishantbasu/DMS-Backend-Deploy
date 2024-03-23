const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    key:{type: String, required: [true, 'must provide value'], trim: true},
    value: {type: String, required: [true, 'must provide value']},
},{timestamps:true});

module.exports = mongoose.model('Content', contentSchema)