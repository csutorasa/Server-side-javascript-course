var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    user: String,
    pass: String,
    name: String
});

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;