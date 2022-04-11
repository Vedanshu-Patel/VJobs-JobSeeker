var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

//Schema for a user
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    recruiter : Boolean
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User',userSchema);
module.exports = User;