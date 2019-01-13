var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    dateJoined: {
        type: Date,
        default: Date.now
    },
    email: String
});

// Plugin to pass methods/functionality to user model
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", userSchema);