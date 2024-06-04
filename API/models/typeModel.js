const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Type = mongoose.model('type', typeSchema);

module.exports = Type;