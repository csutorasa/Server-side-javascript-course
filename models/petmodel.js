var mongoose = require('mongoose');

var petSchema = mongoose.Schema({
    name: String,
    age: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});

var petModel = mongoose.model('pet', petSchema);

module.exports = petModel;