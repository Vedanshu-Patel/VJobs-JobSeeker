var mongoose = require('mongoose');

//Schema for Application
var applicationSchema = new mongoose.Schema({
    name: String,
    location: String,
    skills: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var Application = mongoose.model('Application',applicationSchema);

module.exports = Application;